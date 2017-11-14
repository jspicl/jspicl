import { arrayPolyfillMap, generalPolyfillMap } from "./constants";
import * as polyfills from "./polyfills";

export {
  getRequiredPolyfills,
  mapToPolyfill
};

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
