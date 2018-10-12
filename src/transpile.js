import createTranspiler from "trastpiler";
import * as declarationMapper from "./declarations";
import * as expressionMapper from "./expressions";
import * as statementMapper from "./statements";

export const globalMappers = {
  ...declarationMapper,
  ...expressionMapper,
  ...statementMapper
};

export default function createJspiclTranspiler (customMappers) {
  return createTranspiler({
    mappers: {
      ...globalMappers,
      ...customMappers
    }
  });
}
