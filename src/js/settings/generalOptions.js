window.addEventListener("load", () => {
    let boxs = document.querySelectorAll(".generalCompButton")

    boxs.forEach(box => {
        let data = localStorage.read(box.id) ?? "disabled"
        let button = document.querySelector(`#${box.id} button`)

        if (data == "disabled") {
            box.classList.add("disabled")
            button.innerHTML = "Disabled"
        } 
        else {
            box.classList.remove("disabled")
            button.innerHTML = "Enabled"
        }
    })
})


window.addEventListener("load", () => {
    let boxs = document.querySelectorAll(".generalCompButton")

    boxs.forEach(box => {
        box.addEventListener("click", e => {
            let id = e.target.id
            let button = document.querySelector(`#${id} button`)

            if (!box.classList.value.includes("disabled") == true) {
                localStorage.write(id, "disabled")
                button.innerHTML = "Disabled"

            }
            else if (!box.classList.value.includes("disabled") == false) {
                localStorage.write(id, "enabled")
                button.innerHTML = "Enabled"
            }

            box.classList.toggle("disabled")
            loadCachedPlayers()
        })
    })
})
