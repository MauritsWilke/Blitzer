window.addEventListener("load", () => {
    let input = document.getElementById("apiInput")
    let button = document.getElementById("apiSave")

    let data = localStorage.read("api") ?? ""

    input.value = data

    button.addEventListener("click", () => {
        localStorage.write("api", input.value)
    })
})