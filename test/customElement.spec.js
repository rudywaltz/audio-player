import { CustomElement } from "../src/customElement";


describe('customElement', () => {
  test('attribute change', () => {
    class QQQ extends CustomElement {
      #simpleValue = ''
      #complexValue =''

      static get observedAttributes() {
        return ['simple', 'complex-attribute'];
      }

      set simple (value) {
        this.#simpleValue = `expected ${value}`
      }

      get simple () {
        return this.#simpleValue
      }

      set complexAttribute (value) {
        this.#complexValue = `expected ${value}`
      }

      get complexAttribute () {
        return this.#complexValue
      }
    }
    const testValue = 'test value'
    customElements.define('test-component', QQQ)

    const audioTrackELement = document.createElement('test-component')
    document.body.appendChild(audioTrackELement)
    audioTrackELement.setAttribute('simple', testValue)
    expect(audioTrackELement.simple).toBe(`expected ${testValue}`)
  })


  test('attribute change', () => {
    const testValue = 'test value'

    const audioTrackELement = document.createElement('test-component')
    document.body.appendChild(audioTrackELement)
    audioTrackELement.setAttribute('complex-attribute', testValue)
    expect(audioTrackELement.complexAttribute).toBe(`expected ${testValue}`)
  })

})
