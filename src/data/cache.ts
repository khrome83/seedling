import { Cache } from "https://deno.land/x/dash/mod.ts";

const cache = new Cache({
  limit: 50000,
  serialize: true,
});

export default cache;
