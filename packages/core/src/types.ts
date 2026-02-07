import type {ASTNode as GenericASTNode, TranspileFunction} from "trastpiler";

export type ASTNode =
  | Expression
  | Statement
  | Declaration
  | BindingPattern
  | GenericASTNode;

export type Options = {
  prettify?: boolean;
  customMappers?: Record<string, AstNodeVisitor>;
};

export type Output = {
  code: string;
  polyfills: Record<string, string>;
};

export type AstNodeVisitorOptions = {
  transpile: TranspileFunction;
  scope: {
    variables: Record<string, any>;
    [key: string]: any;
  };
};

export type AstNodeVisitor<T extends ASTNode = GenericASTNode> = {
  (node: T, options: AstNodeVisitorOptions): string;
  scopeBoundary?: boolean;
};
