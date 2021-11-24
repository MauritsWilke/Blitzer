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

            createHighlightCard()
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
    
    submitButton.addEventListener("click", async () => {
        let input = document.getElementById("highlightPromtInput").value

        body.innerHTML = ""

        let response = await Mojang.getMojang(input)

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

        localStorage.write("highlightedPlayers", players)
        
        createHighlightCard()
    })
}