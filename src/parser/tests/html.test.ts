import { assertEquals } from "../../deps.ts";
import { Parser } from "../index.ts";

Deno.test("Doctype", () => {
  const html = "<!DOCTYPE html>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Doctype",
        data: "<!DOCTYPE html>",
        start: 0,
        end: 15,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Comment", () => {
  const html = "<!-- Testing -->";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Comment",
        data: " Testing ",
        start: 0,
        end: 16,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Text Node", () => {
  // Newlines and Trailing spaces are removed From Document
  const html = "I am a Text Node \n";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Text",
        data: "I am a Text Node",
        start: 0,
        end: 16,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Self Closing Tag", () => {
  const html = "<br/>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "br",
        attributes: [],
        children: [],
        start: 0,
        end: 5,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Tag With No Children", () => {
  const html = "<ul></ul>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "ul",
        attributes: [],
        children: [],
        start: 0,
        end: 9,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Tag With Children", () => {
  const html = "<ul><li>FOO</li><li>BAR</li></ul>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "ul",
        attributes: [],
        children: [
          {
            type: "Tag",
            data: "li",
            attributes: [],
            children: [
              {
                type: "Text",
                data: "FOO",
                start: 8,
                end: 11,
              },
            ],
            start: 4,
            end: 16,
          },
          {
            type: "Tag",
            data: "li",
            attributes: [],
            children: [
              {
                type: "Text",
                data: "BAR",
                start: 20,
                end: 23,
              },
            ],
            start: 16,
            end: 28,
          },
        ],
        start: 0,
        end: 33,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Void Elements", () => {
  const html =
    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "meta",
        attributes: [
          {
            type: "Attribute",
            data: ' charset="UTF-8"',
            start: 5,
            end: 21,
            name: { type: "AttributeName", data: "charset", start: 6, end: 13 },
            value: {
              type: "AttributeValue",
              data: "UTF-8",
              start: 15,
              end: 22,
            },
          },
        ],
        children: [],
        start: 0,
        end: 22,
      },
      {
        type: "Tag",
        data: "meta",
        attributes: [
          {
            type: "Attribute",
            data: ' name="viewport"',
            start: 27,
            end: 43,
            name: { type: "AttributeName", data: "name", start: 28, end: 32 },
            value: {
              type: "AttributeValue",
              data: "viewport",
              start: 34,
              end: 44,
            },
          },
          {
            type: "Attribute",
            data: ' content="width=device-width, initial-scale=1.0"',
            start: 43,
            end: 91,
            name: {
              type: "AttributeName",
              data: "content",
              start: 44,
              end: 51,
            },
            value: {
              type: "AttributeValue",
              data: "width=device-width, initial-scale=1.0",
              start: 53,
              end: 92,
            },
          },
        ],
        children: [],
        start: 22,
        end: 92,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Attribute", () => {
  const html = '<br class="foo" disabled />';
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "br",
        attributes: [
          {
            type: "Attribute",
            data: ' class="foo"',
            start: 3,
            end: 15,
            name: { type: "AttributeName", data: "class", start: 4, end: 9 },
            value: {
              type: "AttributeValue",
              data: "foo",
              start: 11,
              end: 16,
            },
          },
          {
            type: "Attribute",
            data: " disabled",
            start: 15,
            end: 24,
            name: {
              type: "AttributeName",
              data: "disabled",
              start: 16,
              end: 24,
            },
            value: { type: "AttributeValue", data: "", start: 24, end: 24 },
          },
        ],
        children: [],
        start: 0,
        end: 27,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Script Tag", () => {
  const html = "<script>console.log('hello world');</script>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "script",
        attributes: [],
        children: [
          {
            type: "Text",
            data: "console.log('hello world');",
            start: 8,
            end: 35,
          },
        ],
        start: 0,
        end: 44,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Style Tag", () => {
  const html =
    "<style>.border { border: 1px solid transparent; } .border-blue-100 { border-color: #3434; }</style>";
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "style",
        attributes: [],
        children: [
          {
            type: "Text",
            data:
              ".border { border: 1px solid transparent; } .border-blue-100 { border-color: #3434; }",
            start: 7,
            end: 91,
          },
        ],
        start: 0,
        end: 99,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Textarea Tag", () => {
  const html = `<textarea class="border border-blue-100" rows="5" cols="33">
        It was a dark and stormy night...
        and lighting was striking all around.
        Thunder clapped the sky so hard it made my ears ring.
     </textarea>`;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      {
        type: "Tag",
        data: "textarea",
        attributes: [
          {
            type: "Attribute",
            data: ' class="border border-blue-100"',
            start: 9,
            end: 40,
            name: { type: "AttributeName", data: "class", start: 10, end: 15 },
            value: {
              type: "AttributeValue",
              data: "border border-blue-100",
              start: 17,
              end: 41,
            },
          },
          {
            type: "Attribute",
            data: ' rows="5"',
            start: 40,
            end: 49,
            name: { type: "AttributeName", data: "rows", start: 41, end: 45 },
            value: { type: "AttributeValue", data: "5", start: 47, end: 50 },
          },
          {
            type: "Attribute",
            data: ' cols="33"',
            start: 49,
            end: 59,
            name: { type: "AttributeName", data: "cols", start: 50, end: 54 },
            value: { type: "AttributeValue", data: "33", start: 56, end: 60 },
          },
        ],
        children: [
          {
            type: "Text",
            data:
              "\n        It was a dark and stormy night...\n        and lighting was striking all around.\n        Thunder clapped the sky so hard it made my ears ring.\n     ",
            start: 60,
            end: 216,
          },
        ],
        start: 0,
        end: 227,
      },
    ],
  };

  assertEquals(output, expected);
});

Deno.test("Complex Document", () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <header class="bg-gray-900 text-white">
          <nav>
            <a href="/">
              <strong>
                Home
              </strong>
            </a>
          </nav>
        </header>
        <div role="main" class="full-width bg-gray-100">
          <h1 class="text-black font-bold">My Awesome Site</h1>
        </div>
        <footer>
          <p class="text-xs">Copyright 2020 - All Rights Reserved</p>
        </footer>
      </body>
    </html>
  `;
  const p = new Parser(html);
  const output = p.parse();
  const expected = {
    html: [
      { type: "Text", data: "\n    ", start: 0, end: 5 },
      { type: "Doctype", data: "<!DOCTYPE html>", start: 5, end: 20 },
      { type: "Text", data: "\n    ", start: 20, end: 25 },
      {
        type: "Tag",
        data: "html",
        attributes: [
          {
            type: "Attribute",
            data: ' lang="en"',
            start: 30,
            end: 40,
            name: { type: "AttributeName", data: "lang", start: 31, end: 35 },
            value: { type: "AttributeValue", data: "en", start: 37, end: 41 },
          },
        ],
        children: [
          { type: "Text", data: "\n      ", start: 41, end: 48 },
          {
            type: "Tag",
            data: "head",
            attributes: [],
            children: [
              { type: "Text", data: "\n        ", start: 54, end: 63 },
              {
                type: "Tag",
                data: "meta",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' charset="UTF-8"',
                    start: 68,
                    end: 84,
                    name: {
                      type: "AttributeName",
                      data: "charset",
                      start: 69,
                      end: 76,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "UTF-8",
                      start: 78,
                      end: 85,
                    },
                  },
                ],
                children: [],
                start: 63,
                end: 85,
              },
              { type: "Text", data: "\n        ", start: 85, end: 94 },
              {
                type: "Tag",
                data: "meta",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' name="viewport"',
                    start: 99,
                    end: 115,
                    name: {
                      type: "AttributeName",
                      data: "name",
                      start: 100,
                      end: 104,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "viewport",
                      start: 106,
                      end: 116,
                    },
                  },
                  {
                    type: "Attribute",
                    data: ' content="width=device-width, initial-scale=1.0"',
                    start: 115,
                    end: 163,
                    name: {
                      type: "AttributeName",
                      data: "content",
                      start: 116,
                      end: 123,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "width=device-width, initial-scale=1.0",
                      start: 125,
                      end: 164,
                    },
                  },
                ],
                children: [],
                start: 94,
                end: 164,
              },
              { type: "Text", data: "\n        ", start: 164, end: 173 },
              {
                type: "Tag",
                data: "title",
                attributes: [],
                children: [
                  { type: "Text", data: "Document", start: 180, end: 188 },
                ],
                start: 173,
                end: 196,
              },
              { type: "Text", data: "\n      ", start: 196, end: 203 },
            ],
            start: 48,
            end: 210,
          },
          { type: "Text", data: "\n      ", start: 210, end: 217 },
          {
            type: "Tag",
            data: "body",
            attributes: [],
            children: [
              { type: "Text", data: "\n        ", start: 223, end: 232 },
              {
                type: "Tag",
                data: "header",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' class="bg-gray-900 text-white"',
                    start: 239,
                    end: 270,
                    name: {
                      type: "AttributeName",
                      data: "class",
                      start: 240,
                      end: 245,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "bg-gray-900 text-white",
                      start: 247,
                      end: 271,
                    },
                  },
                ],
                children: [
                  { type: "Text", data: "\n          ", start: 271, end: 282 },
                  {
                    type: "Tag",
                    data: "nav",
                    attributes: [],
                    children: [
                      {
                        type: "Text",
                        data: "\n            ",
                        start: 287,
                        end: 300,
                      },
                      {
                        type: "Tag",
                        data: "a",
                        attributes: [
                          {
                            type: "Attribute",
                            data: ' href="/"',
                            start: 302,
                            end: 311,
                            name: {
                              type: "AttributeName",
                              data: "href",
                              start: 303,
                              end: 307,
                            },
                            value: {
                              type: "AttributeValue",
                              data: "/",
                              start: 309,
                              end: 312,
                            },
                          },
                        ],
                        children: [
                          {
                            type: "Text",
                            data: "\n              ",
                            start: 312,
                            end: 327,
                          },
                          {
                            type: "Tag",
                            data: "strong",
                            attributes: [],
                            children: [
                              {
                                type: "Text",
                                data: "\n                Home\n              ",
                                start: 335,
                                end: 371,
                              },
                            ],
                            start: 327,
                            end: 380,
                          },
                          {
                            type: "Text",
                            data: "\n            ",
                            start: 380,
                            end: 393,
                          },
                        ],
                        start: 300,
                        end: 397,
                      },
                      {
                        type: "Text",
                        data: "\n          ",
                        start: 397,
                        end: 408,
                      },
                    ],
                    start: 282,
                    end: 414,
                  },
                  { type: "Text", data: "\n        ", start: 414, end: 423 },
                ],
                start: 232,
                end: 432,
              },
              { type: "Text", data: "\n        ", start: 432, end: 441 },
              {
                type: "Tag",
                data: "div",
                attributes: [
                  {
                    type: "Attribute",
                    data: ' role="main"',
                    start: 445,
                    end: 457,
                    name: {
                      type: "AttributeName",
                      data: "role",
                      start: 446,
                      end: 450,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "main",
                      start: 452,
                      end: 458,
                    },
                  },
                  {
                    type: "Attribute",
                    data: ' class="full-width bg-gray-100"',
                    start: 457,
                    end: 488,
                    name: {
                      type: "AttributeName",
                      data: "class",
                      start: 458,
                      end: 463,
                    },
                    value: {
                      type: "AttributeValue",
                      data: "full-width bg-gray-100",
                      start: 465,
                      end: 489,
                    },
                  },
                ],
                children: [
                  { type: "Text", data: "\n          ", start: 489, end: 500 },
                  {
                    type: "Tag",
                    data: "h1",
                    attributes: [
                      {
                        type: "Attribute",
                        data: ' class="text-black font-bold"',
                        start: 503,
                        end: 532,
                        name: {
                          type: "AttributeName",
                          data: "class",
                          start: 504,
                          end: 509,
                        },
                        value: {
                          type: "AttributeValue",
                          data: "text-black font-bold",
                          start: 511,
                          end: 533,
                        },
                      },
                    ],
                    children: [
                      {
                        type: "Text",
                        data: "My Awesome Site",
                        start: 533,
                        end: 548,
                      },
                    ],
                    start: 500,
                    end: 553,
                  },
                  { type: "Text", data: "\n        ", start: 553, end: 562 },
                ],
                start: 441,
                end: 568,
              },
              { type: "Text", data: "\n        ", start: 568, end: 577 },
              {
                type: "Tag",
                data: "footer",
                attributes: [],
                children: [
                  { type: "Text", data: "\n          ", start: 585, end: 596 },
                  {
                    type: "Tag",
                    data: "p",
                    attributes: [
                      {
                        type: "Attribute",
                        data: ' class="text-xs"',
                        start: 598,
                        end: 614,
                        name: {
                          type: "AttributeName",
                          data: "class",
                          start: 599,
                          end: 604,
                        },
                        value: {
                          type: "AttributeValue",
                          data: "text-xs",
                          start: 606,
                          end: 615,
                        },
                      },
                    ],
                    children: [
                      {
                        type: "Text",
                        data: "Copyright 2020 - All Rights Reserved",
                        start: 615,
                        end: 651,
                      },
                    ],
                    start: 596,
                    end: 655,
                  },
                  { type: "Text", data: "\n        ", start: 655, end: 664 },
                ],
                start: 577,
                end: 673,
              },
              { type: "Text", data: "\n      ", start: 673, end: 680 },
            ],
            start: 217,
            end: 687,
          },
          { type: "Text", data: "\n    ", start: 687, end: 692 },
        ],
        start: 25,
        end: 699,
      },
    ],
  };

  assertEquals(output, expected);
});
