import Tool from './Tool';

export class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.mouseDown = false;
    this.centerX = null;
    this.centerY = null;
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
    this.ctx.beginPath();
    const [centerX, centerY] = this.getMouseCoor(e);
    this.centerX = centerX;
    this.centerY = centerY;

    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const [currentX, currentY] = this.getMouseCoor(e);
      let radius = this.calcRadius(currentX, currentY);
      this.draw(this.centerX, this.centerY, radius);
    }
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.stroke();
    };
    console.log('draw');
  }

  calcRadius(endX, endY) {
    // c = √(a² + b²)
    let a = Math.abs(this.centerX - endX);
    let b = Math.abs(this.centerY - endY);
    let radius = Math.sqrt(a * a + b * b);

    return radius;
  }
}
