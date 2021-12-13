module.exports = {
    createPopoverEvent
}

function createPopoverEvent (options) {
    if (!options) return

    let instance = {
        "menu": options.menu || "",
        "button": options.button || "",
        "closeButton": options.closeButton || "",
        "classAnimation": options.classAnimation  || "",
        "removeDelay": options.removeDelay || 0
    }

    if (instance.closeButton) {
        document.querySelector(instance.closeButton).addEventListener("click", () => {
            document.querySelector(instance.menu).classList.add(instance.classAnimation)

            setTimeout(() => {
                document.querySelector(instance.menu).hideElement()
                document.querySelector(instance.menu).classList.remove(instance.classAnimation)
            }, instance.removeDelay)
        })
    }

    if (instance.button) {
        document.addEventListener("click", event => {
            if (!document.querySelector(instance.menu).contains(event.target) && document.querySelector(instance.button) ? !document.querySelector(instance.button).contains(event.target) : null) {
                document.querySelector(instance.menu).classList.add(instance.classAnimation)

                setTimeout(() => {
                    document.querySelector(instance.menu).hideElement()
                    document.querySelector(instance.menu).classList.remove(instance.classAnimation)
                }, 350)
            }
        })
    }

    if (!instance.button) {
        document.addEventListener("click", event => {
            if (!document.querySelector(instance.menu).contains(event.target)) {
                document.querySelector(instance.menu).classList.add(instance.classAnimation)

                setTimeout(() => {
                    document.querySelector(instance.menu).hideElement()
                    document.querySelector(instance.menu).classList.remove(instance.classAnimation)
                }, 350)
            }
        })
    }
}