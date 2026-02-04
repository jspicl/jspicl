import type {AstNodeVisitor} from "../../types.js";

export const ClassBody: AstNodeVisitor<ClassBody> = ({body}, {transpile}) =>
  `{
    ${transpile(body, {arraySeparator: ",\n"})}
  }`;
