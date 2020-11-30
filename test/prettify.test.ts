import * as fs from "fs";
import {prettify} from "../src/prettify";

describe("prettify", () => {
  it("indents lua code", () => {
    const input = fs.readFileSync("test/luacode.lua").toString();
    const expected = fs.readFileSync("test/expected.lua").toString();

    expect(prettify(input)).toBe(expected);
  });
});
