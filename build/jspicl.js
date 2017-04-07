'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esprima = _interopDefault(require('esprima'));

const FunctionDeclaration = ({ id, body, params }) => {
  const { name = "" } = id || {};
  const argumentList = traverser(params, { arraySeparator: ", " });
  const functionContent = traverser(body);
  return `
function ${name}(${argumentList})
  ${functionContent}
end`;
};

const VariableDeclaration = ({ declarations }) => {
  return traverser(declarations);
};

const VariableDeclarator = ({ id, init }) => {
  const { name } = id;
  const value = traverser(init) || "nil";
  return `local ${name} = ${value}`;
};



var declarationMapper = Object.freeze({
	FunctionDeclaration: FunctionDeclaration,
	VariableDeclaration: VariableDeclaration,
	VariableDeclarator: VariableDeclarator
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
const BlockStatement = ({ body }) => {
  return traverser(body);
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
const ExpressionStatement = ({ expression }) => {
  return traverser(expression);
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#if-statement
const IfStatement = ({ test, consequent, alternate }) => {
  const testExpression = traverser(test);
  const statementBody = traverser(consequent);
  const alternateStatement = traverser(alternate);

  const closingStatement = alternateStatement && `else${alternateStatement}` || "end";

  return `if (${testExpression}) then
    ${statementBody}
  ${closingStatement}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#return-statement
const ReturnStatement = ({ argument }) => {
  const value = traverser(argument) || "nil";

  return `return ${value}`;
};



var statementMapper = Object.freeze({
	BlockStatement: BlockStatement,
	ExpressionStatement: ExpressionStatement,
	IfStatement: IfStatement,
	ReturnStatement: ReturnStatement
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
const ArrayExpression = ({ elements }) => {
  return `{
    ${traverser(elements, { arraySeparator: ", " })}
  }`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#assignment-expression
const AssignmentExpression = ({ operator, left, right }) => {
  const leftExpression = traverser(left);
  const rightExpression = traverser(right);

  return `${leftExpression} ${operator} ${rightExpression}`;
};

const operatorTable = {
  "!==": "!=",
  "===": "==",
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#binary-expression
const BinaryExpression = ({ operator, left, right }) => {
  let leftExpression = traverser(left);
  let rightExpression = traverser(right);
  const luaOperator = operatorTable[operator] || operator;

  if (luaOperator === "*" || luaOperator === "/" || luaOperator === "%") {
    if (left.type === BinaryExpression.name) {
      leftExpression = `(${leftExpression})`;
    }

    if (right.type === BinaryExpression.name) {
      rightExpression = `(${leftExpression})`;
    }
  }

  return `${leftExpression} ${luaOperator} ${rightExpression}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const CallExpression = ({ callee, arguments: args }) => {
  const argumentList = traverser(args, { arraySeparator: ", " });

  if (callee.object) {
    const objectName = callee.object.name;
    const propertyName = callee.property.name;
    const objectCallName = `${objectName}.${propertyName}`;
    return `${objectCallName}(${argumentList})`;
  }
  else {
    return `${callee.name}(${argumentList})`;
  }
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
const FunctionExpression = ({ id, params, body }) => {
  const { name = "" } = id || {};
  const argumentList = traverser(params, { arraySeparator: ", " });
  const functionContent = traverser(body);
  return `function ${name}(${argumentList})
  ${functionContent}
end`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
const Identifier = ({ name, value }) => value || name;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#literal
const Literal = ({ raw }) => raw;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
const LogicalExpression = ({ operator, left, right }) => {
  const leftExpression = traverser(left);
  const rightExpression = traverser(right);
  const op = operator === "||" ? "OR" : "AND";

  return `${leftExpression} ${op} ${rightExpression}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
const MemberExpression = ({ object, property }) => {
  const objectName = traverser(object);
  const propertyName = traverser(property);

  return `${objectName}.${propertyName}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const ObjectExpression = ({ properties }) => {
  return `{
    ${traverser(properties, { arraySeparator: ",\n" })}
  }`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const Property = ({ key, value }) => {
  const { name } = key;

  return `${name} = ${traverser(value)}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
const SequenceExpression = ({ expressions }) => {
  return traverser(expressions, { arraySeparator: "\n" });
};

const SpreadProperty = () => {
  throw new Error(`${SpreadProperty.name} is not supported yet`);
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#unary-expression
const UnaryExpression = ({ operator, argument }) => {
  const { type } = argument;
  const value = traverser(argument);
  const expression = type === UnaryExpression.name || operator !== "~" ? value : `(${value})`;

  return operator === "void" ? "nil" : `${operator}${expression}`;
};



var expressionMapper = Object.freeze({
	ArrayExpression: ArrayExpression,
	AssignmentExpression: AssignmentExpression,
	BinaryExpression: BinaryExpression,
	CallExpression: CallExpression,
	FunctionExpression: FunctionExpression,
	Identifier: Identifier,
	Literal: Literal,
	LogicalExpression: LogicalExpression,
	MemberExpression: MemberExpression,
	ObjectExpression: ObjectExpression,
	Property: Property,
	SequenceExpression: SequenceExpression,
	SpreadProperty: SpreadProperty,
	UnaryExpression: UnaryExpression
});

var mapper = Object.assign({},
  declarationMapper,
  statementMapper,
  expressionMapper);

var traverser = (item, { arraySeparator = "\n" } = {}) => {
  return Array.isArray(item) ? item.map(executor).join(arraySeparator) : executor(item);
};

function executor (item) {
  if (!item) {
    return;
  }

  const result = mapper[item.type] && mapper[item.type](item);
  return result !== undefined ? result : console.log(`Traverser: There is no handler for ${item.type}, skipping.`); // eslint-disable-line no-console
}

var index = (source) => {
  const tree = esprima.parse(source);
  return traverser(tree.body);
};

module.exports = index;
