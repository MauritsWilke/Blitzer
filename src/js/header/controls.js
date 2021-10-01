const { remote } = require('electron')
const win = remote.getCurrentWindow()

window.addEventListener("load", () => {
    let close = document.querySelectorAll(".header-button-close")
    let minimize = document.querySelectorAll(".header-button-minimize")
    let fullscreen = document.querySelectorAll(".header-button-fullscreen")

    let maximized = false

    close.forEach(button => {
        button.addEventListener("click", () => {
            win.close()
        })
    })

    minimize.forEach(button => {
        button.addEventListener("click", () => {
            win.minimize()
        })
    })

    fullscreen.forEach(button => {
        button.addEventListener("click", () => {
            if (!maximized) {
                win.maximize()
                maximized = true      
            } else {
                win.unmaximize()
                maximized = false
            }
        })
    })
})

window.addEventListener("load", () => {
    let allPanel = document.querySelectorAll(".header-panel")

    let home = document.getElementById("header-dropdown-home")
    let translate = document.getElementById("header-dropdown-translate")
    let settings = document.getElementById("header-dropdown-settings")
    let homePanel = document.getElementById("home-panel")
    let translatePanel = document.getElementById("translate-panel")
    let settingsPanel = document.getElementById("settings-panel")

    home.addEventListener("click", () => {
        allPanel.forEach(panel => panel.classList.add("hidden"))

        homePanel.classList.toggle("hidden")
    })

    translate.addEventListener("click", () => {
        allPanel.forEach(panel => panel.classList.add("hidden"))

        translatePanel.classList.toggle("hidden")
    })

    settings.addEventListener("click", () => {
        allPanel.forEach(panel => panel.classList.add("hidden"))

        settingsPanel.classList.toggle("hidden")
    })
})