import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassDeclaration = ({ id, body }) =>
  `local class_${transpile(id)} = function (...)
    local this = {}
    local classinstance = ${transpile(body)}
    classinstance.constructor(...)
    return classinstance
  end`;
