import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
export const SwitchStatement = ({ discriminant, cases }) => {

  var outputLua = transpile(cases[0])
  for (var i=1; i<cases.length; i++) {
     outputLua += "else" + transpile(cases[i])
  }

  return outputLua
};
