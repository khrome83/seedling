/**
 * Standard Libraries - Tagged to 0.65.0 for Deno 1.3.0
 */

// Assert
export {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.70.0/testing/asserts.ts";

// Benchmarks
export {
  runBenchmarks,
  bench,
} from "https://deno.land/std@0.70.0/testing/bench.ts";

// Colors
export {
  bold,
  cyan,
  green,
  yellow,
  red,
  bgGreen,
  bgYellow,
  bgRed,
  black,
  gray,
} from "https://deno.land/std@0.70.0/fmt/colors.ts";

// Async Support
export { delay } from "https://deno.land/std@0.70.0/async/mod.ts";

// UUID
export { v5 } from "https://deno.land/std@0.70.0/uuid/mod.ts";

// Parse for CLI Flags
export { parse } from "https://deno.land/std@0.70.0/flags/mod.ts";

// Ensure Directory
export {
  ensureDir,
  expandGlob,
} from "https://deno.land/std@0.70.0/fs/mod.ts";

export { join } from "https://deno.land/std@0.70.0/path/mod.ts";

export { createHash } from "https://deno.land/std@0.70.0/hash/mod.ts";

// Serving
export { serve } from "https://deno.land/std@0.70.0/http/server.ts";

// Websocket
export {
  acceptWebSocket,
} from "https://deno.land/std@0.70.0/ws/mod.ts";

/**
 * Third Party Libaries
 */

// Network Mock for Testing
// export { denock } from "https://deno.land/x/denock@0.2.0/mod.ts";
// Fixed type issue until https://github.com/SachaCR/denock/issues/7 is merged
export { denock } from "https://raw.githubusercontent.com/use-seedling/denock/master/mod.ts";

// LRU Cache
export { Cache } from "https://deno.land/x/dash@2.2.3/mod.ts";
