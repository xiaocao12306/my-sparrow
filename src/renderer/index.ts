import { createSVGElement, mount } from "./utils";

type Context = {
  node: object;
  group: object;
};

export function createContext(width: number, height: number): Context {
  const svg = createSVGElement("svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  // 创建挂在节点，然后把节点挂载到svg上
  const g = createSVGElement("g");
  mount(svg, g);
  return {
    node: svg,
    group: g
  };
}
