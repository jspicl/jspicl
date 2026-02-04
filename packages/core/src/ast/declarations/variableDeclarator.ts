import assert from "node:assert";
import {normalizeName} from "../../utils/normalizeName.js";
import type {AstNodeVisitor, AstNodeVisitorOptions} from "../../types.js";

const createDeclaration = (
  name: string,
  value: string,
  scope: AstNodeVisitorOptions["scope"]
): string => {
  const normalizedName = normalizeName(name);
  scope.variables[name] = {name: normalizedName};
  return `local ${normalizedName} = ${value}`;
};

export const VariableDeclarator: AstNodeVisitor<VariableDeclarator> = (
  {id, init},
  {scope, transpile}
) => {
  const initValue = transpile(init) || "nil";
  assert;

  if (id.type === "ArrayPattern") {
    return id.elements
      .map((element: ArrayPatternElement, i: number) =>
        element
          ? createDeclaration(
              transpile(element),
              `${initValue}[${i + 1}]`,
              scope
            )
          : null
      )
      .filter(Boolean)
      .join("\n");
  }

  if (id.type === "ObjectPattern") {
    return id.properties
      .map((property: Property) =>
        createDeclaration(
          transpile(property.value),
          `${initValue}.${transpile(property.key)}`,
          scope
        )
      )
      .join("\n");
  }

  return createDeclaration(id.name, initValue, scope);
};
