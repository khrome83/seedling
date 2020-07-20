import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";
import { cache, getCacheKey, Identifier } from "../cache/index.ts";
import { Parser, RootAST } from "../parser/index.ts";

export interface ComponentResponse {
  ast: RootAST;
  meta: {
    cacheKey: Identifier;
    cacheHit: boolean;
  };
}

export const resolveComponent = async (
  name: string,
  root: string = Deno.cwd()
): Promise<ComponentResponse> => {
  // Generate Cache Key (v5 UUID)
  const cacheKey = getCacheKey(name);

  // Determine correct path to process under
  const htmlPath = `${root}/components/${name}.html`;
  const seedPath = `${root}/components/${name}.seed`;
  const importPath = await Deno.lstat(htmlPath)
    .then(() => {
      return htmlPath;
    })
    .catch(async () => {
      return await Deno.lstat(seedPath)
        .then(() => {
          return seedPath;
        })
        .catch((e) => {
          throw new Error(
            "Invalid use argument for component directive, file not found"
          );
        });
    });

  // Either return from Cache or Request New Data
  if (!cache.has(cacheKey)) {
    try {
      const component = await readFileStr(importPath, { encoding: "utf8" });

      // Parse AST for Component
      const p = new Parser(component);
      const result = p.parse();

      // Cache and Return
      cache.set(cacheKey, result);
      return Promise.resolve({
        ast: result,
        meta: { cacheHit: false, cacheKey },
      });
    } catch (e) {
      return Promise.reject(e);
    }
  } else {
    return Promise.resolve({
      ast: cache.get(cacheKey),
      meta: { cacheHit: true, cacheKey },
    });
  }
};
