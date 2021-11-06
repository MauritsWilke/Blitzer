window.addEventListener("load", () => {
    let input = document.getElementById("logInput")
    let options = document.querySelectorAll(".logSelector-content a")
    let content = document.querySelector(".logSelector-content")

    let data = localStorage.read("client") ?? ""

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", async e => {
            let text = e.target.innerHTML

            localStorage.write("client", text)

            input.value = text
            
            if (text == "Custom") {
                // open dialog
            }
        })
    })
})

window.addEventListener("load", () => {
    let input = document.getElementById("windowInput")
    let options = document.querySelectorAll(".windowSelector-content a")

    let data = localStorage.read("windowStyle") ?? "Windows"; localStorage.write("windowStyle", "Windows")

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", e => {
            let text = e.target.innerHTML

            localStorage.write("windowStyle", text)

            input.value = text

        })
    })
})

window.addEventListener("load", () => {
    let input = document.getElementById("fontInput")
    let options = document.querySelectorAll(".fontSelector-content a")

    let data = localStorage.read("fontStyle") ?? "Normal"; localStorage.write("fontStyle", "Normal")

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", e => {
            let text = e.target.innerHTML

            localStorage.write("fontStyle", text)

            input.value = text
            
        })
    })
})
