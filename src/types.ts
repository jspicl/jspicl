export declare type JspiclOptions = {
  prettify?: boolean;
  customMappers?: Record<string, AstNodeParser>;
};

export declare type JspiclOutput = {
  code: string;
  polyfills: Record<string, string>;
};

export declare type AstNode = {
  type: string;
  [key: string]: any;
};

export declare type TranspileOptions = {arraySeparator?: string};
export declare type TranspileFunction = (
  node: AstNode,
  options?: TranspileOptions
) => string;

export declare type AstNodeParserOptions = {
  transpile: TranspileFunction;
  scope: {
    variables: Record<string, any>;
    [key: string]: any;
  };
};

export declare type AstNodeParser = {
  (node: Omit<AstNode, "type">, options: AstNodeParserOptions): string;
  scopeBoundary?: boolean;
};
