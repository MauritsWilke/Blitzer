window.addEventListener("load", () => {
    let opacitySlider = document.getElementById("opacitySelector")
    let text = document.getElementById("opacityText")
    let root = document.documentElement.style


    opacitySlider.value = localStorage.read("opacity") ?? 70
    text.innerHTML = `Background Opacity: ${localStorage.read("opacity") ?? 70}%`

    //jeez i am not proud of this code yikes

    root.setProperty('--temp-body-opacity', `rgba(14, 14, 14, ${opacitySlider.value / 100})`)
    root.setProperty('--temp-body-opacity-lighter', `rgba(16, 16, 16, ${opacitySlider.value / 100})`)
    root.setProperty('--temp-header-opacity', `rgba(14, 14, 14, ${(opacitySlider.value / 100) + .05})`)
    root.setProperty('--body-opacity', `rgba(14, 14, 14, ${opacitySlider.value / 100})`)
    root.setProperty('--body-opacity-lighter', `rgba(16, 16, 16, ${opacitySlider.value / 100})`)
    root.setProperty('--header-opacity', `rgba(14, 14, 14, ${(opacitySlider.value / 100) + .05})`)
    
    opacitySlider.addEventListener("input", () => {
        root.setProperty('--temp-body-opacity', `rgba(14, 14, 14, ${opacitySlider.value / 100})`)
        root.setProperty('--temp-body-opacity-lighter', `rgba(16, 16, 16, ${opacitySlider.value / 100})`)
        root.setProperty('--temp-header-opacity', `rgba(14, 14, 14, ${(opacitySlider.value / 100) + .05})`)
        root.setProperty('--body-opacity', `rgba(14, 14, 14, ${opacitySlider.value / 100})`)
        root.setProperty('--body-opacity-lighter', `rgba(16, 16, 16, ${opacitySlider.value / 100})`)
        root.setProperty('--header-opacity', `rgba(14, 14, 14, ${(opacitySlider.value / 100) + .05})`)

        text.innerHTML = `Background Opacity: ${opacitySlider.value}%`

        localStorage.write("opacity", opacitySlider.value)
    })
})

window.addEventListener("load", () => {
    let cornerSlider = document.getElementById("cornerSelector")
    let text = document.getElementById("cornerText")
    let root = document.documentElement.style

    cornerSlider.value = localStorage.read("corner") ?? 15
    text.innerHTML = `Corner Radius: ${localStorage.read("corner") ?? 15}px`

    root.setProperty('--temp-corner', `${cornerSlider.value}px`)

    cornerSlider.addEventListener("input", () => {
        root.setProperty('--temp-corner', `${cornerSlider.value}px`)

        text.innerHTML = `Corner Radius: ${cornerSlider.value}px`

        localStorage.write("corner", cornerSlider.value)
    })
})
