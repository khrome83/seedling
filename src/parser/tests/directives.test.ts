import { assertEquals } from "../../deps.ts";
import { Parser } from "../index.ts";

Deno.test("Layout Directive", () => {
  const html = '<:layout use="h2" />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "LayoutDirective",
        data: ":layout",
        attributes: [],
        children: [],
        expression: {
          type: "Literal",
          data: '"h2"',
          value: "h2",
          start: 14,
          end: 18,
        },
        start: 0,
        end: 20,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Element Directive - Closing Tag", () => {
  const html = '<:element use="h2" class="foo">Dynamic Heading</:element>';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "ElementDirective",
        data: ":element",
        attributes: [
          {
            type: "Attribute",
            data: ' class="foo"',
            start: 18,
            end: 30,
            name: { type: "AttributeName", data: "class", start: 19, end: 24 },
            value: {
              type: "AttributeValue",
              data: '"foo"',
              start: 26,
              end: 31,
            },
          },
        ],
        children: [
          { type: "Text", data: "Dynamic Heading", start: 31, end: 46 },
        ],
        expression: {
          type: "Literal",
          data: '"h2"',
          value: "h2",
          start: 15,
          end: 19,
        },
        start: 0,
        end: 57,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Element Directive - Self Closing", () => {
  const html = '<:element use="br" />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "ElementDirective",
        data: ":element",
        attributes: [],
        children: [],
        expression: {
          type: "Literal",
          data: '"br"',
          value: "br",
          start: 15,
          end: 19,
        },
        start: 0,
        end: 21,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Component Directive - Closing Tag", () => {
  const html = "<:component use={tag}>Dynamic Heading</:component>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "ComponentDirective",
        data: ":component",
        attributes: [],
        children: [
          { type: "Text", data: "Dynamic Heading", start: 22, end: 37 },
        ],
        expression: { type: "Identifier", data: "tag", start: 17, end: 20 },
        start: 0,
        end: 50,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Component Directive - Self Closing", () => {
  const html = '<:component use="br" />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "ComponentDirective",
        data: ":component",
        attributes: [],
        children: [],
        expression: {
          type: "Literal",
          data: '"br"',
          value: "br",
          start: 17,
          end: 21,
        },
        start: 0,
        end: 23,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Implicit Component Directive", () => {
  const html = '<FooBar theme="blue">Content</FooBar>';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "ComponentDirective",
        data: ":component",
        attributes: [
          {
            type: "Attribute",
            data: ' theme="blue"',
            start: 7,
            end: 20,
            name: { type: "AttributeName", data: "theme", start: 8, end: 13 },
            value: {
              type: "AttributeValue",
              data: '"blue"',
              start: 15,
              end: 21,
            },
          },
        ],
        children: [{ type: "Text", data: "Content", start: 21, end: 28 }],
        expression: { type: "Identifier", data: "FooBar", start: 0, end: 6 },
        start: 0,
        end: 37,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Router Directive", () => {
  const html = `
    <:router>
      <:path url="/" />
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "RouterDirective",
        data: ":router",
        attributes: [],
        children: [
          { type: "Text", data: "\n      ", start: 14, end: 21 },
          {
            type: "PathDirective",
            data: ":path",
            attributes: [],
            children: [],
            path: [],
            start: 21,
            end: 38,
          },
          { type: "Text", data: "\n    ", start: 38, end: 43 },
        ],
        start: 5,
        end: 53,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive", () => {
  const html = '<:path url="/blog/:catagories" />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "PathDirective",
        data: ":path",
        attributes: [],
        children: [],
        path: [
          { type: "StaticPathSegment", data: "blog", start: 13, end: 17 },
          {
            type: "DynamicPathSegment",
            data: ":catagories",
            expression: {
              type: "Identifier",
              data: "catagories",
              start: 18,
              end: 28,
            },
            start: 18,
            end: 29,
          },
        ],
        start: 0,
        end: 33,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive with Data", () => {
  const html = `
    <:path url="/blog/:catagories">
      <:data id="foo" />
    </:path>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "PathDirective",
        data: ":path",
        attributes: [],
        children: [
          { type: "Text", data: "\n      ", start: 36, end: 43 },
          {
            type: "DataDirective",
            data: ":data",
            attributes: [
              {
                type: "Attribute",
                data: ' id="foo"',
                start: 49,
                end: 58,
                name: { type: "AttributeName", data: "id", start: 50, end: 52 },
                value: {
                  type: "AttributeValue",
                  data: '"foo"',
                  start: 54,
                  end: 59,
                },
              },
            ],
            children: [],
            key: "$",
            start: 43,
            end: 61,
          },
          { type: "Text", data: "\n    ", start: 61, end: 66 },
        ],
        path: [
          { type: "StaticPathSegment", data: "blog", start: 18, end: 22 },
          {
            type: "DynamicPathSegment",
            data: ":catagories",
            expression: {
              type: "Identifier",
              data: "catagories",
              start: 23,
              end: 33,
            },
            start: 23,
            end: 34,
          },
        ],
        start: 5,
        end: 74,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Data Directive", () => {
  const html = '<:data id="sdf098df09-1349asd9asd-sd8asd012" />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "DataDirective",
        data: ":data",
        attributes: [
          {
            type: "Attribute",
            data: ' id="sdf098df09-1349asd9asd-sd8asd012"',
            start: 6,
            end: 44,
            name: { type: "AttributeName", data: "id", start: 7, end: 9 },
            value: {
              type: "AttributeValue",
              data: '"sdf098df09-1349asd9asd-sd8asd012"',
              start: 11,
              end: 45,
            },
          },
        ],
        children: [],
        key: "$",
        start: 0,
        end: 47,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Data Directive with Key Override", () => {
  const html = '<:data id="sdf098df09-1349asd9asd-sd8asd012" key="foo"/>';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "DataDirective",
        data: ":data",
        attributes: [
          {
            type: "Attribute",
            data: ' id="sdf098df09-1349asd9asd-sd8asd012"',
            start: 6,
            end: 44,
            name: { type: "AttributeName", data: "id", start: 7, end: 9 },
            value: {
              type: "AttributeValue",
              data: '"sdf098df09-1349asd9asd-sd8asd012"',
              start: 11,
              end: 45,
            },
          },
        ],
        children: [],
        key: '"foo"',
        start: 0,
        end: 56,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Data Directive with Plain Text", () => {
  const html = `
    <:data id="sdf098df09-1349asd9asd-sd8asd012">
      {
        name
        sizes {
          size
          available
        }
        color
      }
    </:data>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "DataDirective",
        data: ":data",
        attributes: [
          {
            type: "Attribute",
            data: ' id="sdf098df09-1349asd9asd-sd8asd012"',
            start: 11,
            end: 49,
            name: { type: "AttributeName", data: "id", start: 12, end: 14 },
            value: {
              type: "AttributeValue",
              data: '"sdf098df09-1349asd9asd-sd8asd012"',
              start: 16,
              end: 50,
            },
          },
        ],
        children: [
          {
            type: "Text",
            data:
              "\n      {\n        name\n        sizes {\n          size\n          available\n        }\n        color\n      }\n    ",
            start: 50,
            end: 159,
          },
        ],
        key: "$",
        start: 5,
        end: 167,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Slot Directive - No Default", () => {
  const html = "<:slot/>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "SlotDirective",
        data: ":slot",
        attributes: [],
        children: [],
        expression: null,
        start: 0,
        end: 8,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Slot Directive - No Name", () => {
  const html = "<:slot>Dynamic Heading</:slot>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "SlotDirective",
        data: ":slot",
        attributes: [],
        children: [
          { type: "Text", data: "Dynamic Heading", start: 7, end: 22 },
        ],
        expression: null,
        start: 0,
        end: 30,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Slot Directive - Name", () => {
  const html = '<:slot name="foo">Dynamic Heading</:slot>';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "SlotDirective",
        data: ":slot",
        attributes: [],
        children: [
          { type: "Text", data: "Dynamic Heading", start: 18, end: 33 },
        ],
        expression: {
          type: "Literal",
          data: '"foo"',
          value: "foo",
          start: 13,
          end: 18,
        },
        start: 0,
        end: 41,
      },
    ],
  };

  assertEquals(output, expected);
});
