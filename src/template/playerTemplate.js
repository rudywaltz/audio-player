import { html } from 'uhtml';
import { displayLength } from '../utils/displayLength';

class PlayerTemplate {
  #state;
  #events;
  #refs;
  #audio;

  constructor(state, events, refs, audio) {
    this.#state = state;
    this.#events = events;
    this.#refs = refs;
    this.#audio = audio;
  }

  createElement() {
    return html`
      <div>${this.#bwButton()} ${this.#playButton()} ${this.#fwButton()}</div>
      <div>${this.#timeRange()}</div>
      ${this.#currentTime()}&nbsp;/&nbsp;${this.#duration()}
    `;
  }

  #playButton() {
    const buttonLabel = this.#state.paused ? 'Play' : 'Pause';
    return html` <button type="button" data-test="play-button" @click=${() => this.#events.toggleSong()}>
      ${buttonLabel}
    </button>`;
  }

  #duration() {
    return html`<span data-test="duration-element">${displayLength(this.#state.duration)}</span>`;
  }

  #currentTime() {
    return html`<span data-test="current-element">${displayLength(this.#state.currentTime)}</span>`;
  }

  #timeRange() {
    const value = this.#audio?.duration ? (this.#audio?.currentTime / this.#audio?.duration) * 100 : 0;
    return html`<input
      type="range"
      id="timerange"
      name="timerange"
      min="0"
      max="100"
      ref=${(node) => (this.#refs.timeRange = node)}
      value="${value}"
      @input="${(event) => this.#events.clickOnTimeBar(event, event.target.value)}"
    />`;
  }

  #fwButton() {
    return html`<button
      type="button"
      data-test="fw-button"
      @click="${(event) => this.#events.clickOnFwButton(event, event.target.value)}"
    >
      FW
    </button>`;
  }

  #bwButton() {
    return html`<button
      type="button"
      data-test="bw-button"
      @click="${(event) => this.#events.clickOnBwButton(event, event.target.value)}"
    >
      BW
    </button>`;
  }
}

export default PlayerTemplate;
