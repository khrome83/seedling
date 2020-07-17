import { v5 } from "https://deno.land/std/uuid/mod.ts";
import { Identifier } from "https://deno.land/x/dash/util.ts";
import cache from "./cache.ts";

const namespace = "f6360cb2-cdac-4d8d-a269-a5f65b054128";

export interface Skip {
  type: "SKIP";
}

const skip = (): Skip => ({
  type: "SKIP",
});

export interface End {
  type: "END";
}

const end = (): End => ({
  type: "END",
});

export interface Retry {
  type: "RETRY";
  msg: string;
}

const retry = (msg: string): Retry => ({
  type: "RETRY",
  msg,
});

export interface Error {
  type: "ERROR";
  msg: string;
  stack?: TypeError;
}

const error = (msg: string, stack?: TypeError): Error => ({
  type: "ERROR",
  msg,
  stack,
});

export interface Success {
  type: "SUCCESS";
  response: object;
}

const success = (response: object): Success => ({
  type: "SUCCESS",
  response,
});

export interface Response {
  skip: Function;
  end: Function;
  retry: Function;
  error: Function;
  success: Function;
}

const response: Response = {
  skip,
  end,
  retry,
  error,
  success,
};

export interface Request {
  attrs?: object;
  body?: string;
}

const buildRequest = (attrs: object, body: string): Request => ({
  attrs,
  body,
});

export const data = async (
  processor: string,
  attrs: object,
  body: string = "",
  root: string = Deno.cwd()
): Promise<object> => {
  // Generate Cache Key (v5 UUID)
  const cacheKeyOptions = {
    value: JSON.stringify({ processor, attrs, body }),
    namespace,
  };
  const cacheKey = v5.generate(cacheKeyOptions) as Identifier;

  // Determine correct path to process under
  const tsPath = `${root}/data/${processor}.ts`;
  const jsPath = `${root}/data/${processor}.js`;
  const importPath = await Deno.lstat(tsPath)
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
            "Invalid use argument for data directive, file not found"
          );
        });
    });

  // Either return from Cache or Request New Data
  if (!cache.has(cacheKey)) {
    try {
      const dataProcessor = await import(importPath);
      const result = await dataProcessor.default(
        buildRequest(attrs, body),
        response
      );

      // Retries
      // Need to create Error Handler
      // Need to create data structure for
      // - SKIP
      // - ERROR
      // - END
      // - DATA
      // - RETRY
      // Or do we not....

      cache.set(cacheKey, result);
      return {
        ...result,
        meta: { cacheHit: false, cacheKey },
      };
    } catch (e) {
      throw e;
    }
  } else {
    return {
      type: "DATA",
      response: cache.get(cacheKey),
      meta: { cacheHit: true, cacheKey },
    };
  }
};
