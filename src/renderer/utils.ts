export function createSVGElement(type: string): Node {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}

export function mount(parent: Node, child: Node): void {
  if (parent) {
    parent.appendChild(child);
  }
}
