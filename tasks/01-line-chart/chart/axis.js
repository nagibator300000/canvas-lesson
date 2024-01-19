import generateArray from '@utils';

class Axis {
  constructor(
    canvas,
    {
      from = 0,
      to = 10,
      step = 1,
      dashLength = 10,
      mirroredLabelLocation = false,
    } = {},
  ) {
    this.labels = [];
    this.axisStart = 0;

    // init labels and axis start
    this.generateAxisParams(from, to, step);
  }

  generateAxisParams(from = 0, to = 0, step = 1) {
    this.axisStart = undefined;
    this.labels = undefined;
  }

  get from() {
    return this.labels.at(0);
  }

  get to() {
    return this.labels.at(-1);
  }
}

export default Axis;
