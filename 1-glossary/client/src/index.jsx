import React from "react";
import { render } from "react-dom";
import GlossaryList from "./components/glossaryList.jsx";
import InputTerm from "./components/inputTerm.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [{term: 'dog', definition: 'a beloved canine pet', id: 1}],
      idVal: 0
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(termObj) {
    let newTerms = this.state.terms.slice();
    termObj.id = this.state.idVal;
    newVal = idVal + 1;
    newTerms.push(termObj);
    this.setState({
      terms: newTerms,
      idVal: newVal
    })
  }

  handleEdit(target, editedObj) {

    let editedTerms = this.state.terms.splice(index, 1, editedObj);
    this.setState({
      terms: editedTerms
    })
  }

  handleDelete(target) {
    console.log(target.id);
    let index;
    for (let i = 0; i < this.state.terms.length; i++) {
      console.log(this.state.terms[i].id, 'in forloop');
      console.log(target.id, 'in forloop');
      if (this.state.terms[i].id === target.id) {
        console.log('here in if condition');
        index = i;
        break;
      }
    }
    console.log(index, 'index in delete');
    let editedTerms = this.state.terms.splice(index, 1);
    this.setState({
      terms: editedTerms
    })
  }

  render() {
    return (
      <div>
         <p>HELLO WORLD</p>
          <InputTerm handler={this.handleInput} />
          <GlossaryList terms={this.state.terms} handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}/>
      </div>
    )
  }
};

render( <App />, document.getElementById("root"))
