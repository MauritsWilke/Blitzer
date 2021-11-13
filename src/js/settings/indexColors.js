window.addEventListener("load", () => {
    let cards = document.querySelectorAll(".indexColorBox")
    let colors = []

    cards.forEach(card => {
        let color = card.querySelector(".indexColorBoxColor").style.backgroundColor
        let value = card.querySelector(".indexColorBoxText input").value

        colors.push({"color": color, "rating": +value})
    })
    
    localStorage.read("index_color") ?? localStorage.write("index_color", colors)
})

function createCard () {
    html = 
        localStorage.read("index_color").map((obj, index) =>
            `
            <div class="indexColorBox">
            <button class="indexColorBoxButton">&#10005</button>
                <div class="indexColorBoxColor color-picker${index}"></div>

                <div class="indexColorBoxText">
                    <input id="colorInput${index}" value="${obj.rating}" type="number">
                </div>
            </div>`
        ).join('')

    return html
}

window.addEventListener("load", () => {
    const colorPicker = () => {
        localStorage.read("index_color").forEach((obj, index) => {
            let input = document.getElementById(`colorInput${index}`)

            input.value = obj.rating

            input.onblur = () => {
                if (!input.value) input.value = 1
    
                let current = localStorage.read('index_color')
     
                current[index].rating = +input.value
                current = current.sort((a, b) => a.rating - b.rating)
                localStorage.write('index_color', current)
    
                let body = document.querySelector(".indexColors")

                body.innerHTML = createCard()
                colorPicker()
            }

            const pickr = Pickr.create({
                el: `.color-picker${index}`,
                theme: 'monolith',
                closeOnScroll: true,
                comparison: false,
                lockOpacity: true,
                default: obj.color,
                swatches: [
                    '#8D8D8D',
                    '#F5CC14',
                    '#EBA00A',
                    '#4CAD34',
                    '#26561A',
                    '#B21010',
                    '#6F0C0C',
                ],
            
                components: {
                    preview: true,
                    hue: true,
                    interaction: {
                        hex: false,
                        input: true,
                        cancel: true,
                        clear: false,
                        save: false,
                    }
                }
            })

            pickr.on("hide", instance => {
                let current = localStorage.read('index_color')
 
                current[index].color = `#${instance["_color"].toHEXA().join('')}`

                localStorage.write('index_color', current)
            })

            pickr.on('cancel', instance => {
                let current = localStorage.read('index_color')
                pickr.setColor(current[index].color)
                pickr.hide()
            })

            pickr.on('clear', instance => {
                pickr.setColor(instance.options.default);
                removeColor(index)
            })
        })
        
            //remove button
                let removeButton = document.querySelectorAll(".indexColorBoxButton")
        
                removeButton.forEach(button => {
                    button.addEventListener("click", e => {
                        let index = +(e.path[1].children[2].children[0].id).replace(/[^0-9]/g,'')
        
                        if (index == 0) return
        
                        let scores = localStorage.read("index_color")
                        scores.splice(index, 1)
        
                        localStorage.write("index_color", scores)
        
                        let body = document.querySelector(".indexColors")
            
                        body.innerHTML = createCard()
                        colorPicker()
                    })
                })
    }

    // add button
    let addButton = document.querySelector(".indexAddButton")

    addButton.addEventListener("click", () => {
        let scores = localStorage.read(`index_color`)
        let lastIndex = scores.length - 1
        console.log(lastIndex, lastIndex+1, scores[lastIndex].rating + 1)

        if(scores.length >= 12) return

        scores[lastIndex + 1] = { rating: Number(scores[lastIndex].rating + 1), color: "#C0C0C0" }

        localStorage.write("index_color", scores)

        let body = document.querySelector(".indexColors")

        body.innerHTML = createCard()
        colorPicker()
    })

    document.querySelector(".indexColors").innerHTML = createCard()
    colorPicker()
})