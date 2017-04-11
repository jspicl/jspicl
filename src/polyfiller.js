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

export default (originalCallExpression = "", argumentList = "", { general = false, array = false } = {}) => {
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