'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esprima = _interopDefault(require('esprima'));

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
const ClassDeclaration = ({ id, body }) =>
  `local class_${transpile(id)} = function (...)
    local this = {}
    local classinstance = ${transpile(body)}
    classinstance.constructor(...)
    return classinstance
  end`;

const normalizeName = name => name.replace(/\$/g, "_");

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
const FunctionDeclaration = ({ id, body, params }) => {
  const { name = "" } = id || {};
  const argumentList = transpile(params, { arraySeparator: ", " });
  const functionContent = transpile(body);

  return `
  function ${normalizeName(name)}(${argumentList})
    ${functionContent}
  end`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
const VariableDeclaration = ({ declarations }) => transpile(declarations);

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
const VariableDeclarator = ({ id, init }, { variables }) => {
  const { name } = id;
  const normalizedName = normalizeName(name);
  const value = transpile(init) || "nil";

  // Store variable metadata in the scope
  // for accessibility
  variables[name] = {
    name: normalizedName
    // type:
  };

  return `local ${normalizedName} = ${value}`;
};



var declarationMapper = Object.freeze({
	ClassDeclaration: ClassDeclaration,
	FunctionDeclaration: FunctionDeclaration,
	VariableDeclaration: VariableDeclaration,
	VariableDeclarator: VariableDeclarator
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
const ArrayExpression = ({ elements }) =>
  `{
    ${transpile(elements, { arraySeparator: ", " })}
  }`;

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
function _byentries(key, value)
  return {key, value}
end

function _byvalues(key, value)
  return value
end

function _bykeys(key)
  return key
end

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

const getRequiredPolyfills = luaCode => {
  // Scan through the code to find polyfilled methods (e.g. _filter())
  return [...new Set(luaCode.match(/_\w+\(/g))]
    .map(match => {
      // Remove the '(' character from the match
      const polyfillId = match.substr(0, match.length - 1);
      return polyfills[polyfillId];
    })
    .filter(polyfill => polyfill)
    .join("\n");
};

const polyfillMemberExpression = (args = {}) => {
  const {
    computed,
    object,
    property
  } = args;

  const objectName = transpile(object);
  const propertyName = transpile(property);

  // TODO: Check metadata to determine where to look for the polyfill
  if (arrayPolyfillMap.hasOwnProperty(propertyName)) {
    return arrayPolyfillMap[propertyName](objectName);
  }

  return computed ? `${objectName}[${propertyName}]` : `${objectName}.${propertyName}`;
};

const polyfillCallExpression = (args = {}) => {
  const {
    callee,
    argumentList = ""
  } = args;

  const callExpression = transpile(callee);
  const context = transpile(callee.object);
  const functionName = transpile(callee.property);

  if (generalPolyfillMap.hasOwnProperty(callExpression)) {
    return generalPolyfillMap[callExpression](argumentList);
  }
  else if (context && functionName && arrayPolyfillMap.hasOwnProperty(functionName)) {
    return arrayPolyfillMap[functionName](context, argumentList);
  }

  return `${callExpression}(${argumentList})`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const CallExpression = ({ callee, arguments: args }) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    return polyfillCallExpression({ callee, argumentList });
  }

  // Regular function call
  return `${transpile(callee)}(${argumentList})`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
const ClassBody = ({ body }) => {
  const hasConstructor = body.find(({ kind }) => kind === "constructor");
  const constructor = !hasConstructor && "constructor = function () end" || "";

  return `{
    ${constructor}
    ${transpile(body, { arraySeparator: ",\n" })}
  }`;
};

// import { transpile } from "../transpile";

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
const FunctionExpression = args =>
  FunctionDeclaration(Object.assign({}, args, { id: null }));

const specialCases = {
  undefined: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
const Identifier = ({ name, value }) => {
  const identifier = normalizeName(value || name);
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
const MemberExpression = ({ computed, object, property }) =>
  polyfillMemberExpression({ computed, object, property });

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-expression
const MethodDefinition = ({ key, value }) =>
  `${transpile(key)} = ${transpile(value)}`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const NewExpression = ({ arguments: args, callee }) => {
  const className = `class_${transpile(callee)}`;
  const classArguments = transpile(args, { arraySeparator: "," });

  return `${className}(${classArguments})`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const ObjectExpression = ({ properties }) =>
  `{
    ${transpile(properties, { arraySeparator: ",\n" })}
  }`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const Property = ({ key, value }) => {
  const { name } = key;

  return `${normalizeName(name)} = ${transpile(value)}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
const SequenceExpression = ({ expressions }) => transpile(expressions, { arraySeparator: "\n" });

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#this-expression
const ThisExpression = () => "this";

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
	ClassBody: ClassBody,
	ConditionalExpression: ConditionalExpression,
	FunctionExpression: FunctionExpression,
	Identifier: Identifier,
	Literal: Literal,
	LogicalExpression: LogicalExpression,
	MemberExpression: MemberExpression,
	MethodDefinition: MethodDefinition,
	NewExpression: NewExpression,
	ObjectExpression: ObjectExpression,
	Property: Property,
	SequenceExpression: SequenceExpression,
	ThisExpression: ThisExpression,
	UnaryExpression: UnaryExpression
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
const BlockStatement = ({ body }) => transpile(body);

BlockStatement.scopeBoundary = true;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#break-statement
const BreakStatement = (NA, { isInsideSwitch }) =>
  isInsideSwitch ? "" : "break";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#do-while-statement
const DoWhileStatement = ({ body, test }) =>
  `repeat
    ${transpile(body)}
  until not (${transpile(test)})`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
const ExpressionStatement = ({ expression }) => transpile(expression);

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

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
const SwitchCase = ({ test, consequent }) => {
  if (consequent.length === 0) {
    throw new Error("Switch case fallthroughs are not supported.");
  }

  const statements = transpile(consequent, { arraySeparator: "\n" });
  if (!test) {
    return `\n${statements}`; // Default case
  }

  const testValue = transpile(test);
  return `if ${testValue} == switchCase then
    ${statements}
  `;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
const SwitchStatement = ({ discriminant, cases }, scope) => {
  const condition = `local switchCase = ${transpile(discriminant)}`;

  scope.isInsideSwitch = true;
  // sort the cases so the default case ends up at the end
  const sortedCases = cases.sort(switchCase => !switchCase.test ? 1 : 0);

  return `
    ${condition}
    ${transpile(sortedCases, { arraySeparator: "else" })}
    end`;
};

SwitchStatement.scopeBoundary = true;



var statementMapper = Object.freeze({
	BlockStatement: BlockStatement,
	BreakStatement: BreakStatement,
	DoWhileStatement: DoWhileStatement,
	ExpressionStatement: ExpressionStatement,
	IfStatement: IfStatement,
	ReturnStatement: ReturnStatement,
	SwitchCase: SwitchCase,
	SwitchStatement: SwitchStatement
});

const mappers = Object.assign({},
  declarationMapper,
  expressionMapper,
  statementMapper
);

const generalPolyfillMap = {
  "console.log": argument => `printh(${argument})`,
  "Math.abs": value => `abs(${value})`,
  "Math.ceil": value => `-flr(-${value})`,
  "Math.floor": value => `flr(${value})`,
  "Math.max": values => `max(${values})`,
  "Math.min": values => `min(${values})`,
  "Math.random": () => "rnd()",
  "Math.sqrt": value => `sqrt(${value})`,
  "Math.sin": value => `-sin(${value})`,
  "Object.assign": values => `_assign({${values}})`,
  "Object.entries": values => `_objmap(${values}, _byentries)`,
  "Object.keys": values => `_objmap(${values}, _bykeys)`,
  "Object.values": values => `_objmap(${values}, _byvalues)`
};

const arrayPolyfillMap = {
  filter: (context, args) => `_filter(${context}, ${args})`,
  forEach: (context, args) => `foreach(${context}, ${args})`,
  includes: (context, arg) => `_includes(${context}, ${arg})`,
  join: (context, args) => `_join(${context}, ${args})`,
  length: context => `#${context}`,
  map: (context, args) => `_map(${context}, ${args})`,
  push: (context, args) => `add(${context}, ${args})`,
  reduce: (context, args) => `_reduce(${context}, ${args})`,
  toString: context => `_tostring(${context})`
};

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return (clone && isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, optionsArgument)
		: value
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument)
	})
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument)
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument)
	} else {
		return mergeObject(target, source, optionsArgument)
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, optionsArgument)
	}, {})
};

var deepmerge_1 = deepmerge;

const scopeStack = [{
  variables: {}
}];

const getCurrentScope = () => scopeStack[scopeStack.length - 1];

const pushScopeLayer = (scope = {}) => {
  scopeStack.push(deepmerge_1(getCurrentScope(), scope));

  return getCurrentScope();
};

const popScopeLayer = () => {
  scopeStack.pop();
};

const transpile = (node, { arraySeparator = "\n" } = {}) => {
  return Array.isArray(node) ? node.map(executor).join(arraySeparator) : executor(node); // eslint-disable-line no-use-before-define
};

const executor = node => {
  if (!node) {
    return;
  }

  // Attempt to find the specific declaration, expression or statement
  const mapper = mappers[node.type];
  if (!mapper) {
    const { loc: { start } } = node;
    throw new Error(`\x1b[41m\x1b[37mThere is no handler for ${node.type}, line ${start.line} column ${start.column}\x1b[0m`);
  }

  const scope = mapper.scopeBoundary && pushScopeLayer() || getCurrentScope();
  const result = mapper(node, scope) || "";
  mapper.scopeBoundary && popScopeLayer();

  return result;
};

function jspicl (source) {
  const tree = esprima.parse(source, { loc: true, range: true });

  const output = transpile(tree.body);
  const polyfills = getRequiredPolyfills(output);

  return {
    polyfills,
    output
  };
}

module.exports = jspicl;
