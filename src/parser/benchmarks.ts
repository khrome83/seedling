import {
  runBenchmarks,
  bench,
  BenchmarkTimer,
  BenchmarkRunError,
  red,
  prettyBenchmarkResult,
  prettyBenchmarkProgress,
} from "../deps.ts";
import { Parser, UpdateExpression } from "./index.ts";

// Basic Benchmark to Validate Parser Speed
const html = `
<body>
<header class="bg-gray-900 text-white">
  <nav>
    <a href="/">
      <strong>
        Home
      </strong>
    </a>
  </nav>
</header>
<div role="main" class="full-width bg-gray-100">
  <h1 class="text-black font-bold">{ !foo === ++bar || bar++ < 'foo' && i !== 'foo' && !!y || x }</h1>
</div>
<footer>
  <p class="text-xs">Copyright 2020 - All Rights Reserved</p>
</footer>
</body>
`;

bench({
  name: "ComplexParse",
  runs: 10000,
  func(b: BenchmarkTimer): void {
    b.start();
    const p = new Parser(html);
    const output = p.parse();
    b.stop();
  },
});

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
