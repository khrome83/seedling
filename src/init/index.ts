import { join, ensureDir, green, red, yellow, cyan } from "../../deps.ts";

export default async (force: boolean) => {
  // components/
  // components/README.md
  // data/
  // data/README.md
  // layouts/
  // layouts/README.md
  // pages/
  // pages/README.md
  // static/
  // static/README.md
  // template.html
  // seedling.config.json
  // .gitignore
  // README.md

  // Folders in Root
  const folders = ["components", "data", "layouts", "pages", "static"];
  // Files in Root
  const resources = new Set([
    "template.html",
    "seedling.config.json",
    ".gitignore",
    "README.md",
    "components/README.md",
    "static/README.md",
    "data/README.md",
    "layouts/README.md",
    "pages/README.md",
  ]);

  // Build Folder Paths
  const folderPaths = folders.map((dir: string): string =>
    join(Deno.cwd(), dir)
  );

  // Build File Paths
  const filePaths = [];
  const resourcesIterator = resources[Symbol.iterator]();
  for (const key of resourcesIterator) {
    filePaths.push({
      ref: key,
      path: join(Deno.cwd(), key),
      source: new URL(join(import.meta.url, "..", "contents/", key)),
    });
  }

  try {
    // Ensure Folders
    folderPaths.forEach(async (path) => {
      console.log(path);
      await ensureDir(path);
    });

    // Check if Exists, if not Ensure Creation
    // If Force, Override
    for await (const file of filePaths) {
      console.log(file.path);
      await Deno.lstat(file.path)
        .then(() => {
          if (force) throw "override";
        })
        .catch(async () => {
          let content = "";

          try {
            // Load Base Contents
            if (file.source.protocol === "file:") {
              content = await Deno.readTextFile(file.source);
            } else {
              content = await (await fetch(file.source)).text();
            }
          } catch (e) {
            console.log(
              `${
                yellow("WARN")
              } - Unable to create ${file.ref}. Skipping to next file.`,
            );
          }

          // Write File with Contents
          await Deno.writeTextFile(
            file.path,
            content,
          );
        });
    }

    console.log(green("DONE!"));
    console.log(`Try running ${cyan("seed dev")} next.`);
  } catch (e) {
    console.log(`${red("ERROR")} - Something went wrong - \n`, e);
  }
};
