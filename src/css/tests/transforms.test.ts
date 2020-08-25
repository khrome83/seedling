import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Transform", () => {
  const css = new Set([
    "transform",
    "transform-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.transform {
  --transform-translate-x: 0;
  --transform-translate-y: 0;
  --transform-rotate: 0;
  --transform-skew-x: 0;
  --transform-skew-y: 0;
  --transform-scale-x: 1;
  --transform-scale-y: 1;
  transform: translateX(var(--transform-translate-x))
    translateY(var(--transform-translate-y)) rotate(var(--transform-rotate))
    skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y))
    scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
}
.transform-none {
  transform: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Scale", () => {
  const css = new Set([
    "scale-0",
    "scale-50",
    "scale-150",
    "scale-200",
    "scale-x-0",
    "scale-x-50",
    "scale-x-150",
    "scale-x-200",
    "scale-y-0",
    "scale-y-50",
    "scale-y-150",
    "scale-y-200",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.scale-0 {
  --transform-scale-x: 0;
  --transform-scale-y: 0;
}
.scale-50 {
  --transform-scale-x: 0.5;
  --transform-scale-y: 0.5;
}
.scale-150 {
  --transform-scale-x: 1.5;
  --transform-scale-y: 1.5;
}
.scale-200 {
  --transform-scale-x: 2;
  --transform-scale-y: 2;
}
.scale-x-0 {
  --transform-scale-x: 0;
}
.scale-x-50 {
  --transform-scale-x: 0.5;
}
.scale-x-150 {
  --transform-scale-x: 1.5;
}
.scale-x-200 {
  --transform-scale-x: 2;
}
.scale-y-0 {
  --transform-scale-y: 0;
}
.scale-y-50 {
  --transform-scale-y: 0.5;
}
.scale-y-150 {
  --transform-scale-y: 1.5;
}
.scale-y-200 {
  --transform-scale-y: 2;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Rotate", () => {
  const css = new Set([
    "rotate-0",
    "rotate-45",
    "rotate-90",
    "rotate-180",
    "rotate-270",
    "-rotate-0",
    "-rotate-45",
    "-rotate-90",
    "-rotate-180",
    "-rotate-270",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.rotate-0 {
  --transform-rotate: 0;
}
.rotate-45 {
  --transform-rotate: 45deg;
}
.rotate-90 {
  --transform-rotate: 90deg;
}
.rotate-180 {
  --transform-rotate: 180deg;
}
.rotate-270 {
  --transform-rotate: 270deg;
}
.-rotate-0 {
  --transform-rotate: 0;
}
.-rotate-45 {
  --transform-rotate: -45deg;
}
.-rotate-90 {
  --transform-rotate: -90deg;
}
.-rotate-180 {
  --transform-rotate: -180deg;
}
.-rotate-270 {
  --transform-rotate: -270deg;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Translate", () => {
  const css = new Set([
    "translate-x-0",
    "translate-x-2",
    "translate-x-11",
    "translate-x-px",
    "translate-x-full",
    "translate-x-1/2",
    "translate-x-1/3",
    "translate-x-2/3",
    "translate-y-0",
    "translate-y-2",
    "translate-y-11",
    "translate-y-px",
    "translate-y-full",
    "translate-y-1/2",
    "translate-y-1/3",
    "translate-y-2/3",
    "-translate-x-0",
    "-translate-x-2",
    "-translate-x-11",
    "-translate-x-px",
    "-translate-x-full",
    "-translate-x-1/2",
    "-translate-x-1/3",
    "-translate-x-2/3",
    "-translate-y-0",
    "-translate-y-2",
    "-translate-y-11",
    "-translate-y-px",
    "-translate-y-full",
    "-translate-y-1/2",
    "-translate-y-1/3",
    "-translate-y-2/3",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.translate-x-0 {
  --transform-translate--x: 0;
}
.translate-x-2 {
  --transform-translate--x: 0.5rem;
}
.translate-x-11 {
  --transform-translate--x: 2.75rem;
}
.translate-x-px {
  --transform-translate--x: 1px;
}
.translate-x-full {
  --transform-translate--x: 100%;
}
.translate-x-1\\/2 {
  --transform-translate--x: 50%;
}
.translate-x-1\\/3 {
  --transform-translate--x: 33.33333333333333%;
}
.translate-x-2\\/3 {
  --transform-translate--x: 66.66666666666666%;
}
.translate-y-0 {
  --transform-translate--y: 0;
}
.translate-y-2 {
  --transform-translate--y: 0.5rem;
}
.translate-y-11 {
  --transform-translate--y: 2.75rem;
}
.translate-y-px {
  --transform-translate--y: 1px;
}
.translate-y-full {
  --transform-translate--y: 100%;
}
.translate-y-1\\/2 {
  --transform-translate--y: 50%;
}
.translate-y-1\\/3 {
  --transform-translate--y: 33.33333333333333%;
}
.translate-y-2\\/3 {
  --transform-translate--y: 66.66666666666666%;
}
.-translate-x-0 {
  --transform-translate--x: -0;
}
.-translate-x-2 {
  --transform-translate--x: -0.5rem;
}
.-translate-x-11 {
  --transform-translate--x: -2.75rem;
}
.-translate-x-px {
  --transform-translate--x: -1px;
}
.-translate-x-full {
  --transform-translate--x: -100%;
}
.-translate-x-1\\/2 {
  --transform-translate--x: -50%;
}
.-translate-x-1\\/3 {
  --transform-translate--x: -33.33333333333333%;
}
.-translate-x-2\\/3 {
  --transform-translate--x: -66.66666666666666%;
}
.-translate-y-0 {
  --transform-translate--y: -0;
}
.-translate-y-2 {
  --transform-translate--y: -0.5rem;
}
.-translate-y-11 {
  --transform-translate--y: -2.75rem;
}
.-translate-y-px {
  --transform-translate--y: -1px;
}
.-translate-y-full {
  --transform-translate--y: -100%;
}
.-translate-y-1\\/2 {
  --transform-translate--y: -50%;
}
.-translate-y-1\\/3 {
  --transform-translate--y: -33.33333333333333%;
}
.-translate-y-2\\/3 {
  --transform-translate--y: -66.66666666666666%;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Skew", () => {
  const css = new Set([
    "skew-x-0",
    "skew-x-2",
    "skew-x-11",
    "skew-y-0",
    "skew-y-2",
    "skew-y-11",
    "-skew-x-0",
    "-skew-x-2",
    "-skew-x-11",
    "-skew-y-0",
    "-skew-y-2",
    "-skew-y-11",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.skew-x-0 {
  --transform-skew--x: 0;
}
.skew-x-2 {
  --transform-skew--x: 2deg;
}
.skew-x-11 {
  --transform-skew--x: 11deg;
}
.skew-y-0 {
  --transform-skew--y: 0;
}
.skew-y-2 {
  --transform-skew--y: 2deg;
}
.skew-y-11 {
  --transform-skew--y: 11deg;
}
.-skew-x-0 {
  --transform-skew--x: 0;
}
.-skew-x-2 {
  --transform-skew--x: -2deg;
}
.-skew-x-11 {
  --transform-skew--x: -11deg;
}
.-skew-y-0 {
  --transform-skew--y: 0;
}
.-skew-y-2 {
  --transform-skew--y: -2deg;
}
.-skew-y-11 {
  --transform-skew--y: -11deg;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Transform Origin", () => {
  const css = new Set([
    "origin-center",
    "origin-top",
    "origin-top-right",
    "origin-right",
    "origin-bottom-right",
    "origin-bottom",
    "origin-bottom-left",
    "origin-left",
    "origin-top-left",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.origin-center {
  transform-origin: center;
}
.origin-top {
  transform-origin: top;
}
.origin-top-right {
  transform-origin: top right;
}
.origin-right {
  transform-origin: right;
}
.origin-bottom-right {
  transform-origin: bottom right;
}
.origin-bottom {
  transform-origin: bottom;
}
.origin-bottom-left {
  transform-origin: bottom left;
}
.origin-left {
  transform-origin: left;
}
.origin-top-left {
  transform-origin: top left;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
