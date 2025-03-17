import React, { useEffect, useRef } from 'react';
import '../styles/canvas.scss';
import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={1000} height={700}></canvas>
    </div>
  );
});

export default Canvas;
