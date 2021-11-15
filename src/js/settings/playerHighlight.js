window.addEventListener("load", () => {
    let button = document.querySelector(".playerHighlightButton")

    button.addEventListener("click", async () => {
        let player = await highlightPromt()

        console.log(player)
    })
})

// function createCard () => {

// }

function highlightPromt () {
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

    document.querySelector(".highlightBodyPromt").innerHTML = html
}