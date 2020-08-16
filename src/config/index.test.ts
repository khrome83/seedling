import { assertEquals } from "../../deps.ts";
import config from "./index.ts";

Deno.test("Validate Loading Config", async () => {
  const expected = {
    root: `${Deno.cwd()}/src/resolvers`,
    legacy: false,
    output: "/dist",
    log: "normal",
    interval: 350,
    port: 3000,
    ws: 8080,
  };
  assertEquals(config, expected);
});
