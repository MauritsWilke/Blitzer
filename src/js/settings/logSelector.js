window.addEventListener("load", () => {
    let input = document.getElementById("logInput")
    let options = document.querySelectorAll(".logSelector-content a")

    options.forEach(option => {
        option.addEventListener("click", e => {
            let text = e.target.innerHTML

            input.value = text
            
            if (text == "Custom") {
                // open dialog
            }
        })
    })
})