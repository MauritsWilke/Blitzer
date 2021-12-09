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
        if (document.getElementById("toolmenu").isHidden()) {
            document.getElementById("toolmenu").showElement()
            toolbarLoader()
        }
        else {
            document.getElementById("toolmenu").classList.add("toolmenuRemove")

            setTimeout(() => {
                document.getElementById("toolmenu").hideElement()
                document.getElementById("toolmenu").classList.remove("toolmenuRemove")
            }, 400)
        }
    })

    document.addEventListener("click", event => {
        if (!toolbar.contains(event.target) && document.getElementById("toolmenu") ? !document.getElementById("toolmenu").contains(event.target) : null) {
            document.getElementById("toolmenu").classList.add("toolmenuRemove")

            setTimeout(() => {
                document.getElementById("toolmenu").hideElement()
                document.getElementById("toolmenu").classList.remove("toolmenuRemove")
            }, 400)
        }
    })
})

function toolbarLoader() {
    let body = document.getElementById("toolmenu")

    let html = `
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/toolSearch.png" data-tippy-content="Search a Player" id="toolSearch">
        </div>
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/toolMode.png" data-tippy-content="Search Stats by Mode" id="toolMode">
        </div>
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/toolGremlin.png" data-tippy-content="Ingame Gremlin Stats (Top Ingame Kills)" id="toolGremlin">
        </div>
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/removePlayers.png" data-tippy-content="Removes all Players" id="toolRemoveAll">
        </div>
        <div class="toolbar-icons">
            <img src="../../assets/overlayIcons/refreshPlayer.png" data-tippy-content="Refreshs all Players" id="toolRefreshAll">
        </div>
    `

    body.innerHTML = html

    document.getElementById("toolSearch").addEventListener("click", () => toolSearch())
    document.getElementById("toolMode").addEventListener("click", () => toolMode())
    document.getElementById("toolGremlin").addEventListener("click", () => toolGremlin())
    document.getElementById("toolRemoveAll").addEventListener("click", () => toolRemoveAll())
    document.getElementById("toolRefreshAll").addEventListener("click", () => toolResfreshAll())

    tippy('.toolbar-icons img', {
        animation: "shift-away",
        theme: 'blitzer2',
    })
}

// close loader
window.addEventListener("load", () => {
    document.addEventListener("click", event => {
        if (!document.getElementById("toolModeMenu").contains(event.target) && document.getElementById("toolMode") ? !document.getElementById("toolMode").contains(event.target) : null) {
            document.getElementById("toolModeMenu").classList.add("opacityHide")

            setTimeout(() => {
                document.getElementById("toolModeMenu").hideElement()
                document.getElementById("toolModeMenu").classList.remove("opacityHide")
            }, 350)
        }
    })

    document.addEventListener("click", event => {
        if (!document.getElementById("toolSearchMenu").contains(event.target) && document.getElementById("toolSearch") ? !document.getElementById("toolSearch").contains(event.target) : null) {
            document.getElementById("toolSearchMenu").classList.add("opacityHide")

            setTimeout(() => {
                document.getElementById("toolSearchMenu").hideElement()
                document.getElementById("toolSearchMenu").classList.remove("opacityHide")
            }, 350)
        }
    })

    document.addEventListener("click", event => {
        if (!document.getElementById("toolGremlinMenu").contains(event.target) && document.getElementById("toolGremlin") ? !document.getElementById("toolGremlin").contains(event.target) : null) {
            document.getElementById("toolGremlinMenu").classList.add("opacityHide")

            setTimeout(() => {
                document.getElementById("toolGremlinMenu").hideElement()
                document.getElementById("toolGremlinMenu").classList.remove("opacityHide")
            }, 350)
        }
    })

    document.getElementById("toolSearchMenu").addEventListener("keypress", event => {
        if (event.key == "Enter") return overlaySearchPlayer()
    })

    document.querySelector(".toolModeMenuClose").addEventListener("click", () => {
        document.getElementById("toolModeMenu").classList.add("opacityHide")

        setTimeout(() => {
            document.getElementById("toolModeMenu").hideElement()
            document.getElementById("toolModeMenu").classList.remove("opacityHide")
        }, 350)
    })

    document.querySelector(".toolSearchMenuClose").addEventListener("click", () => {
        document.getElementById("toolSearchMenu").classList.add("opacityHide")

        setTimeout(() => {
            document.getElementById("toolSearchMenu").hideElement()
            document.getElementById("toolSearchMenu").classList.remove("opacityHide")
        }, 350)
    })

    document.querySelector(".toolGremlinMenuClose").addEventListener("click", () => {
        document.getElementById("toolGremlinMenu").classList.add("opacityHide")

        setTimeout(() => {
            document.getElementById("toolGremlinMenu").hideElement()
            document.getElementById("toolGremlinMenu").classList.remove("opacityHide")
        }, 350)
    })
})

function toolSearch () {
    document.getElementById("toolSearchMenu").showElement()

    document.getElementById("toolmenu").classList.add("toolmenuRemove")

    setTimeout(() => {
        document.getElementById("toolmenu").hideElement()
        document.getElementById("toolmenu").classList.remove("toolmenuRemove")
    }, 350)
}

function toolMode () {
    document.getElementById("toolModeMenu").showElement()

    document.getElementById("toolmenu").classList.add("toolmenuRemove")

    setTimeout(() => {
        document.getElementById("toolmenu").hideElement()
        document.getElementById("toolmenu").classList.remove("toolmenuRemove")
    }, 350)
}

function toolGremlin () {
    document.getElementById("toolGremlinMenu").showElement()

    document.getElementById("toolmenu").classList.add("toolmenuRemove")

    setTimeout(() => {
        document.getElementById("toolmenu").hideElement()
        document.getElementById("toolmenu").classList.remove("toolmenuRemove")
    }, 350)
}

function toolRemoveAll () {
    clearStats()

    document.getElementById("toolmenu").classList.add("toolmenuRemove")

    setTimeout(() => {
        document.getElementById("toolmenu").hideElement()
        document.getElementById("toolmenu").classList.remove("toolmenuRemove")
    }, 350)
}

function toolResfreshAll () {
    loadCachedPlayers()

    document.getElementById("toolmenu").classList.add("toolmenuRemove")

    setTimeout(() => {
        document.getElementById("toolmenu").hideElement()
        document.getElementById("toolmenu").classList.remove("toolmenuRemove")
    }, 350)
}

function overlaySearchPlayer () {
    let username = document.getElementById("overlaySearcherInput").value

    loadStats(username)

    document.getElementById("toolSearchMenu").classList.add("opacityHide")
    document.getElementById("overlaySearcherInput").value = ""

    setTimeout(() => {
        document.getElementById("toolSearchMenu").hideElement()
        document.getElementById("toolSearchMenu").classList.remove("opacityHide")
    }, 350)
}

Element.prototype.hideElement = function () {
    return this.classList.add("force-hidden")
}

Element.prototype.showElement = function () {
    return this.classList.remove("force-hidden")
}

Element.prototype.isHidden = function() {
    return this.classList.contains("force-hidden") ? true : false
}