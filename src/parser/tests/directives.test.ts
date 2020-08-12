import { assertEquals } from "../../deps.ts";
import { Parser } from "../index.ts";

Deno.test("Layout Directive", () => {
  const html = '<:layout use="h2" />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [],
    layout: [
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
    router: undefined,
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
              data: "foo",
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
        slot: undefined,
        start: 0,
        end: 57,
      },
    ],
    layout: [],
    router: undefined,
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
        slot: undefined,
        start: 0,
        end: 21,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Element Directive - Named Slot", () => {
  const html = '<:element use="br" slot="foo" />';
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
        slot: {
          type: "Literal",
          data: '"foo"',
          value: "foo",
          start: 25,
          end: 30,
        },
        start: 0,
        end: 32,
      },
    ],
    layout: [],
    router: undefined,
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
        slot: undefined,
        start: 0,
        end: 50,
      },
    ],
    layout: [],
    router: undefined,
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
        slot: undefined,
        start: 0,
        end: 23,
      },
    ],
    layout: [],
    router: undefined,
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
              data: "blue",
              start: 15,
              end: 21,
            },
          },
        ],
        children: [{ type: "Text", data: "Content", start: 21, end: 28 }],
        expression: {
          type: "Literal",
          data: '"FooBar"',
          value: "FooBar",
          start: 0,
          end: 8,
        },
        slot: undefined,
        start: 0,
        end: 37,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Component Directive - Named Slot", () => {
  const html = '<:component use="br" slot="Foo" />';
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
        slot: {
          type: "Literal",
          data: '"Foo"',
          value: "Foo",
          start: 27,
          end: 32,
        },
        start: 0,
        end: 34,
      },
    ],
    layout: [],
    router: undefined,
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
    html: [{ type: "Text", data: "\n    ", start: 0, end: 5 }],
    layout: [],
    router: {
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
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive", () => {
  const html = '<:router><:path url="/blog/:catagories" /></:router>';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [],
    router: {
      type: "RouterDirective",
      data: ":router",
      attributes: [],
      children: [
        {
          type: "PathDirective",
          data: ":path",
          attributes: [],
          children: [],
          path: [
            { type: "StaticPathSegment", data: "blog", start: 22, end: 26 },
            {
              type: "DynamicPathSegment",
              data: ":catagories",
              expression: {
                type: "Identifier",
                data: "catagories",
                start: 27,
                end: 37,
              },
              start: 27,
              end: 38,
            },
          ],
          start: 9,
          end: 42,
        },
      ],
      start: 0,
      end: 52,
    },

    layout: [],
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive with Data", () => {
  const html = `
    <:router>
      <:path url="/blog/:catagories">
        <:data use="bar" id="foo" />
      </:path>
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [{ type: "Text", data: "\n    ", start: 0, end: 5 }],
    router: {
      type: "RouterDirective",
      data: ":router",
      attributes: [],
      children: [
        { type: "Text", data: "\n      ", start: 14, end: 21 },
        {
          type: "PathDirective",
          data: ":path",
          attributes: [],
          children: [
            { type: "Text", data: "\n        ", start: 52, end: 61 },
            {
              type: "DataDirective",
              data: ":data",
              attributes: [
                {
                  type: "Attribute",
                  data: ' id="foo"',
                  start: 77,
                  end: 86,
                  name: {
                    type: "AttributeName",
                    data: "id",
                    start: 78,
                    end: 80,
                  },
                  value: {
                    type: "AttributeValue",
                    data: "foo",
                    start: 82,
                    end: 87,
                  },
                },
              ],
              children: [],
              expression: {
                type: "Literal",
                data: '"bar"',
                value: "bar",
                start: 73,
                end: 78,
              },
              key: undefined,
              start: 61,
              end: 89,
            },
            { type: "Text", data: "\n      ", start: 89, end: 96 },
          ],
          path: [
            { type: "StaticPathSegment", data: "blog", start: 34, end: 38 },
            {
              type: "DynamicPathSegment",
              data: ":catagories",
              expression: {
                type: "Identifier",
                data: "catagories",
                start: 39,
                end: 49,
              },
              start: 39,
              end: 50,
            },
          ],
          start: 21,
          end: 104,
        },
        { type: "Text", data: "\n    ", start: 104, end: 109 },
      ],
      start: 5,
      end: 119,
    },
    layout: [],
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive with StaticPathSegments", () => {
  const html = `
    <:router>
      <:path url="/blog/how-to-use-deno/part-1" />
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    "html": [{ "type": "Text", "data": "\n    ", "start": 0, "end": 5 }],
    "router": {
      "type": "RouterDirective",
      "data": ":router",
      "attributes": [],
      "children": [
        { "type": "Text", "data": "\n      ", "start": 14, "end": 21 },
        {
          "type": "PathDirective",
          "data": ":path",
          "attributes": [],
          "children": [],
          "path": [
            {
              "type": "StaticPathSegment",
              "data": "blog",
              "start": 34,
              "end": 38,
            },
            {
              "type": "StaticPathSegment",
              "data": "how-to-use-deno",
              "start": 39,
              "end": 54,
            },
            {
              "type": "StaticPathSegment",
              "data": "part-1",
              "start": 55,
              "end": 61,
            },
          ],
          "start": 21,
          "end": 65,
        },
        { "type": "Text", "data": "\n    ", "start": 65, "end": 70 },
      ],
      "start": 5,
      "end": 80,
    },
    "layout": [],
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive with DynamicPathSegment", () => {
  const html = `
    <:router>
      <:path url="/blog/:catagory" />
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    "html": [{ "type": "Text", "data": "\n    ", "start": 0, "end": 5 }],
    "router": {
      "type": "RouterDirective",
      "data": ":router",
      "attributes": [],
      "children": [
        { "type": "Text", "data": "\n      ", "start": 14, "end": 21 },
        {
          "type": "PathDirective",
          "data": ":path",
          "attributes": [],
          "children": [],
          "path": [
            {
              "type": "StaticPathSegment",
              "data": "blog",
              "start": 34,
              "end": 38,
            },
            {
              "type": "DynamicPathSegment",
              "data": ":catagory",
              "expression": {
                "type": "Identifier",
                "data": "catagory",
                "start": 39,
                "end": 47,
              },
              "start": 39,
              "end": 48,
            },
          ],
          "start": 21,
          "end": 52,
        },
        { "type": "Text", "data": "\n    ", "start": 52, "end": 57 },
      ],
      "start": 5,
      "end": 67,
    },
    "layout": [],
  };

  assertEquals(output, expected);
});

Deno.test("Path Directive with OptionalPathSegment", () => {
  const html = `
    <:router>
      <:path url="/:?lang/blog" />
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {};

  console.log(JSON.stringify(output));
  assertEquals(output, expected);
});

Deno.test("Path Directive with RangePathSegment", () => {
  const html = `
    <:router>
      <:path url="/blog/page/:[1,2]page" />
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {};

  console.log(JSON.stringify(output));
  assertEquals(output, expected);
});

Deno.test("Path Directive with PaginationPathSegment", () => {
  const html = `
    <:router>
      <:path url="/blog/page/:#page">
        <:data use="bar" page={$params.page} />
      </:path>
    </:router>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {};

  console.log(JSON.stringify(output));
  assertEquals(output, expected);
});

Deno.test("Data Directive", () => {
  const html = '<:data use="bar" id="sdf098df09-1349asd9asd-sd8asd012" />';
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
            start: 16,
            end: 54,
            name: { type: "AttributeName", data: "id", start: 17, end: 19 },
            value: {
              type: "AttributeValue",
              data: "sdf098df09-1349asd9asd-sd8asd012",
              start: 21,
              end: 55,
            },
          },
        ],
        children: [],
        key: undefined,
        expression: {
          type: "Literal",
          data: '"bar"',
          value: "bar",
          start: 12,
          end: 17,
        },
        start: 0,
        end: 57,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Data Directive with Key Override", () => {
  const html =
    '<:data use="bar" id="sdf098df09-1349asd9asd-sd8asd012" key="foo"/>';
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
            start: 16,
            end: 54,
            name: { type: "AttributeName", data: "id", start: 17, end: 19 },
            value: {
              type: "AttributeValue",
              data: "sdf098df09-1349asd9asd-sd8asd012",
              start: 21,
              end: 55,
            },
          },
        ],
        children: [],
        key: {
          type: "Literal",
          data: '"foo"',
          value: "foo",
          start: 60,
          end: 65,
        },
        expression: {
          type: "Literal",
          data: '"bar"',
          value: "bar",
          start: 12,
          end: 17,
        },
        start: 0,
        end: 66,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Data Directive with Plain Text", () => {
  const html = `
    <:data use="bar" id="sdf098df09-1349asd9asd-sd8asd012">
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
            start: 21,
            end: 59,
            name: { type: "AttributeName", data: "id", start: 22, end: 24 },
            value: {
              type: "AttributeValue",
              data: "sdf098df09-1349asd9asd-sd8asd012",
              start: 26,
              end: 60,
            },
          },
        ],
        children: [
          {
            type: "Text",
            data:
              "\n      {\n        name\n        sizes {\n          size\n          available\n        }\n        color\n      }\n    ",
            start: 60,
            end: 169,
          },
        ],
        key: undefined,
        expression: {
          type: "Literal",
          data: '"bar"',
          value: "bar",
          start: 17,
          end: 22,
        },
        start: 5,
        end: 177,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Slot Directive - No Default", () => {
  const html = "<div><:slot/></div>";
  const p = new Parser(html, "Component");
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "div",
        attributes: [],
        children: [
          {
            type: "SlotDirective",
            data: ":slot",
            attributes: [],
            children: [],
            expression: undefined,
            start: 5,
            end: 13,
          },
        ],
        slot: undefined,
        start: 0,
        end: 19,
      },
    ],
    router: undefined,
    layout: [],
  };

  assertEquals(output, expected);
});

Deno.test("Slot Directive - No Name", () => {
  const html = "<div><:slot>Dynamic Heading</:slot></div>";
  const p = new Parser(html, "Component");
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "div",
        attributes: [],
        children: [
          {
            type: "SlotDirective",
            data: ":slot",
            attributes: [],
            children: [
              { type: "Text", data: "Dynamic Heading", start: 12, end: 27 },
            ],
            expression: undefined,
            start: 5,
            end: 35,
          },
        ],
        slot: undefined,
        start: 0,
        end: 41,
      },
    ],
    router: undefined,
    layout: [],
  };

  assertEquals(output, expected);
});

Deno.test("Slot Directive - Name", () => {
  const html = '<div><:slot name="foo">Dynamic Heading</:slot></div>';
  const p = new Parser(html, "Component");
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "div",
        attributes: [],
        children: [
          {
            type: "SlotDirective",
            data: ":slot",
            attributes: [],
            children: [
              { type: "Text", data: "Dynamic Heading", start: 23, end: 38 },
            ],
            expression: {
              type: "Literal",
              data: '"foo"',
              value: "foo",
              start: 18,
              end: 23,
            },
            start: 5,
            end: 46,
          },
        ],
        slot: undefined,
        start: 0,
        end: 52,
      },
    ],
    router: undefined,
    layout: [],
  };

  assertEquals(output, expected);
});
