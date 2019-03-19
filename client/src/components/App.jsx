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
    let rows = 24;
    while (rows > 0) {
      let innerCanvas = new Array(45);
      canvas.push(innerCanvas.fill('rgba(230, 230, 255, 0.1)'));
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

    for (let i = 5; i < canvas[0].length + 1; i += 7) {
      let pole = {};
      pole.height = randomHeight(6, 10);
      pole.position = i;
      if (i % 2 === 0) {
        pole.top = true;
      } else {
        pole.top = false;
      }
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
  }

  componentDidMount() {
    setTimeout(() => {
      setInterval(() => this.handleGamePlay(), 100)
    }, 400);
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
    let rows2 = 24;
    let goalPosts2 = this.state.goalPosts.slice();

    while (rows2 > 0) {
      let innerCanvas2 = new Array(45);
      if (this.state.score < 5) {
        // Muggle
        canvas2.push(innerCanvas2.fill('rgba(230, 230, 255, 0)'));
      } else if (this.state.score >= 5 && this.state.score < 10) {
        // HufflePuff
        canvas2.push(innerCanvas2.fill('rgba(255, 255, 179, 0)'));
      } else if (this.state.score >= 10 && this.state.score < 15) {
        // RavenClaw
        canvas2.push(innerCanvas2.fill('rgba(179, 230, 255,0)'));
      } else if (this.state.score >= 15 && this.state.score < 20) {
        // Slytherin
        canvas2.push(innerCanvas2.fill('rgba(204, 255, 204, 0)'));
      } else {
        // Gryffindor
        canvas2.push(innerCanvas2.fill('rgba(255, 230, 230, 0)'));
      }
      rows2--;
    }

    for (let i = 0; i < goalPosts2.length; i++) {
      goalPosts2[i].position -= 1;
      if (goalPosts2[i].position < 0) {
        goalPosts2[i].height = Math.floor(Math.random() * 10) + 6;
        goalPosts2[i].position = 44;
      }
    }

    // Creates the goal posts
    for (let i = 0; i < goalPosts2.length; i++) {
      for (let j = 0; j < goalPosts2[i].height; j++) {
        if (!goalPosts2[i].top) {
          if (j !== goalPosts2[i].height - 1) {
            canvas2[23 - j][goalPosts2[i].position] = '#fffda8';
          } else {
            canvas2[23 - j][goalPosts2[i].position] = '#f7d247';
          }
        } else {
          if (j !== goalPosts2[i].height - 1) {
            canvas2[j][goalPosts2[i].position] = '#fffda8';
          } else {
            canvas2[j][goalPosts2[i].position] = '#f7d247';
          }
        }
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
      if (canvas2[i][3] === '#fffda8' && char.y_axis === i) {
        char.y_axis = 23;
        char.x_axis = 4;
        success = false;
        this.addScore({
          score: this.state.score,
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
    char.y_axis -= 3;
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
      char.y_axis -= 3;
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
          <Title>QUID-DIT</Title>
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
        <Canvas canvas={canvas} score={score} />
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
  background-color: rgba(179, 230, 255,0);
  border: 1px solid white;
  z-index: 99;
  text-align: center;
  padding: 8px;
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
  top: 10%;
  left: 44.75%;
  z-index: 99;
  font-weight: bold;
  font-size: 2em;
`;

const Title = styled.div`
  display: flex;
  position: absolute;
  color: white;
  top: 1%;
  left: 40%;
  z-index: 99;
  font-weight: bold;
  font-size: 4em;
  text-shadow: 4px 4px 7px rgba(209,209,209,0.76);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
`;