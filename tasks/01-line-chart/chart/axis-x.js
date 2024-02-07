import Axis from './axis';

class AxisX extends Axis {
  constructor(...args) {
    super(...args);
    this.leng =
      this.from !== 0 && this.to !== 0 && this.axisStart === 0
        ? this.labels.length + 1
        : this.labels.length;
    this.ofs = this.canvas.width / this.leng;
    this.dashStart = this.labels[0] !== this.axisStart ? this.ofs : 0;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.stroke();
    this.ctx.closePath();
    this.createLabels();
  }

  createLabels() {
    this.ctx.textBaseline = this.mirroredLabelLocation ? 'top' : 'bottom';
    this.ctx.textAlign = 'right';
    for (let i = 0; i < this.labels.length; i += 1) {
      if (this.labels[i] !== this.axisStart) {
        const { width } = this.ctx.measureText(Math.abs(this.labels[i]));
        const pos = i * this.ofs + this.dashStart;
        this.ctx.beginPath();
        this.ctx.moveTo(pos, -(this.dashLength / 2));
        this.ctx.lineTo(pos, this.dashLength / 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillText(
          `${this.labels[i]}`,
          pos + width / 2,
          this.mirroredLabelLocation ? this.labelOffset : -this.labelOffset,
        );
      }
    }
  }
}

export default AxisX;
