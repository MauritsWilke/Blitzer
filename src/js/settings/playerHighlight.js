const toastify = require('toastify-js')
const api = require('../js/utils/api')

const Mojang = new api.Mojang()
const Hypixel = new api.Hypixel()

window.addEventListener("load", () => {
    let button = document.querySelector(".playerHighlightButton")

    createHighlightCard()

    button.addEventListener("click", async () => {
        highlightPromt()
    })
})

function createHighlightCard () {
    let players = localStorage.read("highlightedPlayers") ?? []

    let html = ""

    players.forEach((player, index) => {
        let head = player.head
        let ign = player.ign

        html += `
        <div class="playerHighlightCard">
            <img src="${head}">
            <span>${ign}</span>
            <a style="display:none;">${index}</a>
            <button class="playerHighlightCardButton">&#10005</button>
        </div>
        `
    })

    document.getElementById("playerHighlight").innerHTML = html

    let buttons = document.querySelectorAll(".playerHighlightCardButton")

    buttons.forEach(button => {
        button.addEventListener("click", e => {
            let index = e.path[1].childNodes[5].innerText
            
            let players = localStorage.read("highlightedPlayers")

            if (index == 0 && !players[1]) return localStorage.remove("highlightedPlayers"), createHighlightCard()
            
            players.splice(index, 1)

            localStorage.write("highlightedPlayers", players)

            createHighlightCard(), loadCachedPlayers()
        })
    })
}

function highlightPromt () {
    let body = document.querySelector(".highlightBodyPromt")

    let html = `
        <div class="highlightPromt">
            <div class="highlightPromtInputDiv">
				<fieldset>
						<legend>Players IGN</legend>
						<input id="highlightPromtInput" type="text" spellcheck="false" maxLength="16">
				</fieldset>
			</div>

            <div class="highlightPromtButtons">
                <button class="highlightPromtCancel">Cancel</button>
                <button class="highlightPromtSubmit">Confirm</button>
            </div>
        </div>
    `

    body.innerHTML = html

    let cancelButton = document.querySelector(".highlightPromtCancel")
    let submitButton = document.querySelector(".highlightPromtSubmit")
    let inputBar = document.getElementById("highlightPromtInput")

    cancelButton.addEventListener("click", () => {
        body.innerHTML = ""
    })

    inputBar.addEventListener("keypress", e => {
        if (e.key == "Enter") return submitButton.click()
    })
    
    submitButton.addEventListener("click", () => {
        let input = document.getElementById("highlightPromtInput").value

        body.innerHTML = ""

        addHighlight(input), loadCachedPlayers()
    })
}

function removeHighlight (uuid) {
    let players = localStorage.read("highlightedPlayers") ?? []

    players.forEach(user => {
        if (user.uuid == uuid) {
            let index = players.indexOf(user)

            if (index == 0 && !players[1]) players.splice(0, 0)

            players.splice(index, 1)
        }
    })

    if (players.length == 0) return localStorage.remove("highlightedPlayers"), createHighlightCard()

    localStorage.write("highlightedPlayers", players), createHighlightCard()
}

async function addHighlight (player) {
    let response = await Mojang.getMojang(player)

    if (JSON.stringify(response) === '{}') {
        return toastify({
            text: "This player does not exist",
            duration: 3000,
            className: "toast warning",
            position: "left",
            gravity: "bottom",
            stopOnFocus: true,
          }).showToast()
    }

    let players = localStorage.read("highlightedPlayers") ?? []

    let stat = false

    players.forEach(player => {
        if (player.uuid == response.id) return stat = true
    })

    if (stat == false) players.push({"uuid": response.id, "ign": response.name, "head": `https://crafatar.com/avatars/${response.id}?size=64.png`})

    if (stat == true) {
        toastify({
            text: "This player is already highlighted",
            duration: 3000,
            className: "toast warning",
            position: "left",
            gravity: "bottom",
            stopOnFocus: true,
          }).showToast()
    }

    if (players.length == 0) return

    localStorage.write("highlightedPlayers", players), createHighlightCard()
}