const defaultValue = require('../js/utils/json/defaultTable.json')

// loop to create the selectors
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

// saves localstorage data if never loaded before
window.addEventListener("load", () => {
    let selectors = document.querySelectorAll(".tableSelector input")

    let customTable = []

    selectors.forEach(selector => {
        let id = selector.id
        let value = selector.value

        customTable.push({"id": id, "value": value})
    })

    localStorage.read("customTable") ?? localStorage.write("customTable", customTable)

})

// saves new table data
window.addEventListener("load", () => {
    let selectors = document.querySelectorAll(".tableSelector-content a")

    selectors.forEach(selector => {

        selector.addEventListener("click", e => {
            let table = localStorage.read("customTable")

            let id = e.path[2].children[1].id
            let newValue = e.srcElement.innerHTML
            let index = +id.replace(/\D/g, '')

            let input = document.getElementById(id)

            input.value = newValue
            
            table[index-1] = {"id": id, "value": newValue}

            localStorage.write("customTable", table)
        })
    })
})

// loads the saved data into the selectors
window.addEventListener("load", () => {
    localStorage.read("customTable").forEach(item => {
        let id = item.id
        let value = item.value

        let input = document.getElementById(id)

        input.value = value
    })
})