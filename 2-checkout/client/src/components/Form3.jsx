import React from 'react';

class Form3 extends React.Component {
  constructor(props) {
    super(props);
    //credit card #, expiry date, CVV, and billing zip code.
    this.state = {
      cc: '',
      expDate: '',
      cvv: '',
      billingZip: ''
    }
    this.handleCCChange = this.handleCCChange.bind(this);
    this.handleExpDateChange = this.handleExpDateChange.bind(this);
    this.handleCVVChange = this.handleCVVChange.bind(this);
    this.handleBillingZipChange = this.handleBillingZipChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCCChange(e) {
    e.preventDefault();
    this.setState({
      cc: e.target.value
    })
  }

  handleExpDateChange(e) {
    e.preventDefault();
    this.setState({
      expDate: e.target.value
    })
  }

  handleCVVChange(e) {
    e.preventDefault();
    this.setState({
      ccv: e.target.value
    })
  }

  handleBillingZipChange(e) {
    e.preventDefault();
    this.setState({
      billingZip: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.thirdHandler(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Credit Card Number:
          <input type="text" value={this.state.cc} onChange={this.handleCCChange} />
        </label>
        <label>
          Expiration Date:
          <input type="text" value={this.state.expDate} onChange={this.handleExpDateChange} />
        </label>
        <label>
          CVV:
          <input type="text" value={this.state.cvv} onChange={this.handleCVVChange} />
        </label>
        <label>
          Billing Zipcode:
          <input type="text" value={this.state.billingZip} onChange={this.handleBillingZipChange} />
        </label>
        <input type="submit" value="Next" />
    </form>
    )
  }
}

export default Form3;