import { VERSION } from "../cli/const.ts";
import helpText from "../cli/helpText.ts";
import { Flag, Args } from "../../cli.ts";

helpText.set(
  "dev",
  `seed dev ${VERSION}
Starts a development server that runs seedlings

Docs: https://seedling.dev/docs/#dev
Blog: https://seedling.dev/blog
Bugs: https://github.com/use-seedling/seedling/issues

USAGE:
    seed dev [OPTIONS]

OPTIONS:
    -h, --help     
          Prints help information

    -p, --port <port>
          Specifies the port to run server in. [Default 3000]
`,
);

export default (commands: Args, flags: Flag) => {
  const [command, ...rest] = commands;
  const cmd = command;
  let port = 3000;
  for (const flag in flags) {
    switch (flag.toLowerCase()) {
      case "h":
      case "help":
        console.log(helpText.get("dev"));
        break;
      case "p":
      case "port":
        if (parseInt(flags[flag], 10) > 0) {
          port = parseInt(flags[flag], 10);
        } else {
          console.log(`Invalid port ${flags[flag]}`);
        }
        break;
    }
  }

  console.log("not implimented yet");
};
