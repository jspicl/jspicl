import {createTranspiler} from "trastpiler";
import * as globalMappers from "./ast/index.js";

export function createJspiclTranspiler(
  customMappers?: Record<string, any>,
  initialScopeData?: Record<string, any>
) {
  return createTranspiler({
    initialScopeData,
    handlers: {
      ...globalMappers,
      ...customMappers
    }
  });
}
