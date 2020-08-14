import { assertEquals } from "../../deps.ts";
import config from "./index.ts";

Deno.test("Validate Loading Config", async () => {
  const expected = {
    root: `${Deno.cwd()}/src/resolvers`,
    legacy: false,
    output: "/dist",
  };
  assertEquals(config, expected);
});
