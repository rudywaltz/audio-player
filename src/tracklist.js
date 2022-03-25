class TrackList extends HTMLElement {
  list = []
  wrapper = document.createElement('ul')


  constructor() {
    super()

    this.addEventListener('track.connected', event => {
      event.stopPropagation();
      event.target.addEventListener('track.delete', (deleteEvent) => this.#deleteElement(deleteEvent.detail))
    })

    this.addEventListener('track.update', event => {
      event.stopPropagation();
      this.#upsertList(event.detail)
    })
  }

  connectedCallback () {
    this.#render()
    this.appendChild(this.wrapper)
    const connectedEvent = new CustomEvent('tracklist.connected', { bubbles: true})
    this.dispatchEvent(connectedEvent)
  }

  next() {
    const nextTrack =  this.list.shift()
    this.#render()
    return nextTrack
  }


  #upsertList(element) {
    const targetElementIndex = this.list.findIndex(track => track.uuid === element.uuid)
    if (targetElementIndex > -1) {
      this.list[targetElementIndex] = element
    } else {
      this.list.push(element)
    }

    this.#render()
  }

  #deleteElement({ uuid }) {
    this.list = this.list.filter(track => {
      return track.uuid !== uuid
    })
    this.#render()
  }

  #render() {
    this.wrapper.innerHTML = '';

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < this.list.length; index++) {
      const element = document.createElement('li');
      element.textContent = JSON.stringify(this.list[index]);
      fragment.appendChild(element)
    }
    this.wrapper.appendChild(fragment)
  }
}


customElements.define('track-list', TrackList);
