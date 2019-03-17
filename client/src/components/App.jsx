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

    let goalPosts = [
      {
        height: Math.floor(Math.random() * 11) + 2,
        position: 4
      },
      {
        height: Math.floor(Math.random() * 11) + 2,
        position: 9
      },
      {
        height: Math.floor(Math.random() * 11) + 2,
        position: 14
      },
      {
        height: Math.floor(Math.random() * 11) + 2,
        position: 19
      },
      {
        height: Math.floor(Math.random() * 11) + 2,
        position: 24
      },
      {
        height: Math.floor(Math.random() * 11) + 2,
        position: 29
      },
    ];

    // Sets the color of the character to yellow
    canvas[character.y_axis][character.x_axis] = '#e6b800';

    this.state = {
      score: 0,
      canvas: canvas,
      character: character,
      goalPosts: goalPosts
    };

    // Sets a time for the character to drop
    this.charDrop = setInterval(() => this.handleCharMove(), 500);
  }

  // Changes the position of the character when falling until the ground
  handleCharMove() {
    let canvas2 = [];
    let height2 = 15;
    let goalPosts2 = this.state.goalPosts.slice();

    while (height2 > 0) {
      let innerCanvas2 = new Array(30);
      canvas2.push(innerCanvas2.fill('#220033'));
      height2--;
    }

    for (let i = 0; i < goalPosts2.length; i++) {
      goalPosts2[i].position -= 1;
      if (goalPosts2[i].position < 0) {
        goalPosts2[i].height = Math.floor(Math.random() * 11) + 2;
        goalPosts2[i].position = 29;
      }
    }

    // Creates the goal posts
    for (let i = 0; i < goalPosts2.length; i++) {
      for (let j = 0; j < goalPosts2[i].height; j++) {
        canvas2[14 - j][goalPosts2[i].position] = '#800000';
      }
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

