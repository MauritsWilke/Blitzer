const tags = require('../utils/json/tags.json')
const rankColor = require('../utils/json/rankColors.json')
const blitzKits = require('../utils/json/blitzKits.json')
const blitzLevel = require('../utils/json/blitzLevel.json')
const tempData = require('../utils/json/tempOfflineData.json').player


module.exports = {
    getStats
}

async function getStats (username) {
    let player = await getData(username)
    // let player = tempData
    let mode = localStorage.read("statMode") == "Solos" ? "solo" : localStorage.read("statMode") == "Teams" ? "teams" : "overall"

    if (player == "nicked") return {"tags": tags["nicked"], "head": "../../assets/overlayIcons/nicked.png", "username": username, "name": `§4${username}`}
    if (player == "invalid") return {"name": "§cInvalid API"}

    let stats = {}

    let ign = username
    let uuid = player.uuid
    let head = `https://crafatar.com/avatars/${player.uuid}?size=64.png`
    let name = localStorage.read("rankTag") == "disabled" ? await getFormattedRank(player, false) : await getFormattedRank(player, true)
    let kit = player?.stats?.HungerGames?.defaultkit || "Knight"
    let overallWins = (player?.stats?.HungerGames?.wins_solo_normal || 0) + (player?.stats?.HungerGames?.wins_teams_normal || 0)
    let wins = mode == "overall" ? (player?.stats?.HungerGames?.wins_solo_normal || 0) + (player?.stats?.HungerGames?.wins_teams_normal || 0) : player?.stats?.HungerGames?.[`wins_${mode}_normal`] || 0
    let kills = mode == "overall" ? player?.stats?.HungerGames?.kills || 0 : player?.stats?.HungerGames?.[`kills_${mode}_normal`] || 0
    let deaths = player.stats.HungerGames.deaths || 0
    let losses = (player?.stats?.HungerGames?.games_played || 0) - overallWins
    let games = player?.stats?.HungerGames?.games_played || 0
    let wlr = (overallWins / losses).toFixed()
    let kdr = ((player?.stats?.HungerGames?.kills || 0) / (player.stats.HungerGames.deaths || 0)).toFixed(2)
    let kg = ((player?.stats?.HungerGames?.kills || 0) / (player?.stats?.HungerGames?.games_played || 1)).toFixed(2)
    let level = ((Math.sqrt(player.networkExp + 15312.5) - 125/Math.sqrt(2))/(25*Math.sqrt(2))).toFixed(0)
    let xs = amountOfXKits(player)

    stats = {
        "username": ign,
        "uuid": uuid,
        "head": head,
        "name": name,
        "kit": kit,
        "x's": +xs,
        "games": +games,
        "wins": +wins,
        "losses": +losses,
        "kills": +kills,
        "deaths": +deaths,
        "level": +isNaN(level) == true ? 0 : level,
        "wlr": +isNaN(wlr) == true ? 0 : wlr,
        "kdr": +isNaN(kdr) == true ? 0 : kdr,
        "k/g": +isNaN(kg) == true ? 0 : kg,
        "color": getIndexColor(+isNaN(kg) == true ? 0 : kg)
    }

    console.log(stats)

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

    let ranks = { 'MVP+': `§b[MVP${color}+§b]`, 'MVP++': `§6[MVP${color}++§6]`, 'MVP': '§b[MVP]', 'VIP+': `§a[VIP§6+§a]`, 'VIP': `§a[VIP]`, 'YOUTUBER': `§c[§fYOUTUBE§c]`, 'PIG+++': `§d[PIG${color}+++§d]`, 'HELPER': `§9[HELPER]`, 'MOD': `§2[MOD]`, 'ADMIN': `§c[ADMIN]`, 'OWNER': `§c[OWNER]`, 'SLOTH': `§c[SLOTH]`, 'ANGUS': `§c[ANGUS]`, 'APPLE': '§6[APPLE]', 'MOJANG': `§6[MOJANG]`, 'BUILD TEAM': `§3[BUILD TEAM]`, 'EVENTS': `§6[EVENTS]` }[rank]
    let normal = { "NON": `§7${player.displayname}`, "MVP+": `§b${player.displayname}`, "MVP++": `§6${player.displayname}`, "MVP": `§b${player.displayname}`, "VIP+": `§a${player.displayname}`, "VIP": `§a${player.displayname}`, "YOUTUBER": `§c${player.displayname}`, "PIG+++": `§d${player.displayname}`, "HELPER": `§9${player.displayname}`, "MOD": `§2${player.displayname}]`, "ADMIN": `§c${player.displayname}`, "OWNER": `§c${player.displayname}`, "SLOTH": `§c${player.displayname}`, "ANGUS": `§c${player.displayname}`, "APPLE": `§6${player.displayname}`, "MOJANG": `§6${player.displayname}`, "BUILD TEAM": `§3${player.displayname}`, "EVENTS": `§6${player.displayname}` }[rank]

    return display == true ? `${ranks} ${normal}` : normal
}

/**
 * Retrieves the level from a exp based blitz kit
 * @param {string} kit - the exp based kit
 * @param {string} player - the players json data
 * @returns {interger} - returns the level of the kit
 * // Returns "9"
 */
 function expKitLevel(kit, player) {
    let exp = player?.stats?.HungerGames?.[kit] || 0
    

    for (var key in blitzLevel) {
        if (exp < blitzLevel[key]) break
    }
        return key
}

/**
 * Retrieves the level from any blitz kit
 * @param {string} kit - any kit
 * @param {string} player - the players json data
 * @returns {interger} - returns the level of the kit
 * // Returns "9"
 */
function blitzKitLevel(kit, player) {
    let data = player?.stats?.HungerGames ?? {}

    let basicKits = ['archer','meatmaster','speleologist','baker','knight','guardian','scout','hunter','hype train','fisherman','armorer']
    let expKits = ['donkeytamer', 'warrior', 'ranger', 'phoenix']
    

    if (`p${kit}` in data) return data[`p${kit}`] === 1 ? `✫` : `✫✫`
    else if (kit in data) return data[kit] + 1
    else if (basicKits.includes(kit)) return 1
    else if (expKits.includes(kit)) return expKitLevel(`exp_${kit}`, player)
    else return 0
}

/**
 * Returns the amount of level x's a player has
 * @param {json} player - the players json data
 * @returns {interger} - returns the amount of x's
 * // Returns "22"
 */
function amountOfXKits (player) {
    let map = new Map()

    for (kit in blitzKits) {
        let level = blitzKitLevel(kit, player).toString()

        if (level == "10") {
            map.set(kit)
        }
    }

    return map.size
}

function getIndexColor (kg) {
    let table = localStorage.read("index_color")

    kg = +kg

    for (let key of table) {
        if (key.rating >= kg) {
            return `§#${key.color}`
        }        
    }

    if (table[table.length - 1].rating <= kg) return `§#${table[table.length - 1].color}`
}

