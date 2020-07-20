import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { resolveData } from "./data.ts";
import { resolveComponent } from "./component.ts";

// Root for all tests
const root = `${Deno.cwd()}/src/resolvers`;

Deno.test("Data Resolver - GraphCMS", async () => {
  const attrs = {
    id: "cka5lzgxk02s701761t7scrb0",
  };

  const body = `query MyQuery($id: ID) {
    marketingSocialProof(where: {id: $id}) {
      __typename
      id
    }
  }`;

  const output = await resolveData("graphcms", attrs, body, root);
  const expected = {
    type: "SUCCESS",
    response: {
      data: {
        marketingSocialProof: {
          __typename: "MarketingSocialProof",
          id: "cka5lzgxk02s701761t7scrb0",
        },
      },
    },
    retries: 0,
    meta: { cacheHit: false, cacheKey: "c847d6db-3566-5970-aa05-09a23e82319b" },
  };

  assertEquals(output, expected);
});

Deno.test("Component Resolver - Sample", async () => {
  const output = await resolveComponent("Sample", root);
  const expected = {
    ast: {
      html: [
        {
          type: "Tag",
          data: "div",
          attributes: [
            {
              type: "Attribute",
              data: ' class="foo bar"',
              start: 4,
              end: 20,
              name: { type: "AttributeName", data: "class", start: 5, end: 10 },
              value: {
                type: "AttributeValue",
                data: '"foo bar"',
                start: 12,
                end: 21,
              },
            },
          ],
          children: [
            { type: "Text", data: "\n  ", start: 21, end: 24 },
            {
              type: "Tag",
              data: "ul",
              attributes: [],
              children: [
                { type: "Text", data: "\n    ", start: 28, end: 33 },
                {
                  type: "Tag",
                  data: "li",
                  attributes: [],
                  children: [{ type: "Text", data: "Foo", start: 37, end: 40 }],
                  start: 33,
                  end: 45,
                },
                { type: "Text", data: "\n    ", start: 45, end: 50 },
                {
                  type: "Tag",
                  data: "li",
                  attributes: [],
                  children: [{ type: "Text", data: "Bar", start: 54, end: 57 }],
                  start: 50,
                  end: 62,
                },
                { type: "Text", data: "\n    ", start: 62, end: 67 },
                {
                  type: "Tag",
                  data: "li",
                  attributes: [],
                  children: [{ type: "Text", data: "Baz", start: 71, end: 74 }],
                  start: 67,
                  end: 79,
                },
                { type: "Text", data: "\n  ", start: 79, end: 82 },
              ],
              start: 24,
              end: 87,
            },
            { type: "Text", data: "\n", start: 87, end: 88 },
          ],
          start: 0,
          end: 94,
        },
      ],
    },
    meta: { cacheHit: false, cacheKey: "bfb528c4-456d-58d5-98e3-5d76ffe83e4a" },
  };

  assertEquals(output, expected);
});
