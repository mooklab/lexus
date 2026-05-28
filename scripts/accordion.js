export class Accordion {

    static items = []

    constructor(element, button, content, speed) {
        this.element = element
        this.button = button
        this.content = content
        this.speed = speed

        Accordion.items.push(this)

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

    onClick() {

        const isOpen = this.element.classList.contains('open')

        // закрываем все
        Accordion.items.forEach(item => {
            item.element.classList.remove('open')
            item.updateSize()
        })

        // если был закрыт — открываем текущий
        if (!isOpen) {
            this.element.classList.add('open')
            this.updateSize()
        }
    }

    updateSize() {
        this.content.style.gridTemplateRows =
            this.element.classList.contains('open') ? '1fr' : '0fr'
    }

}