import type {TranspileFunction} from "trastpiler";

export type Options = {
  prettify?: boolean;
  customMappers?: Record<string, AstNodeVisitor>;
};

export type Output = {
  code: string;
  polyfills: Record<string, string>;
};

export type AstNode = {
  type: string;
  [key: string]: any;
};

export type AstNodeVisitorOptions = {
  transpile: TranspileFunction;
  scope: {
    variables: Record<string, any>;
    [key: string]: any;
  };
};

export type AstNodeVisitor = {
  (node: Omit<AstNode, "type">, options: AstNodeVisitorOptions): string;
  scopeBoundary?: boolean;
};
