import { bold, cyan } from "../deps.ts";
import { LayoutResponse, CacheKey } from "../types.ts";
import { cache, getCacheKey } from "../cache/index.ts";
import { Parser } from "../parser/index.ts";
import config from "../config/index.ts";

export const resolveLayout = async (name: string): Promise<LayoutResponse> => {
  // Generate Cache Key (v5 UUID)
  const cacheKey = getCacheKey("layout", name);

  // Determine correct path to process under
  const htmlPath = `${config.root}/layouts/${name}.html`;
  const seedPath = `${config.root}/layouts/${name}.seed`;
  const localPath = await Deno.lstat(htmlPath)
    .then(() => {
      return htmlPath;
    })
    .catch(async () => {
      return await Deno.lstat(seedPath)
        .then(() => {
          return seedPath;
        })
        .catch((e) => {
          return "";
        });
    });

  // Local Check failed, check for Remote Layouts
  const tsPath = `${config.root}/layouts/${name}.ts`;
  const jsPath = `${config.root}/layouts/${name}.js`;
  let importPath;

  if (!localPath) {
    importPath = await Deno.lstat(tsPath)
      .then(() => {
        return tsPath;
      })
      .catch(async () => {
        return await Deno.lstat(jsPath)
          .then(() => {
            return jsPath;
          })
          .catch((e) => {
            throw new Error(
              `Invalid use argument for layout directive ${
                bold(
                  cyan(name),
                )
              }, file not found`,
            );
          });
      });
  }

  // Either return from Cache or Request New Data
  if (!cache.has(cacheKey as CacheKey)) {
    try {
      let layout;

      if (localPath) {
        // Local Layout
        layout = await Deno.readTextFile(localPath);
      } else if (importPath) {
        // Remote Layout
        const path = await import(importPath).then((c) => {
          if (!c.default) {
            throw new Error(
              `Remote layout path not exported as default for ${
                bold(
                  cyan(name),
                )
              }`,
            );
          }

          return c.default;
        });
        const response = await fetch(path);
        layout = await response.text();
      }

      if (!layout) {
        throw new Error(
          `Could not resolve layout directive ${
            bold(
              cyan(name),
            )
          }, request for file failed`,
        );
      }

      // Parse AST for Layout
      const p = new Parser(layout, "Layout");
      const result = p.parse();

      // Cache and Return
      cache.set(cacheKey as CacheKey, result);
      return Promise.resolve({
        ast: result,
        meta: { cacheHit: false, cacheKey },
      }) as Promise<LayoutResponse>;
    } catch (e) {
      return Promise.reject(e);
    }
  } else {
    return Promise.resolve({
      ast: cache.get(cacheKey as CacheKey),
      meta: { cacheHit: true, cacheKey },
    }) as Promise<LayoutResponse>;
  }
};
