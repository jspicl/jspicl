'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esprima = _interopDefault(require('esprima'));
var createTranspiler = _interopDefault(require('trastpiler'));

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

const _split = `
function _split(str, separator)
  local indices = {}
  local i = 1
  while i <= #str do
    if sub(str, i, i + #separator - 1) == separator then
      add(indices, i)
    end
    i+=1
  end

  local result = {}
  local lastoffset = 1
  foreach(indices, function (offset)
    add(result, sub(str, lastoffset, offset - 1))
    lastoffset = offset + #separator
  end)

  add(result, sub(str, lastoffset))

  if separator == "" then
    del(result, "")
  end

  return result
end`;

const _substr = `
function _substr(str, indexStart, length)
  return sub(str, indexStart + 1, indexStart + (length or #str))
end`;

const _substring = `
function _substring(str, indexStart, indexEnd)
  return sub(str, indexStart + 1, indexEnd)
end`;

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



var polyfillImplementations = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _assign: _assign,
  _filter: _filter,
  _includes: _includes,
  _join: _join,
  _map: _map,
  _objmap: _objmap,
  _reduce: _reduce,
  _split: _split,
  _substr: _substr,
  _substring: _substring,
  _tostring: _tostring
});

const genericPolyfillMap = {
  "console.log": argument => `printh(${argument})`,
  "math.abs": value => `abs(${value})`,
  "math.ceil": value => `ceil(${value})`,
  "math.floor": value => `flr(${value})`,
  "math.max": values => `max(${values})`,
  "math.min": values => `min(${values})`,
  "math.random": () => "rnd()",
  "math.sqrt": value => `sqrt(${value})`,
  "math.sin": value => `-sin(${value})`,
  "object.assign": values => `_assign({${values}})`,
  "object.entries": values => `_objmap(${values}, _byentries)`,
  "object.keys": values => `_objmap(${values}, _bykeys)`,
  "object.values": values => `_objmap(${values}, _byvalues)`
};

const arrayPolyfillMap = {
  filter: (context, args) => `_filter(${context}, ${args})`,
  foreach: (context, args) => `foreach(${context}, ${args})`,
  includes: (context, arg) => `_includes(${context}, ${arg})`,
  join: (context, args) => `_join(${context}, ${args})`,
  length: context => `#${context}`,
  map: (context, args) => `_map(${context}, ${args})`,
  push: (context, args) => `add(${context}, ${args})`,
  reduce: (context, args) => `_reduce(${context}, ${args})`,
  split: (context, args) => `_split(${context}, ${args})`,
  substr: (context, args) => `_substr(${context}, ${args})`,
  substring: (context, args) => `_substring(${context}, ${args})`,
  tostring: context => `_tostring(${context})`
};

const polyfillMatcher = /(?<!\.)\b_\w+\(/g;

const getRequiredPolyfills = luaCode =>
  // Scan through the code to find polyfilled methods that are prefixed
  // in a particular way(e.g._filter())
  [...new Set(luaCode.match(polyfillMatcher))]
    .reduce((result, match) => {
      // Remove the '(' character from the match
      const polyfillId = match.substr(0, match.length - 1);
      const code = polyfillImplementations[polyfillId];
      code && (result[polyfillId] = code);

      return result;
    }, {});

const getPolyfilledMemberExpression = (args = {}) => {
  const {
    transpile,
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

const getPolyfilledCallExpression = (args = {}) => {
  const {
    transpile,
    callee,
    argumentList = ""
  } = args;

  const callExpression = transpile(callee);
  const context = transpile(callee.object);
  const functionName = transpile(callee.property);

  if (genericPolyfillMap.hasOwnProperty(callExpression)) {
    return genericPolyfillMap[callExpression](argumentList);
  }
  else if (context && functionName && arrayPolyfillMap.hasOwnProperty(functionName)) {
    return arrayPolyfillMap[functionName](context, argumentList);
  }

  return `${callExpression}(${argumentList})`;
};

const indentIncrease = [
  line => /^\bfor\b\s/.test(line),
  line => /^\bforeach\b/.test(line) && !/\)$/.test(line),
  line => /\bfunction\b/.test(line),
  line => /^\bif\b\s/.test(line) && /\bthen\b$/.test(line),
  line => /^while\s/.test(line),
  line => /^repeat\s/.test(line),
  line => /{$/.test(line),
  line => /\bthen\b$/.test(line)
];

const indentDecrease = [
  line => /^end[)]?/.test(line),
  line => /end$/.test(line),
  line => /^else/.test(line),
  // line => /^{/.test(line),
  line => /^}/.test(line)
];

/**
 * Fixes code indentation
 * @param {string} luaCode Original lua code
 * @returns {string} Formatted code
 */
function prettify (luaCode) {
  const lines = luaCode
    .split("\n")
    .map(line => line.trim());

  const { code } = lines.reduce((result, line) => {
    const { code, indentation } = result;
    let currentIndentation = indentation;
    let nextLineIndentation = indentation;

    if (indentIncrease.some(entry => entry(line))) {
      nextLineIndentation++;
    }

    if (indentDecrease.some(entry => entry(line))) {
      currentIndentation--;
      nextLineIndentation--;
    }

    code.push(line && line.padStart(line.length + currentIndentation * 2) || line);

    return {
      code,
      indentation: Math.max(0, nextLineIndentation)
    };
  }, {
    code: [],
    indentation: 0
  });

  return code.join("\n");
}

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
const ClassDeclaration = ({ id, body }, { transpile }) =>
  `local class_${transpile(id)} = function (...)
    local this = {}
    local classinstance = ${transpile(body)}
    if (classinstance.constructor) classinstance.constructor(...)
    return classinstance
  end`;

const normalizeName = name => name.toLowerCase().replace(/\$/g, "_");

const wrapWithParantheses = (condition, expression) =>
  condition ? `(${expression})` : expression;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
const FunctionDeclaration = ({ id, body, params }, { transpile }) => {
  const { name = "" } = id || {};
  const argumentList = transpile(params, { arraySeparator: ", " });
  const functionContent = transpile(body);

  return `function ${normalizeName(name)}(${argumentList})
    ${functionContent}
  end`;
};

FunctionDeclaration.scopeBoundary = true;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
const VariableDeclaration = ({ declarations }, { transpile }) => transpile(declarations);

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
const VariableDeclarator = ({ id, init }, { scope, transpile }) => {
  const { name } = id;
  const normalizedName = normalizeName(name);
  const value = transpile(init) || "nil";

  // Store variable metadata in the scope
  // for accessibility
  scope.variables[name] = {
    name: normalizedName
    // type:
  };

  return `local ${normalizedName} = ${value}`;
};



var declarationMapper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ClassDeclaration: ClassDeclaration,
  FunctionDeclaration: FunctionDeclaration,
  VariableDeclaration: VariableDeclaration,
  VariableDeclarator: VariableDeclarator
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
const ArrayExpression = ({ elements }, { transpile }) =>
  `{
    ${transpile(elements, { arraySeparator: ", " })}
  }`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#arrow-function-expression
const ArrowFunctionExpression = (...args) => FunctionDeclaration(...args);

ArrowFunctionExpression.scopeBoundary = true;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#assignment-expression
const AssignmentExpression = ({ operator, left, right }, { transpile }) => {
  const leftExpression = transpile(left);
  const rightExpression = transpile(right);

  return `${leftExpression}${operator}${rightExpression}`;
};

const operatorTable = {
  "!==": "!=",
  "===": "=="
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#binary-expression
const BinaryExpression = ({ operator, left, right }, { transpile }) => {
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

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
const FunctionExpression = (node, config) =>
  FunctionDeclaration({
    ...node,
    id: null
  }, config);

FunctionExpression.scopeBoundary = true;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const CallExpression = ({ callee, arguments: args }, { transpile }) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    return getPolyfilledCallExpression({ transpile, callee, argumentList });
  }

  // Regular function call
  const calleeExpression = wrapWithParantheses(
    callee.type === FunctionExpression.name,
    transpile(callee)
  );
  return `${calleeExpression}(${argumentList})`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
const ClassBody = ({ body }, { transpile }) =>
  `{
    ${transpile(body, { arraySeparator: ",\n" })}
  }`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#conditional-expression
const ConditionalExpression = ({ test, consequent, alternate }, { transpile }) => {
  const testExpression = transpile(test);
  const consequentPath = transpile(consequent);
  const alternatePath = transpile(alternate);

  return `(function () if ${testExpression} then return ${consequentPath} else return ${alternatePath} end end)()`;
};

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
const LogicalExpression = ({ operator, left, right }, { transpile }) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = wrapWithParanthesesIfNeeded(left.type, logicalOperator, transpile(left));
  const rightExpression = wrapWithParanthesesIfNeeded(right.type, logicalOperator, transpile(right));

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
const MemberExpression = ({ computed, object, property }, { transpile }) =>
  getPolyfilledMemberExpression({ transpile, computed, object, property });

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-expression
const MethodDefinition = ({ key, value }, { transpile }) =>
  `${transpile(key)} = ${transpile(value)}`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
const NewExpression = ({ arguments: args, callee }, { transpile }) => {
  const className = `class_${transpile(callee)}`;
  const classArguments = transpile(args, { arraySeparator: "," });

  return `${className}(${classArguments})`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const ObjectExpression = ({ properties }, { transpile }) =>
  `{
    ${transpile(properties, { arraySeparator: ",\n" })}
  }`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
const Property = ({ key, value }, { transpile }) => {
  const { name, value: alternativeName = "" } = key; // The key could be a Literal or an Identifier

  return `${normalizeName(name || alternativeName)} = ${transpile(value)}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
const SequenceExpression = ({ expressions }, { transpile }) =>
  transpile(expressions, { arraySeparator: "\n" });

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#this-expression
const ThisExpression = () => "this";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#unary-expression
const UnaryExpression = ({ operator, argument }, { transpile }) => {
  const value = transpile(argument);

  if (operator === "~") {
    throw new Error("Unary operator ~ is not supported.");
  }

  const luaOperator = operator === "!" ? "not " : operator;
  return operator === "void" ? "nil" : `${luaOperator}${value}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#update-expression
const UpdateExpression = ({ argument, operator }, { transpile }) => {
  const identifier = transpile(argument);

  return `${identifier}${operator[0]}=1`;
};



var expressionMapper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArrayExpression: ArrayExpression,
  ArrowFunctionExpression: ArrowFunctionExpression,
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
  UnaryExpression: UnaryExpression,
  UpdateExpression: UpdateExpression
});

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
const BlockStatement = ({ body }, { transpile }) => transpile(body);

BlockStatement.scopeBoundary = true;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#break-statement
const BreakStatement = (NA, { scope: { isInsideSwitch } }) =>
  isInsideSwitch ? "" : "break";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#do-while-statement
const DoWhileStatement = ({ body, test }, { transpile }) =>
  `repeat
    ${transpile(body)}
  until not (${transpile(test)})`;

const EmptyStatement = () => "";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
const ExpressionStatement = ({ expression, directive }, { transpile }) =>
  !directive
  && wrapWithParantheses(
    expression.type === FunctionExpression.name,
    transpile(expression)
  );

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#if-statement
const IfStatement = ({ test, consequent, alternate }, { transpile }) => {
  const testExpression = transpile(test);
  const statementBody = transpile(consequent);
  const alternateStatement = transpile(alternate);

  const alternateIsIfStatement = alternate && alternate.type === IfStatement.name;

  let closingStatement = "end";
  if (alternateStatement) {
    closingStatement = alternateIsIfStatement ? `else${alternateStatement}` : `else ${alternateStatement} end`;
  }

  return `if ${testExpression} then
    ${statementBody}
  ${closingStatement}`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#while-statement
const ForStatement = ({ body, init, test, update }, { transpile }) =>
  `${transpile(init)}
  while ${transpile(test)} do
    ${transpile(body)}
    ${transpile(update, { arraySeparator: "\n" })}
  end`;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#return-statement
const ReturnStatement = ({ argument }, { transpile }) => {
  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
const SwitchCase = ({ test, consequent }, { transpile }) => {
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
const SwitchStatement = ({ discriminant, cases }, { scope, transpile }) => {
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

// https://esprima.readthedocs.io/en/latest/syntax-tree-format.html#throw-statement
const ThrowStatement = ({ argument }, { transpile }) => {
  const transpiledArgument = transpile(argument)
    .replace(/\n/g, "\\n")
    .replace(/"/g, "\\\"");

  return `assert(false, "${transpiledArgument}")`;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#for-statement
const WhileStatement = ({ body, test }, { transpile }) =>
  `while ${transpile(test)} do
    ${transpile(body)}
  end`;



var statementMapper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BlockStatement: BlockStatement,
  BreakStatement: BreakStatement,
  DoWhileStatement: DoWhileStatement,
  EmptyStatement: EmptyStatement,
  ExpressionStatement: ExpressionStatement,
  IfStatement: IfStatement,
  ForStatement: ForStatement,
  ReturnStatement: ReturnStatement,
  SwitchCase: SwitchCase,
  SwitchStatement: SwitchStatement,
  ThrowStatement: ThrowStatement,
  WhileStatement: WhileStatement
});

const globalMappers = {
  ...declarationMapper,
  ...expressionMapper,
  ...statementMapper
};

function createJspiclTranspiler (customMappers) {
  return createTranspiler({
    mappers: {
      ...globalMappers,
      ...customMappers
    }
  });
}

const defaultOptions = {
  prettify: true,
  customMappers: undefined
};

function jspicl (source, customOptions) {
  const tree = esprima.parse(source, { loc: true, range: true });
  const options = Object.assign({}, defaultOptions, customOptions);

  const transpile = createJspiclTranspiler(options.customMappers);
  let output = transpile(tree.body);

  if (options.prettify) {
    output = prettify(output);
  }

  const polyfills = getRequiredPolyfills(output);
  return {
    polyfills,
    output
  };
}

module.exports = jspicl;
