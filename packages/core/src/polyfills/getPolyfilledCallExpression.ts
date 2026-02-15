import type {TranspileFunction} from "trastpiler";
import {arrayPolyfillMap, genericPolyfillMap} from "./constants.js";

type CallExpressionArguments = {
  transpile: TranspileFunction;
  callee: any;
  argumentList?: string;
};

export function getPolyfilledCallExpression(args: CallExpressionArguments) {
  const {transpile, callee, argumentList = ""} = args;

  const callExpression = transpile(callee);
  const context = transpile(callee.object);
  const functionName = transpile(callee.property);

  if (genericPolyfillMap.hasOwnProperty(callExpression)) {
    return genericPolyfillMap[callExpression](argumentList);
  }

  if (
    context &&
    functionName &&
    arrayPolyfillMap.hasOwnProperty(functionName)
  ) {
    return arrayPolyfillMap[functionName](context, argumentList);
  }

  return `${callExpression}(${argumentList})`;
}
