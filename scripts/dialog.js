// Атрибуты элементов
const dialogAttribute = 'data-modal-name'
const buttonAttribute = 'data-modal-target'
const closeAttribute = 'data-modal-close'

const buttons = document.querySelectorAll('[' + buttonAttribute + ']')

buttons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault()
        const target = button.getAttribute(buttonAttribute)
        createDialog(target)
    })
})

const createDialog = (target) => {
    const dialog = document.querySelector('[' + dialogAttribute + '=' + target + ']')
    const links = dialog?.querySelectorAll('[' + closeAttribute + ']')

    closeDialogs()
    dialog.showModal()

    links.forEach(link => {
        link.addEventListener('click', event => {
            closeDialogs()
            closeDialogs()
        })
    })

    dialog.addEventListener('click', element => {
        if (element.target === dialog) {
            closeDialogs()
            closeDialogs()
        }
    })

}

const closeDialogs = () => {
    const openedDialogs = document.querySelectorAll('[' + dialogAttribute + ']')
    openedDialogs.forEach(dialog => {
        dialog.close()
    })
}


// Добавляем в CSS переменную значение ширины скроллбара
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px")

// createDialog('callback')