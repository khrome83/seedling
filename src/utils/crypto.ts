import { createHash } from "../../deps.ts";

const getHashHex = (data: string): string => {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.toString().substring(0, 8);
};

export const createHashFromSet = (set: Set<string>): string => {
  const data = Array.from(set).join(",");
  return getHashHex(data);
};
