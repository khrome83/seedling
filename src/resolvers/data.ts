import { delay } from "../deps.ts";
import {
  Skip,
  End,
  Success,
  Retry,
  DataResponse,
  Error,
  Request,
  Response,
  CacheKey,
} from "../types.ts";
import { cache, getCacheKey } from "../cache/index.ts";
import config from "../config/index.ts";

const skip = (response: object): Skip => ({
  type: "SKIP",
  response,
});

const end = (response: object): End => ({
  type: "END",
  response,
});

const success = (response: object): Success => ({
  type: "SUCCESS",
  response,
});

const retry = (msg: string, delay = 1000): Retry => ({
  type: "RETRY",
  msg,
  delay,
});

const error = (msg: string, stack?: TypeError): Error => ({
  type: "ERROR",
  msg,
  stack,
});

const response: Response = {
  skip,
  end,
  retry,
  error,
  success,
};

const buildRequest = (attrs: object = {}, body = ""): Request => ({
  attrs,
  body,
});

export const resolveData = async (
  processor: string,
  attrs: object,
  body = ""
): Promise<DataResponse> => {
  // Generate Cache Key (v5 UUID)
  const cacheKey = getCacheKey("data", processor, attrs, body);

  // Determine correct path to process under
  const tsPath = `${config.root}/data/${processor}.ts`;
  const jsPath = `${config.root}/data/${processor}.js`;
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
  if (!cache.has(cacheKey as CacheKey)) {
    try {
      let retries = 0;
      const dataProcessor = await import(importPath);
      let result;

      while (retries < 4) {
        result = await dataProcessor.default(
          buildRequest(attrs, body),
          response
        );

        // Handle Retry and Errors
        if (result.type === "RETRY") {
          console.log(result.msg);
          retries++;
          await delay(result.delay);
          continue;
        } else if (result.type === "ERROR") {
          return Promise.reject(result);
        }

        // Ensure request is not malformed
        if (result.response !== undefined) {
          break;
        } else {
          return Promise.reject(
            error("Something went wrong with the response, invalid structure")
          );
        }
      }

      // Exceeded Retries
      if (result.type === "RETRY") {
        return Promise.reject("Reached max number of retries");
      }

      // Cache and Return
      cache.set(cacheKey as CacheKey, result.response);
      return Promise.resolve({
        ...result,
        retries,
        meta: { cacheHit: false, cacheKey },
      }) as Promise<DataResponse>;
    } catch (e) {
      return Promise.reject(e);
    }
  } else {
    return Promise.resolve({
      ...success(cache.get(cacheKey as CacheKey)),
      retries: 0,
      meta: { cacheHit: true, cacheKey },
    }) as Promise<DataResponse>;
  }
};
