const LogReader = require('../js/main/logReader.js')
const { getStats } = require('../js/overlay/overlayBlitzStats.js')

let gremlin = new Map()
let searchedPlayers = []
let cachedStats = []

window.addEventListener("load", () => {
    const logPath = localStorage.read("logPath") ?? ""
    const logReader = new LogReader(logPath)

    logReader.on("join", username => loadStats(username))

    logReader.on("server_change", () => clearStats(), gremlinClear())

    logReader.on("api", key => setApi(key))

    logReader.on("leave", username => {removePlayer(username), gremlinRemove(username)})

    logReader.on("death", username => {removePlayer(username), gremlinRemove(username)})

    logReader.on("kill", username => gremlinAdd(username))

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
    // loadStats("TheBadAndLucky")
    // loadStats("Smliey")
    // loadStats("sam_play02")
    // loadStats("oeas")
    // loadStats("allowitman")
    // loadStats("deiondivine")
    // loadStats("quig")
    // loadStats("hypixel")

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

function refreshPlayer (username) {
    removePlayer(username)
    loadStats(username)
}

function gremlinClear() {
    gremlin.clear()
    gremlinLoader()
}

async function gremlinAdd(username) {
    if (gremlin.has(username)) gremlin.set(username, {"name": gremlin.get(username).name, "displayname": username, "head": gremlin.get(username).head, "kills": gremlin.get(username).kills + 1})

    else {
        let stats = await getStats(username) ?? username

        console.log(stats)

        gremlin.set(username, {"name": stats.name, "displayname": username, "head": stats.head, "kills": 1})
    }

    console.log(gremlin)

    gremlinSort()
}

function gremlinRemove(username) {
    gremlin.delete(username), gremlinSort()
}

function gremlinSort() {
    gremlin = new Map([...gremlin.entries()].sort((a, b) => {
        return b[1].kills - a[1].kills
    }))

    gremlinLoader()
}

function gremlinLoader() {
    let table = document.querySelector(".gremlinTable")
    table.innerHTML = ""

    let i = 1
    gremlin.forEach((player, index) => {
        let element = document.createElement("tr")

        element.innerHTML = `<td>${i++}.</td><td><img src=${player.head}></td><td>${mcParse(player.name)}</td><td>-</td><td>${player.kills}</td>`
        element.classList = "gremlinTableRow"

        table.append(element)
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
    menu.setAttribute("data-option-uuid", stats.uuid)

    menu.innerHTML = `
    <div class="playerOptionsMenuText">
        <a><img src="../../assets/overlayIcons/refreshPlayer.png"><span>Refresh Player</span></a>
        <a><img src="../../assets/overlayIcons/removePlayer.png"><span>Remove Player</span></a>
        <a><img src="../../assets/overlayIcons/highlightPlayer.png"><span>Highlight Player</span></a>
        <a><img src="../../assets/overlayIcons/toolSearch.png"><span>Stat Search Player</span></a>
    </div>
    `

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
        if (document.querySelector(`#user-${username} .rowOption`) ? !document.querySelector(`#user-${username} .rowOption`).contains(event.target) : null) {
            document.getElementById(`menu-${username}`).classList.add("opacityHide")

            setTimeout(() => {
                document.getElementById(`menu-${username}`).hideElement()
                document.getElementById(`menu-${username}`).classList.remove("opacityHide")
            }, 350)
        }
    })

    document.querySelector(`#menu-${username} .playerOptionsMenuText`).addEventListener("click", async event => {
        let target = event.target.innerHTML
        let player = document.querySelector(`#menu-${username}`).getAttribute("data-option-username")
        let uuid = document.querySelector(`#menu-${username}`).getAttribute("data-option-uuid")

        if (target.includes("Remove Player")) {
            removePlayer(player)
        }

        if (target.includes("Refresh Player")) {
            refreshPlayer(player)
        }

        if (target.includes("Highlight Player")) {
            let element = document.getElementById(`user-${player}`)

            if (!element.style.backgroundColor) {
                element.style.backgroundColor = "hsl(61deg 100% 59% / 75%)"

                addHighlight(player)
            }
            else {
                element.style.backgroundColor = ""

                removeHighlight(uuid)
            }
        }
    })
}
