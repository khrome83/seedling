import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Grid Template Columns", () => {
  const css = new Set([
    "grid-cols-1",
    "grid-cols-12",
    "grid-cols-18",
    "grid-cols-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
.grid-cols-18 {
  grid-template-columns: repeat(18, minmax(0, 1fr));
}
.grid-cols-none {
  grid-template-columns: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Grid Column Start / End", () => {
  const css = new Set([
    "col-auto",
    "col-span-1",
    "col-span-20",
    "col-start-1",
    "col-start-20",
    "col-start-auto",
    "col-end-1",
    "col-end-20",
    "col-end-auto",
    "col-gap-0",
    "col-gap-1",
    "col-gap-px",
    "col-gap-0.5",
    "col-gap-1/2",
    "col-gap-full",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.col-auto {
  grid-column: auto;
}
.col-span-1 {
  grid-column: span 1 / span 1;
}
.col-span-20 {
  grid-column: span 20 / span 20;
}
.col-start-1 {
  grid-column-start: 1;
}
.col-start-20 {
  grid-column-start: 20;
}
.col-start-auto {
  grid-column-start: auto;
}
.col-end-1 {
  grid-column-end: 1;
}
.col-end-20 {
  grid-column-end: 20;
}
.col-end-auto {
  grid-column-end: auto;
}
.col-gap-0 {
  grid-column-gap: 0;
  -moz-column-gap: 0;
  column-gap: 0;
}
.col-gap-1 {
  grid-column-gap: 0.25rem;
  -moz-column-gap: 0.25rem;
  column-gap: 0.25rem;
}
.col-gap-px {
  grid-column-gap: 1px;
  -moz-column-gap: 1px;
  column-gap: 1px;
}
.col-gap-0\\.5 {
  grid-column-gap: 0.125rem;
  -moz-column-gap: 0.125rem;
  column-gap: 0.125rem;
}
.col-gap-1\\/2 {
  grid-column-gap: 50%;
  -moz-column-gap: 50%;
  column-gap: 50%;
}
.col-gap-full {
  grid-column-gap: 100%;
  -moz-column-gap: 100%;
  column-gap: 100%;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Grid Template Rows", () => {
  const css = new Set([
    "grid-rows-1",
    "grid-rows-12",
    "grid-rows-18",
    "grid-rows-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.grid-rows-1 {
  grid-template-rows: repeat(1, minmax(0, 1fr));
}
.grid-rows-12 {
  grid-template-rows: repeat(12, minmax(0, 1fr));
}
.grid-rows-18 {
  grid-template-rows: repeat(18, minmax(0, 1fr));
}
.grid-rows-none {
  grid-template-rows: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Grid Row Start / End", () => {
  const css = new Set([
    "row-auto",
    "row-span-1",
    "row-span-20",
    "row-start-1",
    "row-start-20",
    "row-start-auto",
    "row-end-1",
    "row-end-20",
    "row-end-auto",
    "row-gap-0",
    "row-gap-1",
    "row-gap-px",
    "row-gap-0.5",
    "row-gap-1/2",
    "row-gap-full",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.row-auto {
  grid-row: auto;
}
.row-span-1 {
  grid-row: span 1 / span 1;
}
.row-span-20 {
  grid-row: span 20 / span 20;
}
.row-start-1 {
  grid-row-start: 1;
}
.row-start-20 {
  grid-row-start: 20;
}
.row-start-auto {
  grid-row-start: auto;
}
.row-end-1 {
  grid-row-end: 1;
}
.row-end-20 {
  grid-row-end: 20;
}
.row-end-auto {
  grid-row-end: auto;
}
.row-gap-0 {
  grid-row-gap: 0;
  row-gap: 0;
}
.row-gap-1 {
  grid-row-gap: 0.25rem;
  row-gap: 0.25rem;
}
.row-gap-px {
  grid-row-gap: 1px;
  row-gap: 1px;
}
.row-gap-0\\.5 {
  grid-row-gap: 0.125rem;
  row-gap: 0.125rem;
}
.row-gap-1\\/2 {
  grid-row-gap: 50%;
  row-gap: 50%;
}
.row-gap-full {
  grid-row-gap: 100%;
  row-gap: 100%;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Gap", () => {
  const css = new Set([
    "gap-0",
    "gap-2",
    "gap-11",
    "gap-px",
    "gap-x-0",
    "gap-x-2",
    "gap-x-11",
    "gap-x-px",
    "gap-y-0",
    "gap-y-2",
    "gap-y-11",
    "gap-y-px",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.gap-0 {
  grid-gap: 0;
  gap: 0;
}
.gap-2 {
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
.gap-11 {
  grid-gap: 2.75rem;
  gap: 2.75rem;
}
.gap-px {
  grid-gap: 1px;
  gap: 1px;
}
.gap-x-0 {
  grid-column-gap: 0;
  column-gap: 0;
}
.gap-x-2 {
  grid-column-gap: 0.5rem;
  column-gap: 0.5rem;
}
.gap-x-11 {
  grid-column-gap: 2.75rem;
  column-gap: 2.75rem;
}
.gap-x-px {
  grid-column-gap: 1px;
  column-gap: 1px;
}
.gap-y-0 {
  grid-row-gap: 0;
  row-gap: 0;
}
.gap-y-2 {
  grid-row-gap: 0.5rem;
  row-gap: 0.5rem;
}
.gap-y-11 {
  grid-row-gap: 2.75rem;
  row-gap: 2.75rem;
}
.gap-y-px {
  grid-row-gap: 1px;
  row-gap: 1px;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Grid Auto Flow", () => {
  const css = new Set([
    "grid-flow-row",
    "grid-flow-col",
    "grid-flow-row-dense",
    "grid-flow-col-dense",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.grid-flow-row {
  grid-auto-flow: row;
}
.grid-flow-col {
  grid-auto-flow: column;
}
.grid-flow-row-dense {
  grid-auto-flow: row dense;
}
.grid-flow-col-dense {
  grid-auto-flow: column dense;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
