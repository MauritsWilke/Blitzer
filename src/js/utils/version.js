const { default: fetch } = require("node-fetch")

module.exports = {
    appVersion
}


/**
 * @returns - the version of the app
 * 1.0.0
 */
async function appVersion () {
    const data = await fetch('https://github.com/toxicial/blitzer/releases/latest')

    return data.url.replace("https://github.com/toxicial/blitzer/releases/tag/v", "")
}