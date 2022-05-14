import React from 'react';

class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.firstHandler(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Next" />
    </form>
    )
  }
}

export default Form1;