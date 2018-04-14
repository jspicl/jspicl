import assert from "assert";
import { IfStatement } from "statements";
const esprima = require("esprima");

describe("IfStatement", () => {
  it("renders an if statement using a test expression and consequent", () => {
    const input = "if (testExpression) { content; }";
    const output = `if testExpression then
    content
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(IfStatement(statement), output);
  });

  it("renders an else statement", () => {
    const input = "if (testExpression) { content; } else { alternative; }";
    const output = `if testExpression then
    content
  else alternative end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(IfStatement(statement), output);
  });

  it("renders an else-if statement", () => {
    const input = `if (testExpression) {
      content;
    }
    else if (testExpression2) {
      content2;
    }`;
    const output = `if testExpression then
    content
  elseif testExpression2 then
    content2
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(IfStatement(statement), output);
  });

  it("renders multiple else-if statements and one else statement", () => {
    const input = `if (testExpression) {
      content;
    }
    else if (testExpression2) {
      content2;
    }
    else if (testExpression3) {
      content3;
    }
    else {
      content4;
    }`;
    const { body: [statement] } = esprima.parse(input);
    const output = `if testExpression then
    content
  elseif testExpression2 then
    content2
  elseif testExpression3 then
    content3
  else content4 end`;

    assert.equal(IfStatement(statement), output);
  });
});
