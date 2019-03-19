import React from 'react';

const CanvasPixel = ({ pixelColor }) => {

  const styleChar = {
    width: '2em',
    height: '2em',
    // backgroundColor: pixelColor,
    // borderRadius: '80%',
    content: `url("https://i.pinimg.com/originals/15/f7/70/15f770c0e6a9d74fc987d026c36be2eb.png")`
  };

  const style = {
    width: '2em',
    height: '2em',
    backgroundColor: pixelColor,
  };

  return (
    <div>
      {
        pixelColor === '#e0d543' ? (
          <div style={styleChar} ></div >
        ) :
          <div style={style} ></div >
      }
    </div>
  );
};

export default CanvasPixel;