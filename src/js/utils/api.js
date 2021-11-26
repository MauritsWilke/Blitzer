const fetch = require('node-fetch')

class Mojang {
    constructor () {

    }

    /**
     * returns mojang api
     * @param {string} username - players in game name
     * @returns the given players mojang stats
     */
        async getMojang (username) {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)

        const body = await response.text()
        let json = {}

        if (response.status == 200) json = JSON.parse(body)

        return json
    }

    /**
     * converts players name to uuid
     * @param {string} username - players in game name
     * @returns the given players uuid 
     */
    async getUUID (username) {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)

        const body = await response.text()
        let json = {}

        if (response.status == 200) json = JSON.parse(body)

        return json.id
    }
}

class Hypixel {
    constructor () {

    }

    async getKeyStatus (key) {
        const response = await fetch(`https://api.hypixel.net/key?key=${key}`)

        const body = await response.text()
        let json = {}

        if (response.status == 200) json = JSON.parse(body)

        return json
    }

    async getPlayer (key, uuid) {
        const res = await fetch(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`)

        const body = await res.text()
        let json = {}

        if (res.status == 200) {
            json = JSON.parse(body)
        }

        return json
    }
}

module.exports = {
    Mojang: Mojang,
    Hypixel: Hypixel
}