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

    cancelButton.addEventListener("click", () => {
        body.innerHTML = ""
    })

    submitButton.addEventListener("click", () => {
        let input = document.getElementById("highlightPromtInput").value

        body.innerHTML = ""

        let players = localStorage.read("highlightedPlayers") ?? []

        let stat = false

        players.forEach(player => {
            if (player.uuid == input) return stat = true
        })

        if (stat == false) players.push({"uuid": input, "ign": input, "head": input})

        localStorage.write("highlightedPlayers", players)
    })
}