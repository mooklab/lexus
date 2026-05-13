export class Accordion {

    constructor(element, button, content, speed) {
        this.element = element
        this.button = button
        this.content = content
        this.speed = speed

        this.button.addEventListener('click', event => this.onClick(event))
        this.defaultSettings()
    }

    defaultSettings() {
        this.content.style.display = 'grid'
        this.content.style.gridTemplateRows = '0fr'
        this.content.style.transition = 'all ' + this.speed + 'ms'
        this.content.children[0].style.overflow = 'hidden'
        this.updateSize()
    }

    onClick(event) {
        this.element.classList.toggle('open')
        this.updateSize()
    }

    updateSize() {
        this.element.classList.contains('open') ? this.content.style.gridTemplateRows = '1fr' : this.content.style.gridTemplateRows = '0fr'
    }

}