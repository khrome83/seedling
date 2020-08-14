import { join, ensureDir } from "../../deps.ts";
import { VERSION } from "../cli/const.ts";
import helpText from "../cli/helpText.ts";
import { Flag, Args } from "../../cli.ts";
import config from "../config/index.ts";

helpText.set(
  "build",
  `seed build ${VERSION}
Export and build a site using seedling

Docs: https://seedling.dev/docs/#build
Blog: https://seedling.dev/blog
Bugs: https://github.com/use-seedling/seedling/issues

USAGE:
    seed build [OPTIONS]

OPTIONS:
    -h, --help     
          Prints help information

    -o, --output <location>
          Specify location to export contents too, uses a relative file path

    -r, --reload
          Clears any cache before rebuilding
`,
);

export default async (commands: Args, flags: Flag): Promise<void> => {
  const [command, ...rest] = commands;
  const cmd = command;
  let reload = false;
  let path = join(config.root, config.output);
  for (const flag in flags) {
    switch (flag.toLowerCase()) {
      case "h":
      case "help":
        console.log(helpText.get("build"));
        break;
      case "r":
      case "reload":
        reload = true;
      case "o":
      case "output":
        path = join(config.root, flags[flag]);
        try {
          await ensureDir(path);
        } catch (e) {
          console.log("Something went wrong ", e);
        }
        break;
    }
  }

  console.log("not implimented yet");
};
