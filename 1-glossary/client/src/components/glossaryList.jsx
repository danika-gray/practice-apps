import React from "react";
import GlossaryTerm from "./glossaryTerm.jsx";

const GlossaryList = ({terms, handleEdit, handleDelete}) => (
 <table>
    <tbody>
      {terms.map((term) => {
        return < GlossaryTerm term={term} handleEdit={handleEdit}
        handleDelete={handleDelete}/>
      })}
    </tbody>
  </table>
);

export default GlossaryList;