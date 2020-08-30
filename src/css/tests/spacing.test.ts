import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

// TODO: .container

Deno.test("(CSS) Padding", () => {
  const css = new Set([
    "p-4",
    "px-16",
    "py-12",
    "pt-4",
    "pr-6",
    "pb-5",
    "pl-8",
    "p-full",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.p-4 {
  padding: 1rem;
}
.px-16 {
  padding-left: 4rem;
  padding-right: 4rem;
}
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.pt-4 {
  padding-top: 1rem;
}
.pr-6 {
  padding-right: 1.5rem;
}
.pb-5 {
  padding-bottom: 1.25rem;
}
.pl-8 {
  padding-left: 2rem;
}
.p-full {
  padding: 100%;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Margin", () => {
  const css = new Set([
    "m-4",
    "mx-16",
    "my-12",
    "mt-4",
    "mr-6",
    "mb-5",
    "ml-8",
    "-m-16",
    "m-full",
    "-m-full",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.m-4 {
  margin: 1rem;
}
.mx-16 {
  margin-left: 4rem;
  margin-right: 4rem;
}
.my-12 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mr-6 {
  margin-right: 1.5rem;
}
.mb-5 {
  margin-bottom: 1.25rem;
}
.ml-8 {
  margin-left: 2rem;
}
.-m-16 {
  margin: -4rem;
}
.m-full {
  margin: 100%;
}
.-m-full {
  margin: -100%;
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Space Between", () => {
  const css = new Set([
    "space-y-0",
    "space-x-0",
    "space-y-4",
    "space-x-4",
    "space-y-px",
    "space-x-px",
    "-space-y-2",
    "-space-x-2",
    "-space-y-px",
    "-space-x-px",
    "space-y-reverse",
    "space-x-reverse",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.space-y-0 > :not(template) ~ :not(template) {
  --space-y-reverse: 0;
  margin-top: calc(0px * calc(1 - var(--space-y-reverse)));
  margin-bottom: calc(0px * var(--space-y-reverse));
}
.space-x-0 > :not(template) ~ :not(template) {
  --space-x-reverse: 0;
  margin-right: calc(0px * var(--space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--space-x-reverse)));
}
.space-y-4 > :not(template) ~ :not(template) {
  --space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--space-y-reverse)));
  margin-bottom: calc(1rem * var(--space-y-reverse));
}
.space-x-4 > :not(template) ~ :not(template) {
  --space-x-reverse: 0;
  margin-right: calc(1rem * var(--space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--space-x-reverse)));
}
.space-y-px > :not(template) ~ :not(template) {
  --space-y-reverse: 0;
  margin-top: calc(1px * calc(1 - var(--space-y-reverse)));
  margin-bottom: calc(1px * var(--space-y-reverse));
}
.space-x-px > :not(template) ~ :not(template) {
  --space-x-reverse: 0;
  margin-right: calc(1px * var(--space-x-reverse));
  margin-left: calc(1px * calc(1 - var(--space-x-reverse)));
}
.-space-y-2 > :not(template) ~ :not(template) {
  --space-y-reverse: 0;
  margin-top: calc(-0.5rem * calc(1 - var(--space-y-reverse)));
  margin-bottom: calc(-0.5rem * var(--space-y-reverse));
}
.-space-x-2 > :not(template) ~ :not(template) {
  --space-x-reverse: 0;
  margin-right: calc(-0.5rem * var(--space-x-reverse));
  margin-left: calc(-0.5rem * calc(1 - var(--space-x-reverse)));
}
.-space-y-px > :not(template) ~ :not(template) {
  --space-y-reverse: 0;
  margin-top: calc(-1px * calc(1 - var(--space-y-reverse)));
  margin-bottom: calc(-1px * var(--space-y-reverse));
}
.-space-x-px > :not(template) ~ :not(template) {
  --space-x-reverse: 0;
  margin-right: calc(-1px * var(--space-x-reverse));
  margin-left: calc(-1px * calc(1 - var(--space-x-reverse)));
}
.space-y-reverse > :not(template) ~ :not(template) {
  --space-y-reverse: 1;
}
.space-x-reverse > :not(template) ~ :not(template) {
  --space-x-reverse: 1;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
