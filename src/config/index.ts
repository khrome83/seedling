import { bold, cyan } from "../../deps.ts";

const importConfig = async () => {
  const configFile = `${Deno.cwd()}/seedling.config.json`;
  const defaults = {
    root: Deno.cwd(),
    legacy: false,
    output: "/dist",
    log: "normal",
    interval: 350,
    port: 3000,
    ws: 8080,
    esbuild: true,
  };

  return await Deno.lstat(configFile)
    .then(async () => {
      try {
        const file = await Deno.readTextFile(configFile);
        const fileContents = JSON.parse(file);

        if (fileContents.root) {
          // Update Path, remove extra and ending /
          let newPath = `${Deno.cwd()}/${fileContents.root}`;
          newPath = newPath.replaceAll("//", "/");
          const pos = newPath.length - 1;
          newPath = newPath.charAt(pos) === "/"
            ? newPath.substring(0, pos)
            : newPath;
          fileContents.root = newPath;
        }

        return { ...defaults, ...fileContents };
      } catch (e) {
        console.warn(
          `Unable to parse ${
            bold(
              cyan("seedling.config.json"),
            )
          }, using defaults`,
        );
        return defaults;
      }
    })
    .catch(() => {
      console.log(
        `Unable to find ${bold(cyan("seedling.config.json"))}, using defaults`,
      );
      return defaults;
    });
};

export default await importConfig();
