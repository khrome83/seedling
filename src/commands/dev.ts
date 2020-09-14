import { VERSION } from "../cli/const.ts";
import helpText from "../cli/helpText.ts";
import type { Flag, Args } from "../../cli.ts";
import server from "../dev/index.ts";
import config from "../config/index.ts";

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
        
    -w, --websocket <port>
         Specifies the port to run the websocket server on. Specific for any hot reloading. [Default 8080]
`,
);

export default async (commands: Args, flags: Flag) => {
  const [command, ...rest] = commands;
  const cmd = command;
  let port = config.port;
  let ws = config.ws;
  for (const flag in flags) {
    switch (flag.toLowerCase()) {
      case "h":
      case "help":
        return console.log(helpText.get("dev"));
      case "p":
      case "port":
        if (parseInt(flags[flag], 10) > 0) {
          port = parseInt(flags[flag], 10);
        } else {
          console.log(`Invalid server port ${flags[flag]}`);
        }
        break;
      case "w":
      case "websocket":
        if (parseInt(flags[flag], 10) > 0) {
          ws = parseInt(flags[flag], 10);
        } else {
          console.log(`Invalid websocket port ${flags[flag]}`);
        }
        break;
    }
  }

  await server(port, ws);
};
