import Tool from './Tool';

export class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.activate();
  }

  activate() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    const [x, y] = this.getMouseCoor(e);
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const [x, y] = this.getMouseCoor(e);
      this.draw(x, y);
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    console.log('draw');
  }

  getMouseCoor(e) {
    return [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop];
  }
}
