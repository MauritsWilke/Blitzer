window.addEventListener("load", () => {
    let input = document.getElementById("logInput")
    let options = document.querySelectorAll(".logSelector-content a")

    let data = localStorage.read("client") ?? ""

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", e => {
            let text = e.target.innerHTML

            localStorage.write("client", text)

            input.value = text
            
            if (text == "Custom") {
                // open dialog
            }
        })
    })
})