import React from 'react';
import CanvasRow from './CanvasRow.jsx';

const Canvas = ({ canvas }) => {

  const style = {
    background: 'auto',
    backgroundColor: '#b3e6ff'
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