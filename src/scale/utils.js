export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}
/**
 * #### 计算标尺刻度值
 * step0 是生成指定数量的刻度值
 * step1 是最后生成的刻度间隔
 * ##### 条件：
 * 1. step1和step0的误差尽量小
 * 2. step1 = 10 ^ n * b (其中 b = 1,2,5)
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} count 刻度总数
 * @returns {number} 单位刻度值
 */
export function tickStep(min, max, count) {
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  const step0 = Math.abs(max - min) / Math.max(0, count);
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  const error = step0 / step1;

  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;

  return step1;
}

/**
 * 生成刻度值数组，并且保证间隔一致
 * @param {*} min
 * @param {*} max
 * @param {*} count
 * @returns
 */
export function ticks(min, max, count) {
  const step = tickStep(min, max, count);
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);
  const values = new Array(n);

  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}

/**
 * 解决js 0.1+0.2 !== 0.3的精度问题
 * @param {*} n
 * @returns
 */
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

export function floor(n, base) {
  return base * Math.floor(n / base);
}

/**
 * 通过对象序列化简单判断两个对象是否相等
 * @param {*} a
 * @param {*} b
 * @returns
 */
export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function band({ domain, range, padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding);
  const bandWidth = step * (1 - padding);
  const interval = step - bandWidth;
  const x = (_, i) => r0 + interval + step * i;

  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x),
  };
}

export function log(n, base) {
  return Math.log(n) / Math.log(base);
}
