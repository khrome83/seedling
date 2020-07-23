import {
  runBenchmarks,
  bench,
  BenchmarkTimer,
  BenchmarkRunError,
  red,
  prettyBenchmarkResult,
  prettyBenchmarkProgress,
} from "../deps.ts";
import { RootAST } from "../parser/index.ts";
import { Serializer } from "./index.ts";

// Basic Benchmark to Serializer Parser Speed
const ast: RootAST = {
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
          value: { type: "AttributeValue", data: '"en"', start: 37, end: 41 },
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
                    data: '"UTF-8"',
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
                    data: '"viewport"',
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
                    data: '"width=device-width, initial-scale=1.0"',
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
                    data: '"bg-gray-900 text-white"',
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
                            data: '"/"',
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
                    data: '"main"',
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
                    data: '"full-width bg-gray-100"',
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
                        data: '"text-black font-bold"',
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
                        data: '"text-xs"',
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

bench({
  name: "Complex Serializer",
  runs: 10000,
  func(b: BenchmarkTimer): void {
    b.start();
    const s = new Serializer(ast);
    const output = s.serialize();
    b.stop();
  },
});

runBenchmarks({ silent: true }, prettyBenchmarkProgress())
  .then(
    prettyBenchmarkResult({
      nocolor: false,
      parts: {
        extraMetrics: true,
        threshold: true,
        graph: true,
        graphBars: 10,
      },
    })
  )
  .catch((e: BenchmarkRunError) => {
    console.log(red(e.benchmarkName as string));
    console.error(red(e.stack as string));
  });
