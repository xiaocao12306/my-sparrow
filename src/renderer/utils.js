export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}
