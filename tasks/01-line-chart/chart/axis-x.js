import Axis from './axis';

class AxisX extends Axis {
  constructor(...args) {
    super(...args);
    this.TODO = null;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(500, 0);
    this.ctx.stroke();
    this.ctx.closePath();
    this.createLabels();
  }

  createLabels() {
    const leng = this.labels.length;
    const ofs = 500 / leng;
    for (let i = 1; i <= leng; i += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * ofs, -10);
      this.ctx.lineTo(i * ofs, 10);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.fillText(
        `${this.labels[i - 1]}`,
        i * ofs,
        10 + this.labelOffset,
      );
    }
  }
}

export default AxisX;
