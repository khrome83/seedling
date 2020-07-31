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
    .then(
      prettyBenchmarkDown(console.log, {
        title: "Example Markdown",
        description: (runResult: BenchmarkRunResult) =>
          `This markdown was generated with the use of \`prettyBenchmarkDown\`.\nIf you use a function for the \`description\` or \`afterTables\`, you can process the results here as well: \n\n > In this benchmark ${runResult.results.length} benches were run.`,
        afterTables:
          "\n---\n\nThis is the `afterTables`. This behaves the same as `description`, it just puts this at the bottom of the markdown.\nHere its defined with a simple string.\n\nCheck out the Github Action, which comments a markdown like this on PRs: $link",
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
