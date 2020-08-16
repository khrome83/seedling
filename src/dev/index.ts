import { assert, join, pogo, RequestPogo, ToolkitPogo } from "../../deps.ts";
import { Node, PathDefinition } from "../types.ts";
import {
  expandGlob,
  bold,
  red,
  yellow,
  green,
  bgGreen,
  bgYellow,
  black,
  cyan,
  WebSocket,
  WebSocketServer,
} from "../../deps.ts";
import config from "../config/index.ts";
import { Parser } from "../parser/index.ts";
import compile from "../compiler/index.ts";
import { purgeFile } from "../cache/index.ts";
import mimeTypes from "../dict/mimeTypes.ts";
import { useESBuild } from "../utils/esBuild.ts";

// Managing Routes
const routes = new Map();
const fileToRoutes = new Map();

// Managing JS
const jsFiles = new Map();

const displayRequest = (
  code: number,
  route: string,
  cache: boolean,
  time: number,
) => {
  let status = green;
  let timing = cyan;
  if (code >= 500) status = red;
  if (code === 404) status = yellow;
  if (time > 250) timing = yellow;
  if (time > 750) timing = red;

  console.log(
    `${status(`[${code}]`)}   ${
      cache ? `${bgGreen(black(" HIT "))} ` : bgYellow(black(" MISS "))
    }    ${route.padEnd(60, " ")}     ${
      timing(time.toFixed(2).padStart(8, " "))
    } ms`,
  );
};

const buildRoute = async (path: string) => {
  // Read Route from File if available
  let contents = await Deno.readTextFile(path);
  const start = contents.indexOf("<:router>");
  const end = contents.indexOf("</:router>");
  let routesForFile = [];
  if (start >= 0 && end > 0) {
    // Get Routes Directive Only
    contents = contents.substring(start, end + 10);
    // Parse Routes
    const p = new Parser(contents);
    const output = p.parse();
    const routeList = await compile(
      output.router as Node,
      {},
    ) as PathDefinition[];
    // Populate Route
    for (let i = 0, len = routeList.length; i < len; i++) {
      routes.set(routeList[i].path, { ...routeList[i], file: path });
      routesForFile.push(routeList[i].path);
    }
  } else {
    // Populate Route - Defaults to file with no initial state or data
    const route = normalizeFilePath(path, `${config.root}/pages`) || "";
    routes.set(route, { path: route, state: {}, data: [], file: path });
    routesForFile.push(route);
  }

  fileToRoutes.set(path, routesForFile);
};

const removeRoute = (path: string) => {
  if (fileToRoutes.has(path)) {
    const oldRoutes = fileToRoutes.get(path);
    for (let i = 0, len = oldRoutes.length; i < len; i++) {
      routes.delete(oldRoutes[i]);
    }
  }
};

const buildRoutes = async () => {
  for await (
    const file of expandGlob(`${config.root}/pages/**/*.{html,seed}`)
  ) {
    buildRoute(file.path);
  }
};

const normalizeFilePath = (path: string, root: string) => {
  return normalizeRoute(path.substring(root.length));
};

const normalizeRoute = (path: string) => {
  // Remove trailing slash, except root
  if (path.length > 1) {
    if (path.charAt(path.length - 1) === "/") {
      return path.substring(0, path.length - 1);
    }
  }

  // Remove /index.html from route
  const index = path.indexOf("/index.html");
  if (index >= 0) {
    const p = path.substring(0, index);
    return (!p.length) ? "/" : p;
  }

  // Remove .html extension
  const ext = path.indexOf(".html");
  if (ext >= 0) {
    return path.substring(0, ext);
  }

  return path;
};

// Powers the Websocket connection to client
let socket: WebSocket;
const runWebSocket = async (port: number) => {
  const wss = new WebSocketServer(port);
  wss.on("connection", function (ws: WebSocket) {
    socket = ws;
    // ws.on("message", function (message: string) {
    //   console.log(message);
    //   ws.send(message);
    // });
  });
};

// If any data changes that we have resolvers for
// Clear from Cache
const watchResolvers = async () => {
  const updates = new Set();
  const watcher = Deno.watchFs(
    [
      `${config.root}/data/`,
      `${config.root}/layouts/`,
      `${config.root}/components/`,
    ],
  );

  const processUpdates = async () => {
    updates.forEach((p) => {
      // Remove from Cache
      purgeFile(p as string);

      // Ask Page to Reload
      socket.send("RELOAD");

      // Remove from updates queue
      updates.delete(p);
    });
  };

  let timer = 0;
  const debounce = (fn: Function) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), config.interval);
  };

  for await (const event of watcher) {
    for (let i = 0, len = event.paths.length; i < len; i++) {
      // Create, Modify, Remove - Add Updates
      if (
        event.kind === "create" ||
        event.kind === "modify" ||
        event.kind === "remove"
      ) {
        updates.add(event.paths[i]);
      }
    }

    debounce(processUpdates);
  }
};

// IF any data changes that can contain routes
// Rebuild Routes
const watchRoutes = async () => {
  const updates = new Set();
  const watcher = Deno.watchFs(
    [
      `${config.root}/pages/`,
    ],
  );

  const processUpdates = async () => {
    await updates.forEach(async (p) => {
      // Remove Old Routes Associated with Update Page File
      removeRoute(p as string);

      // Add Route Updates
      await buildRoute(p as string);

      // Ask Page to Reload
      socket.send("RELOAD");

      // Remove from updates queue
      updates.delete(p);
    });
  };

  let timer = 0;
  const debounce = (fn: Function) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), config.interval);
  };

  event:
  for await (const event of watcher) {
    for (let i = 0, len = event.paths.length; i < len; i++) {
      // Check is File
      try {
        const info = await Deno.lstat(event.paths[i]);
        if (!info.isFile) {
          continue;
        }

        // File Removed, Rebuild All Routes
        if (event.kind === "remove") {
          debounce(buildRoutes);
          continue event;
        }

        // Create or Modify - Add Updates
        if (event.kind === "create" || event.kind === "modify") {
          updates.add(event.paths[i]);
        }
      } catch (e) {
        // Do Nothing
      }
    }

    debounce(processUpdates);
  }
};

const delta = (time: number) => {
  return performance.now() - time;
};

// Registers the client lib as /client.js
// This libary is bundled on first request
const registerClientLib = async (port: number) => {
  // Prepare Source
  const prepareSource = async () => {
    // Needed File Paths
    const path = join(config.root, "../client/index.ts");

    // Prepare Source
    let src = await Deno.readTextFile(path);
    return src.replace(
      "declare const __PORT__: number;",
      `const __PORT__: number = ${port};`,
    );
  };

  // ES Build
  const esBuild = async () => {
    // Get Source for Dev Client Library
    const src = await prepareSource();

    // Run ES Build
    const proc = Deno.run({
      cmd: [
        "./package/bin/esbuild",
        "--target=es2020",
        "--loader=ts",
      ],
      stdin: "piped",
      stdout: "piped",
      stderr: "inherit",
    });

    await Deno.writeAll(proc.stdin, new TextEncoder().encode(src));
    proc.stdin.close();
    await proc.status();
    const data = await proc.output();
    proc.close();

    return data;
  };

  // Deno Build
  const denoBuild = async () => {
    // Get Source for Dev Client Library
    const src = await prepareSource();

    const [diagnostics, emit] = await Deno.bundle(
      "/client.ts",
      { "/client.ts": src },
    );

    assert(diagnostics == null);
    return emit;
  };

  // Checks if we can use ES Build
  // Installs if possible
  const status = await useESBuild();

  jsFiles.set("/client.js", status ? esBuild : denoBuild);
};

// Get Mimetype for File
const getFileMimeType = (file: string): string => {
  // Get Extension
  const ext = file.substring(file.lastIndexOf(".") + 1, file.length) || file;

  // Lookup Mime Type
  if (mimeTypes.has(ext)) {
    return mimeTypes.get(ext) as string;
  }

  return "text/plain";
};

export default async (port: number, ws: number) => {
  const serverStart = performance.now();
  await buildRoutes();
  await registerClientLib(ws);
  runWebSocket(ws);
  watchResolvers();
  watchRoutes();

  const handler = async (request: RequestPogo, h: ToolkitPogo) => {
    const start = performance.now();
    const path = normalizeRoute(request.path);

    if (routes.has(path)) {
      try {
        const routeData = routes.get(path);
        let contents = await Deno.readTextFile(routeData.file);
        const p = new Parser(contents);
        const rootAst = p.parse();

        // Prepend Data to AST, pass state careover from Route Procesisng if Any
        let output = await compile(
          [...routeData.data, ...rootAst.html] as Array<Node>,
          routeData.state,
        );

        // Need to pass contents into layout if exists
        if (rootAst.layout.length) {
          // Loop through backwards so they "stack" correctly
          for (let i = rootAst.layout.length - 1; i >= 0; i--) {
            // Create Text Node
            const textNode = { type: "Text", data: output, start: 0, end: 0 };
            // Setup as Slot

            const innerContents = {
              __internals__: {
                slots: {
                  default: [textNode],
                },
              },
            };

            const scoped = { ...routeData.state, ...innerContents };

            // Process Last Layout
            output = await compile(
              [...routeData.data, rootAst.layout[i]] as Array<Node>,
              scoped,
            );
          }
        }

        displayRequest(200, path, true, delta(start));
        return h.response(output).code(200);
      } catch (e) {
        displayRequest(500, path, false, delta(start));
        return h.response(e).code(500);
      }
    } else if (jsFiles.has(path)) {
      let output = jsFiles.get(path);

      // First time, need to process
      if (typeof output === "function") {
        try {
          output = await output();
          jsFiles.set(path, output);
        } catch (e) {
          displayRequest(500, path, false, delta(start));
          return h.response(e).code(500);
        }
      }

      displayRequest(200, path, true, delta(start));
      return h.response(output).code(200).type("text/javascript");
    } else {
      // Try Static Assets
      try {
        const file = join(config.root, "/static", path);
        const type = getFileMimeType(file);

        // Open stream to Static File
        const stream = await Deno.open(file);

        // Return File
        displayRequest(200, path, true, delta(start));
        return h.response(stream).code(200).type(type);
      } catch (e) {
        // Not Found, do 404
        displayRequest(404, path, false, delta(start));
        return h.response("the void").code(404);
      }
    }
  };

  const server = pogo.server({ catchAll: handler, port });

  console.log(`Server started in ${delta(serverStart).toFixed(2)} ms`);
  console.log(`Websocket listening on port ${cyan(ws.toString())}`);
  console.log(`Webserver listening on port ${cyan(port.toString())}\n`);
  server.start();
};
