import React from 'react';
import CanvasRow from './CanvasRow.jsx';

const Canvas = ({ canvas, score }) => {

  const style = {
    background: 'auto',
    backgroundColor: score < 10 ? 'rgba(230, 230, 255, 0.2)' : score >= 10 && score < 20 ? 'rgba(255, 255, 179, 0.2)' : score >= 20 && score < 30 ? 'rgba(179, 230, 255,0.2)' : score >= 30 && score < 40 ? 'rgba(204, 255, 204, 0.1)' : 'rgba(255, 230, 230, 0.1)',
    backgroundImage: score < 10 ? 'url("https://s3.amazonaws.com/quitttt/mugggggle.png")' : score >= 10 && score < 20 ? 'url("https://s3.amazonaws.com/quitttt/hufflepuff.png")' : score >= 20 && score < 30 ? 'url("https://s3.amazonaws.com/quitttt/ravenclaw.jpg")' : score >= 30 && score < 40 ? 'url("https://s3.amazonaws.com/quitttt/slytherin.jpg")' : 'url("https://s3.amazonaws.com/quitttt/gryffindor.jpg")',
    backgroundRepeat: 'repeat',
    backgroundSize: '100%'
  };

  return (
    <div style={style}>
      {
        canvas.map((row) => (
          <CanvasRow score={score} row={row} />
        ))
      }
    </div>
  );
};

export default Canvas;