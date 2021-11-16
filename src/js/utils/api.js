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

        const json = await response.json()

        return {"response": json.id, "statusCode": response.status}
    }
}

module.exports = {
    Mojang: Mojang
}