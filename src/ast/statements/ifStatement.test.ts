import esprima from "esprima";
import {IfStatement} from "./ifStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("IfStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("renders an if statement using a test expression and consequent", () => {
    const input = "if (testexpression) { content; }";
    const output = `if testexpression then
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(IfStatement(statement, parserOptions)).toBe(output);
  });

  it("renders an else statement", () => {
    const input = "if (testexpression) { content; } else { alternative; }";
    const output = `if testexpression then
    content
  else alternative end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(IfStatement(statement, parserOptions)).toBe(output);
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
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(IfStatement(statement, parserOptions)).toBe(output);
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
    const {
      body: [statement]
    } = esprima.parseScript(input);
    const output = `if testexpression then
    content
  elseif testexpression2 then
    content2
  elseif testexpression3 then
    content3
  else content4 end`;

    expect(IfStatement(statement, parserOptions)).toBe(output);
  });
});

// import {describe, it, expect} from "vitest";
// import {jspicl} from "../../index.js";

// describe("IfStatement", () => {
//   it("transpiles basic if statement", () => {
//     const input = "if (true) { x = 1 }";
//     const result = jspicl(input, {prettify: false});
//     expect(result.code).toContain("if true then");
//     expect(result.code).toContain("x=1");
//     expect(result.code).toContain("end");
//   });

//   it("transpiles if-else statement", () => {
//     const input = "if (x) { a = 1 } else { a = 2 }";
//     const result = jspicl(input, {prettify: false});
//     expect(result.code).toContain("if x then");
//     expect(result.code).toContain("else");
//     expect(result.code).toContain("end");
//   });

//   it("transpiles else-if chains", () => {
//     const input = "if (a) { x = 1 } else if (b) { x = 2 }";
//     const result = jspicl(input, {prettify: false});
//     expect(result.code).toContain("elseif b then");
//   });
// });
