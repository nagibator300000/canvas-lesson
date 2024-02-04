import Axis from './axis';

class AxisY extends Axis {
  constructor(...args) {
    super(...args);
    this.labels.reverse();
    this.leng =
      this.from !== 0 && this.to !== 0 && this.axisStart === 0
        ? this.labels.length + 1
        : this.labels.length;
    this.ofs = this.canvas.height / this.leng;
    this.dashStart = this.labels[0] !== this.axisStart ? this.ofs : 0;
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
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = this.mirroredLabelLocation ? 'right' : 'left';
    for (let i = 0; i < this.labels.length; i += 1) {
      if (this.labels[i] !== this.axisStart) {
        const pos = i * this.ofs + this.dashStart;
        this.ctx.beginPath();
        this.ctx.moveTo(-(this.dashLength / 2), pos);
        this.ctx.lineTo(this.dashLength / 2, pos);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillText(
          `${this.labels[i]}`,
          this.mirroredLabelLocation ? -this.labelOffset : this.labelOffset,
          // 0,
          pos,
        );
      }
    }
  }
}

export default AxisY;
