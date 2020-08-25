import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Box Shadow", () => {
  const css = new Set([
    "shadow-xs",
    "shadow-sm",
    "shadow",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
    "shadow-inner",
    "shadow-outline",
    "shadow-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.shadow-xs {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.shadow-none {
  box-shadow: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Opacity", () => {
  const css = new Set([
    "opacity-0",
    "opacity-25",
    "opacity-50",
    "opacity-75",
    "opacity-88",
    "opacity-100",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.opacity-0 {
  opacity: 0;
}
.opacity-25 {
  opacity: 0.25;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-75 {
  opacity: 0.75;
}
.opacity-88 {
  opacity: 0.88;
}
.opacity-100 {
  opacity: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
