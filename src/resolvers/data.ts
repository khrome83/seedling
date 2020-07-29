import { delay } from "../deps.ts";
import { cache, getCacheKey, Identifier } from "../cache/index.ts";

export interface Skip {
  type: "SKIP";
  response: object;
}

const skip = (response: object): Skip => ({
  type: "SKIP",
  response,
});

export interface End {
  type: "END";
  response: object;
}

const end = (response: object): End => ({
  type: "END",
  response,
});

export interface Success {
  type: "SUCCESS";
  response: object;
}

const success = (response: object): Success => ({
  type: "SUCCESS",
  response,
});

export interface Retry {
  type: "RETRY";
  msg: string;
  delay: number;
}

const retry = (msg: string, delay = 1000): Retry => ({
  type: "RETRY",
  msg,
  delay,
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

const buildRequest = (attrs: object = {}, body = ""): Request => ({
  attrs,
  body,
});

export interface DataResponse {
  type: "SKIP" | "END" | "SUCCESS";
  response: object;
  retries: number;
  meta: {
    cacheKey: Identifier;
    cacheHit: boolean;
  };
}

export const resolveData = async (
  processor: string,
  attrs: object,
  body = "",
  root: string = Deno.cwd()
): Promise<DataResponse> => {
  // Generate Cache Key (v5 UUID)
  const cacheKey = getCacheKey(processor, attrs, body);

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
      cache.set(cacheKey, result.response);
      return Promise.resolve({
        ...result,
        retries,
        meta: { cacheHit: false, cacheKey },
      });
    } catch (e) {
      return Promise.reject(e);
    }
  } else {
    return Promise.resolve({
      ...success(cache.get(cacheKey)),
      retries: 0,
      meta: { cacheHit: true, cacheKey },
    });
  }
};
