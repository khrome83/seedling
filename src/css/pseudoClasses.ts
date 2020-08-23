import { ModifySelector } from "../types.ts";

export default new Map([
  ["hover", { pre: "", post: ":hover" }],
  ["focus", { pre: "", post: ":focus" }],
  ["active", { pre: "", post: ":active" }],
  ["group-hover", { pre: ".group:hover ", post: "" }],
  ["group-focus", { pre: ".group:focus ", post: "" }],
  ["focus-within", { pre: "", post: ":focus-within" }],
  ["focus-visible", { pre: "", post: ":focus-visible" }],
  ["checked", { pre: "", post: ":checked" }],
  ["disabled", { pre: "", post: ":disabled" }],
  ["visited", { pre: "", post: ":visited" }],
  ["first", { pre: "", post: ":first-child" }],
  ["last", { pre: "", post: ":last-child" }],
  ["odd", { pre: "", post: ":nth-child(odd)" }],
  ["even", { pre: "", post: ":nth-child(even)" }],
]) as Map<string, ModifySelector>;
