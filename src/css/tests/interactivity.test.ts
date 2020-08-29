import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Appearance", () => {
  const css = new Set([
    "appearance-none",
    "appearance-auto",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.appearance-none {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.appearance-auto {
  -webkit-appearance: auto;
  -moz-appearance: auto;
  appearance: auto;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Cursor", () => {
  const css = new Set([
    "cursor-auto",
    "cursor-default",
    "cursor-pointer",
    "cursor-wait",
    "cursor-text",
    "cursor-move",
    "cursor-not-allowed",
    "cursor-crosshair",
    "cursor-zoom-in",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.cursor-auto {
  cursor: auto;
}
.cursor-default {
  cursor: default;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-wait {
  cursor: wait;
}
.cursor-text {
  cursor: text;
}
.cursor-move {
  cursor: move;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-crosshair {
  cursor: crosshair;
}
.cursor-zoom-in {
  cursor: zoom-in;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Outline", () => {
  const css = new Set([
    "outline-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.outline-none {
  outline: 0;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Pointer Events", () => {
  const css = new Set([
    "pointer-events-none",
    "pointer-events-auto",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Resize", () => {
  const css = new Set([
    "resize-none",
    "resize-y",
    "resize-x",
    "resize",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.resize-none {
  resize: none;
}
.resize-y {
  resize: vertical;
}
.resize-x {
  resize: horizontal;
}
.resize {
  resize: both;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) User Select", () => {
  const css = new Set([
    "select-none",
    "select-text",
    "select-all",
    "select-auto",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.select-text {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.select-all {
  -webkit-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
}
.select-auto {
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
