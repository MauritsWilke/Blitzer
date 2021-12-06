const LogReader = require('../js/main/logReader.js')
const { getStats } = require('../js/overlay/overlayBlitzStats.js')

let searchedPlayers = []
let cachedStats = []

window.addEventListener("load", () => {
    const logPath = localStorage.read("logPath") ?? ""
    const logReader = new LogReader(logPath)

    logReader.on("server_change", () => clearStats())

    logReader.on("leave", username => removePlayer(username))
    
    logReader.on("join", username => loadStats(username))

    logReader.on("death", username => removePlayer(username))

    logReader.on("players", players => {
        let filterdPlayers = players.filter(x => !searchedPlayers.includes(x))

        filterdPlayers.forEach(player => loadStats(player))
    })

    // setTimeout(() => {
    //     loadStats("toxicial")
    // }, 4000)

    // setTimeout(() => {
    //     loadStats("qu3n")
    // }, 3000)

    // setTimeout(() => {
    //     loadStats("TheBadAndLucky")
    // }, 2500)

    // setTimeout(() => {
    //     loadStats("wqfle")
    // }, 1000)

    // setTimeout(() => {
    //     loadStats("minimumwagework")
    // }, 3000)

    loadStats("qu3n")
    loadStats("minimumwagework")
    loadStats("wqfle")
    loadStats("toxicial")
    loadStats("TheBadAndLucky")
    loadStats("Smliey")
    loadStats("sam_play02")
    loadStats("oeas")
    loadStats("allowitman")
    loadStats("deiondivine")
    loadStats("quig")
    loadStats("hypixel")

    overlayTableSorter ()
})

async function loadStats (username) {
    if (document.getElementById(`user-${username}`)) return

    let stats = await getStats(username)

    searchedPlayers.push(username)
    cachedStats.push(stats)

    let sortBy = localStorage.read("tableOrder")
    
    sortPlayers(sortBy.type, sortBy.order)
}

function clearStats () {
    searchedPlayers = []
    cachedStats = []

    let tr = document.querySelectorAll(".overlayTable tr:not(:first-child)")
    tr.forEach(element => element.remove())
}

function removePlayer (username) {
    let index = searchedPlayers.indexOf(username) == -1 ? Infinity : searchedPlayers.indexOf(username)

    searchedPlayers.splice(index, 1)

    cachedStats.forEach((stats, i) => {
        if (stats.username == username) {
            cachedStats.splice(i, 1)
        }
    })

    document.getElementById(`user-${username}`) == null ? null : document.getElementById(`user-${username}`).remove()
    document.getElementById(`menu-${username}`) == null ? null : document.getElementById(`menu-${username}`).remove()
}

function sortPlayers (type, upordown) {
    let tr = document.querySelectorAll(".overlayTable tr:not(:first-child)")
    tr.forEach(element => element.remove())

    cachedStats.sort((a, b) => {
        if (upordown == "up") {
            return (a[type] ?? Infinity) - (b[type] ?? Infinity)
        }
        else if (upordown == "down") {
            return (b[type] ?? Infinity) - (a[type] ?? Infinity)
        }
    })

    cachedStats.forEach(stats => {
        tableConstructor(stats, stats.username)
    })
}

function loadCachedPlayers () {
    let tr = document.querySelectorAll(".overlayTable tr:not(:first-child)")
    tr.forEach(element => element.remove())

    cachedStats.forEach(async player => {
        let stats = await getStats(player.username)

        removePlayer(player.username)

        searchedPlayers.push(player.username)
        cachedStats.push(stats)

        let sortBy = localStorage.read("tableOrder")
    
        sortPlayers(sortBy.type, sortBy.order)
    })
}

function tableConstructor (stats, username) {
    let body = document.querySelector(".overlayTable")
    let headingTable = document.querySelectorAll("#overlayHeading th")
    let element = document.createElement("tr")
    let menu = document.createElement("div")
    let highlight = localStorage.read("highlightedPlayers") ?? []

    if (document.getElementById(`user-${username}`)) return

    let cells = ""

    headingTable.forEach(cell => {
        let text = cell.innerText.toLowerCase()

        if (text == "head") {
            cells += `<td><img src=${stats[text]}></td>`
        }

        else if (!["head", "name", "kit", ""].includes(text)) {
            cells += `<td>${mcParse(!Number.isInteger(stats[text]) ? stats.color == undefined ? "" : stats.color + stats[text] : stats.color + stats[text].toLocaleString()) ?? ""}</td>`
        }

        else {
            cells += `<td>${mcParse(stats[text]) ?? ""}</td>`
        }
    })

    cells += `<td class="rowOption"><span>...</span></td>`

    element.innerHTML = cells
    element.id = `user-${username}`

    highlight.forEach(player => {
        if (player.uuid == stats.uuid) {
            element.style.backgroundColor = "hsl(61deg 100% 59% / 75%)"
        }
    })
    
    body.append(element)

    if (document.getElementById(`menu-${username}`)) document.getElementById(`menu-${username}`).remove()

    menu.classList = "playerOptionsMenu force-hidden"
    menu.id = `menu-${username}`
    menu.setAttribute("data-option-username", username)

    body.append(menu)
    

    document.querySelector(`#user-${username} .rowOption`).addEventListener("click", event => {
        let menuButton = document.getElementById(`menu-${username}`)
        
        if (menuButton.isHidden()) menuButton.showElement()
        else {
            document.getElementById(`menu-${username}`).classList.add("opacityHide")

            setTimeout(() => {
                document.getElementById(`menu-${username}`).hideElement()
                document.getElementById(`menu-${username}`).classList.remove("opacityHide")
            }, 350)
        }
    })

    document.addEventListener("click", event => {
        if (!document.querySelector(`#user-${username} .rowOption`).contains(event.target) && document.getElementById(`menu-${username}`) ? !document.getElementById(`menu-${username}`).contains(event.target) : null) {
            document.getElementById(`menu-${username}`).classList.add("opacityHide")

            setTimeout(() => {
                document.getElementById(`menu-${username}`).hideElement()
                document.getElementById(`menu-${username}`).classList.remove("opacityHide")
            }, 350)
        }
    })
}
