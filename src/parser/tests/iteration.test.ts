import { assertEquals } from "../../deps.ts";
import { Parser } from "../index.ts";

Deno.test("Each Loop", () => {
  const html = `
    {:each expression as value}
      <div class="test">Testing Expression</div>
    {/:each}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "EachBlock",
        data: ":each",
        children: [
          { type: "Text", data: "\n      ", start: 32, end: 39 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 43,
                end: 56,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 44,
                  end: 49,
                },
                value: {
                  type: "AttributeValue",
                  data: '"test"',
                  start: 51,
                  end: 57,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 57, end: 75 },
            ],
            start: 39,
            end: 81,
          },
          { type: "Text", data: "\n    ", start: 81, end: 86 },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 12,
          end: 22,
        },
        context: { type: "Identifier", data: "value", start: 26, end: 31 },
        index: null,
        else: null,
        start: 5,
        end: 94,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Each Loop with Index", () => {
  const html = `
    {:each expression as value, index}
      <div class="test">Testing Expression</div>
    {/:each}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "EachBlock",
        data: ":each",
        children: [
          { type: "Text", data: "\n      ", start: 39, end: 46 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 50,
                end: 63,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 51,
                  end: 56,
                },
                value: {
                  type: "AttributeValue",
                  data: '"test"',
                  start: 58,
                  end: 64,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 64, end: 82 },
            ],
            start: 46,
            end: 88,
          },
          { type: "Text", data: "\n    ", start: 88, end: 93 },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 12,
          end: 22,
        },
        context: { type: "Identifier", data: "value", start: 26, end: 31 },
        index: { type: "Identifier", data: "index", start: 33, end: 38 },
        else: null,
        start: 5,
        end: 101,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Each Loop with Else", () => {
  const html = `
    {:each todos as todo}
      <div class="test">Testing Expression</div>
    {:else}
      <div>No tasks!</div>
    {/:each}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "EachBlock",
        data: ":each",
        children: [
          { type: "Text", data: "\n      ", start: 26, end: 33 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 37,
                end: 50,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 38,
                  end: 43,
                },
                value: {
                  type: "AttributeValue",
                  data: '"test"',
                  start: 45,
                  end: 51,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 51, end: 69 },
            ],
            start: 33,
            end: 75,
          },
          { type: "Text", data: "\n    ", start: 75, end: 80 },
        ],
        expression: { type: "Identifier", data: "todos", start: 12, end: 17 },
        context: { type: "Identifier", data: "todo", start: 21, end: 25 },
        index: null,
        else: {
          type: "ElseBlock",
          data: ":else",
          children: [
            { type: "Text", data: "\n      ", start: 87, end: 94 },
            {
              type: "Tag",
              data: "div",
              attributes: [],
              children: [
                { type: "Text", data: "No tasks!", start: 99, end: 108 },
              ],
              start: 94,
              end: 114,
            },
            { type: "Text", data: "\n    ", start: 114, end: 119 },
          ],
          start: 80,
          end: 119,
        },
        start: 5,
        end: 127,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Each Loop with Break", () => {
  const html = `
    {:each todos as todo}
      {:if todo === 'foo'}
        {:break}
      {:else}
        <div class="test">Testing Expression</div>
      {/:if}
    {/:each}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "EachBlock",
        data: ":each",
        children: [
          { type: "Text", data: "\n      ", start: 26, end: 33 },
          {
            type: "IfBlock",
            data: ":if",
            children: [
              { type: "Text", data: "\n        ", start: 53, end: 62 },
              { type: "BreakStatement", data: ":break", start: 62, end: 70 },
              { type: "Text", data: "\n      ", start: 70, end: 77 },
            ],
            expression: {
              type: "BinaryExpression",
              data: "===",
              left: { type: "Identifier", data: "todo", start: 38, end: 42 },
              operator: "===",
              right: {
                type: "Literal",
                data: "'foo'",
                value: "'foo'",
                start: 47,
                end: 52,
              },
              start: 38,
              end: 52,
            },
            else: {
              type: "ElseBlock",
              data: ":else",
              children: [
                { type: "Text", data: "\n        ", start: 84, end: 93 },
                {
                  type: "Tag",
                  data: "div",
                  attributes: [
                    {
                      type: "Attribute",
                      data: ' class="test"',
                      start: 97,
                      end: 110,
                      name: {
                        type: "AttributeName",
                        data: "class",
                        start: 98,
                        end: 103,
                      },
                      value: {
                        type: "AttributeValue",
                        data: '"test"',
                        start: 105,
                        end: 111,
                      },
                    },
                  ],
                  children: [
                    {
                      type: "Text",
                      data: "Testing Expression",
                      start: 111,
                      end: 129,
                    },
                  ],
                  start: 93,
                  end: 135,
                },
                { type: "Text", data: "\n      ", start: 135, end: 142 },
              ],
              start: 77,
              end: 142,
            },
            start: 33,
            end: 148,
          },
          { type: "Text", data: "\n    ", start: 148, end: 153 },
        ],
        expression: { type: "Identifier", data: "todos", start: 12, end: 17 },
        context: { type: "Identifier", data: "todo", start: 21, end: 25 },
        index: null,
        else: null,
        start: 5,
        end: 161,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Each Loop with Continue", () => {
  const html = `
    {:each todos as todo}
      {:if todo === 'foo'}
        {:continue}
      {:else}
        <div class="test">Testing Expression</div>
      {/:if}
    {/:each}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "EachBlock",
        data: ":each",
        children: [
          { type: "Text", data: "\n      ", start: 26, end: 33 },
          {
            type: "IfBlock",
            data: ":if",
            children: [
              { type: "Text", data: "\n        ", start: 53, end: 62 },
              {
                type: "ContinueStatement",
                data: ":continue",
                start: 62,
                end: 73,
              },
              { type: "Text", data: "\n      ", start: 73, end: 80 },
            ],
            expression: {
              type: "BinaryExpression",
              data: "===",
              left: { type: "Identifier", data: "todo", start: 38, end: 42 },
              operator: "===",
              right: {
                type: "Literal",
                data: "'foo'",
                value: "'foo'",
                start: 47,
                end: 52,
              },
              start: 38,
              end: 52,
            },
            else: {
              type: "ElseBlock",
              data: ":else",
              children: [
                { type: "Text", data: "\n        ", start: 87, end: 96 },
                {
                  type: "Tag",
                  data: "div",
                  attributes: [
                    {
                      type: "Attribute",
                      data: ' class="test"',
                      start: 100,
                      end: 113,
                      name: {
                        type: "AttributeName",
                        data: "class",
                        start: 101,
                        end: 106,
                      },
                      value: {
                        type: "AttributeValue",
                        data: '"test"',
                        start: 108,
                        end: 114,
                      },
                    },
                  ],
                  children: [
                    {
                      type: "Text",
                      data: "Testing Expression",
                      start: 114,
                      end: 132,
                    },
                  ],
                  start: 96,
                  end: 138,
                },
                { type: "Text", data: "\n      ", start: 138, end: 145 },
              ],
              start: 80,
              end: 145,
            },
            start: 33,
            end: 151,
          },
          { type: "Text", data: "\n    ", start: 151, end: 156 },
        ],
        expression: { type: "Identifier", data: "todos", start: 12, end: 17 },
        context: { type: "Identifier", data: "todo", start: 21, end: 25 },
        index: null,
        else: null,
        start: 5,
        end: 164,
      },
    ],
  };

  assertEquals(output, expected);
});
