import generateArray from '@utils';

class Axis {
  constructor(
    canvas,
    {
      from = 0,
      to = 10,
      step = 1,
      dashLength = 10,
      labelOffset = 10,
      mirroredLabelLocation = false,
    } = {},
  ) {
    this.labels = [];
    this.dashLength = dashLength;
    this.dashInterval = 0;
    this.axisStart = 0;
    this.canvas = canvas;
    this.labelOffset = labelOffset;
    this.ctx = canvas.getContext('2d');
    // init labels and axis start
    this.generateAxisParams(from, to, step);
    this.mirroredLabelLocation = mirroredLabelLocation;
  }

  generateAxisParams(from = 0, to = 0, step = 1) {
    this.labels = Axis.generateLabels(from, to + step, step);
    this.axisStart = Axis.findMin(this.labels);
  }

  get from() {
    return this.labels.at(0);
  }

  get to() {
    return this.labels.at(-1);
  }

  static findMin(c = []) {
    return c.reduce((acc, cur) => {
      if (Math.abs(cur) < Math.abs(acc)) {
        return cur;
      }
      return acc;
    }, c[0]);
  }

  static generateLabels(from, to, step) {
    if (from < 0 && to > 0) {
      const a = generateArray(0, -from + step, step)
        .map((e) => -e)
        .reverse();
      a.pop();
      const b = generateArray(0, to, step);
      return a.concat(b);
    }
    return generateArray(from, to, step);
  }

  get zeroPos() {
    return this.labels.indexOf(this.axisStart) * this.ofs + this.dashStart;
  }
}
export default Axis;
