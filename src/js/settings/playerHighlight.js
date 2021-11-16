const toastify = require('toastify-js')
const api = require('../js/utils/api')

const Mojang = new api.Mojang()

window.addEventListener("load", () => {
    let button = document.querySelector(".playerHighlightButton")

    button.addEventListener("click", async () => {
        highlightPromt()
    })
})

// function createCard () => {

// }

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

        if (!response) console.log("no response")

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
                className: "toastWarning",
                position: "left",
                gravity: "bottom",
                stopOnFocus: true,
              }).showToast();
        }

        localStorage.write("highlightedPlayers", players)
    })
}