import React from 'react';

const CanvasPixel = ({ pixelColor }) => {

  const style = {
    width: '2em',
    height: '2em',
    backgroundColor: pixelColor,
  };

  const styleChar = {
    width: '2em',
    height: '2em',
    backgroundColor: '#b3e6ff',
    content: `url("https://i.pinimg.com/originals/15/f7/70/15f770c0e6a9d74fc987d026c36be2eb.png")`,
  };


  const styleRing = {
    width: '2em',
    height: '2em',
    backgroundColor: '#b3e6ff',
    content: `url("http://i43.tinypic.com/kbc32v.png")`,
    transform: 'scale(2)',
  }

  const stylePole = {
    width: '2em',
    height: '2em',
    backgroundColor: '#b3e6ff',
    content: `url("https://ya-webdesign.com/images/wood-pole-png-4.png")`,
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