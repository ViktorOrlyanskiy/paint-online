import React from 'react';
import { observer } from 'mobx-react-lite';
import '../styles/toolbar.scss';

import BrushIcon from '../assets/brush.svg?react';
import RectIcon from '../assets/rect.svg?react';
import CircleIcon from '../assets/circle.svg?react';
import EraserIcon from '../assets/eraser.svg?react';
import LineIcon from '../assets/line.svg?react';
import UndoIcon from '../assets/undo.svg?react';
import RedoIcon from '../assets/redo.svg?react';
import SaveIcon from '../assets/save.svg?react';
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';

import { Brush } from '../tools/Brush';
import { Rect } from '../tools/Rect';
import { Circle } from '../tools/Circle';
import { Eraser } from '../tools/Eraser';
import { Line } from '../tools/Line';

const Toolbar = observer(() => {
  const canvas = canvasState.canvas;

  return (
    <div className="toolbar" style={{ zIndex: 10 }}>
      <div className="toolbar__container">
        <button
          className="toolbar__btn"
          style={{ marginLeft: 10 }}
          onClick={() => toolState.setTool(new Brush(canvas))}
        >
          <BrushIcon />
        </button>
        <button
          className="toolbar__btn"
          onClick={() => toolState.setTool(new Rect(canvas))}
        >
          <RectIcon />
        </button>
        <button
          className="toolbar__btn"
          onClick={() => toolState.setTool(new Circle(canvas))}
        >
          <CircleIcon />
        </button>
        <button
          className="toolbar__btn"
          onClick={() => toolState.setTool(new Eraser(canvas))}
        >
          <EraserIcon />
        </button>
        <button
          className="toolbar__btn"
          onClick={() => toolState.setTool(new Line(canvas))}
        >
          <LineIcon />
        </button>
        <input type="color" />

        <button className="toolbar__btn" style={{ marginLeft: 'auto' }}>
          <UndoIcon />
        </button>
        <button className="toolbar__btn">
          <RedoIcon />
        </button>
        <button className="toolbar__btn" style={{ marginRight: 10 }}>
          <SaveIcon />
        </button>
      </div>
    </div>
  );
});

export default Toolbar;
