import { assertEquals } from "../../../deps.ts";
import TailwindGenerator from "../index.ts";

Deno.test("(CSS) Breakpoints", () => {
  const css = new Set([
    "sm:m-4",
    "sm:mx-16",
    "md:my-12",
    "md:mt-4",
    "lg:mr-6",
    "lg:mb-5",
    "xl:ml-8",
    "xl:-m-16",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
@media (min-width: 640px) {
  .sm\\:m-4 {
    margin: 1rem;
  }
  .sm\\:mx-16 {
    margin-left: 4rem;
    margin-right: 4rem;
  }
}
@media (min-width: 768px) {
  .md\\:my-12 {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .md\\:mt-4 {
    margin-top: 1rem;
  }
}
@media (min-width: 1024px) {
  .lg\\:mr-6 {
    margin-right: 1.5rem;
  }
  .lg\\:mb-5 {
    margin-bottom: 1.25rem;
  }
}
@media (min-width: 1280px) {
  .xl\\:ml-8 {
    margin-left: 2rem;
  }
  .xl\\:-m-16 {
    margin: -4rem;
  }
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Media Queries", () => {
  const css = new Set([
    "motion-safe:m-4",
    "motion-reduce:mx-16",
    "md:motion-safe:my-12",
    "md:motion-reduce:mt-4",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
@media (prefers-reduced-motion: no-preference) {
  .motion-safe\\:m-4 {
    margin: 1rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .motion-reduce\\:mx-16 {
    margin-left: 4rem;
    margin-right: 4rem;
  }
}
@media (min-width: 768px) {
  @media (prefers-reduced-motion: no-preference) {
    .md\\:motion-safe\\:my-12 {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .md\\:motion-reduce\\:mt-4 {
      margin-top: 1rem;
    }
  }
}
  `;

  assertEquals(output.trim(), expected.trim());
});

Deno.test("(CSS) Pseudo Classes", () => {
  const css = new Set([
    "hover:m-4",
    "focus:m-4",
    "active:m-4",
    "group-hover:m-4",
    "group-focus:m-4",
    "focus-within:m-4",
    "focus-visible:m-4",
    "checked:m-4",
    "disabled:m-4",
    "visited:m-4",
    "first:m-4",
    "last:m-4",
    "odd:m-4",
    "even:m-4",
  ]);

  const t = new TailwindGenerator();
  t.addClasses(css);
  const output = t.getStylesheet();

  const expected = `
.hover\\:m-4:hover {
  margin: 1rem;
}
.focus\\:m-4:focus {
  margin: 1rem;
}
.active\\:m-4:active {
  margin: 1rem;
}
.group:hover .group-hover\\:m-4 {
  margin: 1rem;
}
.group:focus .group-focus\\:m-4 {
  margin: 1rem;
}
.focus-within\\:m-4:focus-within {
  margin: 1rem;
}
.focus-visible\\:m-4:focus-visible {
  margin: 1rem;
}
.checked\\:m-4:checked {
  margin: 1rem;
}
.disabled\\:m-4:disabled {
  margin: 1rem;
}
.visited\\:m-4:visited {
  margin: 1rem;
}
.first\\:m-4:first-child {
  margin: 1rem;
}
.last\\:m-4:last-child {
  margin: 1rem;
}
.odd\\:m-4:nth-child(odd) {
  margin: 1rem;
}
.even\\:m-4:nth-child(even) {
  margin: 1rem;
}
  `;

  assertEquals(output.trim(), expected.trim());
});
