import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { data } from "./index.ts";

Deno.test("GraphCMS", async () => {
  const attrs = {
    id: "cka5lzgxk02s701761t7scrb0",
  };

  const body = `query MyQuery($id: ID) {
    marketingSocialProof(where: {id: $id}) {
      id
      count
      countTemplate
      headingLevel
      headingText
      quotes {
        title
        source
        quote
        link {
          url
          text
          target
        }
      }
    }
  }`;

  const root = `${Deno.cwd()}/src/data`;
  const output = await data("graphcms", attrs, body, root);
  // console.log(output);
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
