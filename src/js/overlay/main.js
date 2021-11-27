const LogReader = require('../js/main/logReader.js')
const { getStats } = require('../js/overlay/overlayBlitzStats.js')

let searchedPlayers = []

window.addEventListener("load", () => {
    const logPath = localStorage.read("logPath") ?? ""
    const logReader = new LogReader(logPath)

    logReader.on("change_server", () => clearStats())

    logReader.on("leave", username => removePlayer(username))
    
    logReader.on("join", username => loadStats(username))

    logReader.on("players", players => {
        let filterdPlayers = players.filter(x => !searchedPlayers.includes(x))

        filterdPlayers.forEach(player => loadStats(player))
    })

    // loadStats("toxicial")
    // loadStats("qu3n")
    // loadStats("TheBadAndLucky")
})

async function loadStats (username) {
    let stats = await getStats(username)

    searchedPlayers.push(username)

    tableConstructor(stats, username)
}

function clearStats () {
    searchedPlayers = []

    let tr = document.querySelectorAll(".overlayTable tr:not(:first-child)")
    tr.forEach(element => element.remove())
}

function removePlayer (username) {
    let index = searchedPlayers.indexOf(username) == -1 ? Infinity : searchedPlayers.indexOf(username)

    searchedPlayers.splice(index, 1)

    document.getElementById(`user-${username}`).remove()
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
