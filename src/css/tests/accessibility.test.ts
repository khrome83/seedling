import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Screen Readers", () => {
  const css = new Set([
    "sr-only",
    "not-sr-only",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
