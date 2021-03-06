import React from 'react';
import CanvasPixel from './CanvasPixel.jsx';

const CanvasRow = ({ row, score }) => {
  const style = {
    display: 'flex',
  };

  return (
    <div style={style}>
      {
        row.map((pixel) => (
          <CanvasPixel score={score} pixelColor={pixel} />
        ))
      }
    </div>
  );
};

export default CanvasRow;