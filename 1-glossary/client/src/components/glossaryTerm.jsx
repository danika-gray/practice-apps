import React from "react";

const GlossaryTerm = ({term}) => (
  <tr>
    <td>{ term.term } : </td>
    <td>{term.definition}</td>
  </tr>
);

export default GlossaryTerm;