import type {AstNodeVisitor} from "../../types.js";

export const ThisExpression: AstNodeVisitor<ThisExpression> = () => "this";
