import React from "react";

class GlossaryTerm extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props, 'in GlossaryTerm');
    this.state = {
      name: this.props.term.name,
      definition: this.props.term.definition,
      id: this.props.term._id,
      editing: false
    }
    // this.editOnClick = this.editOnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleTermEdit = this.handleTermEdit.bind(this);
    this.handleDefinitionEdit = this.handleDefinitionEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    console.log(this.props.term, 'this.props.term in handleDelete in GlossaryTerm');
    this.props.deleteHander(this.props.term); // should pass back term obj to be deleted
  }

  handleEditButton() {
    this.setState({
      editing: true
    })
  }

  handleTermEdit(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }

  handleDefinitionEdit(e) {
    e.preventDefault();
    this.setState({
      definition: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.name);
    console.log(this.state.definition);
    this.setState({
      editing: false
    });
    this.props.editHandler({
      _id: this.state.id,
      name: this.state.name,
      definition: this.state.definition });
  }

  render() {
    return (
      <tr>
        <td>{ this.state.name }</td>
        <td>{ this.state.definition }</td>
        <td>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.handleEditButton}>Edit</button>
          {this.state.editing ?
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="edit term" value={this.state.name} onChange={this.handleTermEdit}/>
            <input type="text" placeholder="edit definition" value={this.state.definition} onChange={this.handleDefinitionEdit}/>
            <input type="submit" value="Submit"/>
          </form> : null}
        </td>
      </tr>
    )
  }
}

// ({term, handleEdit, handleDelete}) => (
//   <tr>
//     <td>{ term.term } : </td>
//     <td>{term.definition}</td>
//   </tr>
// );

export default GlossaryTerm;

