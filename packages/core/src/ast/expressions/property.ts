import {normalizeName} from "../../utils/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";

export const Property: AstNodeVisitor<Property> = (
  {key, value},
  {transpile}
) => {
  // const {name} = key as Identifier;
  const name = transpile(key).replace(/"/g, "");

  return `${normalizeName(name)} = ${transpile(value)}`;
};
