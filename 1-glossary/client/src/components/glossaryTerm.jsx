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
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }

  deleteOnClick(e) {
    e.preventDefault();
    console.log(this.state, 'delete on click');
    this.props.handleDelete(this.state);
  }

  render() {
    return (
      <tr>
        <td>{ this.state.term } </td>
        <td>{ this.state.definition } </td>
        <td>
          <button>Edit</button>
          <button onClick={this.deleteOnClick}>Delete</button>
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

