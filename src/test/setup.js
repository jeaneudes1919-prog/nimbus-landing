import "@testing-library/jest-dom";

// jsdom ne fournit pas matchMedia : framer-motion s'en sert pour useReducedMotion.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// IntersectionObserver mock : déclenche immédiatement une intersection
// pour que les animations « whileInView » et compteurs s'activent en test.
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    this.callback([{ isIntersecting: true, target, intersectionRatio: 1 }], this);
  }

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver;
globalThis.IntersectionObserver = MockIntersectionObserver;

// jsdom n'implémente pas scrollTo : on le neutralise pour éviter le bruit console.
window.scrollTo = () => {};
