import * as declarationMapper from "./declarations";
import * as statementMapper from "./statements";
import * as expressionMapper from "./expressions";

export default Object.assign({},
  declarationMapper,
  statementMapper,
  expressionMapper);