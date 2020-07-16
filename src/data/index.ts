import { v5 } from "https://deno.land/std/uuid/mod.ts";

const namespace = "f6360cb2-cdac-4d8d-a269-a5f65b054128";

export interface Attributes {
  [name: string]: string;
}

export const data = async (
  processor: string,
  attrs: Attributes,
  body: string = "",
  root: string = Deno.cwd()
): Promise<object> => {
  // Generate Cache Key
  const cacheKeyOptions = {
    value: JSON.stringify({ processor, attrs, body }),
    namespace,
  };
  const cacheKey = v5.generate(cacheKeyOptions);

  // Need Cache
  // Check Cache
  // No Found - Make Request
  // Push to Cache
  // Return
  // Can't return promise... must await results?

  // Need to create Error Handler
  // Need to create data structure for
  // - SKIP
  // - ERROR
  // - END
  // - DATA
  // Meta Data - Cache Hit vs Cache Miss?

  // Create Cache Key - UUID
  try {
    // Check if file exists
    // Error if file does not exist
    // Check if TS or JS extension (magic auto resolution)
    const dataProcessor = await import(`${root}/data/${processor}.ts`);
    const result = await dataProcessor.default(attrs, body);

    // TODO: Insert Into Cache using cacheKey
    return result;
  } catch (e) {
    throw e;
  }
};
