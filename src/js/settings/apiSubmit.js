window.addEventListener("load", async () => {
    let input = document.getElementById("apiInput")
    let button = document.getElementById("apiSave")
    let field = document.querySelector(".apiKeySubmitter fieldset")

    let data = localStorage.read("api") ?? ""

    input.value = data

    let status = await Hypixel.getKeyStatus(data)

    if (JSON.stringify(status) === '{}') {
        field.style.borderColor = "#85120E"

        toastify({
            text: "Your API Key is Invalid!",
            duration: 9999999999,
            className: "toast warning",
            position: "left",
            gravity: "bottom",
            close: true,
          }).showToast()
    }

    else field.style.borderColor = "#336c28"

    button.addEventListener("click", async () => {
        let key = input.value

        let status = await Hypixel.getKeyStatus(key)

        if (JSON.stringify(status) === '{}') {
            field.style.borderColor = "#85120E"

            return toastify({
                text: "Invalid API Key!",
                duration: 3000,
                className: "toast warning",
                position: "left",
                gravity: "bottom",
                stopOnFocus: true,
              }).showToast()
        }

        field.style.borderColor = "#336c28"

        toastify({
            text: "Success!",
            duration: 3000,
            className: "toast success",
            position: "left",
            gravity: "bottom",
            stopOnFocus: true,
          }).showToast()

        localStorage.write("api", key)
    })
})