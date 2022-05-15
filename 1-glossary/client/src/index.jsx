import React from "react";
import axios from "axios";
import { render } from "react-dom";
import GlossaryList from "./components/glossaryList.jsx";
import InputTerm from "./components/inputTerm.jsx";
import Search from "./components/Search.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      searchTerms: [],
      searchFound: false,
      searchNotFound: false
    }
    this.getData = this.getData.bind(this);
    this.handleNewInput = this.handleNewInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleNewInput(termObj) {
    axios.post('/terms', termObj)
      .then((res) => {
        this.getData(termObj.term);
      })
      .catch((err) => {
        alert(err);
      });
  }

  getData(term) {
    if (term === undefined) {
      axios.get('/terms')
      .then((res) => {
        let newTerms = this.state.terms.slice();
        res.data.forEach((obj) => {
          newTerms.push(obj);
        });
        this.setState({
          terms: newTerms
        });
      })
      .catch((err) => {
        alert(err);
      });
    } else {
      axios.get(`/term/${term}`)
        .then((res) => {
          let newTerms = this.state.terms.slice();
          newTerms.push(res.data);
          this.setState({
            terms: newTerms
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  handleSearch(text) {
    axios.get(`/terms/search=${text}`)
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({
            searchNotFound: true
          })
        } else {
          this.setState({
            searchTerms: res.data,
            searchFound: true
          })
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  handleDelete(target) {
    console.log(target, 'target in handle delete');
    axios.delete(`/terms/${target._id}`)
      .then((res) => {
        console.log(res.data, 'res.data in delete');

        let termsCopy = this.state.terms.slice();
        console.log(termsCopy, 'termsCopy');
        let newTerms = termsCopy.filter((term) => {
          if (term._id !== target._id) {
            return true;
          }
        });
        console.log(newTerms, 'terms after filter');
        if (this.state.searchTerms.length !== 0) {
          let searchTermsCopy = this.state.searchTerms.slice();
          newSearchTerms = searchTermsCopy.filter((term) => {
            if (term._id !== target._id) {
              return true;
            }
          });
          this.setState({
            searchTerms: newSearchTerms
          })
        }
        this.setState({
          terms: newTerms
        });
      })
      .catch((err) => {
        alert(err);
      })
  }

  handleEdit(editedObj) {
    console.log(editedObj, 'editedObj');
    console.log(typeof editedObj, 'editedObj');
    let id = editedObj._id.toString();
    console.log(typeof id, 'id after to string');

    // send editedObj with put request
    axios.put(`/terms/${id}`, editedObj)
      .then((res) => {
        return axios.get(`/term/${editedObj.name}`);
      })
      .then((res) => {
        console.log(res.data, 'res.data in handleEdit after get');
        let termsCopy = this.state.terms.slice();
        let newTerms = termsCopy.map((term) => {
          if (term._id === editedObj._id) {
            term.name = editedObj.name;
            term.definition = editedObj.definition;
          }
          return term;
        })
        this.setState({
          terms: newTerms
        })
        if (this.state.searchTerms.length !== 0) {
          let searchTermsCopy = this.state.searchTerms.slice();
          let newSearchTerms = searchTermsCopy.map((term) => {
            if (term._id === editedObj._id) {
              term.name = editedObj.name;
              term.definition = editedObj.definition;
            }
            return term;
          });
          this.setState({
            searchTerms: newSearchTerms
          });
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  render() {
    return (
      <div>
         <h2>GLOSSARY</h2>
          <InputTerm handler={this.handleNewInput} />
          <Search handler={this.handleSearch} />
          <div> {this.state.searchNotFound ? <h2>Term Not Found</h2> : null } </div>
          <GlossaryList terms={this.state.searchFound ? this.state.searchTerms : this.state.terms}
          deleteHander={this.handleDelete} editHandler={this.handleEdit}/>
      </div>
    )
  }
};

render( <App />, document.getElementById("root"))

// handleEdit={this.handleEdit} handleDelete={this.handleDelete}
