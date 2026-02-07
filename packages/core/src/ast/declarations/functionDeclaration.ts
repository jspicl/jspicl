import {normalizeName} from "../../utils/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";
import {assert} from "../../utils/assert.js";
import {
  declareLocalVariablesForArrayPattern,
  declareLocalVariablesForObjectPattern,
  declareVariable
} from "../../utils/declareVariable.js";

export const FunctionDeclaration: AstNodeVisitor<FunctionDeclaration> = (
  {id, body, params, async, generator},
  {transpile, scope}
) => {
  assert(async === false, "Async functions are not supported.");
  assert(generator === false, "Generator functions are not supported.");

  const name = id?.name || "";

  // Handle destructuring in parameters
  const processedArguments: string[] = [];
  const destructuringStatements: string[] = [];

  // Process arguments that are destructured in the argument list
  params.forEach((param: FunctionParameter, index: number) => {
    if (param.type === "ObjectPattern" || param.type === "ArrayPattern") {
      // Generate temporary parameter name
      const tempParam = `__p${index}`;
      processedArguments.push(tempParam);

      // Generate destructuring statements for the function body
      if (param.type === "ObjectPattern") {
        destructuringStatements.push(
          declareLocalVariablesForObjectPattern(
            param,
            tempParam,
            scope,
            transpile
          )
        );
      } else {
        destructuringStatements.push(
          declareLocalVariablesForArrayPattern(
            param,
            tempParam,
            scope,
            transpile
          )
        );
      }
    } else if (param.type === "AssignmentPattern") {
      const variableName = normalizeName(transpile(param.left));
      processedArguments.push(variableName);
      destructuringStatements.push(
        declareVariable(
          variableName,
          `${variableName} or ${transpile(param.right)}`,
          scope
        )
      );
    } else {
      // Regular parameter
      processedArguments.push(normalizeName(transpile(param)));
    }
  });

  const argumentList = processedArguments.join(", ");
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
