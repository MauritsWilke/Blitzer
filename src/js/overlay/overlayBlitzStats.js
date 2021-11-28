const tags = require('../utils/json/tags.json')
const rankColor = require('../utils/json/rankColors.json')

module.exports = {
    getStats
}

async function getStats (username) {
    let player = await getData(username)

    if (player == "nicked") return {"tags": tags["nicked"], "head": "../../assets/overlayIcons/nicked.png", "username": username, "name": `§4${username}`}
    if (player == "invalid") return {"name": "§cInvalid API"}

    let stats = {}

    let ign = username
    let head = `https://crafatar.com/avatars/${player.uuid}?size=64.png`
    let name = localStorage.read("rankTag") == "disabled" ? await getFormattedRank(player, false) : await getFormattedRank(player, true)
    let wins = (player?.stats?.HungerGames?.wins_solo_normal || 0) + (player?.stats?.HungerGames?.wins_teams_normal || 0)
    let kg = ((player?.stats?.HungerGames?.kills || 0) / (player?.stats?.HungerGames?.games_played || 0)).toFixed(2)

    stats = {
        "username": ign,
        "head": head,
        "name": name,
        "wins": wins,
        "k/g": isNaN(kg) == true ? 0 : kg,
    }

    return stats
}

async function getData (username) {
    let uuid = await Mojang.getUUID(username)
    let key = localStorage.read("api")

    if (uuid == undefined) return "nicked"

    let data = await Hypixel.getPlayer(key, uuid)

    if (JSON.stringify(data) == '{}') return "invalid"
    if (!data.player) return "nicked"

    return data.player
}

function getPlayerTypeRank(player) {
	if (player.displayname == "Technoblade") return "PIG+++"
	if (player?.rank) return player.rank;
	if (player?.monthlyPackageRank == 'SUPERSTAR') return "MVP++";
	if (player?.newPackageRank) return player.newPackageRank.replace(/_/, "").replace(/PLUS/, "+");
	else return "NON"
}

function getPlusColor(player) {
    let color = player?.rankPlusColor

    if (!color) return "NON"

    return rankColor[color].mc
}

async function getFormattedRank (player, display) {
    let rank = await getPlayerTypeRank(player)
    let color = await getPlusColor(player)

    let ranks = { 'MVP+': `§b[MVP${color}+§b]`, 'MVP++': `§6[MVP${color}++§6]`, 'MVP': '§b[MVP]', 'VIP+': `§a[VIP§6+§a]`, 'VIP': `§a[VIP]`, 'YOUTUBE': `§c[§fYOUTUBE§c]`, 'PIG+++': `§d[PIG${color}+++§d]`, 'HELPER': `§9[HELPER]`, 'MOD': `§2[MOD]`, 'ADMIN': `§c[ADMIN]`, 'OWNER': `§c[OWNER]`, 'SLOTH': `§c[SLOTH]`, 'ANGUS': `§c[ANGUS]`, 'APPLE': '§6[APPLE]', 'MOJANG': `§6[MOJANG]`, 'BUILD TEAM': `§3[BUILD TEAM]`, 'EVENTS': `§6[EVENTS]` }[rank]
    let normal = { "NON": `§7${player.displayname}`, "MVP+": `§b${player.displayname}`, "MVP++": `§6${player.displayname}`, "MVP": `§b${player.displayname}`, "VIP+": `§a${player.displayname}`, "VIP": `§a${player.displayname}`, "YOUTUBE": `§c${player.displayname}`, "PIG+++": `§d${player.displayname}`, "HELPER": `§9${player.displayname}`, "MOD": `§2${player.displayname}]`, "ADMIN": `§c${player.displayname}`, "OWNER": `§c${player.displayname}`, "SLOTH": `§c${player.displayname}`, "ANGUS": `§c${player.displayname}`, "APPLE": `§6${player.displayname}`, "MOJANG": `§6${player.displayname}`, "BUILD TEAM": `§3${player.displayname}`, "EVENTS": `§6${player.displayname}` }[rank]

    return display == true ? `${ranks} ${normal}` : normal
}

