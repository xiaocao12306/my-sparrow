import { applyAttributes, createSVGElement, mount } from './utils';
/**
 * 挂载元素
 * @param {string} type 图形类型 line | text | rect | path | ring
 * @param {*} context 节点
 * @param {*} attributes 属性
 * @returns {*} 返回元素
 *  */
export function shape(type, context, attributes) {
  const { group } = context; // 挂载元素
  const el = createSVGElement(type); // 创建对应的元素
  applyAttributes(el, attributes); // 设置属性

  mount(group, el); // 挂载
  return el; // 返回该元素
}
/* 线 */
export const line = (context, attributes) => shape('line', context, attributes);
/* 圆 */
export const circle = (context, attributes) => shape('circle', context, attributes);
// 文字：元素是展示在标签内部而非标签的属性
// <text>content</text>
export const text = (context, attributes) => {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
};

// rect 不支持width和height是负数
// <rect width="-60" height="-60" x="100" y="100" /> no
// 为了支持负数，将其转换成如下形式
// <rect width="60" height="60" x="40" y="40" /> right
export const rect = (context, attributes) => {
  const {
    width, height, x, y,
  } = attributes;
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
};

// 通过数组生成d（路径）
// [
//  ['M', 10, 10],
//  ['L', 100, 100],
//  ['L', 100, 10],
//  ['Z'],
// ];
// 上面的二维数组会被转换成如下的字符串
// 'M 10 10 L 100 100 L 100 10 Z'
export const path = (context, attributes) => {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
};
export const ring = (context, attributes) => {
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
};
