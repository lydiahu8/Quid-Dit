import React from 'react';

const CanvasPixel = ({ pixelColor, score }) => {

  const style = {
    width: '2em',
    height: '2em',
    backgroundColor: pixelColor,
  };

  const styleChar = {
    width: '2em',
    height: '2em',
    backgroundColor: score < 10 ? 'rgba(230, 230, 255, 0)' : score >= 10 && score < 20 ? 'rgba(255, 255, 179, 0)' : score >= 20 && score < 30 ? 'rgba(179, 230, 255,0)' : score >= 30 && score < 40 ? 'rgba(204, 255, 204, 0)' : 'rgba(255, 230, 230, 0)',
    content: `url("https://i.pinimg.com/originals/15/f7/70/15f770c0e6a9d74fc987d026c36be2eb.png")`,
    zIndex: '99'
  };

  const styleRing = {
    width: '2em',
    height: '2em',
    backgroundColor: score < 10 ? 'rgba(230, 230, 255, 0)' : score >= 10 && score < 20 ? 'rgba(255, 255, 179, 0)' : score >= 20 && score < 30 ? 'rgba(179, 230, 255,0)' : score >= 30 && score < 40 ? 'rgba(204, 255, 204, 0)' : 'rgba(255, 230, 230, 0)',
    content: `url("http://i43.tinypic.com/kbc32v.png")`,
    transform: 'scale(3)',
    zIndex: '90'
  }

  const stylePole = {
    width: '2em',
    height: '2em',
    backgroundColor: score < 10 ? 'rgba(230, 230, 255, 0)' : score >= 10 && score < 20 ? 'rgba(255, 255, 179, 0)' : score >= 20 && score < 30 ? 'rgba(179, 230, 255,0)' : score >= 30 && score < 40 ? 'rgba(204, 255, 204, 0)' : 'rgba(255, 230, 230, 0)',
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