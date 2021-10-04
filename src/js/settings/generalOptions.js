window.addEventListener("load", () => {
    let boxs = document.querySelectorAll(".generalCompBoxImg")

    boxs.forEach(box => {
        box.addEventListener("click", e => {
            let id = e.target.id
            let chosen = e.target.attributes[1].nodeValue

            console.log(e)

            if (id == "guildTag") {
                if (chosen == "false") box.src = "../../assets/settingIcons/guild_icon_green.png", document.getElementById(id).setAttribute("chosen", true)
                else box.src = "../../assets/settingIcons/guild_icon.png", document.getElementById(id).setAttribute("chosen", false)
            }
            if (id == "partyStats") {
                if (chosen == "false") box.src = "../../assets/settingIcons/party_icon_green.png", document.getElementById(id).setAttribute("chosen", true)
                else box.src = "../../assets/settingIcons/party_icon.png", document.getElementById(id).setAttribute("chosen", false)
            }
            if (id == "autoFw") {
                if (chosen == "false") box.src = "../../assets/settingIcons/autoFw_icon_green.png", document.getElementById(id).setAttribute("chosen", true)
                else box.src = "../../assets/settingIcons/autoFw_icon.png", document.getElementById(id).setAttribute("chosen", false)
            }
            if (id == "autoClear") {
                if (chosen == "false") box.src = "../../assets/settingIcons/clearOverlay_icon_green.png", document.getElementById(id).setAttribute("chosen", true)
                else box.src = "../../assets/settingIcons/clearOverlay_icon.png", document.getElementById(id).setAttribute("chosen", false)
            }
            if (id == "keybindShow") {
                if (chosen == "false") box.src = "../../assets/settingIcons/keybindShow_icon_green.png", document.getElementById(id).setAttribute("chosen", true)
                else box.src = "../../assets/settingIcons/keybindShow_icon.png", document.getElementById(id).setAttribute("chosen", false)
            }
            if (id == "saveWindow") {
                if (chosen == "false") box.src = "../../assets/settingIcons/saveWindow_icon_green.png", document.getElementById(id).setAttribute("chosen", true)
                else box.src = "../../assets/settingIcons/saveWindow_icon.png", document.getElementById(id).setAttribute("chosen", false)
            }
        })
    })
})