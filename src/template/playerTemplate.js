import { html } from 'uhtml';
import { displayLength } from '../utils/displayLength'

class PlayerTemplate {
  #state
  #events

  constructor(state, events) {
    this.#state = state;
    this.#events = events;
  }

  createElement() {
    return html`
     ${this.#playButton()}
     ${this.#currentTime()}&nbsp;/&nbsp;
     ${this.#duration()}
     `;
  }

  #playButton() {
    const buttonLabel = this.#state.paused ? 'Play' : 'Pause';
    return html`
      <button type="button"  data-test="play-button" @click=${(event) => this.#events.toggleSong()}>${buttonLabel}</button>`
  }

  #duration() {
    return html`<span data-test="duration-element">${displayLength(this.#state.duration)}</span>`;
  }

  #currentTime() {
    return html`<span data-test="current-element">${displayLength(this.#state.currentTime)}</span>`;
  }
}


export default PlayerTemplate;
