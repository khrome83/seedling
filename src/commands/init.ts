import { VERSION } from "../cli/const.ts";
import helpText from "../cli/helpText.ts";
import { Flag, Args } from "../../cli.ts";
import init from "../init/index.ts";

helpText.set(
  "init",
  `seed init ${VERSION}
Initalizes default folders and files for a new seedling project.

Docs: https://seedling.dev/docs/#init
Blog: https://seedling.dev/blog
Bugs: https://github.com/use-seedling/seedling/issues

USAGE:
    seed init [OPTIONS]

OPTIONS:
    -h, --help     
          Prints help information

    -f, --force
          Overrides all files and folders creating a new project structure
`,
);

export default (commands: Args, flags: Flag) => {
  const [command, ...rest] = commands;
  const cmd = command;
  let force = false;
  for (const flag in flags) {
    switch (flag.toLowerCase()) {
      case "h":
      case "help":
        return console.log(helpText.get("init"));
      case "f":
      case "force":
        force = true;
        break;
    }
  }

  init(force);
};
