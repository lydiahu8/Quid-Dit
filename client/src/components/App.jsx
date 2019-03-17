import React from 'react';
import Canvas from './Canvas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    let canvas = [];
    let rows = 15.5;
    while (rows > 0) {
      let innerCanvas = new Array(30);
      canvas.push(innerCanvas.fill('#220033'));
      rows--;
    }

    this.state = {
      score: 0,
      canvas: canvas,
    };
  }

  render() {
    const { canvas } = this.state;
    return (
      <div>
        <Canvas canvas={canvas} />
      </div>
    );
  }
}

export default App;

