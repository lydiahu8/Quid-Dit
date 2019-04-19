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
    backgroundColor: score < 50 ? 'rgba(230, 230, 255, 0)' : score >= 50 && score < 100 ? 'rgba(255, 255, 179, 0)' : score >= 100 && score < 200 ? 'rgba(179, 230, 255,0)' : score >= 200 && score < 300 ? 'rgba(204, 255, 204, 0)' : 'rgba(255, 230, 230, 0)',
    content: `url("https://s3.amazonaws.com/quitttt/harry_potter.png")`,
    zIndex: '99',
    transform: 'scale(1.5)'
  };

  const styleRing = {
    width: '2em',
    height: '2em',
    backgroundColor: score < 50 ? 'rgba(230, 230, 255, 0)' : score >= 50 && score < 100 ? 'rgba(255, 255, 179, 0)' : score >= 100 && score < 200 ? 'rgba(179, 230, 255,0)' : score >= 200 && score < 300 ? 'rgba(204, 255, 204, 0)' : 'rgba(255, 230, 230, 0)',
    content: `url("https://s3.amazonaws.com/quitttt/ring.png")`,
    transform: 'scale(3)',
    zIndex: '90'
  }

  const stylePole = {
    width: '2em',
    height: '2em',
    backgroundColor: score < 50 ? 'rgba(230, 230, 255, 0)' : score >= 50 && score < 100 ? 'rgba(255, 255, 179, 0)' : score >= 100 && score < 200 ? 'rgba(179, 230, 255,0)' : score >= 200 && score < 300 ? 'rgba(204, 255, 204, 0)' : 'rgba(255, 230, 230, 0)',
    content: `url("https://s3.amazonaws.com/quitttt/pole.png")`,
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