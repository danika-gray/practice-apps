import React from "react";
import GlossaryTerm from "./glossaryTerm.jsx";

const GlossaryList = ({terms, handleEdit, handleDelete}) => (
 <table>
    <thead>
      <tr>
        <th> Term </th>
        <th> Definition </th>
        <th> Edit </th>
      </tr>
    </thead>
    <tbody>
      {terms.map((term) => {
        console.log(term, 'term in glossaryList');
        console.log(term._id, 'term id');
        return (< GlossaryTerm term={term} key={term._id} handleEdit={handleEdit}
        handleDelete={handleDelete}/>);
      })}
    </tbody>
  </table>
);

export default GlossaryList;