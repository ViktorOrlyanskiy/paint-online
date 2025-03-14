import Tool from './Tool';

export default class Circle extends Tool {
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

  draw(x, y, r) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 0);
      //   this.ctx.fill();
      this.ctx.stroke();
    };
    console.log('draw');
  }

  getMouseCoor(e) {
    return [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop];
  }

  calcRadius(endX, endY) {
    // c = √(a² + b²)
    let a = Math.abs(this.centerX - endX);
    let b = Math.abs(this.centerY - endY);
    let radius = Math.sqrt(a * a + b * b);

    return radius;
  }
}
