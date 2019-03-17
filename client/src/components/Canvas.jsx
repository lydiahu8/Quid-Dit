import React from 'react';
import CanvasRow from './CanvasRow.jsx';

const Canvas = ({ canvas }) => {
  return (
    <div>
      {
        canvas.map((row) => (
          <CanvasRow row={row}/>
        ))
      }
    </div>
  );
};

export default Canvas;