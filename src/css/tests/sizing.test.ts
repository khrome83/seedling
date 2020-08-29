import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Width", () => {
  const css = new Set([
    "w-auto",
    "w-px",
    "w-full",
    "w-screen",
    "w-0",
    "w-16",
    "w-4/5",
    "w-min-content",
    "w-max-content",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.w-auto {
  width: auto;
}
.w-px {
  width: 1px;
}
.w-full {
  width: 100%;
}
.w-screen {
  width: 100vw;
}
.w-0 {
  width: 0;
}
.w-16 {
  width: 4rem;
}
.w-4\\/5 {
  width: 80%;
}
.w-min-content {
  width: -webkit-min-content;
  width: -moz-min-content;
  width: min-content;
}
.w-max-content {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Min-Width", () => {
  const css = new Set([
    "min-w-0",
    "min-w-full",
    "min-w-min-content",
    "min-w-max-content",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.min-w-0 {
  min-width: 0;
}
.min-w-full {
  min-width: 100%;
}
.min-w-min-content {
  min-width: -webkit-min-content;
  min-width: -moz-min-content;
  min-width: min-content;
}
.min-w-max-content {
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Max-Width", () => {
  const css = new Set([
    "max-w-none",
    "max-w-xs",
    "max-w-sm",
    "max-w-md",
    "max-w-lg",
    "max-w-xl",
    "max-w-2xl",
    "max-w-3xl",
    "max-w-4xl",
    "max-w-5xl",
    "max-w-6xl",
    "max-w-full",
    "max-w-screen-sm",
    "max-w-screen-md",
    "max-w-screen-lg",
    "max-w-screen-xl",
    "max-w-min-content",
    "max-w-max-content",
    "max-w-prose",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.max-w-none {
  max-width: none;
}
.max-w-xs {
  max-width: 20rem;
}
.max-w-sm {
  max-width: 24rem;
}
.max-w-md {
  max-width: 28rem;
}
.max-w-lg {
  max-width: 32rem;
}
.max-w-xl {
  max-width: 36rem;
}
.max-w-2xl {
  max-width: 42rem;
}
.max-w-3xl {
  max-width: 48rem;
}
.max-w-4xl {
  max-width: 56rem;
}
.max-w-5xl {
  max-width: 64rem;
}
.max-w-6xl {
  max-width: 72rem;
}
.max-w-full {
  max-width: 100%;
}
.max-w-screen-sm {
  max-width: 640px;
}
.max-w-screen-md {
  max-width: 768px;
}
.max-w-screen-lg {
  max-width: 1024px;
}
.max-w-screen-xl {
  max-width: 1280px;
}
.max-w-min-content {
  max-width: -webkit-min-content;
  max-width: -moz-min-content;
  max-width: min-content;
}
.max-w-max-content {
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
}
.max-w-prose {
  max-width: 65ch;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Height", () => {
  const css = new Set([
    "h-auto",
    "h-px",
    "h-full",
    "h-screen",
    "h-0",
    "h-16",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.h-auto {
  height: auto;
}
.h-px {
  height: 1px;
}
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.h-0 {
  height: 0;
}
.h-16 {
  height: 4rem;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Min-Height", () => {
  const css = new Set([
    "min-h-0",
    "min-h-full",
    "min-h-screen",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.min-h-0 {
  min-height: 0;
}
.min-h-full {
  min-height: 100%;
}
.min-h-screen {
  min-height: 100vh;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Max-Height", () => {
  const css = new Set([
    "max-h-full",
    "max-h-screen",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.max-h-full {
  max-height: 100%;
}
.max-h-screen {
  max-height: 100vh;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
