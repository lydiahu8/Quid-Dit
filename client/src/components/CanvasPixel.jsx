import React from 'react';

const CanvasPixel = ({ pixelColor }) => {
  const style = {
    width: '3em',
    height: '3em',
    backgroundColor: pixelColor,
  };

  const styleChar = {
    width: '3em',
    height: '3em',
    backgroundColor: '#b3e6ff',
    content: `url("https://i.pinimg.com/originals/15/f7/70/15f770c0e6a9d74fc987d026c36be2eb.png")`,
    // transform: 'scale(.5)',
  };

  const styleRing = {
    width: '3em',
    height: '3em',
    backgroundColor: '#b3e6ff',
    content: `url("http://i43.tinypic.com/kbc32v.png")`,
    transform: 'scale(1.5)',
  }

  const stylePole = {
    width: '3em',
    height: '3em',
    backgroundColor: '#b3e6ff',
    content: `url("https://ya-webdesign.com/images/wood-pole-png-4.png")`,
    // transform: 'scale(1.5)',
  }

  return (
    <div>
      {
        pixelColor === '#ffffe6' ? (
          <div style={styleChar} ></div >
        ) :
          pixelColor === '#f7d247' ? (
            <div style={styleRing} ></div >
          ) :
            pixelColor === '#fffda8' ? (
              <div style={stylePole} ></div >
            ) :
              <div style={style} ></div >
      }
    </div>
  );
};

export default CanvasPixel;