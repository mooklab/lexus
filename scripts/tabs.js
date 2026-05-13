export class Tabs {

    constructor(section, captions, contents) {
        this.section = section
        this.captions = captions
        this.contents = contents

        this.captions.forEach((caption, index) => {
            caption.addEventListener('click', event => {
                this.resetAll()
                this.onClick(index)
            })
        })
    }

    resetAll() {
        this.captions.forEach(caption => caption.classList.remove('opened'))
        this.contents.forEach(content => content.classList.remove('opened'))
    }

    onClick(index) {
        this.captions[index].classList.add('opened')
        this.contents[index] && this.contents[index].classList.add('opened')
    }

}