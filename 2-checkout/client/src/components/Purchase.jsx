import React from 'react';

const Purchase = ({session, handler}) => {
  console.log(session, 'this.props in Purchase');

  //return (<div>purchase...</div>)
  return (
    <div>
      <div>CONFIRMATION</div>
        <div>Contact:
        <div>Name: {session.name}</div>
        <div>Email: {session.email}</div>
        <div>Password: {session.password} characters</div>
      </div>
      <div>Address:
        <div>Line1: {session.line1}</div>
        <div>Line2: {session.line2}</div>
        <div>City: {session.city}</div>
        <div>State: {session.state}</div>
        <div>Zipcode: {session.zip}</div>
        <div>Phone Number: {session.phone}</div>
      </div>
      <div>Billing:
        <div>Credit Card #: {session.cc}</div>
        <div>Expiration Date: {session.expDate}</div>
        <div>CVV: {session.cvv} </div>
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