import React from "react";
import GlossaryTerm from "./glossaryTerm.jsx";

const GlossaryList = ({terms}) => (
 <table>
    <tbody>
      {terms.map((term) => {
        console.log(term);
        return < GlossaryTerm term={term} />
      })}
    </tbody>
  </table>
);

export default GlossaryList;