import React from 'react';
import CanvasRow from './CanvasRow.jsx';

const Canvas = ({ canvas }) => {

  const style = {
    background: 'auto',
  };

  return (
    <div style={style}>
      {
        canvas.map((row) => (
          <CanvasRow row={row} />
        ))
      }
    </div>
  );
};

export default Canvas;