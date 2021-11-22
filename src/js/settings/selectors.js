const { dialog } = require('electron').remote
const dialogOptions = require('../js/utils/json/dialogOptions.json')

window.addEventListener("load", () => {
    let input = document.getElementById("logInput")
    let options = document.querySelectorAll(".logSelector-content a")
    let content = document.querySelector(".logSelector-content")

    let data = localStorage.read("client") ?? ""

    //     let select = document.getElementById("clientSettings")

    // let blc = path.join(mcPath, "blclient/minecraft").replaceAll("\\", "/")
    // let lc = path.join(os.homedir(), "/.lunarclient/offline/1.8/logs").replaceAll("\\", "/")
    // let plc = path.join(mcPath, "../../.pvplounge/logs").replaceAll("\\", "/")
    // let vf = mcPath.replaceAll("\\", "/")


    // let logPath = ""
    // let client = ""


    // select.value = localStorage.read("client") ?? "vf"


    // select.addEventListener("change", event => {
    //     let target = event.target.value
        
    //     if (target == "blc") logPath = blc, client = "blc"
    //     if (target == "lc") logPath = lc, client = "lc"
    //     if (target == "plc") logPath = plc, client = "plc"
    //     if (target == "vf") logPath = vf , client = "vf"

    //     localStorage.write("logPath", logPath)
    //     localStorage.write("client", client)
    // })

    // manual client picker
// window.addEventListener("load", () => {
//     let button = document.getElementById("manualSelectLog")

//     button.addEventListener("click", async () => {
//         if (process.platform !== 'darwin') dialogOptions.properties.push('OpenDirectory')

//         let file = await dialog.showOpenDialog(dialogOptions)

//         let path = file.filePaths[0].replace(/\\/g, "\/")

//         localStorage.write("logPath", path)
//     })
// })

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
