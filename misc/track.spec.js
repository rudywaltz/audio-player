import { expect } from '@esm-bundle/chai';
import { stub, spy, useFakeTimers } from 'sinon';

import "./track.js"


describe('track', () => {

  it.only('attaching to the dom should call random UUID generation', () => {
    const cryptoSpy = spy()
    window.crypto = {
      randomUUID: cryptoSpy
     }

    // window.crypto = {
    //  randomUUID: jest.fn().mockReturnValue('123')
    // }

     const audioTrackELement = document.createElement('audio-track')
     document.body.appendChild(audioTrackELement)
     console.log(cryptoSpy.calledOnce)
     expect(window.crypto.randomUUID).to.be.true;
  })

   it('should dispatch "track.connected" event', () => {
    window.crypto = {
     randomUUID: jest.fn().mockReturnValue('123')
    }

    const connectedEventSpy = jest.fn()
    const trackUpdateEventSpy = jest.fn()
    document.addEventListener('track.connected', connectedEventSpy)
    document.addEventListener('track.update', trackUpdateEventSpy)

    document.body.innerHTML = '<audio-track></audio-track>'
     expect(connectedEventSpy).toHaveBeenCalled()
     expect(trackUpdateEventSpy).not.toHaveBeenCalled()
   })


   it('should dispatch "track.update" event', () => {
     const title = 'Song Title'
     const src = 'https://songurl'
     const uuid = 123
    window.crypto = {
     randomUUID: jest.fn().mockReturnValue(uuid)
    }


    const trackUpdateEventSpy = jest.fn()
    document.addEventListener('track.update', trackUpdateEventSpy)

    document.body.innerHTML = `<audio-track src="${src}" title="${title}"></audio-track>`
     expect(trackUpdateEventSpy.mock.calls[0][0].detail).toEqual({ title, src, uuid })
   })

   it('element remove should dispatch "track.delete" event', () => {
     const uuid = 123
    window.crypto = {
     randomUUID: jest.fn().mockReturnValue(uuid)
    }


    const trackDeleteEventSpy = jest.fn()
    const audioTrackELement = document.createElement('audio-track')
    audioTrackELement.addEventListener('track.delete', trackDeleteEventSpy)

    document.body.appendChild(audioTrackELement)
    document.body.removeChild(audioTrackELement)

     expect(trackDeleteEventSpy.mock.calls[0][0].detail).toEqual({ uuid })
   })

   it('getters return values', () => {
     const title = 'Song Title'
     const src = 'https://songurl'
     const uuid = 123
    window.crypto = {
     randomUUID: jest.fn().mockReturnValue(uuid)
    }


    const trackUpdateEventSpy = jest.fn()
    document.addEventListener('track.update', trackUpdateEventSpy)

    document.body.innerHTML = `<audio-track src="${src}" title="${title}"></audio-track>`
    const audioPlayer = document.querySelector('audio-track')

    expect(audioPlayer.title).toEqual(title)
    expect(audioPlayer.src).toEqual(src)
   })

   it('crypto fallback', () => {
     const title = 'Song Title'
     const src = 'https://songurl'
     const uuid = '10000000-1000-4000-8000-100000000000'
    window.crypto = {
     getRandomValues: jest.fn().mockReturnValue('random')
    }


    const trackUpdateEventSpy = jest.fn()
    document.addEventListener('track.update', trackUpdateEventSpy)

    document.body.innerHTML = `<audio-track src="${src}" title="${title}"></audio-track>`
    expect(trackUpdateEventSpy.mock.calls[0][0].detail).toEqual({ title, src, uuid })

   })
})
