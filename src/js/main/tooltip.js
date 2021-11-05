const tippy = require('tippy.js').default

window.addEventListener("load", () => {

    tippy('.generalCompBox span', {
        animation: "shift-away",
        theme: 'blitzer',
    })

    tippy('#tip', {
        animation: "shift-away",
        theme: 'blitzer',
    })

})