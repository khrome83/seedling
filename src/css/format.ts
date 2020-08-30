// Utility method that adds indent to the start of a row
// deno-lint-ignore ban-types
export const indent = (minify = false): Function => {
  return (level: number): string => {
    return minify ? "" : "".padStart(level * 2);
  };
};

// Utility method that adds newline to the end of a row
// deno-lint-ignore ban-types
export const newline = (minify = false): Function => {
  return (): string => {
    return minify ? "" : "\n";
  };
};

// Uility method that returns the breakpoint prefix
export const breakpoint = (bp = ""): string => {
  return bp.length ? `.${bp}\\:` : ".";
};
