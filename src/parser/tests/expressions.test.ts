import { assertEquals } from "../../deps.ts";
import { Parser } from "../index.ts";

Deno.test("Identifier", () => {
  const html = "This embeded expression { foobar } should be a Indetifier.";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "This embeded expression ", start: 0, end: 24 },
      { type: "Identifier", data: "foobar", start: 26, end: 32 },
      { type: "Text", data: " should be a Indetifier.", start: 34, end: 58 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Chained Identfier", () => {
  const html =
    "This embeded expression { foo.bar } should be a Indetifier. It can be { nested.as[0].many.times } and also {resolved[0]}.";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "This embeded expression ", start: 0, end: 24 },
      {
        type: "MemberExpression",
        data: "foo.bar",
        object: { type: "Identifier", data: "foo", start: 26, end: 29 },
        property: { type: "Identifier", data: "bar", start: 30, end: 33 },
        start: 26,
        end: 33,
      },
      {
        type: "Text",
        data: " should be a Indetifier. It can be ",
        start: 35,
        end: 70,
      },
      {
        type: "MemberExpression",
        data: "nested.as[0].many.times",
        object: {
          type: "MemberExpression",
          data: "nested.as[0].many",
          object: {
            type: "MemberExpression",
            data: "nested.as[0]",
            object: {
              type: "MemberExpression",
              data: "nested.as",
              object: {
                type: "Identifier",
                data: "nested",
                start: 72,
                end: 78,
              },
              property: { type: "Identifier", data: "as", start: 79, end: 81 },
              start: 72,
              end: 81,
            },
            property: {
              type: "Literal",
              data: "0",
              value: 0,
              start: 82,
              end: 83,
            },
            start: 71,
            end: 83,
          },
          property: { type: "Identifier", data: "many", start: 85, end: 89 },
          start: 71,
          end: 89,
        },
        property: { type: "Identifier", data: "times", start: 90, end: 95 },
        start: 71,
        end: 95,
      },
      { type: "Text", data: " and also ", start: 97, end: 107 },
      {
        type: "MemberExpression",
        data: "resolved[0]",
        object: { type: "Identifier", data: "resolved", start: 108, end: 116 },
        property: {
          type: "Literal",
          data: "0",
          value: 0,
          start: 117,
          end: 118,
        },
        start: 108,
        end: 118,
      },
      { type: "Text", data: ".", start: 120, end: 121 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Literal", () => {
  const html =
    "This is {4} to {4.5} times more likely to {'work'} when we enable it {true}.";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "This is ", start: 0, end: 8 },
      { type: "Literal", data: "4", value: 4, start: 9, end: 10 },
      { type: "Text", data: " to ", start: 11, end: 15 },
      { type: "Literal", data: "4.5", value: 4.5, start: 16, end: 19 },
      { type: "Text", data: " times more likely to ", start: 20, end: 42 },
      { type: "Literal", data: "'work'", value: "work", start: 43, end: 49 },
      { type: "Text", data: " when we enable it ", start: 50, end: 69 },
      { type: "Literal", data: "true", value: true, start: 70, end: 74 },
      { type: "Text", data: ".", start: 75, end: 76 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Attribute Identifier and Literal", () => {
  const html = `<Map lat="{latitude}" lng="{longitude}" distance={10} />`;
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
            data: ' lat="{latitude}"',
            start: 4,
            end: 21,
            name: { type: "AttributeName", data: "lat", start: 5, end: 8 },
            value: {
              type: "AttributeExpression",
              data: '"{latitude}"',
              expression: {
                type: "Identifier",
                data: "latitude",
                start: 11,
                end: 19,
              },
              start: 10,
              end: 20,
            },
          },
          {
            type: "Attribute",
            data: ' lng="{longitude}"',
            start: 21,
            end: 39,
            name: { type: "AttributeName", data: "lng", start: 22, end: 25 },
            value: {
              type: "AttributeExpression",
              data: '"{longitude}"',
              expression: {
                type: "Identifier",
                data: "longitude",
                start: 28,
                end: 37,
              },
              start: 27,
              end: 38,
            },
          },
          {
            type: "Attribute",
            data: " distance={10}",
            start: 39,
            end: 53,
            name: {
              type: "AttributeName",
              data: "distance",
              start: 40,
              end: 48,
            },
            value: {
              type: "AttributeExpression",
              data: "{10}",
              expression: {
                type: "Literal",
                data: "10",
                value: 10,
                start: 50,
                end: 52,
              },
              start: 49,
              end: 53,
            },
          },
        ],
        children: [],
        expression: {
          type: "Literal",
          data: '"Map"',
          value: "Map",
          start: 0,
          end: 5,
        },
        start: 0,
        end: 56,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Attribute Implicit Identifier", () => {
  const html = `<Map {identifier} />`;
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
            data: " {identifier}",
            start: 4,
            end: 17,
            name: {
              type: "AttributeName",
              data: "identifier",
              start: 5,
              end: 15,
            },
            value: {
              type: "AttributeExpression",
              data: "{identifier}",
              expression: {
                type: "Identifier",
                data: "identifier",
                start: 6,
                end: 16,
              },
              start: 5,
              end: 17,
            },
          },
        ],
        children: [],
        expression: {
          type: "Literal",
          data: '"Map"',
          value: "Map",
          start: 0,
          end: 5,
        },
        start: 0,
        end: 20,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Attribute Spread Operator", () => {
  const html = `<Map {...map} class="foo" />`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "ComponentDirective",
        data: ":component",
        attributes: [
          {
            type: "AttributeSpread",
            data: "{...map}",
            expression: { type: "Identifier", data: "map", start: 9, end: 12 },
            start: 5,
            end: 13,
          },
          {
            type: "Attribute",
            data: ' class="foo"',
            start: 13,
            end: 25,
            name: { type: "AttributeName", data: "class", start: 14, end: 19 },
            value: {
              type: "AttributeValue",
              data: "foo",
              start: 21,
              end: 26,
            },
          },
        ],
        children: [],
        expression: {
          type: "Literal",
          data: '"Map"',
          value: "Map",
          start: 0,
          end: 5,
        },
        start: 0,
        end: 28,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Unary Expression", () => {
  const html = "Foo is set to {!foo}. Ready?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "UnaryExpression",
        data: "!",
        prefix: true,
        operator: "!",
        argument: { type: "Identifier", data: "foo", start: 16, end: 19 },
        start: 15,
        end: 16,
      },
      { type: "Text", data: ". Ready?", start: 20, end: 28 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Update Expression", () => {
  const html = "Foo is set to {++foo}. Ready to {go++}?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "UpdateExpression",
        data: "++",
        prefix: true,
        operator: "++",
        argument: { type: "Identifier", data: "foo", start: 17, end: 20 },
        start: 15,
        end: 17,
      },
      { type: "Text", data: ". Ready to ", start: 21, end: 32 },
      {
        type: "UpdateExpression",
        data: "++",
        prefix: false,
        operator: "++",
        argument: { type: "Identifier", data: "go", start: 33, end: 35 },
        start: 35,
        end: 37,
      },
      { type: "Text", data: "?", start: 38, end: 39 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Combined Unary and Update Expression", () => {
  const html = "Foo is set to {!++foo}. Ready to {!!go++}?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "UnaryExpression",
        data: "!",
        prefix: true,
        operator: "!",
        argument: {
          type: "UpdateExpression",
          data: "++",
          prefix: true,
          operator: "++",
          argument: { type: "Identifier", data: "foo", start: 18, end: 21 },
          start: 16,
          end: 18,
        },
        start: 15,
        end: 16,
      },
      { type: "Text", data: ". Ready to ", start: 22, end: 33 },
      {
        type: "UnaryExpression",
        data: "!",
        prefix: true,
        operator: "!",
        argument: {
          type: "UnaryExpression",
          data: "!",
          prefix: true,
          operator: "!",
          argument: {
            type: "UpdateExpression",
            data: "++",
            prefix: false,
            operator: "++",
            argument: { type: "Identifier", data: "go", start: 36, end: 38 },
            start: 38,
            end: 40,
          },
          start: 35,
          end: 36,
        },
        start: 34,
        end: 35,
      },
      { type: "Text", data: "?", start: 41, end: 42 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Binary Expression", () => {
  const html = "Foobar is set to {foo === 'foo'}. Ready?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foobar is set to ", start: 0, end: 17 },
      {
        type: "BinaryExpression",
        data: "===",
        left: { type: "Identifier", data: "foo", start: 18, end: 21 },
        operator: "===",
        right: {
          type: "Literal",
          data: "'foo'",
          value: "foo",
          start: 26,
          end: 31,
        },
        start: 18,
        end: 31,
      },
      { type: "Text", data: ". Ready?", start: 32, end: 40 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Logical Expression", () => {
  const html = "Foo is set to {foo && bar}. Ready?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "LogicalExpression",
        data: "&&",
        left: { type: "Identifier", data: "foo", start: 15, end: 18 },
        operator: "&&",
        right: { type: "Identifier", data: "bar", start: 22, end: 25 },
        start: 15,
        end: 25,
      },
      { type: "Text", data: ". Ready?", start: 26, end: 34 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Nested Expression (left)", () => {
  const html = "Foo is set to {(bar !== 'foo') === foo}. Ready?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "BinaryExpression",
        data: "===",
        left: {
          type: "BinaryExpression",
          data: "!==",
          left: { type: "Identifier", data: "bar", start: 16, end: 19 },
          operator: "!==",
          right: {
            type: "Literal",
            data: "'foo'",
            value: "foo",
            start: 24,
            end: 29,
          },
          start: 16,
          end: 29,
        },
        operator: "===",
        right: { type: "Identifier", data: "foo", start: 35, end: 38 },
        start: 16,
        end: 38,
      },
      { type: "Text", data: ". Ready?", start: 39, end: 47 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Nested Expression (right)", () => {
  const html = "Foo is set to {foo === (bar !== 'foo')}. Ready?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "BinaryExpression",
        data: "===",
        left: { type: "Identifier", data: "foo", start: 15, end: 18 },
        operator: "===",
        right: {
          type: "BinaryExpression",
          data: "!==",
          left: { type: "Identifier", data: "bar", start: 24, end: 27 },
          operator: "!==",
          right: {
            type: "Literal",
            data: "'foo'",
            value: "foo",
            start: 32,
            end: 37,
          },
          start: 24,
          end: 37,
        },
        start: 15,
        end: 37,
      },
      { type: "Text", data: ". Ready?", start: 39, end: 47 },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Chained Expressions", () => {
  const html =
    "Foo is set to { foo === bar || bar < 'foo' && i !== 'foo' && y || x }. Ready?";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "Foo is set to ", start: 0, end: 14 },
      {
        type: "LogicalExpression",
        data: "||",
        left: {
          type: "LogicalExpression",
          data: "||",
          left: {
            type: "BinaryExpression",
            data: "===",
            left: { type: "Identifier", data: "foo", start: 16, end: 19 },
            operator: "===",
            right: { type: "Identifier", data: "bar", start: 24, end: 27 },
            start: 16,
            end: 27,
          },
          operator: "||",
          right: {
            type: "LogicalExpression",
            data: "&&",
            left: {
              type: "LogicalExpression",
              data: "&&",
              left: {
                type: "BinaryExpression",
                data: "<",
                left: { type: "Identifier", data: "bar", start: 31, end: 34 },
                operator: "<",
                right: {
                  type: "Literal",
                  data: "'foo'",
                  value: "foo",
                  start: 37,
                  end: 42,
                },
                start: 31,
                end: 42,
              },
              operator: "&&",
              right: {
                type: "BinaryExpression",
                data: "!==",
                left: { type: "Identifier", data: "i", start: 46, end: 47 },
                operator: "!==",
                right: {
                  type: "Literal",
                  data: "'foo'",
                  value: "foo",
                  start: 52,
                  end: 57,
                },
                start: 46,
                end: 57,
              },
              start: 30,
              end: 58,
            },
            operator: "&&",
            right: { type: "Identifier", data: "y", start: 61, end: 62 },
            start: 30,
            end: 63,
          },
          start: 15,
          end: 63,
        },
        operator: "||",
        right: { type: "Identifier", data: "x", start: 66, end: 67 },
        start: 15,
        end: 68,
      },
      { type: "Text", data: ". Ready?", start: 69, end: 77 },
    ],
  };

  assertEquals(output, expected);
});
