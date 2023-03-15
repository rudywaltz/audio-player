import { expect } from '@esm-bundle/chai';
import { sendMouse } from '@web/test-runner-commands';

import '../src/player';

describe('audio-player', () => {
  beforeEach(async () => {
    await sendMouse({
      type: 'click',
      position: [1, 1],
      button: 'left',
    });
  });

  it('should set song and title', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');
    expect(player.song).to.be.eq('./test/podcast_jezus_raketta.mp3');
    expect(player.title).to.be.eq('Song Title');
  });

  it('should render default markup', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');

    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');
    const duration = player.shadowRoot.querySelector('[data-test="duration-element"]');
    const current = player.shadowRoot.querySelector('[data-test="current-element"]');

    expect(playButton.textContent.trim()).to.be.eq('Play');
    expect(duration.textContent.trim()).to.be.eq('--:--:--');
    expect(current.textContent.trim()).to.be.eq('00:00:00');
  });

  it('should start the playing after click', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');

    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');

    playButton.click();
    await new Promise((resolve) => setTimeout(() => resolve(), 100));

    expect(playButton.textContent.trim()).to.be.eq('Pause');
  });

  it('should toggle Play button work', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');

    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');

    playButton.click();

    await new Promise((resolve) => setTimeout(() => resolve(), 100));

    playButton.click();

    expect(playButton.textContent.trim()).to.be.eq('Play');
  });

  it('should display the formatted duration', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');
    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');

    playButton.click();
    await new Promise((resolve) => setTimeout(() => resolve(), 100));

    const durationElement = player.shadowRoot.querySelector('[data-test="duration-element"]');

    expect(durationElement.textContent).to.be.eq('00:05:46');
  });

  it('should display the formatted ellipsed time', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');
    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');

    playButton.click();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    const currentElement = player.shadowRoot.querySelector('[data-test="current-element"]');

    expect(currentElement.textContent.trim()).to.be.eq('00:00:01');
  });

  it('should display the formatted ellipsed time', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');
    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');
    const timeRange = player.shadowRoot.querySelector('#timerange');
    playButton.click();
    await new Promise((resolve) => setTimeout(() => resolve(), 100));

    const half = Math.ceil(timeRange.getBoundingClientRect().x + timeRange.getBoundingClientRect().width / 2);
    await sendMouse({
      type: 'click',
      position: [half, Math.ceil(timeRange.getBoundingClientRect().y)],
      button: 'left',
    });

    const currentElement = player.shadowRoot.querySelector('[data-test="current-element"]');

    expect(currentElement.textContent.trim()).to.be.eq('00:02:53');
  });

  it('should move forward', async () => {
    document.body.innerHTML = `<audio-player title="Song Title" song="./test/podcast_jezus_raketta.mp3"></audio-player>`;
    const player = document.querySelector('audio-player');
    const playButton = player.shadowRoot.querySelector('[data-test="play-button"]');
    const fwButton = player.shadowRoot.querySelector('[data-test="fw-button"]');

    playButton.click();
    fwButton.click();

    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    const currentElement = player.shadowRoot.querySelector('[data-test="current-element"]');

    expect(currentElement.textContent.trim()).to.be.eq('00:00:11');
  });
});
