import type {TranspileFunction} from "trastpiler";
import {arrayPolyfillMap} from "./constants.js";

type MemberExpressionArgument = {
  transpile: TranspileFunction;
  computed: boolean;
  object: any;
  property: any;
};

export function getPolyfilledMemberExpression({
  transpile,
  computed,
  object,
  property
}: MemberExpressionArgument) {
  const objectName = transpile(object);
  const propertyName = transpile(property);

  // TODO: Check metadata to determine where to look for the polyfill
  if (arrayPolyfillMap.hasOwnProperty(propertyName)) {
    return arrayPolyfillMap[propertyName](objectName, "");
  }

  return computed
    ? `${objectName}[${propertyName}]`
    : `${objectName}.${propertyName}`;
}
