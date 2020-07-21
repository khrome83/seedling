import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { denock } from "https://deno.land/x/denock/mod.ts";
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

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE1OTI4NTMwMTYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NrOXVoYmcxZjA1cGgwMXhvNWZzNmZxaWgvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTcxNzAzNzYtODQyMC00OTNkLWE1YTAtYWUxM2Y0YjVjZGNlIiwianRpIjoiY2ticXZrNTlsMDAyZDAxeHhobG84Y2gybyJ9.po69oTfVxTSKj2AFWexoBJ1NJ4EnNKjEOiRq3KuLmVYM6kGc2ZBBj5ASolcSHbzGreklnzB39nvS4bfPrgs7iLoVqQMaBS-xwyhB5JOvcXk-cboSEJbPp5P0thcj9LxYxkGvi-VfX-HZoBpagYKUZy9QqrpAoSz7OsKPWFXRg_TZsYeb3PjzBKb9QAkJTFnonoJOdN7lYiRuAAjyVzm7NQSxhaXQy24iHiBBRsWwz2L5K6OxKh4Q5SVSWZI0AsLN_IMMp-IavwW-ls_cgoNCl8RpngbAaZU111p9TQcDsXysxMrCQqfzUO8VGxOu2s-xtDB6BO7cLLmFT_AKqxlUJ_6HSd5tktErfnVWbFaxegY9rJWUTxRVgeDosa_1In0Si37EE-B-yzc4kDoq4GbrnoNFgmmsJti89XW4B4rCRns7WFYMQo0VN29cDfzeJF_O-d5_YhDbDvfySJiaUC3FSqh1ZAFIzBjdku02krQTRCxs811GM5HbwhpSb_gS4ppc6lBHfkUk6YQFtA9udUaFxmpSm2ipnOgui686fMfgtIj_hirnpfmUedc5_TkfPJlyC5Sg8D4fw2yMoDqj7Q6lp-_5WW1efJ9QTgCfNIKyDPFOWGwWI_NGTjy0JNg7qldIGxZMz4-8YCPMEKlwoW97DQWrjmz3Z2dHBg4wWaKojD4";

  denock({
    method: "POST",
    protocol: "https",
    host: "api-us-east-1.graphcms.com",
    headers: [
      { header: "content-type", value: "application/json" },
      { header: "authorization", value: `Bearer ${token}` },
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
