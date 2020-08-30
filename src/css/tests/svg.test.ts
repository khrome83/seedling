import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Fill", () => {
  const css = new Set([
    "fill-current",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.fill-current {
  fill: currentColor;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Stroke", () => {
  const css = new Set([
    "stroke-current",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.stroke-current {
  stroke: currentColor;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Stroke Width", () => {
  const css = new Set([
    "stroke-0",
    "stroke-1",
    "stroke-2",
    "stroke-10",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.stroke-0 {
  stroke-width: 0;
}
.stroke-1 {
  stroke-width: 1;
}
.stroke-2 {
  stroke-width: 2;
}
.stroke-10 {
  stroke-width: 10;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
