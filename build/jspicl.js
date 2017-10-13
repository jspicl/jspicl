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
  const value = traverser(argument);

  return value ? `return ${value}` : "do return end";
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

const generalPolyfills = {
  "Math.max": "max",
  "Math.floor": "flr",
  "Object.assign": "merge"
};

const arrayPolyfills = {
  "forEach": "foreach",
  "push": "add",
  "join": "join"
};

var polyfiller = (originalCallExpression = "", argumentList = "", { general = false, array = false } = {}) => {
  let callExpression = originalCallExpression;

  const callExpressionParts = callExpression.split(".");
  const objectName = callExpressionParts[0];
  const propertyName = callExpressionParts[callExpressionParts.length - 1];

  if (general && generalPolyfills.hasOwnProperty(callExpression)) {
    callExpression = generalPolyfills[callExpression];
  } else if (array && callExpressionParts.length && arrayPolyfills.hasOwnProperty(propertyName)) {
    callExpression = arrayPolyfills[propertyName];
    argumentList = `${objectName}, ${argumentList}`;
  }

  return `${callExpression}(${argumentList})`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const CallExpression = ({ callee, arguments: args }) => {
  let argumentList = traverser(args, { arraySeparator: ", " });

  if (callee.object) {
    const objectName = callee.object.name;
    const propertyName = callee.property.name;
    let objectCallName = `${objectName}.${propertyName}`;

    return polyfiller(objectCallName, argumentList, { general: true, array: true });
  }
  else {
    return `${callee.name}(${argumentList})`;
  }
};

// import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#conditional-expression
const ConditionalExpression = (/* { test, consequent, alternate } */) => {
  // const testExpression = traverser(test);
  // const consequentPath = traverser(consequent);
  // const alternatePath = traverser(alternate);
  throw new Error("Conditional expressions such as 'a ? b : c' are not supported.");
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

const specialCases = {
  undefined: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
const Identifier = ({ name, value }) => {
  const identifier = (value || name).replace(/\$/g, "_");
  return specialCases[identifier] || identifier;
};

const specialCases$1 = {
  null: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#literal
const Literal = ({ raw }) => specialCases$1[raw] || raw;

const decorateExpression = (type, operator, expression) => type === LogicalExpression.name && operator === "and" ? `(${expression})` : expression;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
const LogicalExpression = ({ operator, left, right }) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = decorateExpression(left.type, logicalOperator, traverser(left));
  const rightExpression = decorateExpression(right.type, logicalOperator, traverser(right));

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
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
  const luaOperator = operator === "!" ? "not " : operator;
  const expression = type === UnaryExpression.name || operator !== "~" ? value : `(${value})`;

  return operator === "void" ? "nil" : `${luaOperator}${expression}`;
};



var expressionMapper = Object.freeze({
	ArrayExpression: ArrayExpression,
	AssignmentExpression: AssignmentExpression,
	BinaryExpression: BinaryExpression,
	CallExpression: CallExpression,
	ConditionalExpression: ConditionalExpression,
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

var mappers = Object.assign({},
  declarationMapper,
  statementMapper,
  expressionMapper);

const polyfills = `
function merge(target, source)
  for key, value in pairs(source) do
    target[key] = value
  end
  return target
end
function join(table, separator)
  local result = ""
  for value in all(table) do
    result = result..separator..value
  end

  if (separator == "") then
    result = sub(result, 2)
  end

  return result
end
`;

var traverser = (item, { arraySeparator = "\n" } = {}) => {
  return Array.isArray(item) ? item.map(executor).join(arraySeparator) : executor(item);
};

function executor (item) {
  if (!item) {
    return;
  }

  const mapper = mappers[item.type];

  const result = mapper && mapper(item);
  return result !== undefined ? result : console.log(`Traverser: There is no handler for ${item.type}, skipping.`); // eslint-disable-line no-console
}

var index = (source) => {
  const tree = esprima.parse(source);
  const lua = traverser(tree.body);

  return `${polyfills}${lua}`;
};

module.exports = index;
