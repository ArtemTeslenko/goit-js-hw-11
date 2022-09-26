export default class BtnControl {
  constructor({ selector, hidden = false }) {
    hidden && this.hideElement;
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }

  show() {}
}
