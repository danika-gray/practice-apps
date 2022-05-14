import React from 'react';
import axios from 'axios';
import Form1 from './Form1.jsx';
import Form2 from './Form2.jsx';
import Form3 from './Form3.jsx';
import Purchase from './Purchase.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutClicked: false,
      firstFormComplete: false,
      secondFormComplete: false,
      thirdFormComplete: false,
      purchaseClicked: false
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleFirstForm = this.handleFirstForm.bind(this);
  }

  handleCheckout() {
    this.setState({
      checkoutClicked: true
    })
  }

  handleFirstForm(data) {
    console.log(data, 'data in first form');
    axios.post('/checkout/form1', data)
      .then((res) => {
        console.log(res.data, 'res.data');

        this.setState({
          firstFormComplete: true
        })
      })
      .catch((err) => {
        alert(err);
      })
    // send data here in object form once all fields are complete
    // then send data to database with post
    // upon return change state to true and move on to form2
    // do same thing for forms 2&3 and then handle purchase
  }

  handleSecondForm(data) {
    console.log(data, 'data in second form');
    axios.post('/checkout/form2', data)
      .then((res) => {
        console.log(res.data, 'res.data');

        this.setState({
          secondFormComplete: true
        })
      })
      .catch((err) => {
        alert(err);
      })
  }

  handleThirdForm(data) {
    console.log(data, 'data in third form');
    axios.post('/checkout/form3', data)
      .then((res) => {
        console.log(res.data, 'res.data');

        this.setState({
          thirdFormComplete: true
        })
      })
      .catch((err) => {
        alert(err);
      })
  }

  handlePurchase() {
    this.setState({
      purchaseClicked: true
    })
  }

  render() {
    if (this.state.checkoutClicked && !this.state.firstFormComplete) {
      return (
        < Form1 firstHandler={this.handleFirstForm}/>
      );
    } else if (this.state.firstFormComplete && !this.state.secondFormComplete) {
      return (
        < Form2 secondHandler={this.handleSecondForm}/>
      );
    } else if (this.state.secondFormComplete && !this.state.thirdFormComplete) {
      return (
        < Form3 thirdHandler={this.handleThirdForm}/>
      );
    } else if (this.state.thirdFormComplete && !this.state.purchaseClicked) {
      return (
        < Purchase />
      );
    } else {
      return (
        <div>
          <button onClick={this.handleCheckout}>CheckOut</button>
        </div>
      )
    }
    // return (
    //   <div>
    //     { this.state.checkOutClicked ? < Form1 /> :  <HomePage /> }
    //     { this.state.firstFormComplete ? < Form2 /> : < Form1 /> }
    //     { this.state.secondFormComplete ? < Form3 /> : < Form2 /> }
    //     { this.state.thirdFormComplete ? < Purchase /> : < Form3 /> }
    //     { this.state.purchaseClicked ? < Purchase /> :  <HomePage /> }
    //   </div>
    // )
  }
}

export default App;