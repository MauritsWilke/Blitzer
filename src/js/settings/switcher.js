const { appVersion } = require('../js/utils/version')

window.addEventListener("load", async () => {
    let versionTitle = document.querySelector(".versionTitle")
    let settingBodys = document.querySelectorAll(".setting-body")
    let settingButtons = document.querySelectorAll(".setting-button")

    let generalButton = document.getElementById("general-button")
    let appearanceButton = document.getElementById("appearance-button")
    let indexColorButton = document.getElementById("indexColor-button")
    let tableEditorButton = document.getElementById("tableEditor-button")
    let playerHighlightButton = document.getElementById("playerHighlight-button")

    let generalSetting = document.querySelector(".general-setting")
    let appearanceSetting = document.querySelector(".appearance-setting")
    let indexColorSetting = document.querySelector(".indexColor-setting")
    let tableEditorSetting = document.querySelector(".tableEditor-setting")
    let playerHighlightSetting = document.querySelector(".playerHighlight-setting")

    generalButton.addEventListener("click", () => {
        settingBodys.forEach(body => body.classList.add("hidden"))
        settingButtons.forEach(button => button.classList.remove("span-selected"))

        generalSetting.classList.toggle("hidden")
        generalButton.classList.toggle("span-selected")
    })

    appearanceButton.addEventListener("click", () => {
        settingBodys.forEach(body => body.classList.add("hidden"))
        settingButtons.forEach(button => button.classList.remove("span-selected"))

        appearanceSetting.classList.toggle("hidden")
        appearanceButton.classList.toggle("span-selected")
    })

    indexColorButton.addEventListener("click", () => {
        settingBodys.forEach(body => body.classList.add("hidden"))
        settingButtons.forEach(button => button.classList.remove("span-selected"))

        indexColorSetting.classList.toggle("hidden")
        indexColorButton.classList.toggle("span-selected")
    })

    tableEditorButton.addEventListener("click", () => {
        settingBodys.forEach(body => body.classList.add("hidden"))
        settingButtons.forEach(button => button.classList.remove("span-selected"))

        tableEditorSetting.classList.toggle("hidden")
        tableEditorButton.classList.toggle("span-selected")
    })

    playerHighlightButton.addEventListener("click", () => {
        settingBodys.forEach(body => body.classList.add("hidden"))
        settingButtons.forEach(button => button.classList.remove("span-selected"))

        playerHighlightSetting.classList.toggle("hidden")
        playerHighlightButton.classList.toggle("span-selected")
    })


    versionTitle.innerHTML = `v${await appVersion()} | © Blitzer Inc.`
})