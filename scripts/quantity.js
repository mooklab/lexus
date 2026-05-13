export class Quantity {
    constructor(input, minus, plus) {
        this.input = input
        this.minus = minus
        this.plus = plus
        this.min = this.input.getAttribute('min')
        this.max = this.input.getAttribute('max')

        this.input.value = this.min

        this.minus.addEventListener('click', event => this.decrement())
        this.plus.addEventListener('click', event => this.increment())
        this.input.addEventListener('change', event => this.limits())

    }

    decrement() {
        if (this.input.value <= this.min) return
        this.input.value--
        this.input.dispatchEvent(new Event('change'))
    }

    increment() {
        if (this.input.value >= this.max) return
        this.input.value++
        this.input.dispatchEvent(new Event('change'))
    }

    limits() {
        if (+this.input.value <= +this.min) { this.input.value = this.min }
        if (+this.input.value >= +this.max) { this.input.value = this.max }
    }
}
