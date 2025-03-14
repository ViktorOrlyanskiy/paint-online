import Tool from './Tool';

export class Rect extends Tool {
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
    const [startX, startY] = this.getMouseCoor(e);
    this.startX = startX;
    this.startY = startY;

    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const [currentX, currentY] = this.getMouseCoor(e);
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
    console.log('draw');
  }

  getMouseCoor(e) {
    return [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop];
  }
}
