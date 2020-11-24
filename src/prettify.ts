type PrettifyAction = (line: string) => boolean;

const indentIncrease: PrettifyAction[] = [
  (line) => /^\bfor\b\s/.test(line),
  (line) => /^\bforeach\b/.test(line) && !/\)$/.test(line),
  (line) => /\bfunction\b/.test(line),
  (line) => /^\bif\b\s/.test(line) && /\bthen\b$/.test(line),
  (line) => /^while\s/.test(line),
  (line) => /^repeat\s/.test(line),
  (line) => /{$/.test(line),
  (line) => /\bthen\b$/.test(line)
];

const indentDecrease: PrettifyAction[] = [
  (line) => /^end[)]?/.test(line),
  (line) => /end$/.test(line),
  (line) => /^else/.test(line),
  // line => /^{/.test(line),
  (line) => /^}/.test(line)
];

export function prettify(luaCode: string) {
  const lines = luaCode.split("\n").map((line) => line.trim());

  const {code} = lines.reduce(
    (result, line) => {
      const {code, indentation} = result;
      let currentIndentation = indentation;
      let nextLineIndentation = indentation;

      if (indentIncrease.some((entry) => entry(line))) {
        nextLineIndentation++;
      }

      if (indentDecrease.some((entry) => entry(line))) {
        currentIndentation--;
        nextLineIndentation--;
      }

      code.push(
        (line && line.padStart(line.length + currentIndentation * 2)) || line
      );

      return {
        code,
        indentation: Math.max(0, nextLineIndentation)
      };
    },
    {
      code: [] as string[],
      indentation: 0
    }
  );

  return code.join("\n");
}
