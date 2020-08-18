import { parse } from "./deps.ts";
import { CMDS, VERSION } from "./src/cli/const.ts";
import helpText from "./src/cli/helpText.ts";
// Commands
import build from "./src/commands/build.ts";
import dev from "./src/commands/dev.ts";
import help from "./src/commands/help.ts";
import init from "./src/commands/init.ts";
import upgrade from "./src/commands/upgrade.ts";

export interface Flag {
  [key: string]: string;
}

export type Args = string[];

const args = parse(Deno.args);
const [subcommand, ...rest] = Deno.args;

helpText.set(
  "default",
  `seed ${VERSION}
A simple static site generator for deno.

Docs: https://seedling.dev/docs
Blog: https://seedling.dev/blog
Bugs: https://github.com/use-seedling/seedling/issues

USAGE:
    seed [OPTIONS] [SUBCOMMAND]

OPTIONS:
    -h, --help     
          Prints help information

    -V, --version
          Prints version information

SUBCOMMANDS:
    build         Exports all static content
    dev           Starts development server
    help          Prints help information
    init          Initializes a new seedling projects
    upgrade       Upgrade seed, the seedling CLI
`,
);

if (import.meta.main) {
  (async function () {
    let flags: Flag = {};

    const [junk, primary, secondary, tertiary] = Object.keys(args);

    switch (subcommand.toLowerCase()) {
      case "build":
        await build(rest, args);
        break;

      case "dev":
        await dev(rest, args);
        break;

      case "help":
        if (CMDS.has(rest[0]?.toLowerCase())) {
          help(rest, args);
        } else {
          console.log(helpText.get("help"));
        }
        break;

      case "init":
        init(rest, args);
        break;

      case "upgrade":
        upgrade(rest, args);
        break;

      default:
        switch (primary) {
          case "V":
          case "version":
            console.log(`seed ${VERSION}`);
            break;
          case "h":
          case "help":
            console.log(helpText.get("default"));
            break;
          default:
            console.log(`Unknown flag ${primary}`);
            console.log(helpText.get("default"));
        }
    }
  })();
}
