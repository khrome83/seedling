import { VERSION } from "../cli/const.ts";
import helpText from "../cli/helpText.ts";
import { Flag, Args } from "../../cli.ts";

helpText.set(
  "help",
  `seed help ${VERSION}
Returns help instructions for the diven sub command

Docs: https://seedling.dev/docs/#help
Blog: https://seedling.dev/blog
Bugs: https://github.com/use-seedling/seedling/issues

USAGE:
    seed help [SUBCOMMAND]

SUBCOMMANDS:
    build         Exports all static content
    dev           Starts development server
    help          Prints help information
    init          Initializes a new seedling projects
    upgrade       Upgrade seed, the seedling CLI
`,
);

export default (commands: Args, flags: Flag) => {
  const [command, ...rest] = commands;
  const cmd = command.toLowerCase();
  switch (cmd) {
    case "build":
    case "dev":
    case "help":
    case "init":
    case "upgrade":
      console.log(helpText.get(cmd));
      break;
    default:
      console.log(`Unknown command ${cmd} for seed help.\n\n`);
      console.log(helpText.get("help"));
  }
};
