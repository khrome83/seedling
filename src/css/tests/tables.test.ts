import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Border Collapse", () => {
  const css = new Set([
    "border-collapse",
    "border-separate",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.border-collapse {
  border-collapse: collapse;
}
.border-separate {
  border-collapse: separate;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Table Layout", () => {
  const css = new Set([
    "table-auto",
    "table-fixed",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.table-auto {
  table-layout: auto;
}
.table-fixed {
  table-layout: fixed;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
