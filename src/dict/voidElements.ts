import config from "../config/index.ts";

// Void Elements are a Subset of HTML elements that do not have a Solidus and never have a closing tag.
const standard = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]) as Set<string>;

// Void Elements are a Subset of HTML elements that do not have a Solidus and never have a closing tag.
// A superset of valid void elements that include obsolete and deprecated elements
const legacy = new Set([
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "nextid",
  "param",
  "source",
  "track",
  "wbr",
]) as Set<string>;

export default !config.legacy ? standard : legacy;
