import { CustomElement } from './customElement'

class AudioPlayer extends CustomElement {
  audioContext = null
  audio = null
  gainNode = null
  #trackListElement = null
  wrapper = document.createElement('div')
  titleElement = document.createElement('h3')
  playButton = document.createElement('button')
  stopbutton = document.createElement('button')
  forwardButton = document.createElement('button')
  backwardButton = document.createElement('button')
  nextSongButton = document.createElement('button')

  timeElement = document.createElement('div')
  durationElement = document.createElement('span')
  timeSeparator = document.createElement('span')
  ellipsedElement = document.createElement('span')

  timerWrapper = document.createElement('div')
  timeBar = document.createElement('div')

  soundWrapper = document.createElement('div')
  soundBar = document.createElement('div')

  title = ''
  volume = 1

  // song = "https://mcdn.podbean.com/mf/download/gn47rt/20220207_versek_szvazifoldilakopark_zuhanasgatlotestheveder.mp3";
  // songURL = "https://mcdn.podbean.com/mf/download/b24igi/podcast_jezus_raketta.mp3";
  songURL

  constructor() {
    super();

    this.addEventListener('tracklist.connected', (event) => this.#trackListElement = event.target)
  }

  connectedCallback() {
    this.playButton.textContent = 'play'
    this.stopbutton.textContent = 'Stop'
    this.forwardButton.textContent = "+10"
    this.backwardButton.textContent = "-10"
    this.timeSeparator.textContent = ' / '
    this.nextSongButton.textContent = 'Next Song'

    this.playButton.setAttribute('data-test', 'play-button')
    this.playButton.addEventListener('click', this.toggleMusic.bind(this))
    this.stopbutton.addEventListener('click', this.stopPlaying.bind(this))
    this.forwardButton.addEventListener('click', this.moveForward.bind(this))
    this.backwardButton.addEventListener('click', this.moveBackward.bind(this))
    this.timerWrapper.addEventListener('click', this.handleClick.bind(this))
    this.soundWrapper.addEventListener('click', this.setVolume.bind(this))
    this.nextSongButton.addEventListener('click', this.nextSong.bind(this))

    const fragment = document.createDocumentFragment()
    fragment.appendChild(this.titleElement)
    fragment.appendChild(this.backwardButton)
    fragment.appendChild(this.playButton)
    fragment.appendChild(this.stopbutton)
    fragment.appendChild(this.forwardButton)
    fragment.appendChild(this.nextSongButton)

    this.timeElement.appendChild(this.durationElement)
    this.timeElement.appendChild(this.timeSeparator)
    this.timeElement.appendChild(this.ellipsedElement)
    fragment.appendChild(this.timeElement)

    this.timerWrapper.style.height = '50px';
    this.timerWrapper.style.marginBottom = '16px';
    this.timeBar.style.height = '100%';
    this.timeBar.style.backgroundColor = 'red'
    this.timeBar.style.width = 0;
    this.timerWrapper.appendChild(this.timeBar)
    fragment.appendChild(this.timerWrapper)

    this.soundWrapper.style.height = '30px'
    this.soundBar.style.background = 'blue'
    this.soundBar.style.height = '100%'
    this.soundBar.style.width = 0
    this.soundWrapper.appendChild(this.soundBar)
    fragment.appendChild(this.soundWrapper)

    this.wrapper.appendChild(fragment)
    this.appendChild(this.wrapper)
    this.resetTimes()
  }

  static get observedAttributes() {
    return ['song', 'title'];
  }

  set song(url) {

    this.songURL = url
    if (!this.audioContext) return
    const isPlaying = !this.audio.paused
    this.stopPlaying()
    this.initAudio()
    if (isPlaying) {
      this.startPlaying()
    }

  }

  get song() {
    return this.songURL
  }

  toggleMusic () {
    if(!this.audioContext) {
      this.initAudio()
      this.startPlaying()
    } else if (this.audio.paused) {
      this.playButton.textContent = 'Pause'
      this.audio.play();
    } else {
      this.playButton.textContent = 'Play'
      this.audio.pause();
    }
  }

  initAudio() { // TODO: move to connected callback
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.audio = document.createElement("audio");
    this.audio.addEventListener('timeupdate', this.updateEllipsedTime.bind(this));
    this.audio.crossOrigin = "anonymous";
    const source = this.audioContext.createMediaElementSource(this.audio);

    this.gainNode = this.audioContext.createGain();

    source.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = this.volume
    this.soundBar.style.width = `${(this.gainNode.gain.value / 1.5) *100}%`
  }

  startPlaying() {
    this.ellipsedElement.textContent = 'Loading...'
    this.audio.addEventListener(
      "canplay",
      () => {
        this.durationElement.textContent = this.displayLength(this.audio.duration)
        this.audioContext.resume();
        this.audio.play();
        this.playButton.textContent = 'Pause'
        // Now, play the audio
      }, { once: true } )

      this.audio.src = this.songURL
  }

  stopPlaying() {
    if(!this.audio) return

    this.audio.pause();
    this.playButton.textContent = 'Play'
    this.audioContext.close();
    this.audioContext = null;
    this.audio.removeEventListener('timeupdate', this.updateEllipsedTime)
    this.audio = null
    this.resetTimes()
  }

  moveForward () {
    if(!this.audio) return

    this.audio.currentTime = this.audio.currentTime + 10
  }

  moveBackward () {
    if(!this.audio) return

    this.audio.currentTime = this.audio.currentTime - 10
  }

  nextSong () {
    const song = this.#trackListElement.next()

    if (!song) return

    const { src, title } = song
    this.title = title
    this.#render()

    this.song = src
  }

  disconnectedCallback () {
    this.wrapper = null
  }

  updateEllipsedTime() {
    if (!this.audio) return
    this.ellipsedElement.textContent = this.displayLength(this.audio.currentTime);
    this.timeBar.style.width = `${(this.audio.currentTime / this.audio.duration) * 100}%`;
  }

  handleClick(event) {
    if (!this.audio) return
    const clickedPoint = event.clientX
    const rate = clickedPoint / this.timerWrapper.clientWidth
    this.audio.currentTime = this.audio.duration * rate
  }

  setVolume(event) {
    if (!this.audio) return

    const clickedPoint = event.clientX
    const rate = clickedPoint / this.timerWrapper.clientWidth
    this.volume = 1.5 * rate
    this.gainNode.gain.setTargetAtTime(this.volume, this.audioContext.currentTime, 0.01);
    this.soundBar.style.width = `${rate * 100}%`
  }

  displayLength(time) {
    if (isNaN(time) || time === null) return '--:--:--';
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.ceil(time % 60);
    return this.pad`${hours}:${minutes}:${seconds}`;
  }

  pad (string, ...keys) {
    let res = string[0]
    for (let index = 0; index < keys.length; index++) {
      res +=  String(keys[index]).padStart(2, '0') + string[index +1]
    }

    return res
  }

  resetTimes () {
    this.durationElement.textContent = this.displayLength(null)
    this.ellipsedElement.textContent = this.displayLength(null)
    this.timeBar.style.width = 0
  }

  #render() {
    if (!this.title) return

    this.titleElement.textContent = this.title

  }


}


customElements.define('audio-player', AudioPlayer);
