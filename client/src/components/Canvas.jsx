import React from 'react';
import CanvasRow from './CanvasRow.jsx';

const Canvas = ({ canvas, score }) => {

  const style = {
    background: 'auto',
    backgroundColor: score < 50 ? 'rgba(230, 230, 255, 0.2)' : score >= 50 && score < 100 ? 'rgba(255, 255, 179, 0.2)' : score >= 100 && score < 200 ? 'rgba(179, 230, 255,0.2)' : score >= 200 && score < 300 ? 'rgba(204, 255, 204, 0.1)' : 'rgba(255, 230, 230, 0.1)',
    backgroundImage: score < 50 ? 'url("https://s3.amazonaws.com/quitttt/mugggggle.png")' : score >= 50 && score < 100 ? 'url("https://s3.amazonaws.com/quitttt/hufflepuff.png")' : score >= 100 && score < 200 ? 'url("https://s3.amazonaws.com/quitttt/ravenclaw.jpg")' : score >= 200 && score < 300 ? 'url("https://s3.amazonaws.com/quitttt/slytherin.jpg")' : 'url("https://s3.amazonaws.com/quitttt/gryffindor.jpg")',
    backgroundRepeat: 'repeat',
    backgroundSize: '100%',
    opacity: 0.8,
    transition: 'all 0.5s ease-in',
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