import { expect } from '@esm-bundle/chai';
import { CustomElement } from '../src/customElement';

describe('customElement', () => {
  it('attribute change', () => {
    class TestComponent extends CustomElement {
      #simpleValue = '';
      #complexValue = '';

      static get observedAttributes() {
        return ['simple', 'complex-attribute'];
      }

      set simple(value) {
        this.#simpleValue = `expected ${value}`;
      }

      get simple() {
        return this.#simpleValue;
      }

      set complexAttribute(value) {
        this.#complexValue = `expected ${value}`;
      }

      get complexAttribute() {
        return this.#complexValue;
      }
    }

    const testValue = 'test value';
    customElements.define('test-component', TestComponent);

    const audioTrackELement = document.createElement('test-component');
    document.body.appendChild(audioTrackELement);
    audioTrackELement.setAttribute('simple', testValue);
    expect(audioTrackELement.simple).to.be.eq(`expected ${testValue}`);
  });

  it('attribute change', () => {
    const testValue = 'test value';

    const audioTrackELement = document.createElement('test-component');
    document.body.appendChild(audioTrackELement);
    audioTrackELement.setAttribute('complex-attribute', testValue);
    expect(audioTrackELement.complexAttribute).to.be.eq(`expected ${testValue}`);
  });
});
