import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault;
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    // let term = this.state.text;
    // this.setState({
    //   text: ''
    // })
    this.props.handler(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Search:
          <input type="text" placeholder="Search" value={this.state.text} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Go"/>
      </form>
    );
  }
}

export default Search;