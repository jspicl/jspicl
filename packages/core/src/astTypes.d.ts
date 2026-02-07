// Esprima AST node type definitions
// Source: https://docs.esprima.org/en/latest/syntax-tree-format.html

import type {ASTNode} from "trastpiler";

declare global {
  // ---------------------------------------------------------------------------
  // Base
  // ---------------------------------------------------------------------------

  export interface Position {
    line: number;
    column: number;
  }

  export interface SourceLocation {
    start: Position;
    end: Position;
    source?: string | null;
  }

  // ---------------------------------------------------------------------------
  // Binding Patterns
  // ---------------------------------------------------------------------------

  export type BindingPattern = ArrayPattern | ObjectPattern;

  export interface ArrayPattern extends ASTNode {
    type: "ArrayPattern";
    elements: ArrayPatternElement[];
  }

  export type ArrayPatternElement =
    | AssignmentPattern
    | Identifier
    | BindingPattern
    | RestElement
    | null;

  export interface RestElement extends ASTNode {
    type: "RestElement";
    argument: Identifier | BindingPattern;
  }

  export interface AssignmentPattern extends ASTNode {
    type: "AssignmentPattern";
    left: Identifier | BindingPattern;
    right: Expression;
  }

  export interface ObjectPattern extends ASTNode {
    type: "ObjectPattern";
    properties: Property[];
  }

  // ---------------------------------------------------------------------------
  // Expressions
  // ---------------------------------------------------------------------------

  export type Expression =
    | ThisExpression
    | Identifier
    | Literal
    | ArrayExpression
    | ObjectExpression
    | FunctionExpression
    | ArrowFunctionExpression
    | ClassExpression
    | TaggedTemplateExpression
    | MemberExpression
    | Super
    | MetaProperty
    | NewExpression
    | CallExpression
    | UpdateExpression
    | AwaitExpression
    | UnaryExpression
    | BinaryExpression
    | LogicalExpression
    | ConditionalExpression
    | YieldExpression
    | AssignmentExpression
    | SequenceExpression
    | TemplateLiteral;

  export interface ThisExpression extends ASTNode {
    type: "ThisExpression";
  }

  export interface Identifier extends ASTNode {
    type: "Identifier";
    name: string;
  }

  export interface Literal extends ASTNode {
    type: "Literal";
    value: boolean | number | string | RegExp | null;
    raw: string;
    regex?: {pattern: string; flags: string};
  }

  export interface ArrayExpression extends ASTNode {
    type: "ArrayExpression";
    elements: ArrayExpressionElement[];
  }

  export type ArrayExpressionElement = Expression | SpreadElement;

  export interface ObjectExpression extends ASTNode {
    type: "ObjectExpression";
    properties: Property[];
  }

  export interface Property extends ASTNode {
    type: "Property";
    key: Expression;
    computed: boolean;
    value: Expression | AssignmentPattern | BindingPattern | null;
    kind: "get" | "set" | "init";
    method: boolean;
    shorthand: boolean;
  }

  export type FunctionParameter =
    | AssignmentPattern
    | Identifier
    | BindingPattern;

  export interface FunctionExpression extends ASTNode {
    type: "FunctionExpression";
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator?: boolean;
    async?: boolean;
    expression?: boolean;
  }

  export interface ArrowFunctionExpression extends ASTNode {
    type: "ArrowFunctionExpression";
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement | Expression;
    generator?: boolean;
    async?: boolean;
    expression?: boolean;
  }

  export interface ClassExpression extends ASTNode {
    type: "ClassExpression";
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
  }

  export interface ClassBody extends ASTNode {
    type: "ClassBody";
    body: MethodDefinition[];
  }

  export interface MethodDefinition extends ASTNode {
    type: "MethodDefinition";
    key: Expression | null;
    computed: boolean;
    value: FunctionExpression | null;
    kind: "method" | "constructor";
    static: boolean;
  }

  export interface TaggedTemplateExpression extends ASTNode {
    type: "TaggedTemplateExpression";
    tag: Expression;
    quasi: TemplateLiteral;
  }

  export interface TemplateElement extends ASTNode {
    type: "TemplateElement";
    value: {cooked: string; raw: string};
    tail: boolean;
  }

  export interface TemplateLiteral extends ASTNode {
    type: "TemplateLiteral";
    quasis: TemplateElement[];
    expressions: Expression[];
  }

  export interface MemberExpression extends ASTNode {
    type: "MemberExpression";
    computed: boolean;
    object: Expression;
    property: Expression;
  }

  export interface Super extends ASTNode {
    type: "Super";
  }

  export interface MetaProperty extends ASTNode {
    type: "MetaProperty";
    meta: Identifier;
    property: Identifier;
  }

  export interface CallExpression extends ASTNode {
    type: "CallExpression";
    callee: Expression | Import;
    arguments: ArgumentListElement[];
  }

  export interface NewExpression extends ASTNode {
    type: "NewExpression";
    callee: Expression;
    arguments: ArgumentListElement[];
  }

  export interface Import extends ASTNode {
    type: "Import";
  }

  export type ArgumentListElement = Expression | SpreadElement;

  export interface SpreadElement extends ASTNode {
    type: "SpreadElement";
    argument: Expression;
  }

  export interface UpdateExpression extends ASTNode {
    type: "UpdateExpression";
    operator: "++" | "--";
    argument: Expression;
    prefix: boolean;
  }

  export interface AwaitExpression extends ASTNode {
    type: "AwaitExpression";
    argument: Expression;
  }

  export interface UnaryExpression extends ASTNode {
    type: "UnaryExpression";
    operator: "+" | "-" | "~" | "!" | "delete" | "void" | "typeof";
    argument: Expression;
    prefix: true;
  }

  export interface BinaryExpression extends ASTNode {
    type: "BinaryExpression";
    operator:
      | "instanceof"
      | "in"
      | "+"
      | "-"
      | "*"
      | "/"
      | "%"
      | "**"
      | "|"
      | "^"
      | "&"
      | "=="
      | "!="
      | "==="
      | "!=="
      | "<"
      | ">"
      | "<="
      | ">="
      | "<<"
      | ">>"
      | ">>>";
    left: Expression;
    right: Expression;
  }

  export interface LogicalExpression extends ASTNode {
    type: "LogicalExpression";
    operator: "||" | "&&";
    left: Expression;
    right: Expression;
  }

  export interface ConditionalExpression extends ASTNode {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
  }

  export interface YieldExpression extends ASTNode {
    type: "YieldExpression";
    argument: Expression | null;
    delegate: boolean;
  }

  export interface AssignmentExpression extends ASTNode {
    type: "AssignmentExpression";
    operator:
      | "="
      | "*="
      | "**="
      | "/="
      | "%="
      | "+="
      | "-="
      | "<<="
      | ">>="
      | ">>>="
      | "&="
      | "^="
      | "|=";
    left: Expression;
    right: Expression;
  }

  export interface SequenceExpression extends ASTNode {
    type: "SequenceExpression";
    expressions: Expression[];
  }

  // ---------------------------------------------------------------------------
  // Statements
  // ---------------------------------------------------------------------------

  export type Statement =
    | BlockStatement
    | BreakStatement
    | ContinueStatement
    | DebuggerStatement
    | DoWhileStatement
    | EmptyStatement
    | ExpressionStatement
    | ForStatement
    | ForInStatement
    | ForOfStatement
    | FunctionDeclaration
    | IfStatement
    | LabeledStatement
    | ReturnStatement
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | VariableDeclaration
    | WhileStatement
    | WithStatement;

  export interface BlockStatement extends ASTNode {
    type: "BlockStatement";
    body: StatementListItem[];
  }

  export interface BreakStatement extends ASTNode {
    type: "BreakStatement";
    label: Identifier | null;
  }

  export interface ContinueStatement extends ASTNode {
    type: "ContinueStatement";
    label: Identifier | null;
  }

  export interface DebuggerStatement extends ASTNode {
    type: "DebuggerStatement";
  }

  export interface DoWhileStatement extends ASTNode {
    type: "DoWhileStatement";
    body: Statement;
    test: Expression;
  }

  export interface EmptyStatement extends ASTNode {
    type: "EmptyStatement";
  }

  export interface ExpressionStatement extends ASTNode {
    type: "ExpressionStatement";
    expression: Expression;
    directive?: string;
  }

  export interface ForStatement extends ASTNode {
    type: "ForStatement";
    init: Expression | VariableDeclaration | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
  }

  export interface ForInStatement extends ASTNode {
    type: "ForInStatement";
    left: Expression;
    right: Expression;
    body: Statement;
    each: false;
  }

  export interface ForOfStatement extends ASTNode {
    type: "ForOfStatement";
    left: Expression;
    right: Expression;
    body: Statement;
  }

  export interface IfStatement extends ASTNode {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
  }

  export interface LabeledStatement extends ASTNode {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
  }

  export interface ReturnStatement extends ASTNode {
    type: "ReturnStatement";
    argument: Expression | null;
  }

  export interface SwitchStatement extends ASTNode {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: SwitchCase[];
  }

  export interface SwitchCase extends ASTNode {
    type: "SwitchCase";
    test: Expression | null;
    consequent: Statement[];
  }

  export interface ThrowStatement extends ASTNode {
    type: "ThrowStatement";
    argument: Expression;
  }

  export interface TryStatement extends ASTNode {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
  }

  export interface CatchClause extends ASTNode {
    type: "CatchClause";
    param: Identifier | BindingPattern;
    body: BlockStatement;
  }

  export interface WhileStatement extends ASTNode {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
  }

  export interface WithStatement extends ASTNode {
    type: "WithStatement";
    object: Expression;
    body: Statement;
  }

  // ---------------------------------------------------------------------------
  // Declarations
  // ---------------------------------------------------------------------------

  export type Declaration =
    | ClassDeclaration
    | FunctionDeclaration
    | VariableDeclaration;

  export interface ClassDeclaration extends ASTNode {
    type: "ClassDeclaration";
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
  }

  export interface FunctionDeclaration extends ASTNode {
    type: "FunctionDeclaration";
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator?: boolean;
    async?: boolean;
    expression?: false;
  }

  export interface VariableDeclaration extends ASTNode {
    type: "VariableDeclaration";
    declarations: VariableDeclarator[];
    kind: "var" | "const" | "let";
  }

  export interface VariableDeclarator extends ASTNode {
    type: "VariableDeclarator";
    id: Identifier | BindingPattern;
    init: Expression | null;
  }

  // ---------------------------------------------------------------------------
  // Programs & Modules
  // ---------------------------------------------------------------------------

  export type StatementListItem = Declaration | Statement;
  export type ModuleItem =
    | ImportDeclaration
    | ExportDeclaration
    | StatementListItem;

  export interface Program extends ASTNode {
    type: "Program";
    sourceType: "script" | "module";
    body: StatementListItem[] | ModuleItem[];
  }

  export interface ImportDeclaration extends ASTNode {
    type: "ImportDeclaration";
    specifiers: (
      | ImportSpecifier
      | ImportDefaultSpecifier
      | ImportNamespaceSpecifier
    )[];
    source: Literal;
  }

  export interface ImportSpecifier extends ASTNode {
    type: "ImportSpecifier";
    local: Identifier;
    imported: Identifier;
  }

  export interface ImportDefaultSpecifier extends ASTNode {
    type: "ImportDefaultSpecifier";
    local: Identifier;
  }

  export interface ImportNamespaceSpecifier extends ASTNode {
    type: "ImportNamespaceSpecifier";
    local: Identifier;
  }

  export type ExportDeclaration =
    | ExportAllDeclaration
    | ExportDefaultDeclaration
    | ExportNamedDeclaration;

  export interface ExportAllDeclaration extends ASTNode {
    type: "ExportAllDeclaration";
    source: Literal;
  }

  export interface ExportDefaultDeclaration extends ASTNode {
    type: "ExportDefaultDeclaration";
    declaration:
      | Identifier
      | BindingPattern
      | ClassDeclaration
      | Expression
      | FunctionDeclaration;
  }

  export interface ExportNamedDeclaration extends ASTNode {
    type: "ExportNamedDeclaration";
    declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
    specifiers: ExportSpecifier[];
    source: Literal;
  }

  export interface ExportSpecifier extends ASTNode {
    type: "ExportSpecifier";
    exported: Identifier;
    local: Identifier;
  }
}
