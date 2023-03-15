class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const transformedName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    this[transformedName] = newValue;
  }
}

export { CustomElement };
