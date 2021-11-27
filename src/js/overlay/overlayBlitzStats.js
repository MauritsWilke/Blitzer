const tags = require('../utils/json/tags.json')

module.exports = {
    getStats
}

async function getStats (username) {
    let player = await getData(username)

    if (player == "nicked") return {"tags": tags["nicked"], "head": "../../assets/overlayIcons/nicked.png", "name": `§4${username}`}
    if (player == "invalid") return {"name": "§cInvalid API"}

    let stats = {}

    stats = {"name": username, "wins": player?.stats?.HungerGames?.wins || 0, "head": `https://crafatar.com/avatars/${player.uuid}?size=64.png`}

    return stats
}

async function getData (username) {
    let uuid = await Mojang.getUUID(username)
    let key = localStorage.read("api")

    if (uuid == undefined) return "nicked"

    let data = await Hypixel.getPlayer(key, uuid)

    if (JSON.stringify(data) == '{}') return "invalid"

    return data.player
}