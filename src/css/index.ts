import pseudoClasses from "./pseudoClasses.ts";
import mediaQueries from "./mediaQueries.ts";
import {
  ModifySelector,
  MediaQueryDefintion,
  SelectorDefinition,
  ModifyProperty,
} from "../types.ts";
const seperator = ":";

export default class TailwindGenerator {
  private criticalSheet: Map<string, MediaQueryDefintion | SelectorDefinition> =
    new Map();
  private criticalAdditions: Set<string> = new Set();
  private externalSheet: Map<string, MediaQueryDefintion | SelectorDefinition> =
    new Map();
  private externalAdditions: Set<string> = new Set();
  private minified: boolean;

  constructor(minified: boolean = false) {
    this.minified = minified;
  }

  public addClasses(classList: Set<string>, critical = false): void {
    // Build Local State
    const classListIterator = classList[Symbol.iterator]();
    for (const className of classListIterator) {
      this.parseClass(className, critical);
    }
  }

  public getStylesheet(critical = false): string {
    const sheet = (critical) ? this.criticalSheet : this.externalSheet;
    const additions = (critical)
      ? this.criticalAdditions
      : this.externalAdditions;

    // Addd Containers Function
    const addContainer = () => {
    };

    // Adds additions, currently just .container class and needed media queries
    const addAdditions = () => {
      // Do nothing if .container was not used in sheet
      if (additions.size === 0) return;

      let containerClasses = "";

      // Loop Over Additions
      const additionsIterator = additions[Symbol.iterator]();
      for (const key of additionsIterator) {
        if (key.indexOf("container") !== -1) {
          if (containerClasses.length === 0) {
            containerClasses += ".";
          } else {
            containerClasses += "," + this.newline() + ".";
          }
          containerClasses += key.replaceAll(":", "\\:");
        }
      }

      sheet.set("container", {
        pre: this.indent(0) + containerClasses + " {" + this.newline(),
        children: this.indent(1) + "width: 100%;" + this.newline(),
        post: this.indent(0) + "}" + this.newline(),
      });

      const mediaQueryIterator = mediaQueries[Symbol.iterator]();
      for (const [key, value] of mediaQueryIterator) {
        if (sheet.has(key)) {
          const mediaQuery = sheet.get(key) as MediaQueryDefintion;
          const nested = mediaQuery.children;

          const [full, amount] = mediaQuery.pre.match(/\:\s?(\d+(?:px|rem))/) ||
            [];

          if (amount !== undefined) {
            nested.set("container", {
              pre: (containerClasses + " {" + this.newline()).replaceAll(
                ".",
                this.indent(1) + ".",
              ),
              children: this.indent(2) + "max-width: " + amount + ";" +
                this.newline(),
              post: this.indent(1) + "}" + this.newline(),
            });
          }
        }
      }
    };

    // Reorder Stylesheet - Media Queries Go Last
    const reorder = (
      map: Map<string, MediaQueryDefintion | SelectorDefinition>,
    ) => {
      const mediaQueryIterator = mediaQueries[Symbol.iterator]();
      for (const [key] of mediaQueryIterator) {
        if (map.has(key)) {
          // Shifts media queries to the end
          const temp = map.get(key) as MediaQueryDefintion | SelectorDefinition;
          map.delete(key);
          map.set(key, temp);
        }
      }
    };

    // Loops over the maps and concats strings
    const process = (
      map: Map<string, MediaQueryDefintion | SelectorDefinition>,
    ): string => {
      // Add Additions
      addAdditions();

      // Reorder the Map
      reorder(map);

      // Iterate Over the Map
      const mapIterator = map[Symbol.iterator]();
      let output = "";
      for (const [key, value] of mapIterator) {
        if (typeof value.children === "string") {
          output += value.pre + value.children + value.post;
        } else if (value.children.size > 0) {
          output += value.pre + process(value.children) + value.post;
        }
      }

      return output;
    };

    // Process the Stylesheet Map
    return process(sheet);
  }

  private parseClass(className: string, critical: boolean): void {
    className = className.trim();
    let sheet = (critical) ? this.criticalSheet : this.externalSheet;
    let additions = (critical)
      ? this.criticalAdditions
      : this.externalAdditions;
    const offset = seperator.length;
    const usedModifiers: Set<string> = new Set();
    let pos;
    let modifiedClassName = className;
    let display = ".";
    let preName = "";
    let postName = "";
    let level = 0;
    let media = "";

    // Get Any Modifiers, like md: or hover:
    while ((pos = modifiedClassName.indexOf(seperator)) !== -1) {
      // Get Part and Advance
      const part = modifiedClassName.substring(0, pos);
      modifiedClassName = modifiedClassName.substring(pos + offset);

      // Minor validation to avoid duplicate modifiers
      // Just skips the previously used modifiers
      // In the future, would be good to weight modifiers and order
      if (usedModifiers.has(part)) continue;
      usedModifiers.add(part);

      // Add to classname
      display += part + "\\" + seperator;

      // Additional Modification
      if (pseudoClasses.has(part)) {
        // Pseudo Classes
        const { pre, post } = pseudoClasses.get(part) as ModifySelector;
        preName += pre;
        postName += post;
      } else if (mediaQueries.has(part)) {
        // Media Queries
        const { pre, post } = mediaQueries.get(part) as ModifySelector;

        media = part;

        if (!sheet.has(part)) {
          sheet.set(part, {
            pre: this.indent(level) + pre + this.newline(),
            post: this.indent(level) + post + this.newline(),
            children: new Map(),
          });
        }

        const s = sheet.get(part) as MediaQueryDefintion;
        sheet = s.children;
        level += 1;
      } else {
        // TODO: Add configuration lookup
        console.log("IGNORING MODIFIER", part);
      }
    }

    // Build final display of classname
    // Apply Pre Specified Class, and psuedo-classes
    display = preName + display + modifiedClassName + postName;

    // If it does not exist, let's create it.
    if (!sheet.has(className)) {
      let negative = false;
      let identifier;
      let token = undefined;

      // Check if Negative
      if (modifiedClassName.indexOf("-") === 0) {
        negative = true;
        modifiedClassName = modifiedClassName.substring(1);
      }

      // Check if Identifier
      const loc = modifiedClassName.indexOf("-");
      if (loc !== -1) {
        identifier = modifiedClassName.substring(0, loc);
        token = modifiedClassName.substring(loc + 1);
      } else {
        identifier = modifiedClassName;
      }

      // Container is added on retrieving stylesheet
      // We skip it now, and when we retrieve we check
      // The class list to see if we need to add it
      if (identifier === "container") {
        additions.add(className);
        return;
      }

      // Get Properties for Class
      const item = this.getProperties(level, identifier, token, negative) as
        | string
        | void
        | ModifyProperty;
      let children;
      let pre = "";
      let post = "";

      if (typeof item === "string") {
        // Typiocal Propertiy
        children = item;
      } else if (item !== undefined) {
        // Need to add Post or Pre Properties
        children = (item as ModifyProperty).children;
        if ((item as ModifyProperty).pre !== undefined) {
          pre = (item as ModifyProperty).pre as string;
        }
        if ((item as ModifyProperty).post !== undefined) {
          post = (item as ModifyProperty).post as string;
        }
      }

      if (children) {
        // Assign Seet
        sheet.set(className, {
          pre: this.indent(level) + pre + display + post + " {" +
            this.newline(),
          children,
          post: this.indent(level) + "}" + this.newline(),
        });
      } else {
        console.warn(`Unknown css classname '${className}'`);
      }
    }
  }

  private getProperties(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    switch (identifier) {
      // Box Sizing
      case "box":
        return this.getBoxSizing(level, identifier, token, negative);
      // Display
      case "block":
      case "inline":
      case "table":
      case "flow":
      case "contents":
      case "hidden":
        return this.getDisplay(level, identifier, token, negative);
      // Floats
      case "float":
      case "clearfix":
        return this.getFloats(level, identifier, token, negative);
      // Clear
      case "clear":
        return this.getClear(level, identifier, token, negative);
      case "object":
        switch (token) {
          // Object Fit
          case "contain":
          case "cover":
          case "fill":
          case "none":
          case "scale-down":
            return this.getObjectFit(level, identifier, token, negative);
          // Object Position
          default:
            return this.getObjectPosition(level, identifier, token, negative);
        }
      // Overflow
      case "overflow":
      case "scrolling":
        return this.getOverflow(level, identifier, token, negative);
      // Overscroll Behavior
      case "overscroll":
        return this.getOverscrollBehavior(level, identifier, token, negative);
      // Position
      case "static":
      case "fixed":
      case "absolute":
      case "relative":
      case "sticky":
        return this.getPosition(level, identifier, token, negative);
      // Top / Right / Bottom  / Left
      case "inset":
      case "top":
      case "right":
      case "bottom":
      case "left":
        return this.getTopRightBottomLeft(level, identifier, token, negative);
      // Visibility
      case "visible":
      case "invisible":
        return this.getVisibility(level, identifier, token, negative);
      case "z":
        return this.getZIndex(level, identifier, token, negative);
      case "space":
        return this.getSpaceBetween(level, identifier, token, negative);
      case "flex":
        if (token === undefined) {
          return this.getDisplay(level, identifier, token, negative);
        }
        return this.getFlex(level, identifier, token, negative);
      // Align Items
      case "items":
        return this.getAlignItems(level, identifier, token, negative);
      // Align Content
      case "content":
        return this.getAlignContent(level, identifier, token, negative);
      // Align Self
      case "self":
        return this.getAlignSelf(level, identifier, token, negative);
      // Justify Content
      case "justify":
        return this.getJustifyContent(level, identifier, token, negative);
      // Order
      case "order":
        return this.getOrder(level, identifier, token, negative);
      // Grid
      case "grid":
        if (token === undefined) {
          return this.getDisplay(level, identifier, token, negative);
        } else {
          const pos = token.indexOf("-");
          if (pos !== -1) {
            const type = token.substring(0, pos);
            switch (type) {
              case "cols":
                return this.getGridTemplateColumns(
                  level,
                  identifier,
                  token,
                  negative,
                );
              case "rows":
                return this.getGridTemplateRows(
                  level,
                  identifier,
                  token,
                  negative,
                );
              case "flow":
                return this.getGridAutoFlow(level, identifier, token, negative);
              default:
                return;
            }
          }
        }
      // Grid Column Row Start / End
      case "col":
        return this.getGridColumnStartEnd(level, identifier, token, negative);
      // Grid Row Start / End
      case "row":
        return this.getGridRowStartEnd(level, identifier, token, negative);
      // Gap
      case "gap":
        return this.getGap(level, identifier, token, negative);
      // Padding
      case "p":
      case "px":
      case "py":
      case "pt":
      case "pr":
      case "pb":
      case "pl":
        return this.getPadding(level, identifier, token, negative);
      // Margin
      case "m":
      case "mx":
      case "my":
      case "mt":
      case "mr":
      case "mb":
      case "ml":
        return this.getMargin(level, identifier, token, negative);
      // Height
      case "h":
        return this.getHeight(level, identifier, token, negative);
      // Width
      case "w":
        return this.getWidth(level, identifier, token, negative);
      // max -
      case "max":
        switch (token?.charAt(0)) {
          // height
          case "h":
            return this.getMaxHeight(level, identifier, token, negative);
          // width
          case "w":
            return this.getMaxWidth(level, identifier, token, negative);
          default:
            return;
        }
      // min -
      case "min":
        switch (token?.charAt(0)) {
          // height
          case "h":
            return this.getMinHeight(level, identifier, token, negative);
          // width
          case "w":
            return this.getMinWidth(level, identifier, token, negative);
          default:
            return;
        }

      default:
        return;
    }
  }

  // Utility method that adds indent to the start of a row
  private indent(level: number): string {
    return this.minified ? "" : "".padStart(level * 2);
  }

  // Utility method that adds newline to the end of a row
  private newline(): string {
    return this.minified ? "" : "\n";
  }

  private getPadding(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line & quantity & negative & unit
    // Calulates the amount
    const i = this.indent(level + 1);
    const nl = this.newline();
    const q = (token === "px") ? 1 : token as any * 0.25;
    const u = (token === "px") ? "px" : "rem";
    const amount = ((q === 0) ? q : q + u) + ";" + nl;

    switch (identifier) {
      case "p":
        return i + "padding: " + amount;
      case "px":
        return i + "padding-left: " + amount + i + "padding-right: " + amount;
      case "py":
        return i + "padding-top: " + amount + i + "padding-bottom: " + amount;
      case "pt":
        return i + "padding-top: " + amount;
      case "pr":
        return i + "padding-right: " + amount;
      case "pb":
        return i + "padding-bottom: " + amount;
      case "pl":
        return i + "padding-left: " + amount;
      default:
        return;
    }
  }

  private getMargin(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line & quantity & negative & unit
    // Calulates the amount
    const i = this.indent(level + 1);
    const nl = this.newline();
    const q = (token === "px")
      ? 1
      : (token === "auto")
      ? "auto"
      : token as any * 0.25;
    const n = negative ? "-" : "";
    const u = (token === "px") ? "px" : "rem";
    const amount = n + ((q === 0 || q === "auto") ? q : q + u) + ";" + nl;

    switch (identifier) {
      case "m":
        return i + "margin: " + amount;
      case "mx":
        return i + "margin-left: " + amount + i + "margin-right: " + amount;
      case "my":
        return i + "margin-top: " + amount + i + "margin-bottom: " + amount;
      case "mt":
        return i + "margin-top: " + amount;
      case "mr":
        return i + "margin-right: " + amount;
      case "mb":
        return i + "margin-bottom: " + amount;
      case "ml":
        return i + "margin-left: " + amount;
      default:
        return;
    }
  }

  private getHeight(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "auto":
        return i + "height: auto;" + nl;
      case "px":
        return i + "height: 1px;" + nl;
      case "full":
        return i + "height: 100%;" + nl;
      case "screen":
        return i + "height: 100vh;" + nl;
      case "0":
        return i + "height: 0;" + nl;
      default:
        return i + "height: " + (token as any * 0.25) + "rem;" + nl;
    }
  }

  private getMinHeight(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "h-0":
        return i + "min-height: 0;" + nl;
      case "h-full":
        return i + "min-height: 100%;" + nl;
      case "h-screen":
        return i + "min-height: 100vh;" + nl;
      default:
        return;
    }
  }

  private getMaxHeight(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "h-full":
        return i + "max-height: 100%;" + nl;
      case "h-screen":
        return i + "max-height: 100vh;" + nl;
      default:
        return;
    }
  }

  private getWidth(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "auto":
        return i + "width: auto;" + nl;
      case "px":
        return i + "width: 1px;" + nl;
      case "full":
        return i + "width: 100%;" + nl;
      case "screen":
        return i + "width: 100vw;" + nl;
      case "0":
        return i + "width: 0;" + nl;
      default:
        const pos = token.indexOf("/");
        if (pos !== -1) {
          const n = token.substring(0, pos) as any;
          const d = token.substring(pos + 1) as any;
          return i + "width: " + ((n / d) * 100) + "%;" + nl;
        } else {
          return i + "width: " + (token as any * 0.25) + "rem;" + nl;
        }
    }
  }

  private getMinWidth(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "w-full":
        return i + "min-width: 100%;" + nl;
      case "w-0":
        return i + "min-width: 0;" + nl;
      default:
        return;
    }
  }

  private getMaxWidth(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "w-none":
        return i + "max-width: none;" + nl;
      case "w-xs":
        return i + "max-width: 20rem;" + nl;
      case "w-sm":
        return i + "max-width: 24rem;" + nl;
      case "w-md":
        return i + "max-width: 28rem;" + nl;
      case "w-lg":
        return i + "max-width: 32rem;" + nl;
      case "w-xl":
        return i + "max-width: 36rem;" + nl;
      case "w-2xl":
        return i + "max-width: 42rem;" + nl;
      case "w-3xl":
        return i + "max-width: 48rem;" + nl;
      case "w-4xl":
        return i + "max-width: 56rem;" + nl;
      case "w-5xl":
        return i + "max-width: 64rem;" + nl;
      case "w-6xl":
        return i + "max-width: 72rem;" + nl;
      case "w-full":
        return i + "max-width: 100%;" + nl;
      case "w-screen-sm":
        return i + "max-width: 640px;" + nl;
      case "w-screen-md":
        return i + "max-width: 768px;" + nl;
      case "w-screen-lg":
        return i + "max-width: 1024px;" + nl;
      case "w-screen-xl":
        return i + "max-width: 1280px;" + nl;
      default:
        return;
    }
  }

  private getBoxSizing(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "border":
        return i + "box-sizing: border-box;" + nl;
      case "content":
        return i + "box-sizing: content-box;" + nl;
      default:
        return;
    }
  }

  private getDisplay(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (identifier) {
      case "hidden":
        return i + "display: none;" + nl;
      default:
        if (token !== undefined) {
          return i + "display: " + identifier + "-" + token + ";" + nl;
        } else {
          return i + "display: " + identifier + ";" + nl;
        }
    }
  }

  private getFloats(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    // Clearfix
    if (identifier === "clearfix") {
      return {
        post: ":after",
        children: i + 'content: "";' + nl +
          i + "display: table;" + nl +
          i + "clear: both;" + nl,
      };
    }

    // Floats
    switch (token) {
      case "right":
        return i + "float: right;" + nl;
      case "left":
        return i + "float: left;" + nl;
      case "none":
        return i + "float: none;" + nl;
      default:
        return;
    }
  }

  private getClear(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    return i + "clear: " + token + ";" + nl;
  }

  private getObjectFit(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    return i + "object-fit: " + token + ";" + nl;
  }

  private getObjectPosition(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    return i + "object-position: " + token.replace("-", " ") + ";" + nl;
  }

  private getOverflow(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    // Scrolling Touch, Scrolling Auto
    if (identifier === "scrolling") {
      return i + "-webkit-overflow-scrolling: " + token + ";" + nl;
    }

    let type;
    let axis = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      axis = "-" + token.substring(0, pos);
      type = token.substring(pos + 1);
    } else {
      type = token;
    }

    return i + "overflow" + axis + ": " + type + ";" + nl;
  }

  private getOverscrollBehavior(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type;
    let axis = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      axis = "-" + token.substring(0, pos);
      type = token.substring(pos + 1);
    } else {
      type = token;
    }

    let added = "";
    if (axis === "") {
      added = i + "-ms-scroll-chaining: " + ((type === "auto")
        ? "chained"
        : "none") +
        ";" + nl;
    }

    return added + i + "overscroll-behavior" + axis + ": " + type + ";" + nl;
  }

  private getPosition(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let added = "";

    if (identifier === "sticky") {
      added = i + "position: -webkit-sticky;" + nl;
    }

    return added + i + "position: " + identifier + ";" + nl;
  }

  private getTopRightBottomLeft(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type = "auto";
    if (token?.indexOf("0") !== -1) {
      type = "0";
    }

    if (identifier === "inset" && token?.charAt(0) === "y") {
      return i + "top: " + type + ";" + nl +
        i + "bottom: " + type + ";" + nl;
    } else if (identifier === "inset" && token?.charAt(0) === "x") {
      return i + "right: " + type + ";" + nl +
        i + "left: " + type + ";" + nl;
    } else if (identifier === "inset") {
      return i + "top: " + type + ";" + nl +
        i + "right: " + type + ";" + nl +
        i + "bottom: " + type + ";" + nl +
        i + "left: " + type + ";" + nl;
    } else {
      return i + identifier + ": " + type + ";" + nl;
    }
  }

  private getVisibility(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type = "hidden";

    if (identifier === "visible") {
      type = "visible";
    }

    return i + "visibility: " + type + ";" + nl;
  }

  private getZIndex(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    return i + "z-index: " + token + ";" + nl;
  }

  private getSpaceBetween(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type;
    let axis = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      axis = token.substring(0, pos);
      type = token.substring(pos + 1);
    } else {
      return;
    }

    // Reverse
    if (type === "reverse") {
      return {
        post: " > :not(template) ~ :not(template)",
        children: i + "--space-" + axis + "-reverse: 1;" + nl,
      };
    }

    // Negative
    const n = (negative && type !== "0") ? "-" : "";

    // Unit & Amount
    let u = "rem";
    let a;
    if (type === "0" || type === "px") {
      u = "px";
      a = (type === "px") ? 1 : 0;
    } else {
      a = (type as any) * 0.25;
    }

    let children = "";

    children += i + "--space-" + axis + "-reverse: 0;" + nl;
    if (axis === "y") {
      children += i + "margin-top: calc(" + n + a + u +
        " * calc(1 - var(--space-y-reverse)));" + nl;
      children += i + "margin-bottom: calc(" + n + a + u +
        " * var(--space-y-reverse));" + nl;
    } else {
      children += i + "margin-right: calc(" + n + a + u +
        " * var(--space-x-reverse));" + nl;
      children += i + "margin-left: calc(" + n + a + u +
        " * calc(1 - var(--space-x-reverse)));" + nl;
    }

    return {
      post: " > :not(template) ~ :not(template)",
      children,
    };
  }

  private getFlex(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      // Flex Direction
      case "row":
        return i + "flex-direction: row;" + nl;
      case "row-reverse":
        return i + "flex-direction: row-reverse;" + nl;
      case "col":
        return i + "flex-direction: column;" + nl;
      case "col-reverse":
        return i + "flex-direction: column-reverse;" + nl;
      // Flex Wrap
      case "wrap":
        return i + "flex-wrap: wrap;" + nl;
      case "wrap-reverse":
        return i + "flex-wrap: wrap-reverse;" + nl;
      case "no-wrap":
        return i + "flex-wrap: nowrap;" + nl;
      // Flex
      case "1":
        return i + "flex: 1 1 0%;" + nl;
      case "auto":
        return i + "flex: 1 1 auto;" + nl;
      case "initial":
        return i + "flex: 0 1 auto;" + nl;
      case "none":
        return i + "flex: none;" + nl;
      // Flex Grow
      case "grow-0":
        return i + "flex-grow: 0;" + nl;
      case "grow":
        return i + "flex-grow: 1;" + nl;
      // Flex Shrink
      case "shrink-0":
        return i + "flex-shrink: 0;" + nl;
      case "shrink":
        return i + "flex-shrink: 1;" + nl;
      default:
        return;
    }
  }

  private getOrder(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "first":
        return i + "order: -9999;" + nl;
      case "last":
        return i + "order: 9999;" + nl;
      case "none":
        return i + "order: 0;" + nl;
      default:
        return i + "order: " + token + ";" + nl;
    }
  }

  private getJustifyContent(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "start":
        return i + "justify-content: flex-start;" + nl;
      case "end":
        return i + "justify-content: flex-end;" + nl;
      case "center":
        return i + "justify-content: center;" + nl;
      case "between":
        return i + "justify-content: space-between;" + nl;
      case "around":
        return i + "justify-content: space-around;" + nl;
      case "evenly":
        return i + "justify-content: space-evenly;" + nl;
      default:
        return;
    }
  }

  private getAlignItems(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "start":
        return i + "align-items: flex-start;" + nl;
      case "end":
        return i + "align-items: flex-end;" + nl;
      case "center":
        return i + "align-items: center;" + nl;
      case "baseline":
        return i + "align-items: baseline;" + nl;
      case "stretch":
        return i + "align-items: stretch;" + nl;
      default:
        return;
    }
  }

  private getAlignContent(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "center":
        return i + "align-content: center;" + nl;
      case "start":
        return i + "align-content: flex-start;" + nl;
      case "end":
        return i + "align-content: flex-end;" + nl;
      case "between":
        return i + "align-content: space-between;" + nl;
      case "around":
        return i + "align-content: space-around;" + nl;
      default:
        return;
    }
  }

  private getAlignSelf(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "auto":
        return i + "align-self: auto;" + nl;
      case "start":
        return i + "align-self: flex-start;" + nl;
      case "end":
        return i + "align-self: flex-end;" + nl;
      case "center":
        return i + "align-self: center;" + nl;
      case "stretch":
        return i + "align-self: stretch;" + nl;
      default:
        return;
    }
  }

  private getGridTemplateColumns(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      amount = token.substring(pos + 1);
    } else {
      return;
    }

    if (amount === "none") {
      return i + "grid-template-columns: none;" + nl;
    } else if (amount === "0") {
      return;
    } else {
      return i + "grid-template-columns: repeat(" + amount +
        ", minmax(0, 1fr));" + nl;
    }
  }

  private getGridTemplateRows(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      amount = token.substring(pos + 1);
    } else {
      return;
    }

    if (amount === "none") {
      return i + "grid-template-rows: none;" + nl;
    } else if (amount === "0") {
      return;
    } else {
      return i + "grid-template-rows: repeat(" + amount +
        ", minmax(0, 1fr));" + nl;
    }
  }

  private getGridAutoFlow(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "flow-row":
        return i + "grid-auto-flow: row;" + nl;
      case "flow-col":
        return i + "grid-auto-flow: column;" + nl;
      case "flow-row-dense":
        return i + "grid-auto-flow: row dense;" + nl;
      case "flow-col-dense":
        return i + "grid-auto-flow: column dense;" + nl;
      default:
        return;
    }
  }

  private getGridColumnStartEnd(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type;
    let amount = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      type = token.substring(0, pos);
      amount = token.substring(pos + 1);
    } else {
      return i + "grid-column: auto;" + nl;
    }

    switch (type) {
      case "span":
        return i + "grid-column: span " + amount + " / span " + amount + ";" +
          nl;
      case "start":
        return i + "grid-column-start: " + amount + ";" + nl;
      case "end":
        return i + "grid-column-end: " + amount + ";" + nl;
      default:
        return;
    }
  }

  private getGridRowStartEnd(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type;
    let amount = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      type = token.substring(0, pos);
      amount = token.substring(pos + 1);
    } else {
      return i + "grid-row: auto;" + nl;
    }

    switch (type) {
      case "span":
        return i + "grid-row: span " + amount + " / span " + amount + ";" +
          nl;
      case "start":
        return i + "grid-row-start: " + amount + ";" + nl;
      case "end":
        return i + "grid-row-end: " + amount + ";" + nl;
      default:
        return;
    }
  }

  private getGap(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // Validation
    if (token === undefined) return;

    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    let type;
    let amount = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      type = token.substring(0, pos);
      amount = token.substring(pos + 1);
    } else {
      // Gap
      switch (token) {
        case "0":
          return i + "grid-gap: 0;" + nl +
            i + "gap: 0;" + nl;
        case "px":
          return i + "grid-gap: 1px;" + nl +
            i + "gap: 1px;" + nl;
        default:
          return i + "grid-gap: " + (token as any * 0.25) + "rem;" + nl +
            i + "gap: " + (token as any * 0.25) + "rem;" + nl;
      }
    }

    if (type === "y") {
      switch (amount) {
        case "0":
          return i + "grid-row-gap: 0;" + nl +
            i + "row-gap: 0;" + nl;
        case "px":
          return i + "grid-row-gap: 1px;" + nl +
            i + "row-gap: 1px;" + nl;
        default:
          return i + "grid-row-gap: " + (amount as any * 0.25) + "rem;" + nl +
            i + "row-gap: " + (amount as any * 0.25) + "rem;" + nl;
      }
    } else if (type === "x") {
      switch (amount) {
        case "0":
          return i + "grid-column-gap: 0;" + nl +
            i + "column-gap: 0;" + nl;
        case "px":
          return i + "grid-column-gap: 1px;" + nl +
            i + "column-gap: 1px;" + nl;
        default:
          return i + "grid-column-gap: " + (amount as any * 0.25) + "rem;" +
            nl +
            i + "column-gap: " + (amount as any * 0.25) + "rem;" + nl;
      }
    }

    return;
  }
}

// ^(?:([a-z]+)(?=\:):)?(\-)?([a-z]+)\-?([\d\w]+)?
