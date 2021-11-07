const defaultValue = require('../js/utils/json/defaultTable.json')

window.addEventListener("load", () => {

    function createSelector (number, value) {

        let html = `
        <div class="tableSelector">
            <fieldset>
                <legend>Cloumn ${number}</legend>
                <input id="CloumnInput${number}" disabled type="text" spellcheck="false" value="${value}">
                <div class="tableSelector-content">
                    <a>Tag</a>
                    <a>Head</a>
                    <a>Name</a>
                    <a></a>
                    <a></a>
                    <a></a>
                    <a></a>
                    <a></a>
                    <a></a>
                    <a></a>
                    <a></a>
                    <a></a>
                </div>
            </fieldset>
        </div>`

        return html
    }

    for (let i = 1; i < 9; i++) {
        let value = defaultValue[i]

        let html = createSelector(i, value)
        let body = document.getElementById("tableEditorBody")

        body.innerHTML += html


    }
})