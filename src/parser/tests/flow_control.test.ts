import { assertEquals } from "../../../deps.ts";
import { Parser } from "../index.ts";

Deno.test("If Block", () => {
  const html =
    `{:if expression}<div class="test">Testing Expression</div>{/:if}`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "IfBlock",
        data: ":if",
        children: [
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 20,
                end: 33,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 21,
                  end: 26,
                },
                value: {
                  type: "AttributeValue",
                  data: "test",
                  start: 28,
                  end: 34,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 34, end: 52 },
            ],
            slot: undefined,
            start: 16,
            end: 58,
          },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 5,
          end: 15,
        },
        else: null,
        start: 0,
        end: 64,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("If Else Block", () => {
  const html = `
    {:if expression}
      <div class="test">Testing Expression</div>
    {:else}
      <p class="what">Foo Bar<span>!</span></p>
    {/:if}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "IfBlock",
        data: ":if",
        children: [
          { type: "Text", data: "\n      ", start: 21, end: 28 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 32,
                end: 45,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 33,
                  end: 38,
                },
                value: {
                  type: "AttributeValue",
                  data: "test",
                  start: 40,
                  end: 46,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 46, end: 64 },
            ],
            slot: undefined,
            start: 28,
            end: 70,
          },
          { type: "Text", data: "\n    ", start: 70, end: 75 },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 10,
          end: 20,
        },
        else: {
          type: "ElseBlock",
          data: ":else",
          children: [
            { type: "Text", data: "\n      ", start: 82, end: 89 },
            {
              type: "Tag",
              data: "p",
              attributes: [
                {
                  type: "Attribute",
                  data: ' class="what"',
                  start: 91,
                  end: 104,
                  name: {
                    type: "AttributeName",
                    data: "class",
                    start: 92,
                    end: 97,
                  },
                  value: {
                    type: "AttributeValue",
                    data: "what",
                    start: 99,
                    end: 105,
                  },
                },
              ],
              children: [
                { type: "Text", data: "Foo Bar", start: 105, end: 112 },
                {
                  type: "Tag",
                  data: "span",
                  attributes: [],
                  children: [{ type: "Text", data: "!", start: 118, end: 119 }],
                  slot: undefined,
                  start: 112,
                  end: 126,
                },
              ],
              slot: undefined,
              start: 89,
              end: 130,
            },
            { type: "Text", data: "\n    ", start: 130, end: 135 },
          ],
          start: 75,
          end: 135,
        },
        start: 5,
        end: 141,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("If Else If Block", () => {
  const html = `
    {:if expression}
      <div class="test">Testing Expression</div>
    {:elseif expression2 }
      <br>
    {:else}
      <p class="what">Foo Bar<span>!</span></p>
    {/:if}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "IfBlock",
        data: ":if",
        children: [
          { type: "Text", data: "\n      ", start: 21, end: 28 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 32,
                end: 45,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 33,
                  end: 38,
                },
                value: {
                  type: "AttributeValue",
                  data: "test",
                  start: 40,
                  end: 46,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 46, end: 64 },
            ],
            slot: undefined,
            start: 28,
            end: 70,
          },
          { type: "Text", data: "\n    ", start: 70, end: 75 },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 10,
          end: 20,
        },
        else: {
          type: "ElseIfBlock",
          data: ":elseif",
          children: [
            { type: "Text", data: "\n      ", start: 97, end: 104 },
            {
              type: "Tag",
              data: "br",
              attributes: [],
              children: [],
              slot: undefined,
              start: 104,
              end: 108,
            },
            { type: "Text", data: "\n    ", start: 108, end: 113 },
          ],
          expression: {
            type: "Identifier",
            data: "expression2",
            start: 84,
            end: 95,
          },
          else: {
            type: "ElseBlock",
            data: ":else",
            children: [
              { type: "Text", data: "\n      ", start: 120, end: 127 },
              {
                type: "Tag",
                data: "p",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' class="what"',
                    start: 129,
                    end: 142,
                    name: {
                      type: "AttributeName",
                      data: "class",
                      start: 130,
                      end: 135,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "what",
                      start: 137,
                      end: 143,
                    },
                  },
                ],
                children: [
                  { type: "Text", data: "Foo Bar", start: 143, end: 150 },
                  {
                    type: "Tag",
                    data: "span",
                    attributes: [],
                    children: [
                      { type: "Text", data: "!", start: 156, end: 157 },
                    ],
                    slot: undefined,
                    start: 150,
                    end: 164,
                  },
                ],
                slot: undefined,
                start: 127,
                end: 168,
              },
              { type: "Text", data: "\n    ", start: 168, end: 173 },
            ],
            start: 113,
            end: 173,
          },
          start: 75,
          end: 113,
        },
        start: 5,
        end: 179,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Nested If Blocks", () => {
  const html = `
    {:if expression}
      <div class="test">Testing Expression</div>
    {:elseif expression2 }
      <br>
      {:if expression3}
        <span>Good</span>
      {:elseif expression4}
        <span>Bad</span>
      {:else}
        <span>Unknown</span>
      {/:if}
    {:else}
      <p class="what">Foo Bar<span>!</span></p>
    {/:if}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "IfBlock",
        data: ":if",
        children: [
          { type: "Text", data: "\n      ", start: 21, end: 28 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 32,
                end: 45,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 33,
                  end: 38,
                },
                value: {
                  type: "AttributeValue",
                  data: "test",
                  start: 40,
                  end: 46,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 46, end: 64 },
            ],
            slot: undefined,
            start: 28,
            end: 70,
          },
          { type: "Text", data: "\n    ", start: 70, end: 75 },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 10,
          end: 20,
        },
        else: {
          type: "ElseIfBlock",
          data: ":elseif",
          children: [
            { type: "Text", data: "\n      ", start: 97, end: 104 },
            {
              type: "Tag",
              data: "br",
              attributes: [],
              children: [],
              slot: undefined,
              start: 104,
              end: 108,
            },
            { type: "Text", data: "\n      ", start: 108, end: 115 },
            {
              type: "IfBlock",
              data: ":if",
              children: [
                { type: "Text", data: "\n        ", start: 132, end: 141 },
                {
                  type: "Tag",
                  data: "span",
                  attributes: [],
                  children: [
                    { type: "Text", data: "Good", start: 147, end: 151 },
                  ],
                  slot: undefined,
                  start: 141,
                  end: 158,
                },
                { type: "Text", data: "\n      ", start: 158, end: 165 },
              ],
              expression: {
                type: "Identifier",
                data: "expression3",
                start: 120,
                end: 131,
              },
              else: {
                type: "ElseIfBlock",
                data: ":elseif",
                children: [
                  { type: "Text", data: "\n        ", start: 186, end: 195 },
                  {
                    type: "Tag",
                    data: "span",
                    attributes: [],
                    children: [
                      { type: "Text", data: "Bad", start: 201, end: 204 },
                    ],
                    slot: undefined,
                    start: 195,
                    end: 211,
                  },
                  { type: "Text", data: "\n      ", start: 211, end: 218 },
                ],
                expression: {
                  type: "Identifier",
                  data: "expression4",
                  start: 174,
                  end: 185,
                },
                else: {
                  type: "ElseBlock",
                  data: ":else",
                  children: [
                    { type: "Text", data: "\n        ", start: 225, end: 234 },
                    {
                      type: "Tag",
                      data: "span",
                      attributes: [],
                      children: [
                        { type: "Text", data: "Unknown", start: 240, end: 247 },
                      ],
                      slot: undefined,
                      start: 234,
                      end: 254,
                    },
                    { type: "Text", data: "\n      ", start: 254, end: 261 },
                  ],
                  start: 218,
                  end: 261,
                },
                start: 165,
                end: 218,
              },
              start: 115,
              end: 267,
            },
            { type: "Text", data: "\n    ", start: 267, end: 272 },
          ],
          expression: {
            type: "Identifier",
            data: "expression2",
            start: 84,
            end: 95,
          },
          else: {
            type: "ElseBlock",
            data: ":else",
            children: [
              { type: "Text", data: "\n      ", start: 279, end: 286 },
              {
                type: "Tag",
                data: "p",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' class="what"',
                    start: 288,
                    end: 301,
                    name: {
                      type: "AttributeName",
                      data: "class",
                      start: 289,
                      end: 294,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "what",
                      start: 296,
                      end: 302,
                    },
                  },
                ],
                children: [
                  { type: "Text", data: "Foo Bar", start: 302, end: 309 },
                  {
                    type: "Tag",
                    data: "span",
                    attributes: [],
                    children: [
                      { type: "Text", data: "!", start: 315, end: 316 },
                    ],
                    slot: undefined,
                    start: 309,
                    end: 323,
                  },
                ],
                slot: undefined,
                start: 286,
                end: 327,
              },
              { type: "Text", data: "\n    ", start: 327, end: 332 },
            ],
            start: 272,
            end: 332,
          },
          start: 75,
          end: 272,
        },
        start: 5,
        end: 338,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("Skip Block", () => {
  const html = `
    {:skip expression}
      <div class="test">Testing Expression</div>
      <p class="what">Foo Bar<span>!</span></p>
    {/:skip}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "SkipBlock",
        data: ":skip",
        children: [
          { type: "Text", data: "\n      ", start: 23, end: 30 },
          {
            type: "Tag",
            data: "div",
            attributes: [
              {
                type: "Attribute",
                data: ' class="test"',
                start: 34,
                end: 47,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 35,
                  end: 40,
                },
                value: {
                  type: "AttributeValue",
                  data: "test",
                  start: 42,
                  end: 48,
                },
              },
            ],
            children: [
              { type: "Text", data: "Testing Expression", start: 48, end: 66 },
            ],
            slot: undefined,
            start: 30,
            end: 72,
          },
          { type: "Text", data: "\n      ", start: 72, end: 79 },
          {
            type: "Tag",
            data: "p",
            attributes: [
              {
                type: "Attribute",
                data: ' class="what"',
                start: 81,
                end: 94,
                name: {
                  type: "AttributeName",
                  data: "class",
                  start: 82,
                  end: 87,
                },
                value: {
                  type: "AttributeValue",
                  data: "what",
                  start: 89,
                  end: 95,
                },
              },
            ],
            children: [
              { type: "Text", data: "Foo Bar", start: 95, end: 102 },
              {
                type: "Tag",
                data: "span",
                attributes: [],
                children: [{ type: "Text", data: "!", start: 108, end: 109 }],
                slot: undefined,
                start: 102,
                end: 116,
              },
            ],
            slot: undefined,
            start: 79,
            end: 120,
          },
          { type: "Text", data: "\n    ", start: 120, end: 125 },
        ],
        expression: {
          type: "Identifier",
          data: "expression",
          start: 12,
          end: 22,
        },
        start: 5,
        end: 133,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});

Deno.test("When / Is Block", () => {
  const html = `
    {:when desert}
      {:is "cake"}
        <div class="test">Testing Expression</div>
      {:is "pie"}
        <br>
      {:else}
        <p class="what">Foo Bar<span>!</span></p>
    {/:when}
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      {
        type: "WhenBlock",
        data: ":when",
        children: [
          { type: "Text", data: "\n      ", start: 19, end: 26 },
          {
            type: "IsBlock",
            data: ":is",
            children: [
              { type: "Text", data: "\n        ", start: 38, end: 47 },
              {
                type: "Tag",
                data: "div",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' class="test"',
                    start: 51,
                    end: 64,
                    name: {
                      type: "AttributeName",
                      data: "class",
                      start: 52,
                      end: 57,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "test",
                      start: 59,
                      end: 65,
                    },
                  },
                ],
                children: [
                  {
                    type: "Text",
                    data: "Testing Expression",
                    start: 65,
                    end: 83,
                  },
                ],
                slot: undefined,
                start: 47,
                end: 89,
              },
              { type: "Text", data: "\n      ", start: 89, end: 96 },
            ],
            expression: {
              type: "Literal",
              data: '"cake"',
              value: "cake",
              start: 31,
              end: 37,
            },
            start: 26,
            end: 96,
          },
          {
            type: "IsBlock",
            data: ":is",
            children: [
              { type: "Text", data: "\n        ", start: 107, end: 116 },
              {
                type: "Tag",
                data: "br",
                attributes: [],
                children: [],
                slot: undefined,
                start: 116,
                end: 120,
              },
              { type: "Text", data: "\n      ", start: 120, end: 127 },
            ],
            expression: {
              type: "Literal",
              data: '"pie"',
              value: "pie",
              start: 101,
              end: 106,
            },
            start: 96,
            end: 127,
          },
          {
            type: "ElseBlock",
            data: ":else",
            children: [
              { type: "Text", data: "\n        ", start: 134, end: 143 },
              {
                type: "Tag",
                data: "p",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' class="what"',
                    start: 145,
                    end: 158,
                    name: {
                      type: "AttributeName",
                      data: "class",
                      start: 146,
                      end: 151,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "what",
                      start: 153,
                      end: 159,
                    },
                  },
                ],
                children: [
                  { type: "Text", data: "Foo Bar", start: 159, end: 166 },
                  {
                    type: "Tag",
                    data: "span",
                    attributes: [],
                    children: [
                      { type: "Text", data: "!", start: 172, end: 173 },
                    ],
                    slot: undefined,
                    start: 166,
                    end: 180,
                  },
                ],
                slot: undefined,
                start: 143,
                end: 184,
              },
              { type: "Text", data: "\n    ", start: 184, end: 189 },
            ],
            start: 127,
            end: 189,
          },
        ],
        expression: { type: "Identifier", data: "desert", start: 12, end: 18 },
        start: 5,
        end: 197,
      },
    ],
    layout: [],
    router: undefined,
  };

  assertEquals(output, expected);
});
