import "../src/player"

describe('audio-player', () => {
  beforeEach(() => {
  });

  it('should set song and title', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')
    expect(player.song).toBe('./podcast_jezus_raketta.mp3');
    expect(player.title).toBe('Song Title');
  })

  it('should render default markup', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')
    const playButton = player.querySelector('[data-test="play-button"]')

    expect(playButton.textContent).toBe('Play')
  })

  it('should start the playing after click', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')

    const playButton = player.querySelector('[data-test="play-button"]')
    playButton.click()
    console.log(player.audio)

    expect(player.audio._mock.paused).toBe(false)
    expect(playButton.textContent).toBe('Pause')
  })

  it('should toggle Play button work', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')

    const playButton = player.querySelector('[data-test="play-button"]')
    playButton.click()
    playButton.click()

    expect(player.audio._mock.paused).toBe(true)
    expect(playButton.textContent).toBe('Play')

    playButton.click()

    expect(player.audio._mock.paused).toBe(false)
    expect(playButton.textContent).toBe('Pause')
  })


  // it('should display the formatted duration', async () => {
  //   document.body.innerHTML = `<audio-player title="Song Title" song="./podcast_jezus_raketta.mp3"></audio-player>`;
  //   const player = document.querySelector('audio-player')
  //   const playButton = player.querySelector('[data-test="play-button"]')
  //   player.audio.duration = 13325

  //   playButton.click()

  //   const durationElement = player.querySelector('[data-test="duration-element"]')

  //   expect(durationElement.textContent).toBe('03:42:05')
  // })
})
