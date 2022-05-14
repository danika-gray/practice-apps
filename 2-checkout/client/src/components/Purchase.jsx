import React from 'react';

const Purchase = ({session, handler}) => {
  console.log(session, 'this.props in Purchase');

  //return (<div>purchase...</div>)
  return (
    <div>
      <div>CONFIRMATION</div>
        <div>
        <h2>Contact:</h2>
        <div>Name: {session.name}</div>
        <div>Email: {session.email}</div>
        <div>Password: {session.password}</div>
      </div>
      <div>
        <h2>Address:</h2>
        <div>Line1: {session.addressline1}</div>
        <div>Line2: {session.addressline2}</div>
        <div>City: {session.city}</div>
        <div>State: {session.state}</div>
        <div>Zipcode: {session.zip}</div>
        <div>Phone Number: {session.phone}</div>
      </div>
      <div>
        <h2>Billing:</h2>
        <div>Credit Card #: {session.creditCardNum}</div>
        <div>Expiration Date: {session.expDate}</div>
        <div>CVV: {session.CVV} </div>
        <div>Billing Zipcode: {session.billingZip} </div>
      </div>
      <button onClick={handler}>Purchase</button>
    </div>
    )
  };

  export default Purchase;

  // when someone clicks next
  // after posting data for form3
  // get data for purchase in same form3 handler function or make another one
  // that gets data and then switches the state to render Purchase with all the data
  // plus the purchase button which, when clicked, changes state back to homepage