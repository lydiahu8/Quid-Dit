import React from 'react';
import Canvas from './Canvas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Creates background for the game
    let canvas = [];
    let height = 15;
    while (height > 0) {
      let innerCanvas = new Array(30);
      canvas.push(innerCanvas.fill('#220033'));
      height--;
    }

    // Sets the position of the character
    let character = {
      y_axis: 7,
      x_axis: 1
    }

    // Sets the color of the character to yellow
    canvas[character.y_axis][character.x_axis] = '#e6b800';

    this.state = {
      score: 0,
      canvas: canvas,
      character: character,
    };

    this.charDrop = setInterval(() => this.handleCharDrop(), 200);
  }

  handleCharDrop() {
    let canvas2 = [];
    let height2 = 15;

    while (height2 > 0) {
      let innerCanvas2 = new Array(30);
      canvas2.push(innerCanvas2.fill('#220033'));
      height2--;
    }

    let char = this.state.character;
    char.y_axis++;
    if (char.y_axis > 14 || char.y_axis < 0) {
      char.y_axis = 14;
    }
    canvas2[char.y_axis][char.x_axis] = '#e6b800';

    this.setState({
      canvas: canvas2,
      character: char,
    })
  };

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

