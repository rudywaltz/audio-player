import { CustomElement } from './customElement'
import { displayLength } from './utils/displayLength'

class AudioPlayer extends CustomElement {
  #songUrl
  #title
  #wrapperElemenent = document.createElement('div')
  #playButtonElement = document.createElement('button')
  #durationElement = document.createElement('span')
  audio = null

  connectedCallback() {
    this.#wrapperElemenent.innerHTML = '';

    this.#playButtonElement.textContent = 'Play';
    this.#playButtonElement.dataset.test = 'play-button';
    this.#playButtonElement.type = 'button';

    this.#durationElement.dataset.test = 'duration-element';

    this.#wrapperElemenent.appendChild(this.#playButtonElement);
    this.#wrapperElemenent.appendChild(this.#durationElement);
    this.appendChild(this.#wrapperElemenent);

    this.#playButtonElement.addEventListener('click', this.toggleSong.bind(this));
  }

  static get observedAttributes() {
    return ['song', 'title'];
  }

  set song(value) {
    this.#songUrl = value;
  }

  get song() {
    return this.#songUrl;
  }

  set title(value) {
    this.#title = value;
  }

  get title() {
    return this.#title;
  }


  toggleSong() {
    if (!this.audioContext) {
      this.#initAudio();
      this.#startPlaying();
    } else if(this.audio.paused) {
      this.#playButtonElement.textContent = 'Pause';
      this.audio.play();
    } else {
      this.#playButtonElement.textContent = 'Play';
      this.audio.pause();
    }
  }

  #initAudio() {
    /* istanbul ignore next */
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.audio = document.createElement('audio');
    this.audio.crossOrigin = 'Anonymous';
    const source = this.audioContext.createMediaElementSource(this.audio);
    source.connect(this.audioContext.destination);
  }

  #startPlaying() {
    this.audio.addEventListener(
      "canplay",
      () => {
        this.#durationElement.textContent = displayLength(this.audio.duration)
        this.audioContext.resume();
        this.audio.play();
        this.#playButtonElement.textContent = 'Pause'
      }, { once: true } )

      this.audio.src = this.song
  }
}

customElements.define('audio-player', AudioPlayer);
