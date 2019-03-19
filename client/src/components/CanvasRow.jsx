import React from 'react';
import CanvasPixel from './CanvasPixel.jsx';

const CanvasRow = ({ row }) => {
  const style = {
    display: 'flex',
  };

  return (
    <div style={style}>
      {
        row.map((pixel) => (
          <CanvasPixel pixelColor={pixel} />
        ))
      }
    </div>
  );
};

export default CanvasRow;