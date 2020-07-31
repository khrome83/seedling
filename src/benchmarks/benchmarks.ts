import {
  runBenchmarks,
  red,
  prettyBenchmarkDown,
  prettyBenchmarkResult,
  prettyBenchmarkProgress,
} from "../deps.ts";
import {
  BenchmarkRunError,
  BenchmarkResult,
  GroupDefinition,
  BenchmarkRunResult,
  defaultColumns,
} from "../types.ts";
import "./parser.ts";
import "./serializer.ts";

if (Deno.env.get("CI")) {
  // CI Specific Version
  runBenchmarks({ silent: true })
    .then(prettyBenchmarkDown(console.log))
    .catch((e: BenchmarkRunError) => {
      console.error(e.stack);
    });
} else {
  // Pretty Console Output
  runBenchmarks({ silent: true }, prettyBenchmarkProgress())
    .then(
      prettyBenchmarkResult({
        nocolor: false,
        parts: {
          extraMetrics: true,
          threshold: true,
          graph: true,
          graphBars: 10,
        },
      })
    )
    .catch((e: BenchmarkRunError) => {
      console.log(red(e.benchmarkName as string));
      console.error(red(e.stack as string));
    });
}
