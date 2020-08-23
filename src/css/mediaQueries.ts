import { ModifySelector } from "../types.ts";

export default new Map([
  ["motion-safe", {
    pre: "@media (prefers-reduced-motion: no-preference) {",
    post: "}",
  }],
  ["motion-reduce", {
    pre: "@media (prefers-reduced-motion: reduce) {",
    post: "}",
  }],
  ["sm", {
    pre: "@media (min-width: 640px) {",
    post: "}",
  }],

  ["md", {
    pre: "@media (min-width: 768px) {",
    post: "}",
  }],
  ["lg", {
    pre: "@media (min-width: 1024px) {",
    post: "}",
  }],
  ["xl", {
    pre: "@media (min-width: 1280px) {",
    post: "}",
  }],
]) as Map<string, ModifySelector>;
