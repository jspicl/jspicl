// import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#conditional-expression
export const ConditionalExpression = (/* { test, consequent, alternate } */) => {
  // const testExpression = transpile(test);
  // const consequentPath = transpile(consequent);
  // const alternatePath = transpile(alternate);

  // return `if (${testExpression}) then
  //   ${consequentPath}
  // else
  //   ${alternatePath}
  // end`;
  throw new Error("Conditional expressions such as 'a ? b : c;' are not supported.");
};
