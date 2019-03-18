import React from 'react';
import Canvas from './Canvas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Creates background for the game
    let canvas = [];
    let rows = 24;
    while (rows > 0) {
      let innerCanvas = new Array(45);
      canvas.push(innerCanvas.fill('#b3e6ff'));
      rows--;
    }

    // Sets the starting position of the character
    let character = {
      y_axis: 7,
      x_axis: 3
    }

    // Generates height of goal posts randomly
    let randomHeight = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    // Creates fixed amount of goal posts displayed per screen
    let goalPosts = [];

    for (let i = 9; i < canvas[0].length + 1; i += 9) {
      let pole = {};
      pole.height = randomHeight(5, 17);
      pole.position = i;
      goalPosts.push(pole);
    }

    // Sets the background color of the character
    canvas[character.y_axis][character.x_axis] = '#ccffe6';

    //Default State of game
    this.state = {
      score: 0,
      canvas: canvas,
      character: character,
      goalPosts: goalPosts,
      currentKey: '',
      success: true,
    };

    this.handleCharClick = this.handleCharClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // Sets a time for the character to drop
    this.charDrop = setInterval(() => this.handleCharDrop(), 200);
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  // Changes the position of the character when falling until the ground
  handleCharDrop() {
    if (!this.state.success) {
      return;
    }
    let canvas2 = [];
    let rows2 = 24;
    let goalPosts2 = this.state.goalPosts.slice();

    while (rows2 > 0) {
      let innerCanvas2 = new Array(45);
      canvas2.push(innerCanvas2.fill('#b3e6ff'));
      rows2--;
    }

    for (let i = 0; i < goalPosts2.length; i++) {
      goalPosts2[i].position -= 1;
      if (goalPosts2[i].position < 0) {
        goalPosts2[i].height = Math.floor(Math.random() * 17) + 5;
        goalPosts2[i].position = 44;
      }
    }

    // Creates the goal posts
    for (let i = 0; i < goalPosts2.length; i++) {
      for (let j = 0; j < goalPosts2[i].height; j++) {
        canvas2[23 - j][goalPosts2[i].position] = '#ffffe6';
      }
    }

    // Character falls down until it hits the ground
    let char = this.state.character;
    let success = true;
    char.y_axis++;

    if (char.y_axis > 23 || char.y_axis < 0) {
      char.y_axis = 23;
      success = false;
    }

    // Goal Post Collision Detection
    for (let i = 0; i < 24; i++) {
      if (canvas2[i][3] === '#ffffe6' && char.y_axis === i) {
        char.y_axis = 23;
        char.x_axis = 4;
        success = false;
      }
    }

    if (!success) {
      this.setState({
        success: success
      })
    }

    canvas2[char.y_axis][char.x_axis] = '#ccffe6';

    this.setState({
      canvas: canvas2,
      character: char,
      goalPosts: goalPosts2,
    })
  };

  handleCharClick(event) {
    event.preventDefault();
    let char = this.state.character;
    char.y_axis -= 2;
    this.setState({
      character: char,
    })
  }

  handleKeyPress(event) {
    event.preventDefault();
    this.setState({
      currentKey: event.keyCode,
    });
    if (this.state.currentKey === 32) {
      let char = this.state.character;
      char.y_axis -= 2;
      this.setState({
        character: char,
      });
    }
  }

  render() {
    const { canvas } = this.state;
    const { handleCharClick } = this;
    return (
      <div onClick={handleCharClick}>
        <Canvas canvas={canvas} />
      </div>
    );
  }
}

export default App;

