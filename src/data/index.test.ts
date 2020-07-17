import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { data } from "./index.ts";

Deno.test("Data GraphCMS", async () => {
  const attrs = {
    id: "cka5lzgxk02s701761t7scrb0",
  };

  const body = `query MyQuery($id: ID) {
    marketingSocialProof(where: {id: $id}) {
      __typename
      id
    }
  }`;

  const root = `${Deno.cwd()}/src/data`;
  const output = await data("graphcms", attrs, body, root);
  const expected = {
    type: "DATA",
    data: {
      data: {
        marketingSocialProof: {
          __typename: "MarketingSocialProof",
          id: "cka5lzgxk02s701761t7scrb0",
        },
      },
    },
    meta: { cacheHit: false, cacheKey: "52f87475-22be-520d-bf94-df92785be507" },
  };

  assertEquals(output, expected);
});
