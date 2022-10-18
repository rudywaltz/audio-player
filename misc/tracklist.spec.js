import { jest } from '@jest/globals';

import '../src/tracklist.js'
import '../src/track.js'

describe('tracklist', () => {
  const title = 'Track Title';
  const src = 'https://trackurl.com/';

  it('should render only "ul" element', () => {
    document.body.innerHTML = '<track-list></track-list>'
    expect(document.body.outerHTML).toBe('<body><track-list><ul></ul></track-list></body>')
  })

  it('shoud render a playlist', () => {
    window.crypto = {
      randomUUID: jest.fn().mockReturnValue('123')
     }

     const title = 'Track Title';
     const src = 'https://trackurl.com/';
    document.body.innerHTML = `<track-list>
    <audio-track src="${src}" title="${title}"></audio-track>
</track-list>`
    expect(document.body.querySelector('track-list ul').outerHTML).toEqual(`<ul><li><strong>${title}</strong>: ${src}</li></ul>`)
  })

  it('shoud render a playlist with multiple track', () => {
    bootstrapTrackList()
    expect(document.body.querySelector('track-list ul').outerHTML).toEqual(
      `<ul><li><strong>${title}</strong>: ${src}</li><li><strong>${title} 2</strong>: ${src} 2</li><li><strong>${title} 3</strong>: ${src} 3</li></ul>`)
  })

  it('shoud remove track', () => {
    bootstrapTrackList()
     document.querySelector('[modify-this]').remove()
    expect(document.body.querySelector('track-list ul').outerHTML).toEqual(
      `<ul><li><strong>${title}</strong>: ${src}</li><li><strong>${title} 3</strong>: ${src} 3</li></ul>`)
  })

  it('shoud modify track', () => {
    bootstrapTrackList()
    const newTitle = 'New Title'
     document.querySelector('[modify-this]').setAttribute('title', newTitle)
    expect(document.body.querySelector('track-list ul').outerHTML).toEqual(
      `<ul><li><strong>${title}</strong>: ${src}</li><li><strong>${newTitle}</strong>: ${src} 2</li><li><strong>${title} 3</strong>: ${src} 3</li></ul>`)
  })

  it('shoud return the next song and remove from the playlist', () => {
    bootstrapTrackList()
    const trackList = document.querySelector('track-list')
    const nextTrack = trackList.next()

    expect(nextTrack).toStrictEqual({src, title, uuid: '123'})
    expect(document.body.querySelector('track-list ul').outerHTML).toEqual(
      `<ul><li><strong>${title} 2</strong>: ${src} 2</li><li><strong>${title} 3</strong>: ${src} 3</li></ul>`)
  })

  function bootstrapTrackList() {
    window.crypto = {
      randomUUID: jest.fn()
        .mockReturnValueOnce('123')
        .mockReturnValueOnce('456')
        .mockReturnValueOnce('789')
     }
    document.body.innerHTML = `<track-list>
    <audio-track src="${src}" title="${title}"></audio-track>
    <audio-track src="${src} 2" title="${title} 2" modify-this></audio-track>
    <audio-track src="${src} 3" title="${title} 3"></audio-track>
</track-list>`
  }
})
