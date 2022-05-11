import React from "react";
import { render } from "react-dom";
import GlossaryList from "./components/glossaryList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [{term: 'dog', definition: 'a beloved canine pet'}]
    }
  }

  render() {
    return (
      <div>
         <p>HELLO WORLD</p>
         <GlossaryList terms={this.state.terms} />
      </div>
    )
  }
};

render( <App />, document.getElementById("root"))
