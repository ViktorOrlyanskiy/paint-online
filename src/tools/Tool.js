class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // обнуляем слушаетели при инициализации нового инструмента
    this.destroy();
  }

  destroy() {
    this.canvas.onmouseup = null;
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
  }
}

export default Tool;
