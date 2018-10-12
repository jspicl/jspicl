// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassDeclaration = ({ id, body }, { transpile }) =>
  `local class_${transpile(id)} = function (...)
    local this = {}
    local classinstance = ${transpile(body)}
    if (classinstance.constructor) classinstance.constructor(...)
    return classinstance
  end`;
