class Snowflake {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} initialX
   * @param {number} initialY
   * @param {number} radius
   */
  constructor(ctx, initialX, initialY, radius) {
    this.ctx = ctx;
    this.x = initialX;
    this.y = initialY;
    this.radius = radius;
  }

  render() {}

  /**
   *
   * @param {number} deltaX
   * @param {number} deltaY
   */
  moveBy(deltaX, deltaY) {}
}

export default Snowflake;
