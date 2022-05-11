import React from "react";

class InputTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      definition: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleDefChange = this.handleDefChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTermChange(e) {
    e.preventDefault();
    this.setState({
      term: e.target.value
    });
  }

  handleDefChange(e) {
    e.preventDefault();
    this.setState({
      definition: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let termObj = {};
    termObj.term = this.state.term;
    termObj.definition = this.state.definition;

    //console.log(termObj);
    this.props.handler(termObj);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Term:
          <input type="text" value={this.state.term} onChange={this.handleTermChange}/>
        </label>
        <label>
          Definition:
          <input type="text" value={this.state.definition} onChange={this.handleDefChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      )
    }
  };

  export default InputTerm;
  // mdn has html docs
  // look for form inputs
