// Void Elements are a Subset of HTML elements that do not have a Solidus and never have a closing tag.
export default new Set([
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
