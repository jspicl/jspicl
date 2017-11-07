import { arrayPolyfills, generalPolyfills } from "./constants";

export default function polyfiller (args = {}) {
  const {
    objectName = "",
    functionName = "",
    argumentList = "",
    general = false,
    array = false
  } = args;

  const callExpression = objectName && `${objectName}.${functionName}` || functionName;

  if (general && generalPolyfills.hasOwnProperty(callExpression)) {
    return generalPolyfills[callExpression](argumentList);
  }
  else if (array && objectName && functionName && arrayPolyfills.hasOwnProperty(functionName)) {
    return arrayPolyfills[functionName](objectName, argumentList);
  }

  return `${callExpression}(${argumentList})`;
}
