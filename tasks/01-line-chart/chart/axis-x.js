import Axis from './axis';

class AxisX extends Axis {
  constructor(canvas, ...args) {
    super(...args);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.lineTo(500);
  }
}

export default AxisX;
