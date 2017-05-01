class App {
  constructor() {
    this.grid = document.querySelector('[data-grid]')
    this.overlay = document.querySelector('[data-overlay]')
    this.overlayName = this.overlay.querySelector('[data-overlay-value]')

    this.state = "INITIAL"
    this.cards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
    this.selectedValue = null

    this.create()
  }

  create() {
    let list = ""

    this.cards.map((n) => {
      list += `
        <li class="Grid__item" data-value="${n}">
          <span class="Grid__item__number" data-value="${n}">${n}</span>
        </li>
      `
    })
    this.grid.innerHTML = list
    this.bind()
  }

  handleState() {
    switch (this.state) {
      case "CHOSEN":
        this.showOverlay()
        break;
      case "REVEAL":
        this.reveal()
        break;
      case "RESET":
        this.reset()
        break;
    }
  }

  bind() {
    this.grid.addEventListener('click', (e) => {
      this.selectedValue = e.target.dataset.value
      this.state = "CHOSEN"
      this.handleState()
    })

    this.overlay.addEventListener('click', (e) => {
      if(this.state === "CHOSEN") {
        this.state = "REVEAL"
        this.handleState()
      } else {
        this.state = "RESET"
        this.handleState()
      }
    })
  }

  showOverlay() {
    this.overlay.classList.add("is-visible")
  }

  reveal() {
    this.overlayName.textContent = this.selectedValue
  }

  reset() {
    this.overlay.classList.remove("is-visible")
    this.overlayName.textContent = ""
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App()
});
