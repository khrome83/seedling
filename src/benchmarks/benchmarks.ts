import {
  runBenchmarks,
  red,
} from "../../deps.ts";
import type {
  BenchmarkRunError,
} from "../types.ts";
import "./parser.ts";

if (Deno.env.get("CI")) {
  // CI Specific Version
  runBenchmarks({ silent: true })
    .catch((e: BenchmarkRunError) => {
      console.error(e.stack);
    });
} else {
  // Pretty Console Output
  runBenchmarks({ silent: true })
    .catch((e: BenchmarkRunError) => {
      console.log(red(e.benchmarkName as string));
      console.error(red(e.stack as string));
    });
}
