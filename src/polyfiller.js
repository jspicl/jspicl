import { transpile } from "./transpile";
import { arrayPolyfillMap, generalPolyfillMap } from "./constants";
import * as polyfills from "./polyfills";

export const getRequiredPolyfills = luaCode => {
  // Scan through the code to find polyfilled methods (e.g. _filter())
  return [...new Set(luaCode.match(/(?<!\.)\b_\w+\(/g))]
    .reduce((result, match) => {
      // Remove the '(' character from the match
      const polyfillId = match.substr(0, match.length - 1);
      const code = polyfills[polyfillId];
      code && (result[polyfillId] = code);

      return result;
    }, {});
};

export const polyfillMemberExpression = (args = {}) => {
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

export const polyfillCallExpression = (args = {}) => {
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
