import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
export const VariableDeclaration = ({ declarations }) => transpile(declarations);
