import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { Parser, Tag } from "../index.ts";

Deno.test("Non String Template should throw a TypeError", () => {
  const badTemplate = 9001;
  const p = assertThrows((): void => {
    new Parser((badTemplate as unknown) as string); // all ts lies =P
  }, TypeError);
});

Deno.test("Unknown Directive should Throw", () => {
  const html = '<:foobar bind="h2">Dynamic Heading</:foobar>';
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Element Directive - Invalid Bind Argument should Throw", () => {
  const html = '<:element bind="">Bad Binding</:element>';
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Component Directive - Invalid Bind Argument should Throw", () => {
  const html = '<:component bind="">Bad Binding</:component>';
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Unclosed Text Content Tag should Throw", () => {
  const html = '<script class="h1">var x = true;';
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Unclosed Tag should Throw", () => {
  const html = '<BaseHeading class="h1">Testing';
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Unclosed Comment should Throw", () => {
  const html = `
    <!-- Comment
    <h1>Unclosed Comment, Ohh No!</h1>
  `;
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Empty Router Directive should Throw", () => {
  const html = `<:router></:router>`;
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Invalid Directives in Router Directive should Throw", () => {
  const html = `<:router><:foobar /></:router>`;
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Path Directive without URL should Throw", () => {
  const html = `<:path></:path>`;
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});

Deno.test("Invalid Directives in Path Directive should Throw", () => {
  const html = `<:path url="/"><:foobar /></:path>`;
  const p = new Parser(html);

  assertThrows((): void => {
    p.parse();
  });
});
