const colors = require('./json/mcColors.json')
const hexToHsl = require('hex-to-hsl')


/**
 * Converts hex to hsl
 * @param {string} hex - the hex that will be converted
 * @returns {string} returns the hsl
 */
function hexToHSL (hex) {
    let rawHsl = hexToHsl(hex)

    return `hsl(${rawHsl[0]}, ${rawHsl[1]}%, ${rawHsl[2]}%)`
}

/**
 * Converts hsl to a darker shadow
 * @param {string} hsl - the hsl to get darker shadow
 * @returns darker shadow of given hsl 
 */
function getShadow (hsl) {
    let shadow = hsl.replace("hsl(", "").replace(")", "").replace(/%/g, "")
    shadow = shadow.split(",")

    shadow[2] = 10
    return shadow = `hsl(${shadow[0]}, ${shadow[1]}%, ${shadow[2]}%)`
}


/**
 * Parses minecraft color code to colored text
 * @param {string} string - the text that will be parsed
 * @returns {string} returns parsed text
 */
 function mcParse (string) {
    let text = (string ?? "").toString()

    if (!text.includes("§")) return text

    let splitText = text.split("§").slice(1)

    let final = ""

    splitText.forEach(parts => {
        let color = ""

        if (parts[0] == "#" && parts[1] == "#") {
            let hex = `#${parts[2]}${parts[3]}${parts[4]}${parts[5]}${parts[6]}${parts[7]}`

            parts = parts.replace(`${hex}`, "");
            color = hexToHSL(hex)

        } else color = colors[parts[0]].hsl || ""

        let shadow = getShadow(color)

        final += `<span style="color: ${color}; text-shadow: 2px 2px ${shadow};">${parts.split("").slice(1).join("")}</span>`
    })

    return final
}

module.exports = {
    mcParse: mcParse
}