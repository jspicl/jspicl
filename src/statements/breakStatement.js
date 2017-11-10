import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#break-statement
export const BreakStatement = ({ expression }) => {
  //this is very stupid implementation of break for the purpose of switch/case statement.
  return ";"
};
