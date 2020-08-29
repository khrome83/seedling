import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Container", () => {
  const css = new Set([
    "container",
    "sm:container",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.container,
.sm\\:container {
  width: 100%;
}
@media (min-width: 640px) {
  .container,
  .sm\\:container {
    max-width: 640px;
  }
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Box Sizing", () => {
  const css = new Set([
    "box-border",
    "box-content",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.box-border {
  box-sizing: border-box;
}
.box-content {
  box-sizing: content-box;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Display", () => {
  const css = new Set([
    "block",
    "inline-block",
    "inline",
    "flex",
    "inline-flex",
    "table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-footer-group",
    "table-header-group",
    "table-row-group",
    "table-row",
    "flow-root",
    "grid",
    "inline-grid",
    "contents",
    "hidden",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.table {
  display: table;
}
.table-caption {
  display: table-caption;
}
.table-cell {
  display: table-cell;
}
.table-column {
  display: table-column;
}
.table-column-group {
  display: table-column-group;
}
.table-footer-group {
  display: table-footer-group;
}
.table-header-group {
  display: table-header-group;
}
.table-row-group {
  display: table-row-group;
}
.table-row {
  display: table-row;
}
.flow-root {
  display: flow-root;
}
.grid {
  display: grid;
}
.inline-grid {
  display: inline-grid;
}
.contents {
  display: contents;
}
.hidden {
  display: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Floats", () => {
  const css = new Set([
    "float-right",
    "float-left",
    "float-none",
    "clearfix",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.float-none {
  float: none;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Clear", () => {
  const css = new Set([
    "clear-right",
    "clear-left",
    "clear-none",
    "clear-both",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.clear-right {
  clear: right;
}
.clear-left {
  clear: left;
}
.clear-none {
  clear: none;
}
.clear-both {
  clear: both;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Object Fit", () => {
  const css = new Set([
    "object-contain",
    "object-cover",
    "object-fill",
    "object-none",
    "object-scale-down",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.object-contain {
  -o-object-fit: contain;
  object-fit: contain;
}
.object-cover {
  -o-object-fit: cover;
  object-fit: cover;
}
.object-fill {
  -o-object-fit: fill;
  object-fit: fill;
}
.object-none {
  -o-object-fit: none;
  object-fit: none;
}
.object-scale-down {
  -o-object-fit: scale-down;
  object-fit: scale-down;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Object Position", () => {
  const css = new Set([
    "object-bottom",
    "object-center",
    "object-left",
    "object-left-bottom",
    "object-left-top",
    "object-right",
    "object-right-bottom",
    "object-right-top",
    "object-top",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.object-bottom {
  -o-object-position: bottom;
  object-position: bottom;
}
.object-center {
  -o-object-position: center;
  object-position: center;
}
.object-left {
  -o-object-position: left;
  object-position: left;
}
.object-left-bottom {
  -o-object-position: left bottom;
  object-position: left bottom;
}
.object-left-top {
  -o-object-position: left top;
  object-position: left top;
}
.object-right {
  -o-object-position: right;
  object-position: right;
}
.object-right-bottom {
  -o-object-position: right bottom;
  object-position: right bottom;
}
.object-right-top {
  -o-object-position: right top;
  object-position: right top;
}
.object-top {
  -o-object-position: top;
  object-position: top;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Overflow", () => {
  const css = new Set([
    "overflow-auto",
    "overflow-hidden",
    "overflow-visible",
    "overflow-scroll",
    "overflow-x-auto",
    "overflow-y-auto",
    "overflow-x-hidden",
    "overflow-y-hidden",
    "overflow-x-visible",
    "overflow-y-visible",
    "overflow-x-scroll",
    "overflow-y-scroll",
    "scrolling-touch",
    "scrolling-auto",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-visible {
  overflow: visible;
}
.overflow-scroll {
  overflow: scroll;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
.overflow-y-hidden {
  overflow-y: hidden;
}
.overflow-x-visible {
  overflow-x: visible;
}
.overflow-y-visible {
  overflow-y: visible;
}
.overflow-x-scroll {
  overflow-x: scroll;
}
.overflow-y-scroll {
  overflow-y: scroll;
}
.scrolling-touch {
  -webkit-overflow-scrolling: touch;
}
.scrolling-auto {
  -webkit-overflow-scrolling: auto;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Overscroll Behavior", () => {
  const css = new Set([
    "overscroll-auto",
    "overscroll-contain",
    "overscroll-none",
    "overscroll-y-auto",
    "overscroll-y-contain",
    "overscroll-y-none",
    "overscroll-x-auto",
    "overscroll-x-contain",
    "overscroll-x-none",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.overscroll-auto {
  -ms-scroll-chaining: chained;
  overscroll-behavior: auto;
}
.overscroll-contain {
  -ms-scroll-chaining: none;
  overscroll-behavior: contain;
}
.overscroll-none {
  -ms-scroll-chaining: none;
  overscroll-behavior: none;
}
.overscroll-y-auto {
  overscroll-behavior-y: auto;
}
.overscroll-y-contain {
  overscroll-behavior-y: contain;
}
.overscroll-y-none {
  overscroll-behavior-y: none;
}
.overscroll-x-auto {
  overscroll-behavior-x: auto;
}
.overscroll-x-contain {
  overscroll-behavior-x: contain;
}
.overscroll-x-none {
  overscroll-behavior-x: none;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Position", () => {
  const css = new Set([
    "static",
    "fixed",
    "absolute",
    "relative",
    "sticky",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Top / Right / Bottom / Left", () => {
  const css = new Set([
    "inset-0",
    "inset-auto",
    "inset-y-0",
    "inset-x-0",
    "inset-y-auto",
    "inset-x-auto",
    "top-0",
    "right-0",
    "bottom-0",
    "left-0",
    "top-auto",
    "right-auto",
    "bottom-auto",
    "left-auto",
    "top-4",
    "inset-y-4",
    "-bottom-6",
    "-inset-x-6",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.inset-auto {
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
}
.inset-y-0 {
  top: 0;
  bottom: 0;
}
.inset-x-0 {
  right: 0;
  left: 0;
}
.inset-y-auto {
  top: auto;
  bottom: auto;
}
.inset-x-auto {
  right: auto;
  left: auto;
}
.top-0 {
  top: 0;
}
.right-0 {
  right: 0;
}
.bottom-0 {
  bottom: 0;
}
.left-0 {
  left: 0;
}
.top-auto {
  top: auto;
}
.right-auto {
  right: auto;
}
.bottom-auto {
  bottom: auto;
}
.left-auto {
  left: auto;
}
.top-4 {
  top: 1rem;
}
.inset-y-4 {
  top: 1rem;
  bottom: 1rem;
}
.-bottom-6 {
  bottom: -1.5rem;
}
.-inset-x-6 {
  right: -1.5rem;
  left: -1.5rem;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Visibility", () => {
  const css = new Set([
    "visible",
    "invisible",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Z-index", () => {
  const css = new Set([
    "z-0",
    "z-10",
    "z-20",
    "z-30",
    "z-40",
    "z-50",
    "z-auto",
    "z-100",
    "z-1000",
    "z-9999",
    "-z-1",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.z-0 {
  z-index: 0;
}
.z-10 {
  z-index: 10;
}
.z-20 {
  z-index: 20;
}
.z-30 {
  z-index: 30;
}
.z-40 {
  z-index: 40;
}
.z-50 {
  z-index: 50;
}
.z-auto {
  z-index: auto;
}
.z-100 {
  z-index: 100;
}
.z-1000 {
  z-index: 1000;
}
.z-9999 {
  z-index: 9999;
}
.-z-1 {
  z-index: -1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
