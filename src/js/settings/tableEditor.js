const defaultValue = require('../js/utils/json/defaultTable.json')
const statPreview = require('../js/utils/json/statPreview.json')


// loop to create the selectors
window.addEventListener("load", () => {

    function createSelector (number, value) {

        let html = `
        <div class="tableSelector">
            <fieldset>
                <legend>Column ${number}</legend>
                <input id="CloumnInput${number}" disabled type="text" spellcheck="false" value="${value}">
                <div class="tableSelector-content">
                    <a>None</a>
                    <a>Head</a>
                    <a>Name</a>
                    <a>Kills</a>
                    <a>Deaths</a>
                    <a>Wins</a>
                    <a>Losses</a>
                    <a>Games</a>
                    <a>WLR</a>
                    <a>KDR</a>
                    <a>K/G</a>
                    <a>Kit</a>
                    <a>Level</a>
                </div>
            </fieldset>
        </div>`

        return html
    }

    for (let i = 1; i < 9; i++) {
        let value = defaultValue[i]

        let html = createSelector(i, value)
        let body = document.getElementById("tableEditorBody")

        body.innerHTML += html
    }
})

// saves localstorage data if never loaded before
window.addEventListener("load", () => {
    let selectors = document.querySelectorAll(".tableSelector input")

    let customTable = []

    selectors.forEach(selector => {
        let id = selector.id
        let value = selector.value

        customTable.push({"id": id, "value": value})
    })

    localStorage.read("customTable") ?? localStorage.write("customTable", customTable), previewTable()

})

// saves new table data
window.addEventListener("load", () => {
    let selectors = document.querySelectorAll(".tableSelector-content a")

    selectors.forEach(selector => {

        selector.addEventListener("click", e => {
            let table = localStorage.read("customTable")

            let id = e.path[2].children[1].id
            let newValue = e.srcElement.innerHTML
            let index = +id.replace(/\D/g, '')

            let input = document.getElementById(id)

            input.value = newValue
            
            table[index-1] = {"id": id, "value": newValue}

            localStorage.write("customTable", table)

            previewTable()
        })
    })
})

// loads the saved data into the selectors
window.addEventListener("load", () => {
    localStorage.read("customTable").forEach(item => {
        let id = item.id
        let value = item.value

        let input = document.getElementById(id)

        input.value = value
    })

    previewTable()
})

function previewTable () {
    function previewHeader () {
        let table = document.getElementById("headingPreview")

        let cells = "<th></th>"
    
    
        localStorage.read("customTable").forEach((item, index) => {
    
            if (item.value == "None") return
            
            else cells += `<th>${item.value}</th>`
            
        })
    
        table.innerHTML = cells
    }

    function previewStats () {
        let headingTable = document.querySelectorAll("#headingPreview th")
        let table = document.getElementById("statPreview")

        let cells = ""

        headingTable.forEach(cell => {
            let text = cell.innerText.toLowerCase()

            if (text == "head") {
                cells += `<td><img src=${statPreview[text]}></td>`
            }

            else {
                cells += `<td>${statPreview[text] ?? ""}</td>`
            }
        })

        table.innerHTML = cells
    }

    function previewTagLoader () {
        let cell = document.querySelector("#statPreview td")

        let tag = `<i data-tippy-content="Partied" class='fas'>&#xf0c0;</i>`

        cell.innerHTML = tag
    }

    previewHeader()
    previewStats()
    previewTagLoader()

    tippy('.fas', {
        animation: "shift-away",
        theme: 'blitzer',
    })
}