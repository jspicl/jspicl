import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassBody = ({ body }) => {
  const hasConstructor = body.find(({ kind }) => kind === "constructor");
  const constructor = !hasConstructor && "constructor = function () end" || "";

  return `{
    ${constructor}
    ${transpile(body, { arraySeparator: ",\n" })}
  }`;
};
