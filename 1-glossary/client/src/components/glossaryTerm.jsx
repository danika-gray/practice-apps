import React from "react";

class GlossaryTerm extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props, 'in GlossaryTerm');
    this.state = {
      term: this.props.term.name,
      definition: this.props.term.definition,
      id: this.props.term._id
    }
    // this.editOnClick = this.editOnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    console.log(this.props.term, 'this.props.term in handleDelete in GlossaryTerm');
    this.props.deleteHander(this.props.term); // should pass back term obj to be deleted
  }

  render() {
    return (
      <tr>
        <td>{ this.state.term }</td>
        <td>{ this.state.definition }</td>
        <td>
          <button>Edit</button>
          <button onClick={this.handleDelete}>Delete</button>
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

