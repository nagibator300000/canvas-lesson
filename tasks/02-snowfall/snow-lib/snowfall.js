import randInt from '@utils/randInt';
import Snowflake from './snowflake';
import './snowfall.css';

class Snowfall {
  /**
   * @typedef {Object} SnowflakeSettings
   * @property {number} [SnowflakeSettings.amount]
   * @property {number} [SnowflakeSettings.minSize]
   * @property {number} [SnowflakeSettings.maxSize]
   * @property {number} [SnowflakeSettings.fallSpeed]
   */

  /**
   *
   * @param {HTMLElement} [root] HTML element to which canvas elemnt is attached, defaults to `<body>`
   * @param {SnowflakeSettings} [snowflakeSettings]
   */
  callback = () => {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  };

  constructor(root = document.body, snowflakeSettings = {}) {
    /** @type {HTMLElement} */
    this.root = root;
    /** @type {HTMLCanvasElement} */
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'canvas-snowfall';
    this.root.append(this.canvas);
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d');
    /** @type {Snowflake[]} */
    this.snowflakes = [];
    this.observer = new ResizeObserver(this.callback);
    this.observer.observe(this.canvas);
  }
}

export default Snowfall;
