// import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#conditional-expression
export const ConditionalExpression = (/* { test, consequent, alternate } */) => {
  // const testExpression = traverser(test);
  // const consequentPath = traverser(consequent);
  // const alternatePath = traverser(alternate);
  throw new Error("Conditional expressions such as 'a ? b : c' are not supported.");
};