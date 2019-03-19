import React from 'react';
import CanvasRow from './CanvasRow.jsx';

const Canvas = ({ canvas, score }) => {

  const style = {
    background: 'auto',
    backgroundColor: score < 5 ? 'rgba(230, 230, 255, 0.2)' : score >= 5 && score < 10 ? 'rgba(255, 255, 179, 0.2)' : score >= 10 && score < 15 ? 'rgba(179, 230, 255,0.2)' : score >= 15 && score < 20 ? 'rgba(204, 255, 204, 0.1)' : 'rgba(255, 230, 230, 0.1)',
    backgroundImage:score < 5 ? 'url("https://cdn.cnn.com/cnnnext/dam/assets/160105153052-wizarding-world-harry-potter-hollywood.jpg")' : score >= 5 && score < 10 ? 'url("https://wallpaperaccess.com/full/112967.png")' : score >= 10 && score < 15 ? 'url("https://wallpapercave.com/wp/LHluDH2.jpg")': score >= 15 && score < 20 ? 'url("https://wallpaperfm.com/img/original/9/a/9/46869.jpg")' : 'url("https://wallpaperaccess.com/full/430365.jpg")',
    backgroundRepeat: 'no-repeat',
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