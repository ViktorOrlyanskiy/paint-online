import Tool from './Tool';

export class Eraser extends Tool {
  constructor(canvas) {
    super(canvas);
    this.mouseDown = false;

    this.activate();
  }

  activate() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
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

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.ctx.strokeStyle = 'black';
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
    console.log('draw');
  }
}
