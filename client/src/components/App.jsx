import React from 'react';
import axios from 'axios';
import Canvas from './Canvas.jsx';
import styled from 'styled-components';
// import LoginForm from './LoginForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Creates background for the game
    let canvas = [];
    let rows = 16;
    while (rows > 0) {
      let innerCanvas = new Array(28);
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
      pole.height = randomHeight(3, 10);
      pole.position = i;
      goalPosts.push(pole);
    }

    // Sets the background color of the character
    canvas[character.y_axis][character.x_axis] = '#ffffe6';

    //Default State of game
    this.state = {
      score: 0,
      highScore: 0,
      canvas: canvas,
      image: '',
      character: character,
      goalPosts: goalPosts,
      currentKey: '',
      success: true,
      page: 0,
    };

    this.handleCharClick = this.handleCharClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleGamePlay = this.handleGamePlay.bind(this);
    // this.addPlayer = this.addPlayer.bind(this);

  }

  componentDidMount() {
    this.gamePlay = setInterval(() => this.handleGamePlay(), 100)
    this.getHighScore()
    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  getHighScore() {
    axios.get(`/games`)
      .then((res) => {
        let highest = 0;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].score > highest) {
            highest = res.data[i].score;
          }
        }
        this.setState({
          highScore: highest
        })
      })
  }

  addScore(score) {
    axios.post(`/games`, score)
      .then(this.getHighScore())
  }

  // Changes the position of the character when falling until the ground
  handleGamePlay() {
    if (!this.state.success) {
      return;
    }
    let canvas2 = [];
    let rows2 = 16;
    let goalPosts2 = this.state.goalPosts.slice();

    while (rows2 > 0) {
      let innerCanvas2 = new Array(28);
      canvas2.push(innerCanvas2.fill('#b3e6ff'));
      rows2--;
    }

    for (let i = 0; i < goalPosts2.length; i++) {
      goalPosts2[i].position -= 1;
      if (goalPosts2[i].position < 0) {
        goalPosts2[i].height = Math.floor(Math.random() * 10) + 3;
        goalPosts2[i].position = 27;
      }
    }

    // Creates the goal posts
    for (let i = 0; i < goalPosts2.length; i++) {
      for (let j = 0; j < goalPosts2[i].height; j++) {
        if (j !== goalPosts2[i].height - 1) {
          canvas2[15 - j][goalPosts2[i].position] = '#fffda8';
        } else {
          canvas2[15 - j][goalPosts2[i].position] = '#f7d247';
        }
      }
    }

    // Character falls down until it hits the ground
    let char = this.state.character;
    let success = true;
    char.y_axis++;

    if (char.y_axis > 15 || char.y_axis < 0) {
      char.y_axis = 15;
      success = false;
    }

    // Goal Post Collision Detection
    for (let i = 0; i < 16; i++) {
      if (canvas2[i][3] === '#fffda8' && char.y_axis === i) {
        char.y_axis = 15;
        char.x_axis = 4;
        success = false;
        this.addScore({
          score: this.state.score + 1,
        });
      }
    }

    if (!success) {
      this.setState({
        success: success
      })
    }

    canvas2[char.y_axis][char.x_axis] = '#ffffe6';

    this.setState({
      canvas: canvas2,
      character: char,
      goalPosts: goalPosts2,
    })

    // Increments score by 1 point every time character passes goal post
    for (let i = 0; i < goalPosts2.length; i++) {
      this.setState({
        score: goalPosts2[i].position === 3 && this.state.success ? this.state.score += 1 : this.state.score
      })
    }
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

  resetGame(event) {
    event.preventDefault();
    let char = this.state.character;
    char.y_axis = 7;
    char.x_axis = 3;
    this.setState({
      score: 0,
      character: char,
      success: true,
    })
  }

  render() {
    const { canvas, score, highScore } = this.state;
    const { handleCharClick } = this;
    return (
      <div onClick={handleCharClick}>
        <Wrapper>
          <Title>Quid-Dit</Title>
          <HighScore>
            High Score: {highScore}
          </HighScore>
          <span>
            <Button type="submit" value="Reset Game" onClick={this.resetGame} />
          </span>
        </Wrapper>
        <Score>
          Score: {score}
        </Score>
        <Canvas canvas={canvas} />
      </div>
    );
  }
}

export default App;

const Button = styled.input`
  display: block;
  position: absolute;
  top: 1.5%;
  right: 1%;
  color: white;
  background-color: #b3e6ff;
  border: 1px solid white;
  z-index: 99;
  text-align: center;
  padding: 5px;
  font-weight: bold;
  font-size: 2em;
  box-shadow: 3px 3px 20px -5px rgba(255,255,255,255);
  outline: none;
`;

const HighScore = styled.span`
  display: block;
  position: absolute;
  color: white;
  top: 1.5%;
  left: 2%;
  z-index: 99;
  font-weight: bold;
  font-size: 2em;
`;

const Score = styled.span`
  display: block;
  position: absolute;
  color: white;
  top: 8%;
  left: 42.5%;
  z-index: 99;
  font-weight: bold;
  font-size: 2em;
`;

const Title = styled.span`
  display: flex;
  position: absolute;
  color: white;
  top: 1%;
  left: 40%;
  z-index: 99;
  font-weight: bold;
  font-size: 3em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
`;