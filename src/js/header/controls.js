const { remote } = require('electron')
const storage = require('../js/utils/localStorage')
const win = remote.getCurrentWindow()
const localStorage = new storage.localStorage()

window.addEventListener("load", () => {
    let close = document.querySelectorAll(".header-button-close")
    let minimize = document.querySelectorAll(".header-button-minimize")
    let fullscreen = document.querySelectorAll(".header-button-fullscreen")

    let maximized = false

    let style = getComputedStyle(document.body)
    let root = document.documentElement.style

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

                root.setProperty('--temp-corner', 0)
                root.setProperty('--temp-body-opacity-lighter', `rgba(16, 16, 16, 1)`)
                root.setProperty('--temp-body-opacity', `rgba(14, 14, 14, 1)`)
                root.setProperty('--temp-header-opacity', `rgba(13, 13, 13, 1)`)
            } else {
                win.unmaximize()
                maximized = false

                root.setProperty('--temp-corner', style.getPropertyValue(`--corner`))
                root.setProperty('--temp-body-opacity-lighter', style.getPropertyValue(`--body-opacity-lighter`))
                root.setProperty('--temp-body-opacity', style.getPropertyValue(`--body-opacity`))
                root.setProperty('--temp-header-opacity', style.getPropertyValue(`--header-opacity`))
            }
        })
    })
})

window.addEventListener("load", () => {
    let allPanels = document.querySelectorAll(".panel")

    let overlay = document.getElementById("header-dropdown-overlay")
    let statSearch = document.getElementById("header-dropdown-statSearch")
    let tracking = document.getElementById("header-dropdown-tracking")
    let settings = document.getElementById("header-dropdown-settings")

    let overlayPanel = document.querySelector(".overlay")
    let statSearchPanel = document.querySelector(".statSearch")
    let trackingPanel = document.querySelector(".tracking")
    let settingsPanel = document.querySelector(".settings")

    let toolbar = document.querySelector(".heading-toolbar")


    overlay.addEventListener("click", () => {
        allPanels.forEach(panel => panel.classList.add("hidden"))

        overlayPanel.classList.toggle("hidden")
        toolbar.classList.remove("hidden")
    })

    statSearch.addEventListener("click", () => {
        allPanels.forEach(panel => panel.classList.add("hidden"))

        statSearchPanel.classList.toggle("hidden")
        toolbar.classList.add("hidden")
    })

    tracking.addEventListener("click", () => {
        allPanels.forEach(panel => panel.classList.add("hidden"))

        trackingPanel.classList.toggle("hidden")
        toolbar.classList.add("hidden")
    })

    settings.addEventListener("click", () => {
        allPanels.forEach(panel => panel.classList.add("hidden"))

        settingsPanel.classList.toggle("hidden")
        toolbar.classList.add("hidden")
    })
})

// toolbar code
window.addEventListener("load", () => {
    let toolbar = document.querySelector(".heading-toolbar")
    
    toolbar.addEventListener("click", () => {
        if (!document.getElementById("toolmenu")) {
            let body = document.querySelector("toolbar")
            let element = document.createElement("div")
    
            element.classList = "toolmenu-body"
            element.id = "toolmenu"
    
            body.append(element)
            toolbarLoader()
        }
        else {
            document.getElementById("toolmenu").classList.add("toolmenuRemove")

            setTimeout(() => document.getElementById("toolmenu").remove(), 400)
        }
    })

    document.addEventListener("click", event => {
        if (!toolbar.contains(event.target) && document.getElementById("toolmenu") ? !document.getElementById("toolmenu").contains(event.target) : null) {
            document.getElementById("toolmenu").classList.add("toolmenuRemove")

            setTimeout(() => document.getElementById("toolmenu").remove(), 400)
        }
    })
})

function toolbarLoader() {
    let body = document.getElementById("toolmenu")

    let html = `
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/toolSearch.png" id="toolSearch">
        </div>
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/toolMode.png" id="toolMode">
        </div>
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/toolGremlin.png" id="toolGremlin">
        </div>
    `

    body.innerHTML = html
}