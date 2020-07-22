import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { denock } from "https://deno.land/x/denock/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
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

  denock({
    method: "POST",
    protocol: "https",
    host: "api-us-east-1.graphcms.com",
    headers: [
      { header: "content-type", value: "application/json" },
      { header: "authorization", value: `Bearer ${Deno.env.get("TOKEN")}` },
    ],
    path: "/v2/ck9uhbg1f05ph01xo5fs6fqih/master",
    requestBody: {
      operationName: "MyQuery",
      query: body,
      variables: attrs,
    },
    replyStatus: 200,
    responseBody: {
      data: {
        marketingSocialProof: {
          __typename: "MarketingSocialProof",
          id: "cka5lzgxk02s701761t7scrb0",
        },
      },
    },
  });

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

Deno.test("Component Resolver - Sample (local)", async () => {
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

Deno.test("Component Resolver - Hero (remote)", async () => {
  const output = await resolveComponent("Hero", root);
  const expected = {
    ast: {
      html: [
        {
          type: "Comment",
          data: " This sample comes from tailwindui.com ",
          start: 0,
          end: 46,
        },
        { type: "Text", data: "\n", start: 46, end: 47 },
        {
          type: "Comment",
          data: " https://tailwindui.com/components/marketing/sections/heroes ",
          start: 47,
          end: 115,
        },
        { type: "Text", data: "\n", start: 115, end: 116 },
        {
          type: "Tag",
          data: "div",
          attributes: [
            {
              type: "Attribute",
              data: ' class="relative bg-white overflow-hidden"',
              start: 120,
              end: 162,
              name: {
                type: "AttributeName",
                data: "class",
                start: 121,
                end: 126,
              },
              value: {
                type: "AttributeValue",
                data: '"relative bg-white overflow-hidden"',
                start: 128,
                end: 163,
              },
            },
            {
              type: "Attribute",
              data: ' x-data="{ open: false }"',
              start: 162,
              end: 187,
              name: {
                type: "AttributeName",
                data: "x-data",
                start: 163,
                end: 169,
              },
              value: {
                type: "AttributeValue",
                data: '"{ open: false }"',
                start: 171,
                end: 188,
              },
            },
          ],
          children: [
            { type: "Text", data: "\n  ", start: 188, end: 191 },
            {
              type: "Tag",
              data: "div",
              attributes: [
                {
                  type: "Attribute",
                  data: ' class="max-w-screen-xl mx-auto"',
                  start: 195,
                  end: 227,
                  name: {
                    type: "AttributeName",
                    data: "class",
                    start: 196,
                    end: 201,
                  },
                  value: {
                    type: "AttributeValue",
                    data: '"max-w-screen-xl mx-auto"',
                    start: 203,
                    end: 228,
                  },
                },
              ],
              children: [
                { type: "Text", data: "\n    ", start: 228, end: 233 },
                {
                  type: "Tag",
                  data: "div",
                  attributes: [
                    {
                      type: "Attribute",
                      data:
                        ' class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"',
                      start: 237,
                      end: 332,
                      name: {
                        type: "AttributeName",
                        data: "class",
                        start: 238,
                        end: 243,
                      },
                      value: {
                        type: "AttributeValue",
                        data:
                          '"relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"',
                        start: 245,
                        end: 333,
                      },
                    },
                  ],
                  children: [
                    { type: "Text", data: "\n      ", start: 333, end: 340 },
                    {
                      type: "Tag",
                      data: "svg",
                      attributes: [
                        {
                          type: "Attribute",
                          data:
                            ' class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"',
                          start: 344,
                          end: 444,
                          name: {
                            type: "AttributeName",
                            data: "class",
                            start: 345,
                            end: 350,
                          },
                          value: {
                            type: "AttributeValue",
                            data:
                              '"hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"',
                            start: 352,
                            end: 445,
                          },
                        },
                        {
                          type: "Attribute",
                          data: ' fill="currentColor"',
                          start: 444,
                          end: 464,
                          name: {
                            type: "AttributeName",
                            data: "fill",
                            start: 445,
                            end: 449,
                          },
                          value: {
                            type: "AttributeValue",
                            data: '"currentColor"',
                            start: 451,
                            end: 465,
                          },
                        },
                        {
                          type: "Attribute",
                          data: ' viewBox="0 0 100 100"',
                          start: 464,
                          end: 486,
                          name: {
                            type: "AttributeName",
                            data: "viewBox",
                            start: 465,
                            end: 472,
                          },
                          value: {
                            type: "AttributeValue",
                            data: '"0 0 100 100"',
                            start: 474,
                            end: 487,
                          },
                        },
                        {
                          type: "Attribute",
                          data: ' preserveAspectRatio="none"',
                          start: 486,
                          end: 513,
                          name: {
                            type: "AttributeName",
                            data: "preserveAspectRatio",
                            start: 487,
                            end: 506,
                          },
                          value: {
                            type: "AttributeValue",
                            data: '"none"',
                            start: 508,
                            end: 514,
                          },
                        },
                      ],
                      children: [
                        {
                          type: "Text",
                          data: "\n        ",
                          start: 514,
                          end: 523,
                        },
                        {
                          type: "Tag",
                          data: "polygon",
                          attributes: [
                            {
                              type: "Attribute",
                              data: ' points="50,0 100,0 50,100 0,100"',
                              start: 531,
                              end: 564,
                              name: {
                                type: "AttributeName",
                                data: "points",
                                start: 532,
                                end: 538,
                              },
                              value: {
                                type: "AttributeValue",
                                data: '"50,0 100,0 50,100 0,100"',
                                start: 540,
                                end: 565,
                              },
                            },
                          ],
                          children: [],
                          start: 523,
                          end: 567,
                        },
                        {
                          type: "Text",
                          data: "\n      ",
                          start: 567,
                          end: 574,
                        },
                      ],
                      start: 340,
                      end: 580,
                    },
                    { type: "Text", data: "\n\n      ", start: 580, end: 588 },
                    {
                      type: "Tag",
                      data: "div",
                      attributes: [
                        {
                          type: "Attribute",
                          data: ' class="relative pt-6 px-4 sm:px-6 lg:px-8"',
                          start: 592,
                          end: 635,
                          name: {
                            type: "AttributeName",
                            data: "class",
                            start: 593,
                            end: 598,
                          },
                          value: {
                            type: "AttributeValue",
                            data: '"relative pt-6 px-4 sm:px-6 lg:px-8"',
                            start: 600,
                            end: 636,
                          },
                        },
                      ],
                      children: [
                        {
                          type: "Text",
                          data: "\n        ",
                          start: 636,
                          end: 645,
                        },
                        {
                          type: "Tag",
                          data: "nav",
                          attributes: [
                            {
                              type: "Attribute",
                              data:
                                ' class="relative flex items-center justify-between sm:h-10 lg:justify-start"',
                              start: 649,
                              end: 725,
                              name: {
                                type: "AttributeName",
                                data: "class",
                                start: 650,
                                end: 655,
                              },
                              value: {
                                type: "AttributeValue",
                                data:
                                  '"relative flex items-center justify-between sm:h-10 lg:justify-start"',
                                start: 657,
                                end: 726,
                              },
                            },
                          ],
                          children: [
                            {
                              type: "Text",
                              data: "\n          ",
                              start: 726,
                              end: 737,
                            },
                            {
                              type: "Tag",
                              data: "div",
                              attributes: [
                                {
                                  type: "Attribute",
                                  data:
                                    ' class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"',
                                  start: 741,
                                  end: 806,
                                  name: {
                                    type: "AttributeName",
                                    data: "class",
                                    start: 742,
                                    end: 747,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data:
                                      '"flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"',
                                    start: 749,
                                    end: 807,
                                  },
                                },
                              ],
                              children: [
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 807,
                                  end: 820,
                                },
                                {
                                  type: "Tag",
                                  data: "div",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="flex items-center justify-between w-full md:w-auto"',
                                      start: 824,
                                      end: 883,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 825,
                                        end: 830,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"flex items-center justify-between w-full md:w-auto"',
                                        start: 832,
                                        end: 884,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 884,
                                      end: 899,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 901,
                                          end: 910,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 902,
                                            end: 906,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 908,
                                            end: 911,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data: ' aria-label="Home"',
                                          start: 910,
                                          end: 928,
                                          name: {
                                            type: "AttributeName",
                                            data: "aria-label",
                                            start: 911,
                                            end: 921,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"Home"',
                                            start: 923,
                                            end: 929,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "\n                ",
                                          start: 929,
                                          end: 946,
                                        },
                                        {
                                          type: "Tag",
                                          data: "img",
                                          attributes: [
                                            {
                                              type: "Attribute",
                                              data:
                                                ' class="h-8 w-auto sm:h-10"',
                                              start: 950,
                                              end: 977,
                                              name: {
                                                type: "AttributeName",
                                                data: "class",
                                                start: 951,
                                                end: 956,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"h-8 w-auto sm:h-10"',
                                                start: 958,
                                                end: 978,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data:
                                                ' src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"',
                                              start: 977,
                                              end: 1043,
                                              name: {
                                                type: "AttributeName",
                                                data: "src",
                                                start: 978,
                                                end: 981,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data:
                                                  '"https://tailwindui.com/img/logos/workflow-mark-on-white.svg"',
                                                start: 983,
                                                end: 1044,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' alt="Logo"',
                                              start: 1043,
                                              end: 1054,
                                              name: {
                                                type: "AttributeName",
                                                data: "alt",
                                                start: 1044,
                                                end: 1047,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"Logo"',
                                                start: 1049,
                                                end: 1055,
                                              },
                                            },
                                          ],
                                          children: [],
                                          start: 946,
                                          end: 1055,
                                        },
                                        {
                                          type: "Text",
                                          data: "\n              ",
                                          start: 1055,
                                          end: 1070,
                                        },
                                      ],
                                      start: 899,
                                      end: 1074,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 1074,
                                      end: 1089,
                                    },
                                    {
                                      type: "Tag",
                                      data: "div",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="-mr-2 flex items-center md:hidden"',
                                          start: 1093,
                                          end: 1135,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 1094,
                                            end: 1099,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"-mr-2 flex items-center md:hidden"',
                                            start: 1101,
                                            end: 1136,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "\n                ",
                                          start: 1136,
                                          end: 1153,
                                        },
                                        {
                                          type: "Tag",
                                          data: "button",
                                          attributes: [
                                            {
                                              type: "Attribute",
                                              data: ' @click="open = true"',
                                              start: 1160,
                                              end: 1181,
                                              name: {
                                                type: "AttributeName",
                                                data: "@click",
                                                start: 1161,
                                                end: 1167,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"open = true"',
                                                start: 1169,
                                                end: 1182,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' type="button"',
                                              start: 1181,
                                              end: 1195,
                                              name: {
                                                type: "AttributeName",
                                                data: "type",
                                                start: 1182,
                                                end: 1186,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"button"',
                                                start: 1188,
                                                end: 1196,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data:
                                                ' class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"',
                                              start: 1195,
                                              end: 1403,
                                              name: {
                                                type: "AttributeName",
                                                data: "class",
                                                start: 1196,
                                                end: 1201,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data:
                                                  '"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"',
                                                start: 1203,
                                                end: 1404,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' id="main-menu"',
                                              start: 1403,
                                              end: 1418,
                                              name: {
                                                type: "AttributeName",
                                                data: "id",
                                                start: 1404,
                                                end: 1406,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"main-menu"',
                                                start: 1408,
                                                end: 1419,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' aria-label="Main menu"',
                                              start: 1418,
                                              end: 1441,
                                              name: {
                                                type: "AttributeName",
                                                data: "aria-label",
                                                start: 1419,
                                                end: 1429,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"Main menu"',
                                                start: 1431,
                                                end: 1442,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' aria-haspopup="true"',
                                              start: 1441,
                                              end: 1462,
                                              name: {
                                                type: "AttributeName",
                                                data: "aria-haspopup",
                                                start: 1442,
                                                end: 1455,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"true"',
                                                start: 1457,
                                                end: 1463,
                                              },
                                            },
                                          ],
                                          children: [
                                            {
                                              type: "Text",
                                              data: "\n                  ",
                                              start: 1463,
                                              end: 1482,
                                            },
                                            {
                                              type: "Tag",
                                              data: "svg",
                                              attributes: [
                                                {
                                                  type: "Attribute",
                                                  data: ' class="h-6 w-6"',
                                                  start: 1486,
                                                  end: 1502,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "class",
                                                    start: 1487,
                                                    end: 1492,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"h-6 w-6"',
                                                    start: 1494,
                                                    end: 1503,
                                                  },
                                                },
                                                {
                                                  type: "Attribute",
                                                  data:
                                                    ' stroke="currentColor"',
                                                  start: 1502,
                                                  end: 1524,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "stroke",
                                                    start: 1503,
                                                    end: 1509,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"currentColor"',
                                                    start: 1511,
                                                    end: 1525,
                                                  },
                                                },
                                                {
                                                  type: "Attribute",
                                                  data: ' fill="none"',
                                                  start: 1524,
                                                  end: 1536,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "fill",
                                                    start: 1525,
                                                    end: 1529,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"none"',
                                                    start: 1531,
                                                    end: 1537,
                                                  },
                                                },
                                                {
                                                  type: "Attribute",
                                                  data: ' viewBox="0 0 24 24"',
                                                  start: 1536,
                                                  end: 1556,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "viewBox",
                                                    start: 1537,
                                                    end: 1544,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"0 0 24 24"',
                                                    start: 1546,
                                                    end: 1557,
                                                  },
                                                },
                                              ],
                                              children: [
                                                {
                                                  type: "Text",
                                                  data:
                                                    "\n                    ",
                                                  start: 1557,
                                                  end: 1578,
                                                },
                                                {
                                                  type: "Tag",
                                                  data: "path",
                                                  attributes: [
                                                    {
                                                      type: "Attribute",
                                                      data:
                                                        ' stroke-linecap="round"',
                                                      start: 1583,
                                                      end: 1606,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "stroke-linecap",
                                                        start: 1584,
                                                        end: 1598,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data: '"round"',
                                                        start: 1600,
                                                        end: 1607,
                                                      },
                                                    },
                                                    {
                                                      type: "Attribute",
                                                      data:
                                                        ' stroke-linejoin="round"',
                                                      start: 1606,
                                                      end: 1630,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "stroke-linejoin",
                                                        start: 1607,
                                                        end: 1622,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data: '"round"',
                                                        start: 1624,
                                                        end: 1631,
                                                      },
                                                    },
                                                    {
                                                      type: "Attribute",
                                                      data: ' stroke-width="2"',
                                                      start: 1630,
                                                      end: 1647,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "stroke-width",
                                                        start: 1631,
                                                        end: 1643,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data: '"2"',
                                                        start: 1645,
                                                        end: 1648,
                                                      },
                                                    },
                                                    {
                                                      type: "Attribute",
                                                      data:
                                                        ' d="M4 6h16M4 12h16M4 18h16"',
                                                      start: 1647,
                                                      end: 1675,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "d",
                                                        start: 1648,
                                                        end: 1649,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data:
                                                          '"M4 6h16M4 12h16M4 18h16"',
                                                        start: 1651,
                                                        end: 1676,
                                                      },
                                                    },
                                                  ],
                                                  children: [],
                                                  start: 1578,
                                                  end: 1678,
                                                },
                                                {
                                                  type: "Text",
                                                  data: "\n                  ",
                                                  start: 1678,
                                                  end: 1697,
                                                },
                                              ],
                                              start: 1482,
                                              end: 1703,
                                            },
                                            {
                                              type: "Text",
                                              data: "\n                ",
                                              start: 1703,
                                              end: 1720,
                                            },
                                          ],
                                          start: 1153,
                                          end: 1729,
                                        },
                                        {
                                          type: "Text",
                                          data: "\n              ",
                                          start: 1729,
                                          end: 1744,
                                        },
                                      ],
                                      start: 1089,
                                      end: 1750,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n            ",
                                      start: 1750,
                                      end: 1763,
                                    },
                                  ],
                                  start: 820,
                                  end: 1769,
                                },
                                {
                                  type: "Text",
                                  data: "\n          ",
                                  start: 1769,
                                  end: 1780,
                                },
                              ],
                              start: 737,
                              end: 1786,
                            },
                            {
                              type: "Text",
                              data: "\n          ",
                              start: 1786,
                              end: 1797,
                            },
                            {
                              type: "Tag",
                              data: "div",
                              attributes: [
                                {
                                  type: "Attribute",
                                  data:
                                    ' class="hidden md:block md:ml-10 md:pr-4"',
                                  start: 1801,
                                  end: 1842,
                                  name: {
                                    type: "AttributeName",
                                    data: "class",
                                    start: 1802,
                                    end: 1807,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data: '"hidden md:block md:ml-10 md:pr-4"',
                                    start: 1809,
                                    end: 1843,
                                  },
                                },
                              ],
                              children: [
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 1843,
                                  end: 1856,
                                },
                                {
                                  type: "Tag",
                                  data: "a",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' href="#"',
                                      start: 1858,
                                      end: 1867,
                                      name: {
                                        type: "AttributeName",
                                        data: "href",
                                        start: 1859,
                                        end: 1863,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"#"',
                                        start: 1865,
                                        end: 1868,
                                      },
                                    },
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                      start: 1867,
                                      end: 1957,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 1868,
                                        end: 1873,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                        start: 1875,
                                        end: 1958,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "Product",
                                      start: 1958,
                                      end: 1965,
                                    },
                                  ],
                                  start: 1856,
                                  end: 1969,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 1969,
                                  end: 1982,
                                },
                                {
                                  type: "Tag",
                                  data: "a",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' href="#"',
                                      start: 1984,
                                      end: 1993,
                                      name: {
                                        type: "AttributeName",
                                        data: "href",
                                        start: 1985,
                                        end: 1989,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"#"',
                                        start: 1991,
                                        end: 1994,
                                      },
                                    },
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                      start: 1993,
                                      end: 2088,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 1994,
                                        end: 1999,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                        start: 2001,
                                        end: 2089,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "Features",
                                      start: 2089,
                                      end: 2097,
                                    },
                                  ],
                                  start: 1982,
                                  end: 2101,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 2101,
                                  end: 2114,
                                },
                                {
                                  type: "Tag",
                                  data: "a",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' href="#"',
                                      start: 2116,
                                      end: 2125,
                                      name: {
                                        type: "AttributeName",
                                        data: "href",
                                        start: 2117,
                                        end: 2121,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"#"',
                                        start: 2123,
                                        end: 2126,
                                      },
                                    },
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                      start: 2125,
                                      end: 2220,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 2126,
                                        end: 2131,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                        start: 2133,
                                        end: 2221,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "Marketplace",
                                      start: 2221,
                                      end: 2232,
                                    },
                                  ],
                                  start: 2114,
                                  end: 2236,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 2236,
                                  end: 2249,
                                },
                                {
                                  type: "Tag",
                                  data: "a",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' href="#"',
                                      start: 2251,
                                      end: 2260,
                                      name: {
                                        type: "AttributeName",
                                        data: "href",
                                        start: 2252,
                                        end: 2256,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"#"',
                                        start: 2258,
                                        end: 2261,
                                      },
                                    },
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                      start: 2260,
                                      end: 2355,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 2261,
                                        end: 2266,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"',
                                        start: 2268,
                                        end: 2356,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "Company",
                                      start: 2356,
                                      end: 2363,
                                    },
                                  ],
                                  start: 2249,
                                  end: 2367,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 2367,
                                  end: 2380,
                                },
                                {
                                  type: "Tag",
                                  data: "a",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' href="#"',
                                      start: 2382,
                                      end: 2391,
                                      name: {
                                        type: "AttributeName",
                                        data: "href",
                                        start: 2383,
                                        end: 2387,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"#"',
                                        start: 2389,
                                        end: 2392,
                                      },
                                    },
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"',
                                      start: 2391,
                                      end: 2490,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 2392,
                                        end: 2397,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"',
                                        start: 2399,
                                        end: 2491,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "Log in",
                                      start: 2491,
                                      end: 2497,
                                    },
                                  ],
                                  start: 2380,
                                  end: 2501,
                                },
                                {
                                  type: "Text",
                                  data: "\n          ",
                                  start: 2501,
                                  end: 2512,
                                },
                              ],
                              start: 1797,
                              end: 2518,
                            },
                            {
                              type: "Text",
                              data: "\n        ",
                              start: 2518,
                              end: 2527,
                            },
                          ],
                          start: 645,
                          end: 2533,
                        },
                        {
                          type: "Text",
                          data: "\n      ",
                          start: 2533,
                          end: 2540,
                        },
                      ],
                      start: 588,
                      end: 2546,
                    },
                    {
                      type: "Text",
                      data: "\n\n      ",
                      start: 2546,
                      end: 2554,
                    },
                    {
                      type: "Comment",
                      data:
                        " Mobile menu, show/hide based on menu open state. ",
                      start: 2554,
                      end: 2611,
                    },
                    { type: "Text", data: "\n      ", start: 2611, end: 2618 },
                    {
                      type: "Tag",
                      data: "div",
                      attributes: [
                        {
                          type: "Attribute",
                          data:
                            ' x-show.transition.in.duration.150ms.out.duration.100ms="open"',
                          start: 2622,
                          end: 2684,
                          name: {
                            type: "AttributeName",
                            data:
                              "x-show.transition.in.duration.150ms.out.duration.100ms",
                            start: 2623,
                            end: 2677,
                          },
                          value: {
                            type: "AttributeValue",
                            data: '"open"',
                            start: 2679,
                            end: 2685,
                          },
                        },
                        {
                          type: "Attribute",
                          data: ' @click.away="open = false"',
                          start: 2684,
                          end: 2711,
                          name: {
                            type: "AttributeName",
                            data: "@click.away",
                            start: 2685,
                            end: 2696,
                          },
                          value: {
                            type: "AttributeValue",
                            data: '"open = false"',
                            start: 2698,
                            end: 2712,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " solute",
                          start: 2711,
                          end: 2718,
                          name: {
                            type: "AttributeName",
                            data: "solute",
                            start: 2712,
                            end: 2718,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2718,
                            end: 2718,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " top-0",
                          start: 2718,
                          end: 2724,
                          name: {
                            type: "AttributeName",
                            data: "top-0",
                            start: 2719,
                            end: 2724,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2724,
                            end: 2724,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " inset-x-0",
                          start: 2724,
                          end: 2734,
                          name: {
                            type: "AttributeName",
                            data: "inset-x-0",
                            start: 2725,
                            end: 2734,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2734,
                            end: 2734,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " p-2",
                          start: 2734,
                          end: 2738,
                          name: {
                            type: "AttributeName",
                            data: "p-2",
                            start: 2735,
                            end: 2738,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2738,
                            end: 2738,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " transition",
                          start: 2738,
                          end: 2749,
                          name: {
                            type: "AttributeName",
                            data: "transition",
                            start: 2739,
                            end: 2749,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2749,
                            end: 2749,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " transform",
                          start: 2749,
                          end: 2759,
                          name: {
                            type: "AttributeName",
                            data: "transform",
                            start: 2750,
                            end: 2759,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2759,
                            end: 2759,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " origin-top-right",
                          start: 2759,
                          end: 2776,
                          name: {
                            type: "AttributeName",
                            data: "origin-top-right",
                            start: 2760,
                            end: 2776,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2776,
                            end: 2776,
                          },
                        },
                        {
                          type: "Attribute",
                          data: " md:hidden",
                          start: 2776,
                          end: 2786,
                          name: {
                            type: "AttributeName",
                            data: "md:hidden",
                            start: 2777,
                            end: 2786,
                          },
                          value: {
                            type: "AttributeValue",
                            data: "",
                            start: 2786,
                            end: 2786,
                          },
                        },
                      ],
                      children: [
                        {
                          type: "Text",
                          data: ">\n        ",
                          start: 2787,
                          end: 2797,
                        },
                        {
                          type: "Tag",
                          data: "div",
                          attributes: [
                            {
                              type: "Attribute",
                              data: ' class="rounded-lg shadow-md"',
                              start: 2801,
                              end: 2830,
                              name: {
                                type: "AttributeName",
                                data: "class",
                                start: 2802,
                                end: 2807,
                              },
                              value: {
                                type: "AttributeValue",
                                data: '"rounded-lg shadow-md"',
                                start: 2809,
                                end: 2831,
                              },
                            },
                          ],
                          children: [
                            {
                              type: "Text",
                              data: "\n          ",
                              start: 2831,
                              end: 2842,
                            },
                            {
                              type: "Tag",
                              data: "div",
                              attributes: [
                                {
                                  type: "Attribute",
                                  data:
                                    ' class="rounded-lg bg-white shadow-xs overflow-hidden"',
                                  start: 2846,
                                  end: 2900,
                                  name: {
                                    type: "AttributeName",
                                    data: "class",
                                    start: 2847,
                                    end: 2852,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data:
                                      '"rounded-lg bg-white shadow-xs overflow-hidden"',
                                    start: 2854,
                                    end: 2901,
                                  },
                                },
                                {
                                  type: "Attribute",
                                  data: ' role="menu"',
                                  start: 2900,
                                  end: 2912,
                                  name: {
                                    type: "AttributeName",
                                    data: "role",
                                    start: 2901,
                                    end: 2905,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data: '"menu"',
                                    start: 2907,
                                    end: 2913,
                                  },
                                },
                                {
                                  type: "Attribute",
                                  data: ' aria-orientation="vertical"',
                                  start: 2912,
                                  end: 2940,
                                  name: {
                                    type: "AttributeName",
                                    data: "aria-orientation",
                                    start: 2913,
                                    end: 2929,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data: '"vertical"',
                                    start: 2931,
                                    end: 2941,
                                  },
                                },
                                {
                                  type: "Attribute",
                                  data: ' aria-labelledby="main-menu"',
                                  start: 2940,
                                  end: 2968,
                                  name: {
                                    type: "AttributeName",
                                    data: "aria-labelledby",
                                    start: 2941,
                                    end: 2956,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data: '"main-menu"',
                                    start: 2958,
                                    end: 2969,
                                  },
                                },
                              ],
                              children: [
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 2969,
                                  end: 2982,
                                },
                                {
                                  type: "Tag",
                                  data: "div",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data:
                                        ' class="px-5 pt-4 flex items-center justify-between"',
                                      start: 2986,
                                      end: 3038,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 2987,
                                        end: 2992,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data:
                                          '"px-5 pt-4 flex items-center justify-between"',
                                        start: 2994,
                                        end: 3039,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 3039,
                                      end: 3054,
                                    },
                                    {
                                      type: "Tag",
                                      data: "div",
                                      attributes: [],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "\n                ",
                                          start: 3059,
                                          end: 3076,
                                        },
                                        {
                                          type: "Tag",
                                          data: "img",
                                          attributes: [
                                            {
                                              type: "Attribute",
                                              data: ' class="h-8 w-auto"',
                                              start: 3080,
                                              end: 3099,
                                              name: {
                                                type: "AttributeName",
                                                data: "class",
                                                start: 3081,
                                                end: 3086,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"h-8 w-auto"',
                                                start: 3088,
                                                end: 3100,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data:
                                                ' src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"',
                                              start: 3099,
                                              end: 3165,
                                              name: {
                                                type: "AttributeName",
                                                data: "src",
                                                start: 3100,
                                                end: 3103,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data:
                                                  '"https://tailwindui.com/img/logos/workflow-mark-on-white.svg"',
                                                start: 3105,
                                                end: 3166,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' alt=""',
                                              start: 3165,
                                              end: 3172,
                                              name: {
                                                type: "AttributeName",
                                                data: "alt",
                                                start: 3166,
                                                end: 3169,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '""',
                                                start: 3171,
                                                end: 3173,
                                              },
                                            },
                                          ],
                                          children: [],
                                          start: 3076,
                                          end: 3173,
                                        },
                                        {
                                          type: "Text",
                                          data: "\n              ",
                                          start: 3173,
                                          end: 3188,
                                        },
                                      ],
                                      start: 3054,
                                      end: 3194,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 3194,
                                      end: 3209,
                                    },
                                    {
                                      type: "Tag",
                                      data: "div",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' class="-mr-2"',
                                          start: 3213,
                                          end: 3227,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 3214,
                                            end: 3219,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"-mr-2"',
                                            start: 3221,
                                            end: 3228,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "\n                ",
                                          start: 3228,
                                          end: 3245,
                                        },
                                        {
                                          type: "Tag",
                                          data: "button",
                                          attributes: [
                                            {
                                              type: "Attribute",
                                              data: ' @click="open = false"',
                                              start: 3252,
                                              end: 3274,
                                              name: {
                                                type: "AttributeName",
                                                data: "@click",
                                                start: 3253,
                                                end: 3259,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"open = false"',
                                                start: 3261,
                                                end: 3275,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' type="button"',
                                              start: 3274,
                                              end: 3288,
                                              name: {
                                                type: "AttributeName",
                                                data: "type",
                                                start: 3275,
                                                end: 3279,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"button"',
                                                start: 3281,
                                                end: 3289,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data:
                                                ' class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"',
                                              start: 3288,
                                              end: 3496,
                                              name: {
                                                type: "AttributeName",
                                                data: "class",
                                                start: 3289,
                                                end: 3294,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data:
                                                  '"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"',
                                                start: 3296,
                                                end: 3497,
                                              },
                                            },
                                            {
                                              type: "Attribute",
                                              data: ' aria-label="Close menu"',
                                              start: 3496,
                                              end: 3520,
                                              name: {
                                                type: "AttributeName",
                                                data: "aria-label",
                                                start: 3497,
                                                end: 3507,
                                              },
                                              value: {
                                                type: "AttributeValue",
                                                data: '"Close menu"',
                                                start: 3509,
                                                end: 3521,
                                              },
                                            },
                                          ],
                                          children: [
                                            {
                                              type: "Text",
                                              data: "\n                  ",
                                              start: 3521,
                                              end: 3540,
                                            },
                                            {
                                              type: "Tag",
                                              data: "svg",
                                              attributes: [
                                                {
                                                  type: "Attribute",
                                                  data: ' class="h-6 w-6"',
                                                  start: 3544,
                                                  end: 3560,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "class",
                                                    start: 3545,
                                                    end: 3550,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"h-6 w-6"',
                                                    start: 3552,
                                                    end: 3561,
                                                  },
                                                },
                                                {
                                                  type: "Attribute",
                                                  data:
                                                    ' stroke="currentColor"',
                                                  start: 3560,
                                                  end: 3582,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "stroke",
                                                    start: 3561,
                                                    end: 3567,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"currentColor"',
                                                    start: 3569,
                                                    end: 3583,
                                                  },
                                                },
                                                {
                                                  type: "Attribute",
                                                  data: ' fill="none"',
                                                  start: 3582,
                                                  end: 3594,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "fill",
                                                    start: 3583,
                                                    end: 3587,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"none"',
                                                    start: 3589,
                                                    end: 3595,
                                                  },
                                                },
                                                {
                                                  type: "Attribute",
                                                  data: ' viewBox="0 0 24 24"',
                                                  start: 3594,
                                                  end: 3614,
                                                  name: {
                                                    type: "AttributeName",
                                                    data: "viewBox",
                                                    start: 3595,
                                                    end: 3602,
                                                  },
                                                  value: {
                                                    type: "AttributeValue",
                                                    data: '"0 0 24 24"',
                                                    start: 3604,
                                                    end: 3615,
                                                  },
                                                },
                                              ],
                                              children: [
                                                {
                                                  type: "Text",
                                                  data:
                                                    "\n                    ",
                                                  start: 3615,
                                                  end: 3636,
                                                },
                                                {
                                                  type: "Tag",
                                                  data: "path",
                                                  attributes: [
                                                    {
                                                      type: "Attribute",
                                                      data:
                                                        ' stroke-linecap="round"',
                                                      start: 3641,
                                                      end: 3664,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "stroke-linecap",
                                                        start: 3642,
                                                        end: 3656,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data: '"round"',
                                                        start: 3658,
                                                        end: 3665,
                                                      },
                                                    },
                                                    {
                                                      type: "Attribute",
                                                      data:
                                                        ' stroke-linejoin="round"',
                                                      start: 3664,
                                                      end: 3688,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "stroke-linejoin",
                                                        start: 3665,
                                                        end: 3680,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data: '"round"',
                                                        start: 3682,
                                                        end: 3689,
                                                      },
                                                    },
                                                    {
                                                      type: "Attribute",
                                                      data: ' stroke-width="2"',
                                                      start: 3688,
                                                      end: 3705,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "stroke-width",
                                                        start: 3689,
                                                        end: 3701,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data: '"2"',
                                                        start: 3703,
                                                        end: 3706,
                                                      },
                                                    },
                                                    {
                                                      type: "Attribute",
                                                      data:
                                                        ' d="M6 18L18 6M6 6l12 12"',
                                                      start: 3705,
                                                      end: 3730,
                                                      name: {
                                                        type: "AttributeName",
                                                        data: "d",
                                                        start: 3706,
                                                        end: 3707,
                                                      },
                                                      value: {
                                                        type: "AttributeValue",
                                                        data:
                                                          '"M6 18L18 6M6 6l12 12"',
                                                        start: 3709,
                                                        end: 3731,
                                                      },
                                                    },
                                                  ],
                                                  children: [],
                                                  start: 3636,
                                                  end: 3733,
                                                },
                                                {
                                                  type: "Text",
                                                  data: "\n                  ",
                                                  start: 3733,
                                                  end: 3752,
                                                },
                                              ],
                                              start: 3540,
                                              end: 3758,
                                            },
                                            {
                                              type: "Text",
                                              data: "\n                ",
                                              start: 3758,
                                              end: 3775,
                                            },
                                          ],
                                          start: 3245,
                                          end: 3784,
                                        },
                                        {
                                          type: "Text",
                                          data: "\n              ",
                                          start: 3784,
                                          end: 3799,
                                        },
                                      ],
                                      start: 3209,
                                      end: 3805,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n            ",
                                      start: 3805,
                                      end: 3818,
                                    },
                                  ],
                                  start: 2982,
                                  end: 3824,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 3824,
                                  end: 3837,
                                },
                                {
                                  type: "Tag",
                                  data: "div",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' class="px-2 pt-2 pb-3"',
                                      start: 3841,
                                      end: 3864,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 3842,
                                        end: 3847,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"px-2 pt-2 pb-3"',
                                        start: 3849,
                                        end: 3865,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 3865,
                                      end: 3880,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 3882,
                                          end: 3891,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 3883,
                                            end: 3887,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 3889,
                                            end: 3892,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                          start: 3891,
                                          end: 4091,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 3892,
                                            end: 3897,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                            start: 3899,
                                            end: 4092,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data: ' role="menuitem"',
                                          start: 4091,
                                          end: 4107,
                                          name: {
                                            type: "AttributeName",
                                            data: "role",
                                            start: 4092,
                                            end: 4096,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"menuitem"',
                                            start: 4098,
                                            end: 4108,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "Product",
                                          start: 4108,
                                          end: 4115,
                                        },
                                      ],
                                      start: 3880,
                                      end: 4119,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 4119,
                                      end: 4134,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 4136,
                                          end: 4145,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 4137,
                                            end: 4141,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 4143,
                                            end: 4146,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                          start: 4145,
                                          end: 4350,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 4146,
                                            end: 4151,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                            start: 4153,
                                            end: 4351,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data: ' role="menuitem"',
                                          start: 4350,
                                          end: 4366,
                                          name: {
                                            type: "AttributeName",
                                            data: "role",
                                            start: 4351,
                                            end: 4355,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"menuitem"',
                                            start: 4357,
                                            end: 4367,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "Features",
                                          start: 4367,
                                          end: 4375,
                                        },
                                      ],
                                      start: 4134,
                                      end: 4379,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 4379,
                                      end: 4394,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 4396,
                                          end: 4405,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 4397,
                                            end: 4401,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 4403,
                                            end: 4406,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                          start: 4405,
                                          end: 4610,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 4406,
                                            end: 4411,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                            start: 4413,
                                            end: 4611,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data: ' role="menuitem"',
                                          start: 4610,
                                          end: 4626,
                                          name: {
                                            type: "AttributeName",
                                            data: "role",
                                            start: 4611,
                                            end: 4615,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"menuitem"',
                                            start: 4617,
                                            end: 4627,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "Marketplace",
                                          start: 4627,
                                          end: 4638,
                                        },
                                      ],
                                      start: 4394,
                                      end: 4642,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 4642,
                                      end: 4657,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 4659,
                                          end: 4668,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 4660,
                                            end: 4664,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 4666,
                                            end: 4669,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                          start: 4668,
                                          end: 4873,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 4669,
                                            end: 4674,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"',
                                            start: 4676,
                                            end: 4874,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data: ' role="menuitem"',
                                          start: 4873,
                                          end: 4889,
                                          name: {
                                            type: "AttributeName",
                                            data: "role",
                                            start: 4874,
                                            end: 4878,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"menuitem"',
                                            start: 4880,
                                            end: 4890,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data: "Company",
                                          start: 4890,
                                          end: 4897,
                                        },
                                      ],
                                      start: 4657,
                                      end: 4901,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n            ",
                                      start: 4901,
                                      end: 4914,
                                    },
                                  ],
                                  start: 3837,
                                  end: 4920,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 4920,
                                  end: 4933,
                                },
                                {
                                  type: "Tag",
                                  data: "div",
                                  attributes: [],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 4938,
                                      end: 4953,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 4955,
                                          end: 4964,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 4956,
                                            end: 4960,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 4962,
                                            end: 4965,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"',
                                          start: 4964,
                                          end: 5181,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 4965,
                                            end: 4970,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"',
                                            start: 4972,
                                            end: 5182,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data: ' role="menuitem"',
                                          start: 5181,
                                          end: 5197,
                                          name: {
                                            type: "AttributeName",
                                            data: "role",
                                            start: 5182,
                                            end: 5186,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"menuitem"',
                                            start: 5188,
                                            end: 5198,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data:
                                            "\n                Log in\n              ",
                                          start: 5198,
                                          end: 5236,
                                        },
                                      ],
                                      start: 4953,
                                      end: 5240,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n            ",
                                      start: 5240,
                                      end: 5253,
                                    },
                                  ],
                                  start: 4933,
                                  end: 5259,
                                },
                                {
                                  type: "Text",
                                  data: "\n          ",
                                  start: 5259,
                                  end: 5270,
                                },
                              ],
                              start: 2842,
                              end: 5276,
                            },
                            {
                              type: "Text",
                              data: "\n        ",
                              start: 5276,
                              end: 5285,
                            },
                          ],
                          start: 2797,
                          end: 5291,
                        },
                        {
                          type: "Text",
                          data: "\n      ",
                          start: 5291,
                          end: 5298,
                        },
                      ],
                      start: 2618,
                      end: 5304,
                    },
                    {
                      type: "Text",
                      data: "\n\n      ",
                      start: 5304,
                      end: 5312,
                    },
                    {
                      type: "Tag",
                      data: "main",
                      attributes: [
                        {
                          type: "Attribute",
                          data:
                            ' class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"',
                          start: 5317,
                          end: 5412,
                          name: {
                            type: "AttributeName",
                            data: "class",
                            start: 5318,
                            end: 5323,
                          },
                          value: {
                            type: "AttributeValue",
                            data:
                              '"mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"',
                            start: 5325,
                            end: 5413,
                          },
                        },
                      ],
                      children: [
                        {
                          type: "Text",
                          data: "\n        ",
                          start: 5413,
                          end: 5422,
                        },
                        {
                          type: "Tag",
                          data: "div",
                          attributes: [
                            {
                              type: "Attribute",
                              data: ' class="sm:text-center lg:text-left"',
                              start: 5426,
                              end: 5462,
                              name: {
                                type: "AttributeName",
                                data: "class",
                                start: 5427,
                                end: 5432,
                              },
                              value: {
                                type: "AttributeValue",
                                data: '"sm:text-center lg:text-left"',
                                start: 5434,
                                end: 5463,
                              },
                            },
                          ],
                          children: [
                            {
                              type: "Text",
                              data: "\n          ",
                              start: 5463,
                              end: 5474,
                            },
                            {
                              type: "Tag",
                              data: "h2",
                              attributes: [
                                {
                                  type: "Attribute",
                                  data:
                                    ' class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"',
                                  start: 5477,
                                  end: 5589,
                                  name: {
                                    type: "AttributeName",
                                    data: "class",
                                    start: 5478,
                                    end: 5483,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data:
                                      '"text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"',
                                    start: 5485,
                                    end: 5590,
                                  },
                                },
                              ],
                              children: [
                                {
                                  type: "Text",
                                  data:
                                    "\n            Data to enrich your\n            ",
                                  start: 5590,
                                  end: 5635,
                                },
                                {
                                  type: "Tag",
                                  data: "br",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' class="xl:hidden"',
                                      start: 5638,
                                      end: 5656,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 5639,
                                        end: 5644,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"xl:hidden"',
                                        start: 5646,
                                        end: 5657,
                                      },
                                    },
                                  ],
                                  children: [],
                                  start: 5635,
                                  end: 5657,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 5657,
                                  end: 5670,
                                },
                                {
                                  type: "Tag",
                                  data: "span",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' class="text-indigo-600"',
                                      start: 5675,
                                      end: 5699,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 5676,
                                        end: 5681,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"text-indigo-600"',
                                        start: 5683,
                                        end: 5700,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "online business",
                                      start: 5700,
                                      end: 5715,
                                    },
                                  ],
                                  start: 5670,
                                  end: 5722,
                                },
                                {
                                  type: "Text",
                                  data: "\n          ",
                                  start: 5722,
                                  end: 5733,
                                },
                              ],
                              start: 5474,
                              end: 5738,
                            },
                            {
                              type: "Text",
                              data: "\n          ",
                              start: 5738,
                              end: 5749,
                            },
                            {
                              type: "Tag",
                              data: "p",
                              attributes: [
                                {
                                  type: "Attribute",
                                  data:
                                    ' class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"',
                                  start: 5751,
                                  end: 5857,
                                  name: {
                                    type: "AttributeName",
                                    data: "class",
                                    start: 5752,
                                    end: 5757,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data:
                                      '"mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"',
                                    start: 5759,
                                    end: 5858,
                                  },
                                },
                              ],
                              children: [
                                {
                                  type: "Text",
                                  data:
                                    "\n            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.\n          ",
                                  start: 5858,
                                  end: 6024,
                                },
                              ],
                              start: 5749,
                              end: 6028,
                            },
                            {
                              type: "Text",
                              data: "\n          ",
                              start: 6028,
                              end: 6039,
                            },
                            {
                              type: "Tag",
                              data: "div",
                              attributes: [
                                {
                                  type: "Attribute",
                                  data:
                                    ' class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"',
                                  start: 6043,
                                  end: 6107,
                                  name: {
                                    type: "AttributeName",
                                    data: "class",
                                    start: 6044,
                                    end: 6049,
                                  },
                                  value: {
                                    type: "AttributeValue",
                                    data:
                                      '"mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"',
                                    start: 6051,
                                    end: 6108,
                                  },
                                },
                              ],
                              children: [
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 6108,
                                  end: 6121,
                                },
                                {
                                  type: "Tag",
                                  data: "div",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' class="rounded-md shadow"',
                                      start: 6125,
                                      end: 6151,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 6126,
                                        end: 6131,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"rounded-md shadow"',
                                        start: 6133,
                                        end: 6152,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 6152,
                                      end: 6167,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 6169,
                                          end: 6178,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 6170,
                                            end: 6174,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 6176,
                                            end: 6179,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"',
                                          start: 6178,
                                          end: 6485,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 6179,
                                            end: 6184,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"',
                                            start: 6186,
                                            end: 6486,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data:
                                            "\n                Get started\n              ",
                                          start: 6486,
                                          end: 6529,
                                        },
                                      ],
                                      start: 6167,
                                      end: 6533,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n            ",
                                      start: 6533,
                                      end: 6546,
                                    },
                                  ],
                                  start: 6121,
                                  end: 6552,
                                },
                                {
                                  type: "Text",
                                  data: "\n            ",
                                  start: 6552,
                                  end: 6565,
                                },
                                {
                                  type: "Tag",
                                  data: "div",
                                  attributes: [
                                    {
                                      type: "Attribute",
                                      data: ' class="mt-3 sm:mt-0 sm:ml-3"',
                                      start: 6569,
                                      end: 6598,
                                      name: {
                                        type: "AttributeName",
                                        data: "class",
                                        start: 6570,
                                        end: 6575,
                                      },
                                      value: {
                                        type: "AttributeValue",
                                        data: '"mt-3 sm:mt-0 sm:ml-3"',
                                        start: 6577,
                                        end: 6599,
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      type: "Text",
                                      data: "\n              ",
                                      start: 6599,
                                      end: 6614,
                                    },
                                    {
                                      type: "Tag",
                                      data: "a",
                                      attributes: [
                                        {
                                          type: "Attribute",
                                          data: ' href="#"',
                                          start: 6616,
                                          end: 6625,
                                          name: {
                                            type: "AttributeName",
                                            data: "href",
                                            start: 6617,
                                            end: 6621,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data: '"#"',
                                            start: 6623,
                                            end: 6626,
                                          },
                                        },
                                        {
                                          type: "Attribute",
                                          data:
                                            ' class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"',
                                          start: 6625,
                                          end: 6958,
                                          name: {
                                            type: "AttributeName",
                                            data: "class",
                                            start: 6626,
                                            end: 6631,
                                          },
                                          value: {
                                            type: "AttributeValue",
                                            data:
                                              '"w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"',
                                            start: 6633,
                                            end: 6959,
                                          },
                                        },
                                      ],
                                      children: [
                                        {
                                          type: "Text",
                                          data:
                                            "\n                Live demo\n              ",
                                          start: 6959,
                                          end: 7000,
                                        },
                                      ],
                                      start: 6614,
                                      end: 7004,
                                    },
                                    {
                                      type: "Text",
                                      data: "\n            ",
                                      start: 7004,
                                      end: 7017,
                                    },
                                  ],
                                  start: 6565,
                                  end: 7023,
                                },
                                {
                                  type: "Text",
                                  data: "\n          ",
                                  start: 7023,
                                  end: 7034,
                                },
                              ],
                              start: 6039,
                              end: 7040,
                            },
                            {
                              type: "Text",
                              data: "\n        ",
                              start: 7040,
                              end: 7049,
                            },
                          ],
                          start: 5422,
                          end: 7055,
                        },
                        {
                          type: "Text",
                          data: "\n      ",
                          start: 7055,
                          end: 7062,
                        },
                      ],
                      start: 5312,
                      end: 7069,
                    },
                    { type: "Text", data: "\n    ", start: 7069, end: 7074 },
                  ],
                  start: 233,
                  end: 7080,
                },
                { type: "Text", data: "\n  ", start: 7080, end: 7083 },
              ],
              start: 191,
              end: 7089,
            },
            { type: "Text", data: "\n  ", start: 7089, end: 7092 },
            {
              type: "Tag",
              data: "div",
              attributes: [
                {
                  type: "Attribute",
                  data: ' class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"',
                  start: 7096,
                  end: 7149,
                  name: {
                    type: "AttributeName",
                    data: "class",
                    start: 7097,
                    end: 7102,
                  },
                  value: {
                    type: "AttributeValue",
                    data: '"lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"',
                    start: 7104,
                    end: 7150,
                  },
                },
              ],
              children: [
                { type: "Text", data: "\n    ", start: 7150, end: 7155 },
                {
                  type: "Tag",
                  data: "img",
                  attributes: [
                    {
                      type: "Attribute",
                      data:
                        ' class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"',
                      start: 7159,
                      end: 7228,
                      name: {
                        type: "AttributeName",
                        data: "class",
                        start: 7160,
                        end: 7165,
                      },
                      value: {
                        type: "AttributeValue",
                        data:
                          '"h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"',
                        start: 7167,
                        end: 7229,
                      },
                    },
                    {
                      type: "Attribute",
                      data:
                        ' src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"',
                      start: 7228,
                      end: 7366,
                      name: {
                        type: "AttributeName",
                        data: "src",
                        start: 7229,
                        end: 7232,
                      },
                      value: {
                        type: "AttributeValue",
                        data:
                          '"https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"',
                        start: 7234,
                        end: 7367,
                      },
                    },
                    {
                      type: "Attribute",
                      data: ' alt=""',
                      start: 7366,
                      end: 7373,
                      name: {
                        type: "AttributeName",
                        data: "alt",
                        start: 7367,
                        end: 7370,
                      },
                      value: {
                        type: "AttributeValue",
                        data: '""',
                        start: 7372,
                        end: 7374,
                      },
                    },
                  ],
                  children: [],
                  start: 7155,
                  end: 7374,
                },
                { type: "Text", data: "\n  ", start: 7374, end: 7377 },
              ],
              start: 7092,
              end: 7383,
            },
            { type: "Text", data: "\n", start: 7383, end: 7384 },
          ],
          start: 116,
          end: 7390,
        },
      ],
    },
    meta: { cacheHit: false, cacheKey: "8d886d9e-e1f7-59fd-8123-62cfd57bc14e" },
  };

  assertEquals(output, expected);
});
