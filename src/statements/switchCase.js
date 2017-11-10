import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
export const SwitchCase = ({ test, consequent }) => {

    var transpiledTest = transpile(test);

    if (transpiledTest) {
        return `if ${transpiledTest} then\n${transpile(consequent)}\n`; 
    }

    return `\n${transpile(consequent)} \nend\n`; 
};
