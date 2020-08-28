/**
 * Standard Libraries - Tagged to 0.65.0 for Deno 1.3.0
 */

// Assert
export {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";

// Benchmarks
export {
  runBenchmarks,
  bench,
} from "https://deno.land/std@0.65.0/testing/bench.ts";

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
} from "https://deno.land/std@0.65.0/fmt/colors.ts";

// Async Support
export { delay } from "https://deno.land/std@0.65.0/async/mod.ts";

// UUID
export { v5 } from "https://deno.land/std@0.65.0/uuid/mod.ts";

// Parse for CLI Flags
export { parse } from "https://deno.land/std@0.62.0/flags/mod.ts";

// Ensure Directory
export {
  ensureDir,
  expandGlob,
} from "https://deno.land/std@0.65.0/fs/mod.ts";

export { join } from "https://deno.land/std@0.65.0/path/mod.ts";

export { createHash } from "https://deno.land/std@0.65.0/hash/mod.ts";

/**
 * Third Party Libaries
 */

// Network Mock for Testing
export { denock } from "https://deno.land/x/denock@0.2.0/mod.ts";

// Pretty Formatting for Benchmarks
export {
  prettyBenchmarkDown,
  prettyBenchmarkResult,
  prettyBenchmarkProgress,
} from "https://deno.land/x/pretty_benching@v0.2.0/mod.ts";

// LRU Cache
// export { Cache } from "https://deno.land/x/dash@2.2.1/mod.ts";

// TODO: Remove this fork once PR is merged
// https://github.com/xpyxel/dash/pull/27
export { Cache } from "https://raw.githubusercontent.com/use-seedling/dash/2.3.0/mod.ts";

// Pogo - Used for Dev Server
import pogo, {
  Request as RequestPogo,
  Toolkit as ToolkitPogo,
} from "https://deno.land/x/pogo@v0.5.0/main.ts";
export { pogo, RequestPogo, ToolkitPogo };

// Websocket Connection - Used for Dev Server
export {
  WebSocket,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.0.3/mod.ts";
