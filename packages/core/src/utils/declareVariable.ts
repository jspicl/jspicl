import type {TranspileFunction} from "trastpiler";
import type {AstNodeVisitorOptions} from "../types.js";
import {normalizeName} from "./normalizeName.js";

export function declareVariable(
  name: string,
  value: string,
  scope: AstNodeVisitorOptions["scope"]
): string {
  const normalizedName = normalizeName(name);
  scope.variables[name] = {name: normalizedName};
  return `local ${normalizedName} = ${value}`;
}

export function declareLocalVariablesForObjectPattern(
  node: ObjectPattern,
  parent: string,
  scope: AstNodeVisitorOptions["scope"],
  transpile: TranspileFunction
): string {
  return node.properties
    .map((property: Property) => {
      const originalName = normalizeName(transpile(property.key));
      const {value} = property;

      if (value?.type === "AssignmentPattern") {
        return declareVariable(
          transpile(value.left),
          `${parent}.${originalName} or ${transpile(value.right)}`,
          scope
        );
      }

      return declareVariable(
        transpile(value),
        `${parent}.${originalName}`,
        scope
      );
    })
    .join("\n");
}

export function declareLocalVariablesForArrayPattern(
  node: ArrayPattern,
  parent: string,
  scope: AstNodeVisitorOptions["scope"],
  transpile: TranspileFunction
): string {
  return node.elements
    .map((element: ArrayPatternElement, index: number) => {
      if (!element) {
        return null;
      }

      if (element.type === "AssignmentPattern") {
        return declareVariable(
          transpile(element.left),
          `${parent}[${index + 1}] or ${transpile(element.right)}`,
          scope
        );
      }

      return declareVariable(
        transpile(element),
        `${parent}[${index + 1}]`,
        scope
      );
    })
    .filter(Boolean)
    .join("\n");
}
