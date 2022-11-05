import { render } from 'uhtml';
import { CustomElement } from './customElement'
import PlayerTemplate from './template/playerTemplate'

class AudioPlayer extends CustomElement {
  #songUrl
  #title
  #wrapperElemenent = document.createElement('div')
  #shadow = this.attachShadow({ mode: "open" });
  #state = {
    paused: true,
    duration: null,
    currentTime: 0,
  };

  #events = {
    toggleSong: this.toggleSong.bind(this),
    clickOnTimeBar: this.#clickOnTimeBar.bind(this)
  };

  #refs = {};
  #playerTemplate = new PlayerTemplate(this.#state, this.#events, this.#refs);
  audio = null

  connectedCallback() {
    this.#wrapperElemenent.innerHTML = '';
    this.#shadow.appendChild(this.#wrapperElemenent);

    this.#render();
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


  async toggleSong() {
    if (!this.audioContext) {
      this.#initAudio();
      await this.#startPlaying();
    } else if(this.audio.paused) {
      await this.audio.play();
    } else {
      this.audio.pause();
    }

    this.#state.paused = this.audio.paused;
    this.#render();
  }

  #render() {
    render(this.#wrapperElemenent, this.#playerTemplate.createElement())
  }

  #initAudio() {
    const AudioContext = window.AudioContext;
    this.audioContext = new AudioContext();
    this.audio = document.createElement('audio');
    this.audio.crossOrigin = 'Anonymous';
    const source = this.audioContext.createMediaElementSource(this.audio);
    source.connect(this.audioContext.destination);

    this.audio.addEventListener('timeupdate', this.#updateEllipsedTime.bind(this));
    this.audio.addEventListener('ended', this.#onEnd.bind(this))
  }

  #startPlaying() {
    return new Promise((resolve, reject) => {
      this.audio.addEventListener(
        "canplay",
        async () => {
          try {
            this.#state.duration = this.audio.duration
            this.audioContext.resume();
            await this.audio.play();
            this.#state.paused = false;
            resolve();
          } catch (error) {
            reject(error);
          }
        }, { once: true } )

        this.audio.src = this.song
    })
  }

  #updateEllipsedTime() {
    this.#state.currentTime = this.audio.currentTime;

    this.#render();
  }

  #clickOnTimeBar(event, value) {
    if(!this.audio) {
      event.target.value = 0;
      return;
    }

    this.audio.currentTime = this.audio.duration * value / 100;
  }

  #onEnd() {
    this.#state.paused = true;
    this.#render();
  }
}

customElements.define('audio-player', AudioPlayer);
