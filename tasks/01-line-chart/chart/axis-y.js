import Axis from './axis';

class AxisY extends Axis {
  constructor(...args) {
    super(...args);
    this.TODO = undefined;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 500);
    this.ctx.stroke();
    this.ctx.closePath();
    this.createLabels();
  }

  createLabels() {
    const leng = this.labels.length;
    const ofs = 500 / leng;
    for (let i = 1; i <= leng; i += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(-10, i * ofs);
      this.ctx.lineTo(10, i * ofs);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.fillText(
        `${this.labels[i - 1]}`,
        10 + this.labelOffset,
        i * ofs,
      );
    }
  }
}

export default AxisY;
