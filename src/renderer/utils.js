/**
 * 创建svg元素
 * @param {*} type 创建类型 svg | g
 * @returns {SVGAElement}
 */
export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

/**
 * 将属性挂载在父节点下
 * @param {HTMLElement} parent 父节点
 * @param {HTMLElement} child 子节点
 */
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

/**
 * 转换元素格式并且挂载到节点中
 * @param {*} element 需要挂载的节点
 * @param {*} attributes 元素
 */
export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`);
    element.setAttribute(kebabCaseKey, value);
  }
}

/**
 * 应用变换函数，向元素节点添加坐标变换
 * @param {*} element 节点
 * @param {*} transform 变换类型
 */
export function applyTransform(element, transform) {
  const oldTransform = element.getAttribute('transform') || '';
  // 如果有旧的坐标变换，则将新的变换添加到旧变换后面
  const perfix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${perfix}${transform}`);
}
