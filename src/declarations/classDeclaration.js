import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassDeclaration = ({ id, body }) => {
  const className = `class_${transpile(id)}`;

  return `local ${className} = function (...)
    local this = {}
    local classinstance = ${transpile(body)}
    classinstance.constructor(...)
    return classinstance
  end`;
};
