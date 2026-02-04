import {normalizeName} from "../../utils/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";
import {assert} from "../../utils/assert.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
export const FunctionDeclaration: AstNodeVisitor<FunctionDeclaration> = (
  {id, body, params, async, generator},
  {transpile}
) => {
  assert(async === false, "Async functions are not supported.");
  assert(generator === false, "Generator functions are not supported.");

  const name = id?.name || "";

  // Handle destructuring in parameters
  const processedParams: string[] = [];
  const destructuringStatements: string[] = [];

  // Process arguments that are destructured in the argument list
  params.forEach((param: FunctionParameter, index: number) => {
    if (param.type === "ObjectPattern" || param.type === "ArrayPattern") {
      // Generate temporary parameter name
      const tempParam = `__p${index}`;
      processedParams.push(tempParam);

      // Generate destructuring statements for the function body
      if (param.type === "ObjectPattern") {
        param.properties.forEach((property: Property) => {
          const keyName = transpile(property.key);
          const valueName = transpile(property.value);
          destructuringStatements.push(
            `local ${valueName} = ${tempParam}.${keyName}`
          );
        });
      } else if (param.type === "ArrayPattern") {
        param.elements.forEach((element: ArrayPatternElement, i: number) => {
          if (element) {
            const elementName = transpile(element);
            destructuringStatements.push(
              `local ${elementName} = ${tempParam}[${i + 1}]`
            );
          }
        });
      }
    } else {
      // Regular parameter
      processedParams.push(transpile(param));
    }
  });

  const argumentList = processedParams.join(", ");
  let functionContent = transpile(body);

  // Prepend destructuring statements at the top of the function body
  if (destructuringStatements.length > 0) {
    const destructuringCode = destructuringStatements.join("\n");
    functionContent = functionContent
      ? `${destructuringCode}\n${functionContent}`
      : destructuringCode;
  }

  return `function ${normalizeName(name)}(${argumentList})
    ${functionContent}
  end`;
};

FunctionDeclaration.scopeBoundary = true;
