import * as polyfillImplementations from "./polyfills";

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

export const getRequiredPolyfills = luaCode =>
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

export const getPolyfilledMemberExpression = (args = {}) => {
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

export const getPolyfilledCallExpression = (args = {}) => {
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
