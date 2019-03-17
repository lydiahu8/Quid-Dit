import React from 'react';

const CanvasPixel = ({ pixelColor }) => {
  const style = {
    width: '3em',
    height: '3em',
    border: '.5px solid black',
    backgroundColor: pixelColor,
  };

  return (
    <div style={style}></div>
  );
};

export default CanvasPixel;