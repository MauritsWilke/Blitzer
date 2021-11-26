const LogReader = require('../js/main/logReader.js')
const { getStats } = require('../js/overlay/overlayBlitzStats.js')

window.addEventListener("load", () => {
    const logPath = localStorage.read("logPath") ?? ""
    const logReader = new LogReader(logPath)
    
    logReader.on("join", username => loadStats(username))

    loadStats("toxicial")
})

async function loadStats (username) {
    let stats = await getStats(username)

    console.log(stats)
}