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
    this.getData = this.getData.bind(this);
    this.handleNewInput = this.handleNewInput.bind(this);
    //this.handleEdit = this.handleEdit.bind(this);
    //this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleNewInput(termObj) {
    axios.post('/terms', termObj)
      .then((res) => {
        console.log(res.data, 'res.data from post');
        console.log('here trying to send a get request');
        console.log(termObj, 'termObj');
        this.getData(termObj.term);
      })
      // .then(() => {

      // })
      .catch((err) => {
        alert(err);
      });
  }

  getData(term) {
    console.log('here in getData');
    if (term === undefined) {
      axios.get('/terms')
      .then((res) => {
        console.log(res.data, 'res.data from get');
        let newTerms = this.state.terms.slice();
        res.data.forEach((obj) => {
          newTerms.push(obj);
        });
        this.setState({
          terms: newTerms
        });
        console.log(this.state);
      })
      .catch((err) => {
        alert(err);
      });
    } else {
      axios.get(`/terms/${term}`)
        .then((res) => {
          console.log(res.data, 'res.data from get');
          let newTerms = this.state.terms.slice();
          newTerms.push(res.data);
          this.setState({
            terms: newTerms
          });
          console.log(this.state, 'this.state after get for posted term or searched term');
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  // handleEdit(target, editedObj) {
  //   let editedTerms = this.state.terms.splice(index, 1, editedObj);
  //   this.setState({
  //     terms: editedTerms
  //   })
  // }

  // handleDelete(target) {
  //   // don't delete anything until it's actually deleted from the database
  //   // return id from handleDelete event/as target then use .filter
  //   // to go through array and remove only that item with matching id
  //   console.log(target.id);
  //   let index;
  //   for (let i = 0; i < this.state.terms.length; i++) {
  //     console.log(this.state.terms[i].id, 'in forloop');
  //     console.log(target.id, 'in forloop');
  //     if (this.state.terms[i].id === target.id) {
  //       console.log('here in if condition');
  //       index = i;
  //       break;
  //     }
  //   }
  //   console.log(index, 'index in delete');
  //   let editedTerms = this.state.terms.splice(index, 1);
  //   this.setState({
  //     terms: editedTerms
  //   })
  // }

  render() {
    return (
      <div>
         <p>HELLO WORLD</p>
          <InputTerm handler={this.handleNewInput} />
          <GlossaryList terms={this.state.terms} handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}/>
      </div>
    )
  }
};

render( <App />, document.getElementById("root"))
