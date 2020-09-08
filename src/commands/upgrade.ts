import { VERSION } from "../cli/const.ts";
import helpText from "../cli/helpText.ts";
import { Flag, Args } from "../../cli.ts";

helpText.set(
  "upgrade",
  `seed upgrade ${VERSION}
Upgrades the seed CLI to the latest version.

Docs: https://seedling.dev/docs/#upgrade
Blog: https://seedling.dev/blog
Bugs: https://github.com/use-seedling/seedling/issues

USAGE:
    seed upgrade [OPTIONS]

OPTIONS:
    -h, --help     
          Prints help information

    -v, --version <version>
          The version to upgrade too
`,
);

export default (commands: Args, flags: Flag) => {
  const [command, ...rest] = commands;
  const cmd = command;
  let version = false;
  let requestedVersion = "master";
  for (const flag in flags) {
    switch (flag.toLowerCase()) {
      case "h":
      case "help":
        return console.log(helpText.get("upgrade"));
      case "v":
      case "version":
        if (!!flags[flag] === true) {
          console.log("You need to specify a version to upgrade too");
        }
        version = true;
        requestedVersion = flags[flag];
        break;
    }
  }

  console.log("not implimented yet");
};
