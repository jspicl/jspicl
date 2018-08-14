import assert from "assert";
import { IfStatement } from "statements";
import esprima from "esprima";

describe("IfStatement", () => {
  it("renders an if statement using a test expression and consequent", () => {
    const input = "if (testexpression) { content; }";
    const output = `if testexpression then
    content
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(IfStatement(statement), output);
  });

  it("renders an else statement", () => {
    const input = "if (testexpression) { content; } else { alternative; }";
    const output = `if testexpression then
    content
  else alternative end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(IfStatement(statement), output);
  });

  it("renders an else-if statement", () => {
    const input = `if (testexpression) {
      content;
    }
    else if (testexpression2) {
      content2;
    }`;
    const output = `if testexpression then
    content
  elseif testexpression2 then
    content2
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(IfStatement(statement), output);
  });

  it("renders multiple else-if statements and one else statement", () => {
    const input = `if (testexpression) {
      content;
    }
    else if (testexpression2) {
      content2;
    }
    else if (testexpression3) {
      content3;
    }
    else {
      content4;
    }`;
    const { body: [statement] } = esprima.parse(input);
    const output = `if testexpression then
    content
  elseif testexpression2 then
    content2
  elseif testexpression3 then
    content3
  else content4 end`;

    assert.equal(IfStatement(statement), output);
  });
});
