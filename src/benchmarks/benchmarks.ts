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
  runBenchmarks({ silent: true, skip: /_long/ }, prettyBenchmarkProgress())
    .then(
      prettyBenchmarkDown(console.log, {
        title: "Example Markdown",
        description: "description",
        groups: [
          {
            include: /array/,
            name: "Default columns and dynamic text",
            description:
              "This is a group's `description`.\nHere you can see what the default columns are, and how you can use a `function` as `description` or `afterTable` inside a group",
            afterTable: (
              gr: BenchmarkResult[],
              g: GroupDefinition,
              rr: BenchmarkRunResult
            ) =>
              `This is a group's \`afterTable\`.\nHere you can access eg. the group name: \`${g.name}\`, benchmarks in this group: \`${gr.length}\` of them here, or the whole \`BenchmarkRunResult\`: \`${rr.results.length}\` benchmarks total`,
            columns: [...defaultColumns],
          },
        ],
      })
    )
    .catch((e: BenchmarkRunError) => {
      console.log(red(e.benchmarkName as string));
      console.error(red(e.stack as string));
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
