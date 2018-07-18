import assert from "assert";
import fs from "fs";
import prettify from "../src/prettify";

describe("prettify", () => {
  it("indents lua code", () => {
    const input = fs.readFileSync(`${__dirname}/luacode.lua`).toString();
    const expected = fs.readFileSync(`${__dirname}/expected.lua`).toString();

    assert.equal(prettify(input), expected);
  });
});
