'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esprima = _interopDefault(require('esprima'));

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
const FunctionDeclaration = ({ id, body, params }) => {
  const { name = "" } = id || {};
  const argumentList = transpile(params, { arraySeparator: ", " });
  const functionContent = transpile(body);

  return `
function ${name}(${argumentList})
  ${functionContent}
end`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
const VariableDeclaration = ({ declarations }) => transpile(declarations);

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
const VariableDeclarator = ({ id, init }) => {
  const { name } = id;
  const value = transpile(init) || "nil";

  return `local ${name} = ${value}`;
};



var declarationMapper = Object.freeze({
	FunctionDeclaration: FunctionDeclaration,
	VariableDeclaration: VariableDeclaration,
	VariableDeclarator: VariableDeclarator
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
const ArrayExpression = ({ elements }) => {
  return `{
    ${transpile(elements, { arraySeparator: ", " })}
  }`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#assignment-expression
const AssignmentExpression = ({ operator, left, right }) => {
  const leftExpression = transpile(left);
  const rightExpression = transpile(right);

  return `${leftExpression} ${operator} ${rightExpression}`;
};

const operatorTable = {
  "!==": "!=",
  "===": "=="
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#binary-expression
const BinaryExpression = ({ operator, left, right }) => {
  let leftExpression = transpile(left);
  let rightExpression = transpile(right);
  const luaOperator = operatorTable[operator] || operator;

  if (luaOperator === "*" || luaOperator === "/" || luaOperator === "%") {
    if (left.type === BinaryExpression.name) {
      leftExpression = `(${leftExpression})`;
    }

    if (right.type === BinaryExpression.name) {
      rightExpression = `(${rightExpression})`;
    }
  }

  return `${leftExpression} ${luaOperator} ${rightExpression}`;
};

const _assign = `
function _assign(sources)
  local target = sources[1]
  del(sources, target)
  for source in all(sources) do
    for key, value in pairs(source) do
      target[key] = value
    end
  end

  return target
end
`;

const _filter = `
function _filter(collection, predicate)
  local result = {}
  for value in all(collection) do
    if predicate(value) then
      add(result, value)
    end
  end

  return result
end
`;

const _includes = `
function _includes(collection, searchelement)
  for value in all(collection) do
    if value == searchelement then
      return true
    end
  end

  return false
end
`;

const _join = `
function _join(collection, separator)
  local result = ""
  for value in all(collection) do
    result = result..separator..tostr(value)
  end

  if separator != "" then
    result = sub(result, 2)
  end

  return result
end
`;

const _map = `
function _map(collection, callback)
  local result = {}
  for value in all(collection) do
    add(result, callback(value))
  end

  return result
end
`;

const _objmap = `
function _objmap(source, mapper)
  local result = {}
  for key, value in pairs(source) do
    add(result, mapper(key, value))
  end

  return result
end
`;

const _reduce = `
function _reduce(collection, callback, initialvalue)
  local result = collection[1]
  local startindex = 2
  if initialvalue then
    result = initialvalue
    startindex = 1
  end

  for i=startindex, #collection do
    result = callback(result, collection[i])
  end

  return result
end
`;

const _tostring = `
function _tostring(input, level)
  level = max(level, 1)
  local output = ""

  if type(input) != "table" then
    return tostr(input)
  end

  local indentation = ""
  for i=2, level do
    indentation = indentation.."  "
  end

  for key, value in pairs(input) do
    if type(value) == "table" then
      output = output..indentation.."  "..key..": ".._tostring(value, level + 1).."\\n"
    elseif type(key) != "number" then
      output = output..indentation.."  "..key..": ".._tostring(value, level + 1).."\\n"
    else
      output = output..value..", "
    end
  end

  if sub(output, -2) == ", " then
    output = indentation.."  "..sub(output, 1, -3).."\\n" -- remove last comma
  end

  return "{\\n"..output..indentation.."}"
end
`;



var polyfills = Object.freeze({
	_assign: _assign,
	_filter: _filter,
	_includes: _includes,
	_join: _join,
	_map: _map,
	_objmap: _objmap,
	_reduce: _reduce,
	_tostring: _tostring
});

function getRequiredPolyfills (luaCode) {
  // Scan through the code to find polyfills (e.g. _filter())
  return [...new Set(luaCode.match(/_\w+\(/g))]
    .map(match => {
      // Remove the '(' character from the match
      const polyfillId = match.substr(0, match.length - 1);
      return polyfills[polyfillId];
    })
    .filter(polyfill => polyfill)
    .join("\n");
}

function mapToPolyfill (args = {}) {
  const {
    context = "",
    functionName = "",
    argumentList = "",
    general = false,
    array = false
  } = args;

  const callExpression = context && `${context}.${functionName}` || functionName;

  if (general && generalPolyfillMap.hasOwnProperty(callExpression)) {
    return generalPolyfillMap[callExpression](argumentList);
  }
  else if (array && context && functionName && arrayPolyfillMap.hasOwnProperty(functionName)) {
    return arrayPolyfillMap[functionName](context, argumentList);
  }

  return `${callExpression}(${argumentList})`;
}

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const CallExpression = ({ callee, arguments: args }) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    const context = transpile(callee.object);
    const functionName = transpile(callee.property);

    return mapToPolyfill({ context, functionName, argumentList, general: true, array: true });
  }

  // Regular function call
  return `${callee.name}(${argumentList})`;
};

// import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#conditional-expression
const ConditionalExpression = (/* { test, consequent, alternate } */) => {
  // const testExpression = transpile(test);
  // const consequentPath = transpile(consequent);
  // const alternatePath = transpile(alternate);

  // return `if (${testExpression}) then
  //   ${consequentPath}
  // else
  //   ${alternatePath}
  // end`;
  throw new Error("Conditional expressions such as 'a ? b : c;' are not supported.");
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
const FunctionExpression = ({ id, params, body }) => {
  const { name = "" } = id || {};
  const argumentList = transpile(params, { arraySeparator: ", " });
  const functionContent = transpile(body);

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
  return specialCases.hasOwnProperty(identifier) && specialCases[identifier] || identifier;
};

const specialCases$1 = {
  null: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#literal
const Literal = ({ raw }) => specialCases$1[raw] || raw;

const wrapWithParanthesesIfNeeded = (type, operator, expression) => type === LogicalExpression.name && operator === "and" ? `(${expression})` : expression; // eslint-disable-line no-use-before-define

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
const LogicalExpression = ({ operator, left, right }) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = wrapWithParanthesesIfNeeded(left.type, logicalOperator, transpile(left));
  const rightExpression = wrapWithParanthesesIfNeeded(right.type, logicalOperator, transpile(right));

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
const MemberExpression = ({ object, property }) => {
  const objectName = transpile(object);
  const propertyName = transpile(property);

  return `${objectName}.${propertyName}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const ObjectExpression = ({ properties }) => {
  return `{
    ${transpile(properties, { arraySeparator: ",\n" })}
  }`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const Property = ({ key, value }) => {
  const { name } = key;

  return `${name} = ${transpile(value)}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
const SequenceExpression = ({ expressions }) => {
  return transpile(expressions, { arraySeparator: "\n" });
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#unary-expression
const UnaryExpression = ({ operator, argument }) => {
  const { type } = argument;
  const value = transpile(argument);
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
	UnaryExpression: UnaryExpression
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
const BlockStatement = ({ body }) => {
  return transpile(body);
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
const ExpressionStatement = ({ expression }) => {
  return transpile(expression);
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#if-statement
const IfStatement = ({ test, consequent, alternate }) => {
  const testExpression = transpile(test);
  const statementBody = transpile(consequent);
  const alternateStatement = transpile(alternate);

  const alternateIsIfStatement = alternate && alternate.type === IfStatement.name;

  let closingStatement = "end";
  if (alternateStatement) {
    closingStatement = alternateIsIfStatement ? `else${alternateStatement}` : `else ${alternateStatement} end`;
  }

  return `if (${testExpression}) then
    ${statementBody}
  ${closingStatement}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#return-statement
const ReturnStatement = ({ argument }) => {
  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};



var statementMapper = Object.freeze({
	BlockStatement: BlockStatement,
	ExpressionStatement: ExpressionStatement,
	IfStatement: IfStatement,
	ReturnStatement: ReturnStatement
});

const mappers = Object.assign({},
  declarationMapper,
  expressionMapper,
  statementMapper
);

const generalPolyfillMap = {
  "console.log": argument => `printh(${argument})`,
  "Math.max": values => `max(${values})`,
  "Math.floor": value => `flr(${value})`,
  "Math.random": () => "rnd()",
  "Object.assign": values => `_assign({${values}})`,
  "Object.entries": values => `_objmap(${values}, function(key, value) return {key, value} end)`,
  "Object.keys": values => `_objmap(${values}, function(key, value) return key end)`,
  "Object.values": values => `_objmap(${values}, function(key, value) return value end)`
};

const arrayPolyfillMap = {
  filter: (context, args) => `_filter(${context}, ${args})`,
  forEach: (context, args) => `foreach(${context}, ${args})`,
  includes: (context, arg) => `_includes(${context}, ${arg})`,
  join: (context, args) => `_join(${context}, ${args})`,
  map: (context, args) => `_map(${context}, ${args})`,
  push: (context, args) => `add(${context}, ${args})`,
  reduce: (context, args) => `_reduce(${context}, ${args})`,
  toString: context => `_tostring(${context})`
};

function transpile (node, { arraySeparator = "\n" } = {}) {
  return Array.isArray(node) ? node.map(executor).join(arraySeparator) : executor(node);
}

function executor (node) {
  if (!node) {
    return;
  }

  // Attempt to find the specific declaration, expression or statement
  const mapper = mappers[node.type];

  const result = mapper && mapper(node);
  return result !== undefined ? result : console.error(`Transpile: There is no handler for ${node.type}, skipping.`); // eslint-disable-line no-console
}

function jspicl (source) {
  const tree = esprima.parse(source);
  const output = transpile(tree.body);
  const polyfills = getRequiredPolyfills(output);

  return {
    polyfills,
    output
  };
}

module.exports = jspicl;
