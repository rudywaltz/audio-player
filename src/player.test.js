import { expect } from '@esm-bundle/chai';
import { sendMouse } from '@web/test-runner-commands';

import "../src/player"

describe('audio-player', () => {
  beforeEach(async () => {
    await sendMouse({
      type: 'click',
      position: [1, 1],
      button: 'right'
    });
  });

  it('should set song and title', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')
    expect(player.song).to.be.eq('./test/podcast_jezus_raketta.mp3');
    expect(player.title).to.be.eq('Song Title');
  })

  it('should render default markup', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')

    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]')

    expect(playButton.textContent).to.be.eq('Play')
  })

  it('should start the playing after click', async () => {

    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')

    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]')

    playButton.click();
    await new Promise(resolve => setTimeout(() => resolve(), 100))

    expect(playButton.textContent).to.be.eq('Pause')
  })

  it('should toggle Play button work', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')

    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]')

    playButton.click()

    await new Promise(resolve => setTimeout(() => resolve(), 100))
    playButton.click()

    expect(playButton.textContent).to.be.eq('Play')
  })


  it('should display the formatted duration', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player')
    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]')

    playButton.click()
    await new Promise(resolve => setTimeout(() => resolve(), 100))


    const durationElement = player.shadowRoot.querySelector('[data-test="duration-element"]')

    expect(durationElement.textContent).to.be.eq('00:05:46')
  })
})
