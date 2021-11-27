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

    loadStats("toxicial")
    loadStats("qu3n")
    loadStats("minimumwagework")
    loadStats("wqfle")
    
})

async function loadStats (username) {
    let stats = await getStats(username)

    searchedPlayers.push(username)
    cachedStats.push(stats)
    
    sortPlayers("wins", "up")

    // console.log(cachedStats)

    tableConstructor(stats, username)
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

    document.getElementById(`user-${username}`) == null ? null : document.getElementById(`user-${username}`).remove()
}

function sortPlayers (type, upordown) {
    let tr = document.querySelectorAll(".overlayTable tr:not(:first-child)")
    tr.forEach(element => element.remove())

    cachedStats.sort((a, b) => {
        if (upordown == "up") {
            return a[type] - b[type]
        }
        else if (upordown == "down") {
            return b[type] - a[type]
        }
    })

    cachedStats.forEach(stats => {
        console.log(stats)
        tableConstructor(stats, stats.name)
    })
}

function loadCachedPlayers () {
    let tr = document.querySelectorAll(".overlayTable tr:not(:first-child)")
    tr.forEach(element => element.remove())

    searchedPlayers.forEach(async player => {
        let stats = await getStats(player)
    
        tableConstructor(stats, player)
    })
}

function tableConstructor (stats, username) {
    let body = document.querySelector(".overlayTable")
    let headingTable = document.querySelectorAll("#overlayHeading th")
    let element = document.createElement("tr")

    let cells = ""

    headingTable.forEach(cell => {
        let text = cell.innerText.toLowerCase()

        if (text == "head") {
            cells += `<td><img src=${stats[text]}></td>`
        }

        else {
            cells += `<td>${mcParse(stats[text]) ?? ""}</td>`
        }
    })

    element.innerHTML = cells
    element.id = `user-${username}`
    
    body.append(element)
}
