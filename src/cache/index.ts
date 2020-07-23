import { v5, Cache, Identifier } from "../deps.ts";

const namespace = "f6360cb2-cdac-4d8d-a269-a5f65b054128";

const cache = new Cache({
  limit: 50000,
  serialize: true,
});

const getCacheKey = (...payload: any[]): Identifier => {
  if (!payload.length) {
    throw new Error("Invalid payload for cache key, need atleast one argument");
  }

  const cacheKeyOptions = {
    value: JSON.stringify(payload),
    namespace,
  };

  return v5.generate(cacheKeyOptions) as Identifier;
};

export { cache, getCacheKey, namespace, Identifier };
