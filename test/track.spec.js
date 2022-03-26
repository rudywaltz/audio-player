require('../src/track')

test('attaching to the dom should call random UUID generation', () => {
 window.crypto = {
  randomUUID: jest.fn().mockReturnValue('123')
 }

  const audioTrackELement = document.createElement('audio-track')
  document.body.appendChild(audioTrackELement)
  expect(window.crypto.randomUUID).toHaveBeenCalled()
})

test('should dispatch "track.connected" event', () => {
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


test('should dispatch "track.update" event', () => {
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

test('element remove should dispatch "track.delete" event', () => {
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

test('getters return values', () => {
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

test('crypto fallback', () => {
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
