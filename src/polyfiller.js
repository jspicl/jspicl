import { arrayPolyfills, generalPolyfills } from "./constants";

export default function polyfiller (args = {}) {
  const {
    context = "",
    functionName = "",
    argumentList = "",
    general = false,
    array = false
  } = args;

  const callExpression = context && `${context}.${functionName}` || functionName;

  if (general && generalPolyfills.hasOwnProperty(callExpression)) {
    return generalPolyfills[callExpression](argumentList);
  }
  else if (array && context && functionName && arrayPolyfills.hasOwnProperty(functionName)) {
    return arrayPolyfills[functionName](context, argumentList);
  }

  return `${callExpression}(${argumentList})`;
}
