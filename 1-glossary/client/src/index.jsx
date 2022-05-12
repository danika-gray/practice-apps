import React from "react";
import axios from "axios";
import { render } from "react-dom";
import GlossaryList from "./components/glossaryList.jsx";
import InputTerm from "./components/inputTerm.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [
        /*{term: 'dog', definition: 'canine pet', id: 1}*/
      ],
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(termObj) {
    // let newTerms = this.state.terms.slice();
    // newTerms.push(termObj);
    axios.post('/terms', termObj)
      .then((res) => {
        console.log(res.data, 'res.data from post');
      })
      .then(() => {
        console.log('here trying to send a get request')
        return axios.get(`/terms/${termObj.term}`)
      })
      .then((res) => {
        console.log(res.data, 'res.data from get');
        let newTerms = this.state.terms.slice();
        newTerms.push(res.data);
        this.setState({
          terms: newTerms
        });
        console.log(this.state);
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleEdit(target, editedObj) {

    let editedTerms = this.state.terms.splice(index, 1, editedObj);
    this.setState({
      terms: editedTerms
    })
  }

  handleDelete(target) {
    // don't delete anything until it's actually deleted from the database
    // return id from handleDelete event/as target then use .filter
    // to go through array and remove only that item with matching id
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
