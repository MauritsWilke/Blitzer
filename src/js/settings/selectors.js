const { dialog } = require('electron').remote

const dialogOptions = require('../js/utils/json/dialogOptions.json')
const path = require("path")
const mcPath = path.join(require("minecraft-folder-path"), "logs")
const os = require('os')

window.addEventListener("load", () => {
    let input = document.getElementById("logInput")
    let options = document.querySelectorAll(".logSelector-content a")
    let content = document.querySelector(".logSelector-content")

    let data = localStorage.read("client") ?? ""

    let blc = `${path.join(mcPath, "blclient/minecraft").replaceAll("\\", "/")}/latest.log`
    let lc = `${path.join(os.homedir(), "/.lunarclient/offline/1.8/logs").replaceAll("\\", "/")}/latest.log`
    let plc = `${path.join(mcPath, "../../.pvplounge/logs").replaceAll("\\", "/")}/latest.log`
    let vf = `${mcPath.replaceAll("\\", "/")}/latest.log`


    let logPath = ""
    let client = ""

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", async e => {
            let text = e.target.innerHTML
        
            if (text == "Badlion Client") logPath = blc, client = "Badlion Client"
            if (text == "Lunar Client") logPath = lc, client = "Lunar Client"
            if (text == "PvPLounge") logPath = plc, client = "PvPLounge"
            if (text == "Standard (Vanilla/Forge/LabyMod)") logPath = vf, client = "Standard (Vanilla/Forge/LabyMod)"
    
            localStorage.write("logPath", logPath)
            localStorage.write("client", client)

            input.value = text
            
            if (text == "Custom") {
                if (process.platform !== 'darwin') dialogOptions.properties.push('OpenDirectory')

                let file = await dialog.showOpenDialog(dialogOptions)

                let path = file.filePaths[0].replace(/\\/g, "\/")

                localStorage.write("logPath", path)
                localStorage.write("client", "Custom")
            }
        })
    })
})

window.addEventListener("load", () => {
    let input = document.getElementById("windowInput")
    let options = document.querySelectorAll(".windowSelector-content a")

    let data = localStorage.read("windowStyle") ?? "Windows"; localStorage.write("windowStyle", "Windows")

    document.querySelectorAll(".headControls").forEach(header => header.classList.add("hidden"))

    if (data == "Mac") document.getElementById("ncm").classList.remove("hidden")
    else document.getElementById("ncm").classList.add("hidden"), document.getElementById("ncw").classList.remove("hidden")

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", e => {
            let text = e.target.innerHTML

            localStorage.write("windowStyle", text)

            input.value = text

            document.querySelectorAll(".headControls").forEach(header => header.classList.add("hidden"))

            if (text == "Mac") return document.getElementById("ncm").classList.remove("hidden")
            else return document.getElementById("ncm").classList.add("hidden"), document.getElementById("ncw").classList.remove("hidden")
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

window.addEventListener("load", () => {
    let input = document.getElementById("SelectModeInput")
    let options = document.querySelectorAll(".SelectModeContent a")

    let data = localStorage.read("statMode") ?? "Overall"; localStorage.write("statMode", "Overall")

    input.value = data

    options.forEach(option => {
        option.addEventListener("click", event => {
            let text = event.target.innerHTML
            input.value = text

            localStorage.write("statMode", text)
        })
    })
})