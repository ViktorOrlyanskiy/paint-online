import Tool from './Tool';

export class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.mouseDown = false;
    this.startX = null;
    this.startY = null;
    this.savedCanvas = null;

    this.activate();
  }

  activate() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    const [startX, startY] = this.getMouseCoor(e);
    this.startX = startX;
    this.startY = startY;

    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);

    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.savedCanvas) {
        const img = new Image();
        img.src = this.savedCanvas;
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0);
          const [currentX, currentY] = this.getMouseCoor(e);
          this.draw(currentX, currentY);
        };
      }
    }
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    const [endX, endY] = this.getMouseCoor(e);
    this.draw(endX, endY);
  }

  draw(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    console.log('draw');
  }
}
