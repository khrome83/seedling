import { v5, Cache } from "../../deps.ts";
const namespace = "f6360cb2-cdac-4d8d-a269-a5f65b054128";

const cache = new Cache({
  limit: 50000,
  serialize: false,
});

const fileToCache = new Map();

const purgeFile = (filepath: string) => {
  if (fileToCache.has(filepath)) {
    const set = fileToCache.get(filepath);
    const setItems = set[Symbol.iterator]();
    for (const key of setItems) {
      cache.remove(key);
    }

    fileToCache.delete(filepath);
  }
};

// deno-lint-ignore no-explicit-any
const getCacheKey = (filepath: string, ...payload: any[]): string => {
  if (!payload.length) {
    throw new Error("Invalid payload for cache key, need atleast one argument");
  }

  const cacheKeyOptions = {
    value: JSON.stringify(payload),
    namespace,
  };

  const key = v5.generate(cacheKeyOptions) as string;

  if (fileToCache.has(filepath)) {
    const set = fileToCache.get(filepath);
    set.add(key);
    fileToCache.set(filepath, set);
  } else {
    fileToCache.set(filepath, new Set([key]));
  }

  return key;
};

export { cache, getCacheKey, namespace, purgeFile };
