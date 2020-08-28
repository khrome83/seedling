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
    "shadow-solid",
    "shadow-outline-gray",
    "shadow-outline-blue",
    "shadow-outline-teal",
    "shadow-outline-green",
    "shadow-outline-yellow",
    "shadow-outline-orange",
    "shadow-outline-red",
    "shadow-outline-pink",
    "shadow-outline-purple",
    "shadow-outline-indigo",
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
.shadow-solid {
  box-shadow: 0 0 0 2px currentColor;
}
.shadow-outline-gray {
  box-shadow: 0 0 0 3px rgba(159, 166, 178, 0.45);
}
.shadow-outline-blue {
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
}
.shadow-outline-teal {
  box-shadow: 0 0 0 3px rgba(126, 220, 226, 0.45);
}
.shadow-outline-green {
  box-shadow: 0 0 0 3px rgba(132, 225, 188, 0.45);
}
.shadow-outline-yellow {
  box-shadow: 0 0 0 3px rgba(250, 202, 21, 0.45);
}
.shadow-outline-orange {
  box-shadow: 0 0 0 3px rgba(253, 186, 140, 0.45);
}
.shadow-outline-red {
  box-shadow: 0 0 0 3px rgba(248, 180, 180, 0.45);
}
.shadow-outline-pink {
  box-shadow: 0 0 0 3px rgba(248, 180, 217, 0.45);
}
.shadow-outline-purple {
  box-shadow: 0 0 0 3px rgba(202, 191, 253, 0.45);
}
.shadow-outline-indigo {
  box-shadow: 0 0 0 3px rgba(180, 198, 252, 0.45);
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
