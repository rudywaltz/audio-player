import { html } from 'uhtml';
import { displayLength } from '../utils/displayLength'

class PlayerTemplate {
  #state
  #events
  #refs

  constructor(state, events, refs) {
    this.#state = state;
    this.#events = events;
    this.#refs = refs;
  }

  createElement() {
    return html`
    <div>
     ${this.#playButton()}
     </div>
     <div>
     ${this.#timeRange()}
     </div>
     ${this.#currentTime()}&nbsp;/&nbsp;${this.#duration()}
    `;
  }

  #playButton() {
    const buttonLabel = this.#state.paused ? 'Play' : 'Pause';
    return html`
      <button type="button"  data-test="play-button" @click=${() => this.#events.toggleSong()}>${buttonLabel}</button>`
  }

  #duration() {
    return html`<span data-test="duration-element">${displayLength(this.#state.duration)}</span>`;
  }

  #currentTime() {
    return html`<span data-test="current-element">${displayLength(this.#state.currentTime)}</span>`;
  }

  #timeRange() {
    const value =  this.#state.duration ? (this.#state.currentTime / this.#state.duration) * 100 : 0;
    return html`<input
      type="range"
      id="timerange"
      name="timerange"
      min="0"
      max="100"
      value="${value}"
      @input="${event => this.#events.clickOnTimeBar(event, event.target.value)}"
    >`
  }
}


export default PlayerTemplate;
