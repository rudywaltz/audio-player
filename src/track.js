class AudioTrack extends HTMLElement {
  #title = ''
  #src = ''
  #uuid = ''

  constructor() {
    super()
    this.#polyfillRandomUUID()
  }

  connectedCallback () {
    this.#uuid = crypto.randomUUID()
    const connectedEvent = new CustomEvent('track.connected', { bubbles: true })

    this.dispatchEvent(connectedEvent)
    this.update()
  }

  disconnectedCallback() {
    const disconnectedEvent = new CustomEvent('track.delete', {
      detail: {
        uuid: this.#uuid
      }
    })

    this.dispatchEvent(disconnectedEvent)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const transformedName = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
    this[transformedName] = newValue;
    this.update()
  }

  static get observedAttributes() {
    return ['title', 'src'];
  }

  set title(value) {
    this.#title = value
  }

  get title() {
    return this.#title
  }

  set src(value) {
    this.#src = value
  }

  get src() {
    return this.#src
  }


  update() {
    if (!this.#src || !this.#title || !this.#uuid) return

    const updateEvent = new CustomEvent('track.update', {
      bubbles: true,
      detail:
        { src: this.#src, title: this.#title, uuid: this.#uuid }
    })

    this.dispatchEvent(updateEvent)
  }

  #polyfillRandomUUID () {
    // https://github.com/ungap/random-uuid
    if (!('randomUUID' in crypto)) {
      crypto.randomUUID = function randomUUID() {
      return (
        [1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
        c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
      };
    }
  }
}

customElements.define('audio-track', AudioTrack);
