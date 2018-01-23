import { transpile } from "./transpile";
import { arrayPolyfillMap, generalPolyfillMap } from "./constants";
import * as polyfills from "./polyfills";

export const getRequiredPolyfills = luaCode => {
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
