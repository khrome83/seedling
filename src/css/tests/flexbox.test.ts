import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Flex Direction", () => {
  const css = new Set([
    "flex-row",
    "flex-row-reverse",
    "flex-col",
    "flex-col-reverse",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.flex-row {
  flex-direction: row;
}
.flex-row-reverse {
  flex-direction: row-reverse;
}
.flex-col {
  flex-direction: column;
}
.flex-col-reverse {
  flex-direction: column-reverse;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Flex Wrap", () => {
  const css = new Set([
    "flex-wrap",
    "flex-wrap-reverse",
    "flex-no-wrap",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.flex-wrap {
  flex-wrap: wrap;
}
.flex-wrap-reverse {
  flex-wrap: wrap-reverse;
}
.flex-no-wrap {
  flex-wrap: nowrap;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Align Items", () => {
  const css = new Set([
    "items-start",
    "items-end",
    "items-center",
    "items-baseline",
    "items-stretch",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.items-baseline {
  align-items: baseline;
}
.items-stretch {
  align-items: stretch;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Align Content", () => {
  const css = new Set([
    "content-center",
    "content-start",
    "content-end",
    "content-between",
    "content-around",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.content-center {
  align-content: center;
}
.content-start {
  align-content: flex-start;
}
.content-end {
  align-content: flex-end;
}
.content-between {
  align-content: space-between;
}
.content-around {
  align-content: space-around;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Align Self", () => {
  const css = new Set([
    "self-auto",
    "self-start",
    "self-end",
    "self-center",
    "self-stretch",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.self-auto {
  align-self: auto;
}
.self-start {
  align-self: flex-start;
}
.self-end {
  align-self: flex-end;
}
.self-center {
  align-self: center;
}
.self-stretch {
  align-self: stretch;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Justify Content", () => {
  const css = new Set([
    "justify-start",
    "justify-end",
    "justify-center",
    "justify-between",
    "justify-around",
    "justify-evenly",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}
.justify-evenly {
  justify-content: space-evenly;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Flex", () => {
  const css = new Set([
    "flex-1",
    "flex-auto",
    "flex-initial",
    "flex-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.flex-1 {
  flex: 1 1 0%;
}
.flex-auto {
  flex: 1 1 auto;
}
.flex-initial {
  flex: 0 1 auto;
}
.flex-none {
  flex: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Flex Grow", () => {
  const css = new Set([
    "flex-grow-0",
    "flex-grow",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.flex-grow-0 {
  flex-grow: 0;
}
.flex-grow {
  flex-grow: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Flex Shrink", () => {
  const css = new Set([
    "flex-shrink-0",
    "flex-shrink",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-shrink {
  flex-shrink: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Order", () => {
  const css = new Set([
    "order-1",
    "order-100",
    "order-first",
    "order-last",
    "order-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.order-1 {
  order: 1;
}
.order-100 {
  order: 100;
}
.order-first {
  order: -9999;
}
.order-last {
  order: 9999;
}
.order-none {
  order: 0;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
