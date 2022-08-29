import { applyTransform, createSVGElement, mount } from './utils';

/**
 * 统一变换流程
 * @param {string} type 期望变换的类型 scale | translate | rotate 等
 * @param {*} context svg元素节点
 * @param  {...any} params
 */
export function transform(type, context, ...params) {
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}

/**
 * 重置
 * @param {*} context
 */
export function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}

/**
 * 更新节点
 * @param {*} context
 */
export function save(context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}

/**
 * 缩放
 * @param {*} context
 * @param {*} sx 横向缩放比例
 * @param {*} sy 纵向缩放比例
 */
export function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}

/**
 * 平移
 * @param {*} context SVG元素节点
 * @param {*} tx 左右位移
 * @param {*} ty 上下位移
 */
export function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}

/**
 * 旋转
 * @param {*} context SVG元素节点
 * @param {*} theta θ 旋转角度
 */
export function rotate(context, theta) {
  transform('rotate', context, theta);
}
