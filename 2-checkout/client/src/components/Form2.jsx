import React from 'react';

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    }
    this.handleLine1Change = this.handleLine1Change.bind(this);
    this.handleLine2Change = this.handleLine2Change.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLine1Change(e) {
    e.preventDefault();
    this.setState({
      line1: e.target.value
    })
  }

  handleLine2Change(e) {
    e.preventDefault();
    this.setState({
      line2: e.target.value
    })
  }

  handleCityChange(e) {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  handleStateChange(e) {
    e.preventDefault();
    this.setState({
      state: e.target.value
    })
  }

  handleZipChange(e) {
    e.preventDefault();
    this.setState({
      zip: e.target.value
    })
    console.log(typeof this.state.zip); // string or number?
  }

  handlePhoneChange(e) {
    e.preventDefault();
    this.setState({
      phone: e.target.value
    })
    console.log(typeof this.state.phone); // string or number?
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.secondHandler(this.state);
  }

  // ship to address (line 1, line 2, city, state, zip code) and phone number.
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Address Line1:
          <input type="text" value={this.state.line1} onChange={this.handleLine1Change} />
        </label>
        <label>
          Address Line2:
          <input type="text" value={this.state.line2} onChange={this.handleLine2Change} />
        </label>
        <label>
          City:
          <input type="text" value={this.state.city} onChange={this.handleCityChange} />
        </label>
        <label>
          State:
          <input type="text" value={this.state.state} onChange={this.handleStateChange} />
        </label>
        <label>
          Zipcode:
          <input type="text" value={this.state.zip} onChange={this.handleZipChange} />
        </label>
        <label>
          Phone:
          <input type="text" value={this.state.phone} onChange={this.handlePhoneChange} />
        </label>
        <input type="submit" value="Next" />
    </form>
    )
  }
}

export default Form2;