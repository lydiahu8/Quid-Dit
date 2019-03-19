import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addPlayer(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Login:
        <label>
          Username:
          <input type="text" name='username' onChange={this.handleChange} />
        </label>
        <input type="submit" value="Play" />
      </form>
    );
  }
};

export default LoginForm;