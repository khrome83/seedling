import pseudoClasses from "./pseudoClasses.ts";
import mediaQueries from "./mediaQueries.ts";
import preflight from "./preflight.ts";
import getColorPallet from "./colors.ts";
import {
  ModifySelector,
  MediaQueryDefintion,
  SelectorDefinition,
  ModifyProperty,
  ColorDefinition,
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
  private color: Map<string, ColorDefinition>;

  constructor(minified: boolean = false, pallet: string = "tailwindcss") {
    this.minified = minified;
    this.color = getColorPallet(pallet);
  }

  public addClasses(classList: Set<string>, critical = false): void {
    // Build Local State
    const classListIterator = classList[Symbol.iterator]();
    for (const className of classListIterator) {
      this.parseClass(className, critical);
    }
  }

  public getStylesheet(critical = false, includePreflight = false): string {
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

      let addContainer = false;
      let containerClasses = "";

      // Loop Over Additions
      const additionsIterator = additions[Symbol.iterator]();
      for (const key of additionsIterator) {
        // Container
        if (key.indexOf("container") !== -1) {
          addContainer = true;
          if (containerClasses.length === 0) {
            containerClasses += ".";
          } else {
            containerClasses += "," + this.newline() + ".";
          }
          containerClasses += key.replaceAll(":", "\\:");
        }

        // Adds Keyframes - Spin
        if (key === "spin") {
          sheet.set("spin", {
            pre: this.indent(0) + "@keyframes spin {" + this.newline(),
            children: this.indent(1) + "to {" + this.newline() +
              this.indent(2) + "transform: rotate(360deg);" + this.newline() +
              this.indent(1) + "}" + this.newline(),
            post: this.indent(0) + "}" + this.newline(),
          });
        }

        // Adds Keyframes - Ping
        if (key === "ping") {
          sheet.set("ping", {
            pre: this.indent(0) + "@keyframes ping {" + this.newline(),
            children: this.indent(1) + "100%," + this.newline() +
              this.indent(1) + "75% {" + this.newline() +
              this.indent(2) + "transform: scale(2);" + this.newline() +
              this.indent(2) + "opacity: 0;" + this.newline() +
              this.indent(1) + "}" + this.newline(),
            post: this.indent(0) + "}" + this.newline(),
          });
        }

        // Adds Keyframes - Pulse
        if (key === "pulse") {
          sheet.set("pulse", {
            pre: this.indent(0) + "@keyframes pulse {" + this.newline(),
            children: this.indent(1) + "50% {" + this.newline() +
              this.indent(2) + "opacity: 0.5;" + this.newline() +
              this.indent(1) + "}" + this.newline(),
            post: this.indent(0) + "}" + this.newline(),
          });
        }

        // Adds Keyframes - Bounce
        if (key === "bounce") {
          sheet.set("bounce", {
            pre: this.indent(0) + "@keyframes bounce {" + this.newline(),
            children: this.indent(1) + "0%," + this.newline() +
              this.indent(1) + "100% {" + this.newline() +
              this.indent(2) + "transform: translateY(-25%);" + this.newline() +
              this.indent(2) +
              "animation-timing-function: cubic-bezier(0.8, 0, 1, 1);" +
              this.newline() +
              this.indent(1) + "}" + this.newline() +
              this.indent(1) + "50% {" + this.newline() +
              this.indent(2) + "transform: none;" + this.newline() +
              this.indent(2) +
              "animation-timing-function: cubic-bezier(0, 0, 0.2, 1);" +
              this.newline(),
            post: this.indent(0) + "}" + this.newline(),
          });
        }
      }

      // Add Container if Needed
      if (addContainer) {
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

            const [full, amount] =
              mediaQuery.pre.match(/\:\s?(\d+(?:px|rem))/) ||
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
    const output = process(sheet);

    if (includePreflight) {
      return preflight + output;
    } else {
      return output;
    }
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

      // Add Keyframes when retrieving stylesheet
      // We skip for now since we only want to add once
      // The token should be added and used
      if (identifier === "animate" && token !== undefined) {
        additions.add(token);
      }

      // Modify for 1/2 to 1\/2
      if (display.indexOf("/") !== -1) {
        display = display.replace("/", "\\/");
      }

      // Modify for 0.5 to 0\.5
      const regex = /(\w)(\.)(\w)/g;
      if (regex.test(display)) {
        display = display.replace(regex, "$1\\.$3");
      }

      // Get Properties for Class
      const item = this.getProperties(level, identifier, token, negative) as
        | string
        | void
        | ModifyProperty;
      let children;
      let pre = "";
      let post = "";
      let classList = "";

      if (typeof item === "string") {
        // Typiocal Propertiy
        children = item;
        classList += this.indent(level) + pre + display + post;
      } else if (item !== undefined) {
        // Need to add Post or Pre Properties
        children = (item as ModifyProperty).children;
        const itemPre = (item as ModifyProperty).pre;
        const itemPost = (item as ModifyProperty).post;
        if (itemPre !== undefined) {
          pre = (item as ModifyProperty).pre as string;
        }
        if (itemPost !== undefined) {
          if (Array.isArray(itemPost)) {
            for (let i = 0, len = itemPost.length; i < len; i++) {
              if ((i + 1) === len) {
                post = itemPost[i];
              } else {
                classList += this.indent(level) + pre + display +
                  itemPost[i] +
                  ", " + this.newline();
              }
            }
          } else {
            post = (item as ModifyProperty).post as string;
          }
        }

        classList += this.indent(level) + pre + display + post;
      }

      if (children) {
        // Assign Seet
        sheet.set(className, {
          pre: classList + " {" + this.newline(),
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
      // Font
      case "font":
        switch (token) {
          // Font Family
          case "sans":
          case "serif":
          case "mono":
            return this.getFontFamily(level, identifier, token, negative);
          // Font Weight
          case "hairline":
          case "thin":
          case "light":
          case "normal":
          case "medium":
          case "semibold":
          case "bold":
          case "extrabold":
          case "black":
            return this.getFontWeight(level, identifier, token, negative);
          default:
            return;
        }
      case "text":
        switch (token) {
          // Font Size
          case "xs":
          case "sm":
          case "base":
          case "lg":
          case "xl":
          case "2xl":
          case "3xl":
          case "4xl":
          case "5xl":
          case "6xl":
            return this.getFontSize(level, identifier, token, negative);
          case "left":
          case "center":
          case "right":
          case "justify":
            return this.getTextAlignment(level, identifier, token, negative);
          default:
            if (token !== undefined && token.indexOf("opacity") !== -1) {
              return this.getTextOpacity(level, identifier, token, negative);
            } else {
              return this.getTextColor(level, identifier, token, negative);
            }
        }
      // Font Smoothing
      case "antialiased":
      case "subpixel":
        return this.getFontSmoothing(level, identifier, token, negative);
      // Font Style
      case "italic":
        return this.getFontStyle(level, identifier, token, negative);
      // Letter Spacing
      case "tracking":
        return this.getLetterSpacing(level, identifier, token, negative);
      // Line Height
      case "leading":
        return this.getLineHeight(level, identifier, token, negative);
      // List
      case "list":
        switch (token) {
          // List Style Type
          case "none":
          case "disc":
          case "decimal":
            return this.getListStyleType(level, identifier, token, negative);
          // List Style Position
          case "inside":
          case "outside":
            return this.getListStylePosition(
              level,
              identifier,
              token,
              negative,
            );
          default:
            return;
        }
      case "placeholder":
        if (token === undefined) {
          return;
        } else if (token.indexOf("opacity") !== -1) {
          return this.getPlaceholderOpacity(level, identifier, token, negative);
        } else {
          return this.getPlaceholderColor(level, identifier, token, negative);
        }
      // Text Decoration
      case "line":
      case "underline":
      case "no":
        return this.getTextDecoration(level, identifier, token, negative);
      // Text Transform
      case "uppercase":
      case "lowercase":
      case "capitalize":
      case "normal":
        return this.getTextTransform(level, identifier, token, negative);
      // Vertical Alignment
      case "align":
        return this.getVerticalAlignment(level, identifier, token, negative);
      // Whitespace
      case "whitespace":
        return this.getWhitespace(level, identifier, token, negative);
      // Word Break
      case "break":
      case "truncate":
        return this.getWordBreak(level, identifier, token, negative);
      // Background
      case "bg":
        switch (token) {
          // Background Attachment
          case "fixed":
          case "local":
          case "scroll":
            return this.getBackgroundAttachment(
              level,
              identifier,
              token,
              negative,
            );
          // Backgorund Clip
          case "clip-border":
          case "clip-padding":
          case "clip-content":
          case "clip-text":
            return this.getBackgroundClip(level, identifier, token, negative);
          // Background Position
          case "bottom":
          case "center":
          case "left":
          case "left-bottom":
          case "left-top":
          case "right":
          case "right-bottom":
          case "right-top":
          case "top":
            return this.getBackgroundPosition(
              level,
              identifier,
              token,
              negative,
            );
          // Background Repeat
          case "repeat":
          case "no-repeat":
          case "repeat-x":
          case "repeat-y":
          case "repeat-round":
          case "repeat-space":
            return this.getBackgroundRepeat(level, identifier, token, negative);
          // Background Size
          case "auto":
          case "cover":
          case "contain":
            return this.getBackgroundSize(level, identifier, token, negative);
          case "none":
            return this.getBackgroundImage(level, identifier, token, negative);
          default:
            if (token?.indexOf("gradient") !== -1) {
              return this.getBackgroundImage(
                level,
                identifier,
                token,
                negative,
              );
            } else if (token?.indexOf("opacity") !== -1) {
              return this.getBackgroundOpacity(
                level,
                identifier,
                token,
                negative,
              );
            } else {
              return this.getBackgroundColor(
                level,
                identifier,
                token,
                negative,
              );
            }
        }
      // Gradient Color Stops
      case "from":
      case "via":
      case "to":
        return this.getGradientColorStops(level, identifier, token, negative);
      // Border Radius
      case "rounded":
        return this.getBorderRadius(level, identifier, token, negative);
      // Border
      case "border":
        switch (token) {
          // Border Collapse
          case "collapse":
          case "separate":
            return this.getBorderCollapse(level, identifier, token, negative);
          // Border Style
          case "solid":
          case "dashed":
          case "dotted":
          case "double":
          case "none":
            return this.getBorderStyle(level, identifier, token, negative);
          default:
            if (
              token === undefined || /^(?:\d+|[trbl])(?:\-\d+)?$/.test(token)
            ) {
              // Border Width
              return this.getBorderWidth(level, identifier, token, negative);
            } else if (token?.indexOf("opacity") !== -1) {
              // Border Opacity
              return this.getBorderOpacity(level, identifier, token, negative);
            } else {
              // Border Color
              return this.getBorderColor(level, identifier, token, negative);
            }
        }
      // Divide
      case "divide":
        switch (token) {
          // Divide Style
          case "solid":
          case "dashed":
          case "dotted":
          case "double":
          case "none":
            return this.getDivideStyle(level, identifier, token, negative);
          default:
            if (
              token === undefined || /^[xy](?:\-(?:\d+|reverse))?$/.test(token)
            ) {
              // Divide Width
              return this.getDivideWidth(level, identifier, token, negative);
            } else if (token?.indexOf("opacity") !== -1) {
              // Divide Opacity
              return this.getDivideOpacity(level, identifier, token, negative);
            } else {
              // Border Color
              return this.getDivideColor(level, identifier, token, negative);
            }
        }
      // Table
      case "table":
        switch (token) {
          // Table Layout
          case "auto":
          case "fixed":
            return this.getTableLayout(level, identifier, token, negative);
          // Table Display
          default:
            return this.getDisplay(level, identifier, token, negative);
        }
      // Box Shadow
      case "shadow":
        return this.getBoxShadow(level, identifier, token, negative);
      // Transition Property
      case "transition":
        return this.getTransitionProperty(level, identifier, token, negative);
      // Transition Duration
      case "duration":
        return this.getTransitionDuration(level, identifier, token, negative);
      // Transition Timing Function
      case "ease":
        return this.getTransitionTimingFunction(
          level,
          identifier,
          token,
          negative,
        );
      // Transition Delay
      case "delay":
        return this.getTransitionDelay(level, identifier, token, negative);
      // Animation
      case "animate":
        return this.getAnimation(level, identifier, token, negative);

      /// Opacity

      case "opacity":
        return this.getOpacity(level, identifier, token, negative);
      // Transform
      case "transform":
        return this.getTransform(level, identifier, token, negative);
      // Scale
      case "scale":
        return this.getScale(level, identifier, token, negative);
      // Rotate
      case "rotate":
        return this.getRotate(level, identifier, token, negative);
      // Translate
      case "translate":
        return this.getTranslate(level, identifier, token, negative);
      // Skew
      case "skew":
        return this.getSkew(level, identifier, token, negative);
      // Transform Origin
      case "origin":
        return this.getTransformOrigin(level, identifier, token, negative);
      // Appearance
      case "appearance":
        return this.getAppearance(level, identifier, token, negative);
      // Cursor
      case "cursor":
        return this.getCursor(level, identifier, token, negative);
      // Outline
      case "outline":
        return this.getOutline(level, identifier, token, negative);
      // Pointer Events
      case "pointer":
        return this.getPointerEvents(level, identifier, token, negative);
      // Resize
      case "resize":
        return this.getResize(level, identifier, token, negative);
      // User Select
      case "select":
        return this.getUserSelect(level, identifier, token, negative);
      // SVG
      case "fill":
      case "stroke":
        return this.getSVG(level, identifier, token, negative);
      // Screen Reader
      case "sr":
        return this.getScreenReader(level, identifier, token, negative);
      case "not":
        if (token === "sr-only") {
          return this.getScreenReader(level, identifier, token, negative);
        } else if (token === "italic") {
          return this.getFontStyle(level, identifier, token, negative);
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
    const q = (token === "px") ? 1 : (+token * 0.25);
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
      : +token * 0.25;
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
        return i + "height: " + (+token * 0.25) + "rem;" + nl;
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
      case "min-content":
        return i + "width: -webkit-min-content;" + nl +
          i + "width: -moz-min-content;" + nl +
          i + "width: min-content;" + nl;
      case "max-content":
        return i + "width: -webkit-max-content;" + nl +
          i + "width: -moz-max-content;" + nl +
          i + "width: max-content;" + nl;
    }

    const pos = token.indexOf("/");
    if (pos !== -1) {
      const n = +token.substring(0, pos);
      const d = +token.substring(pos + 1);
      return i + "width: " + ((n / d) * 100) + "%;" + nl;
    } else {
      return i + "width: " + (+token * 0.25) + "rem;" + nl;
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
      case "w-min-content":
        return i + "min-width: -webkit-min-content;" + nl +
          i + "min-width: -moz-min-content;" + nl +
          i + "min-width: min-content;" + nl;
      case "w-max-content":
        return i + "min-width: -webkit-max-content;" + nl +
          i + "min-width: -moz-max-content;" + nl +
          i + "min-width: max-content;" + nl;
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
      case "w-7xl":
        return i + "max-width: 80rem;" + nl;
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
      case "w-min-content":
        return i + "max-width: -webkit-min-content;" + nl +
          i + "max-width: -moz-min-content;" + nl +
          i + "max-width: min-content;" + nl;
      case "w-max-content":
        return i + "max-width: -webkit-max-content;" + nl +
          i + "max-width: -moz-max-content;" + nl +
          i + "max-width: max-content;" + nl;
      case "w-prose":
        return i + "max-width: 65ch;" + nl;
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

    return i + "-o-object-fit: " + token + ";" + nl +
      i + "object-fit: " + token + ";" + nl;
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

    return i + "-o-object-position: " + token.replace("-", " ") + ";" + nl +
      i + "object-position: " + token.replace("-", " ") + ";" + nl;
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
      type = token;
    }

    if (type !== "0" && type !== "auto") {
      const n = (negative) ? "-" : "";
      type = n + (+type * 0.25) + "rem";
    }

    if (identifier === "inset" && axis === "y") {
      return i + "top: " + type + ";" + nl +
        i + "bottom: " + type + ";" + nl;
    } else if (identifier === "inset" && axis === "x") {
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
    const n = (negative) ? "-" : "";

    return i + "z-index: " + n + token + ";" + nl;
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
      a = +type * 0.25;
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

    const split = amount?.indexOf("/");
    let d;
    let n;

    switch (type) {
      case "span":
        return i + "grid-column: span " + amount + " / span " + amount + ";" +
          nl;
      case "start":
        return i + "grid-column-start: " + amount + ";" + nl;
      case "end":
        return i + "grid-column-end: " + amount + ";" + nl;
      case "gap":
        if (amount === "px") {
          return i + "grid-column-gap: 1px;" + nl +
            i + "-moz-column-gap: 1px;" + nl +
            i + "column-gap: 1px;" + nl;
        } else if (amount === "full") {
          return i + "grid-column-gap: 100%;" + nl +
            i + "-moz-column-gap: 100%;" + nl +
            i + "column-gap: 100%;" + nl;
        } else if (amount === "0") {
          return i + "grid-column-gap: 0;" + nl +
            i + "-moz-column-gap: 0;" + nl +
            i + "column-gap: 0;" + nl;
        } else if (split !== -1) {
          d = amount.substring(0, split);
          n = amount.substring(split + 1);
          return i + "grid-column-gap: " + ((+d / +n) * 100) + "%;" + nl +
            i + "-moz-column-gap: " + ((+d / +n) * 100) + "%;" + nl +
            i + "column-gap: " + ((+d / +n) * 100) + "%;" + nl;
        } else {
          return i + "grid-column-gap: " + (+amount * 0.25) + "rem;" + nl +
            i + "-moz-column-gap: " + (+amount * 0.25) + "rem;" + nl +
            i + "column-gap: " + (+amount * 0.25) + "rem;" + nl;
        }
        return i + "" + nl;
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

    const split = amount?.indexOf("/");
    let d;
    let n;

    switch (type) {
      case "span":
        return i + "grid-row: span " + amount + " / span " + amount + ";" +
          nl;
      case "start":
        return i + "grid-row-start: " + amount + ";" + nl;
      case "end":
        return i + "grid-row-end: " + amount + ";" + nl;
      case "gap":
        if (amount === "px") {
          return i + "grid-row-gap: 1px;" + nl +
            i + "row-gap: 1px;" + nl;
        } else if (amount === "full") {
          return i + "grid-row-gap: 100%;" + nl +
            i + "row-gap: 100%;" + nl;
        } else if (amount === "0") {
          return i + "grid-row-gap: 0;" + nl +
            i + "row-gap: 0;" + nl;
        } else if (split !== -1) {
          d = amount.substring(0, split);
          n = amount.substring(split + 1);
          return i + "grid-row-gap: " + ((+d / +n) * 100) + "%;" + nl +
            i + "row-gap: " + ((+d / +n) * 100) + "%;" + nl;
        } else {
          return i + "grid-row-gap: " + (+amount * 0.25) + "rem;" + nl +
            i + "row-gap: " + (+amount * 0.25) + "rem;" + nl;
        }
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
          return i + "grid-gap: " + (+token * 0.25) + "rem;" + nl +
            i + "gap: " + (+token * 0.25) + "rem;" + nl;
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
          return i + "grid-row-gap: " + (+amount * 0.25) + "rem;" + nl +
            i + "row-gap: " + (+amount * 0.25) + "rem;" + nl;
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
          return i + "grid-column-gap: " + (+amount * 0.25) + "rem;" +
            nl +
            i + "column-gap: " + (+amount * 0.25) + "rem;" + nl;
      }
    }

    return;
  }

  private getScreenReader(
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

    if (token === "only") {
      return i + "position: absolute;" + nl +
        i + "width: 1px;" + nl +
        i + "height: 1px;" + nl +
        i + "padding: 0;" + nl +
        i + "margin: -1px;" + nl +
        i + "overflow: hidden;" + nl +
        i + "clip: rect(0, 0, 0, 0);" + nl +
        i + "white-space: nowrap;" + nl +
        i + "border-width: 0;" + nl;
    } else if (token === "sr-only") {
      return i + "position: static;" + nl +
        i + "width: auto;" + nl +
        i + "height: auto;" + nl +
        i + "padding: 0;" + nl +
        i + "margin: 0;" + nl +
        i + "overflow: visible;" + nl +
        i + "clip: auto;" + nl +
        i + "white-space: normal;" + nl;
    }

    return;
  }

  private getSVG(
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

    if (token === "current") {
      if (identifier === "fill") {
        return i + "fill: currentColor;" + nl;
      } else {
        return i + "stroke: currentColor;" + nl;
      }
    } else {
      return i + "stroke-width: " + token + ";" + nl;
    }
  }

  private getAppearance(
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

    return i + "-webkit-appearance: " + token + ";" + nl +
      i + "-moz-appearance: " + token + ";" + nl +
      i + "appearance: " + token + ";" + nl;
  }

  private getCursor(
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

    return i + "cursor: " + token + ";" + nl;
  }

  private getOutline(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    return i + "outline: 0;" + nl;
  }

  private getPointerEvents(
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

    if (token === "events-none") {
      return i + "pointer-events: none;" + nl;
    } else if (token === "events-auto") {
      return i + "pointer-events: auto;" + nl;
    }

    return;
  }

  private getResize(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "none":
        return i + "resize: none;" + nl;
      case "y":
        return i + "resize: vertical;" + nl;
      case "x":
        return i + "resize: horizontal;" + nl;
      default:
        return i + "resize: both;" + nl;
    }
  }

  private getUserSelect(
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

    return i + "-webkit-user-select: " + token + ";" + nl +
      i + "-moz-user-select: " + token + ";" + nl +
      i + "-ms-user-select: " + token + ";" + nl +
      i + "user-select: " + token + ";" + nl;
  }

  private getTransform(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    if (token === "none") {
      return i + "transform: none;" + nl;
    }

    return i + "--transform-translate-x: 0;" + nl +
      i + "--transform-translate-y: 0;" + nl +
      i + "--transform-rotate: 0;" + nl +
      i + "--transform-skew-x: 0;" + nl +
      i + "--transform-skew-y: 0;" + nl +
      i + "--transform-scale-x: 1;" + nl +
      i + "--transform-scale-y: 1;" + nl +
      i + "transform: translateX(var(--transform-translate-x))" + nl +
      i +
      "  translateY(var(--transform-translate-y)) rotate(var(--transform-rotate))" +
      nl +
      i + "  skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y))" +
      nl +
      i +
      "  scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));" +
      nl;
  }

  private getScale(
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

    let axis;
    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      axis = token.substring(0, pos);
      amount = token.substring(pos + 1);

      if (amount === "0") {
        return i + "--transform-scale-" + axis + ": 0;" + nl;
      }

      return i + "--transform-scale-" + axis + ": " + (+amount / 100) +
        ";" + nl;
    } else {
      if (token === "0") {
        return i + "--transform-scale-x: 0;" + nl +
          i + "--transform-scale-y: 0;" + nl;
      }

      return i + "--transform-scale-x: " + (+token / 100) + ";" + nl +
        i + "--transform-scale-y: " + (+token / 100) + ";" + nl;
    }
  }

  private getRotate(
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

    const n = (negative && token !== "0") ? "-" : "";
    const d = (token !== "0") ? "deg" : "";

    return i + "--transform-rotate: " + n + token + d + ";" + nl;
  }

  private getTranslate(
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

    let axis;
    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      axis = "-" + token.substring(0, pos);
      amount = token.substring(pos + 1);

      const split = amount?.indexOf("/");

      const n = (negative) ? "-" : "";
      let u;
      let a;

      if (amount === "px") {
        u = "px";
        a = "1";
      } else if (split !== -1) {
        u = "%";
        const d = amount.substring(0, split);
        const n = amount.substring(split + 1);
        a = ((+d / +n) * 100).toString();
      } else if (amount === "full") {
        u = "%";
        a = "100";
      } else if (amount === "0") {
        u = "";
        a = "0";
      } else {
        u = "rem";
        a = (+amount * 0.25);
      }

      return i + "--transform-translate-" + axis + ": " + n + a + u + ";" + nl;
    }

    return;
  }

  private getSkew(
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
    let axis;
    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      axis = "-" + token.substring(0, pos);
      amount = token.substring(pos + 1);

      const n = (negative && amount !== "0") ? "-" : "";
      const d = (amount !== "0") ? "deg" : "";

      return i + "--transform-skew-" + axis + ": " + n + amount + d + ";" + nl;
    }
  }

  private getTransformOrigin(
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

    return i + "transform-origin: " + token.replace("-", " ") + ";" + nl;
  }

  private getBoxShadow(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "xs":
        return i + "box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);" + nl;
      case "sm":
        return i + "box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);" + nl;
      case "md":
        return i +
          "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);" +
          nl;
      case "lg":
        return i +
          "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);" +
          nl;
      case "xl":
        return i +
          "box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);" +
          nl;
      case "2xl":
        return i + "box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);" + nl;
      case "inner":
        return i + "box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);" + nl;
      case "outline":
        return i + "box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);" + nl;
      case "none":
        return i + "box-shadow: none;" + nl;
      case "solid":
        return i + "box-shadow: 0 0 0 2px currentColor;" + nl;
      case "outline-gray":
        return i + "box-shadow: 0 0 0 3px rgba(159, 166, 178, 0.45);" + nl;
      case "outline-blue":
        return i + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl;
      case "outline-teal":
        return i + "box-shadow: 0 0 0 3px rgba(126, 220, 226, 0.45);" + nl;
      case "outline-green":
        return i + "box-shadow: 0 0 0 3px rgba(132, 225, 188, 0.45);" + nl;
      case "outline-yellow":
        return i + "box-shadow: 0 0 0 3px rgba(250, 202, 21, 0.45);" + nl;
      case "outline-orange":
        return i + "box-shadow: 0 0 0 3px rgba(253, 186, 140, 0.45);" + nl;
      case "outline-red":
        return i + "box-shadow: 0 0 0 3px rgba(248, 180, 180, 0.45);" + nl;
      case "outline-pink":
        return i + "box-shadow: 0 0 0 3px rgba(248, 180, 217, 0.45);" + nl;
      case "outline-purple":
        return i + "box-shadow: 0 0 0 3px rgba(202, 191, 253, 0.45);" + nl;
      case "outline-indigo":
        return i + "box-shadow: 0 0 0 3px rgba(180, 198, 252, 0.45);" + nl;
      default:
        return i +
          "box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);" +
          nl;
    }
  }

  private getOpacity(
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

    if (token === "0") {
      return i + "opacity: 0;" + nl;
    }

    return i + "opacity: " + (+token / 100) + ";" + nl;
  }

  private getBorderCollapse(
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

    return i + "border-collapse: " + token + ";" + nl;
  }

  private getTableLayout(
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

    return i + "table-layout: " + token + ";" + nl;
  }

  private getTransitionProperty(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "none":
        return i + "transition-property: none;" + nl;
      case "all":
        return i + "transition-property: all;" + nl;
      case "colors":
        return i +
          "transition-property: background-color, border-color, color, fill, stroke;" +
          nl;
      case "opacity":
        return i + "transition-property: opacity" + nl;
      case "shadow":
        return i + "transition-property: box-shadow;" + nl;
      case "transform":
        return i + "transition-property: transform;" + nl;
      default:
        return i +
          "transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;" +
          nl;
    }
  }

  private getTransitionDuration(
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

    return i + "transition-duration: " + token + "ms;" + nl;
  }

  private getTransitionTimingFunction(
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
      case "linear":
        return i + "transition-timing-function: linear;" + nl;
      case "in":
        return i + "transition-timing-function: cubic-bezier(0.4, 0, 1, 1);" +
          nl;
      case "out":
        return i + "transition-timing-function: cubic-bezier(0, 0, 0.2, 1);" +
          nl;
      case "in-out":
        return i + "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);" +
          nl;
      default:
        return;
    }
  }

  private getTransitionDelay(
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

    return i + "transition-delay: " + token + "ms;" + nl;
  }

  private getAnimation(
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
      case "none":
        return i + "animation: none;" + nl;
      case "spin":
        return i + "animation: spin 1s linear infinite;" + nl;
      case "ping":
        return i + "animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;" +
          nl;
      case "pulse":
        return i +
          "animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;" + nl;
      case "bounce":
        return i + "animation: bounce 1s infinite;" + nl;
      default:
        return;
    }
  }

  private getBorderRadius(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    if (token === undefined) {
      return i + "border-radius: 0.25rem;" + nl;
    }

    const [side, amount] = token.split("-");
    let q;

    // Increment
    switch (amount) {
      case "none":
        q = "0";
        break;
      case "sm":
        q = "0.125rem";
        break;
      case "md":
        q = "0.375rem";
        break;
      case "lg":
        q = "0.5rem";
        break;
      case "full":
        q = "9999px";
        break;
      default:
        q = "0.25rem";
    }

    // Side
    switch (side) {
      case "none":
        return i + "border-radius: 0;" + nl;
      case "sm":
        return i + "border-radius: 0.125rem;" + nl;
      case "md":
        return i + "border-radius: 0.375rem;" + nl;
      case "lg":
        return i + "border-radius: 0.5rem;" + nl;
      case "full":
        return i + "border-radius: 9999px;" + nl;
      case "t":
        return i + "border-top-left-radius: " + q + ";" + nl +
          i + "border-top-right-radius: " + q + ";" + nl;
      case "r":
        return i + "border-top-right-radius: " + q + ";" + nl +
          i + "border-bottom-right-radius: " + q + ";" + nl;
      case "b":
        return i + "border-bottom-right-radius: " + q + ";" + nl +
          i + "border-bottom-left-radius: " + q + ";" + nl;
      case "l":
        return i + "border-top-left-radius: " + q + ";" + nl +
          i + "border-bottom-left-radius: " + q + ";" + nl;
      case "tl":
        return i + "border-top-left-radius: " + q + ";" + nl;
      case "tr":
        return i + "border-top-right-radius: " + q + ";" + nl;
      case "br":
        return i + "border-bottom-right-radius: " + q + ";" + nl;
      case "bl":
        return i + "border-bottom-left-radius: " + q + ";" + nl;
      default:
        return i + "border-radius: 0.25rem;" + nl;
    }
  }

  private getBorderWidth(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    if (token === undefined) {
      return i + "border-width: 1px;" + nl;
    }

    let side;
    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      side = token.substring(0, pos);
      amount = token.substring(pos + 1);
      const u = (amount === "0") ? "" : "px";
      switch (side) {
        case "t":
          return i + "border-top-width: " + amount + u + ";" + nl;
        case "r":
          return i + "border-right-width: " + amount + u + ";" + nl;
        case "b":
          return i + "border-bottom-width: " + amount + u + ";" + nl;
        case "l":
          return i + "border-left-width: " + amount + u + ";" + nl;
        default:
          return;
      }
    } else {
      switch (token) {
        case "t":
          return i + "border-top-width: 1px;" + nl;
        case "r":
          return i + "border-right-width: 1px;" + nl;
        case "b":
          return i + "border-bottom-width: 1px;" + nl;
        case "l":
          return i + "border-left-width: 1px;" + nl;
        default:
          if (token === "0") {
            return i + "border-width: 0;" + nl;
          } else {
            return i + "border-width: " + token + "px;" + nl;
          }
      }
    }
  }

  private getBorderColor(
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
      case "current":
        return i + "border-color: currentColor;" + nl;
      case "transparent":
        return i + "border-color: transparent;" + nl;
      default:
        if (this.color.has(token)) {
          const c = this.color.get(token) as ColorDefinition;
          return i + "--border-opacity: 1;" + nl +
            i + "border-color: " + c.hex + ";" + nl +
            i + "border-color: rgba(" + c.rgb + ", var(--border-opacity));" +
            nl;
        }
        return;
    }
  }

  private getBorderOpacity(
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

      if (amount === "0") {
        return i + "--border-opacity: 0;" + nl;
      } else {
        return i + "--border-opacity: " + (+amount / 100) + ";" + nl;
      }
    }

    return;
  }

  private getBorderStyle(
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

    return i + "border-style: " + token + ";" + nl;
  }

  private getDivideWidth(
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
    let children = "";

    switch (token) {
      case "y":
        children += i + "--divide-y-reverse: 0;" + nl;
        children += i +
          "border-top-width: calc(1px * calc(1 - var(--divide-y-reverse)));" +
          nl;
        children += i +
          "border-bottom-width: calc(1px * var(--divide-y-reverse));" + nl;
        break;
      case "x":
        children += i + "--divide-x-reverse: 0;" + nl;
        children += i +
          "border-right-width: calc(1px * var(--divide-x-reverse));" + nl;
        children += i +
          "border-left-width: calc(1px * calc(1 - var(--divide-x-reverse)));" +
          nl;
        break;
      case "y-reverse":
        children += i + "--divide-y-reverse: 1;" + nl;
        break;
      case "x-reverse":
        children += i + "--divide-x-reverse: 1;" + nl;
        break;
    }

    if (!children.length) {
      let axis;
      let amount;
      const pos = token.indexOf("-");
      if (pos !== -1) {
        axis = token.substring(0, pos);
        amount = token.substring(pos + 1);

        if (axis === "y") {
          children += i + "--divide-y-reverse: 0;" + nl;
          children += i + "border-top-width: calc(" + amount +
            "px * calc(1 - var(--divide-y-reverse)));" + nl;
          children += i + "border-bottom-width: calc(" + amount +
            "px * var(--divide-y-reverse));" + nl;
        } else if (axis === "x") {
          children += i + "--divide-x-reverse: 0;" + nl;
          children += i + "border-right-width: calc(" + amount +
            "px * var(--divide-x-reverse));" + nl;
          children += i + "border-left-width: calc(" + amount +
            "px * calc(1 - var(--divide-x-reverse)));" + nl;
        } else {
          return;
        }
      } else {
        return;
      }
    }

    return {
      post: " > :not(template) ~ :not(template)",
      children,
    };
  }

  private getDivideColor(
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
    let children = "";

    switch (token) {
      case "current":
        children += i + "border-color: currentColor;" + nl;
        break;
      case "transparent":
        children += i + "border-color: transparent;" + nl;
        break;
      default:
        if (this.color.has(token)) {
          const c = this.color.get(token) as ColorDefinition;
          children += i + "--divide-opacity: 1;" + nl;
          children += i + "border-color: " + c.hex + ";" + nl;
          children += i + "border-color: rgba(" + c.rgb +
            ", var(--divide-opacity));" + nl;
        } else {
          return;
        }
    }

    return {
      post: " > :not(template) ~ :not(template)",
      children,
    };
  }

  private getDivideOpacity(
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
    let children = "";
    const pos = token.indexOf("-");
    if (pos !== -1) {
      amount = token.substring(pos + 1);

      if (amount === "0") {
        children += i + "--divide-opacity: 0;" + nl;
      } else if (amount !== undefined) {
        children += i + "--divide-opacity: " + (+amount / 100) + ";" +
          nl;
      } else {
        return;
      }

      return {
        post: " > :not(template) ~ :not(template)",
        children,
      };
    }

    return;
  }

  private getDivideStyle(
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

    return {
      post: " > :not(template) ~ :not(template)",
      children: i + "border-style: " + token + ";" + nl,
    };
  }

  private getBackgroundAttachment(
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

    return i + "background-attachment: " + token + ";" + nl;
  }

  private getBackgroundClip(
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
      case "clip-border":
        return i + "background-clip: border-box;" + nl;
      case "clip-padding":
        return i + "background-clip: padding-box;" + nl;
      case "clip-content":
        return i + "background-clip: content-box;" + nl;
      case "clip-text":
        return i + "-webkit-background-clip: text;" + nl +
          i + "background-clip: text;" + nl;
    }
  }

  private getBackgroundColor(
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
      case "current":
        return i + "background-color: currentColor;" + nl;
      case "transparent":
        return i + "background-color: transparent;" + nl;
      default:
        if (this.color.has(token)) {
          const c = this.color.get(token) as ColorDefinition;
          return i + "--bg-opacity: 1;" + nl +
            i + "background-color: " + c.hex + ";" + nl +
            i + "background-color: rgba(" + c.rgb + ", var(--bg-opacity));" +
            nl;
        }
        return;
    }
  }

  private getBackgroundOpacity(
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

      if (amount === "0") {
        return i + "--bg-opacity: 0;" + nl;
      } else {
        return i + "--bg-opacity: " + (+amount / 100) + ";" + nl;
      }
    }

    return;
  }

  private getBackgroundPosition(
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

    return i + "background-position: " + token.replace("-", " ") + ";" + nl;
  }

  private getBackgroundRepeat(
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
      case "repeat-round":
        return i + "background-repeat: round;" + nl;
      case "repeat-space":
        return i + "background-repeat: space;" + nl;
      default:
        return i + "background-repeat: " + token + ";" + nl;
    }
  }

  private getBackgroundSize(
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

    return i + "background-size: " + token + ";" + nl;
  }

  private getBackgroundImage(
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
      case "none":
        return i + "background-image: none;" + nl;
      case "gradient-to-t":
        return i +
          "background-image: linear-gradient(to top, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-tr":
        return i +
          "background-image: linear-gradient(to top right, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-r":
        return i +
          "background-image: linear-gradient(to right, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-br":
        return i +
          "background-image: linear-gradient(to bottom right, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-b":
        return i +
          "background-image: linear-gradient(to bottom, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-bl":
        return i +
          "background-image: linear-gradient(to bottom left, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-l":
        return i +
          "background-image: linear-gradient(to left, var(--gradient-color-stops));" +
          nl;
      case "gradient-to-tl":
        return i +
          "background-image: linear-gradient(to top left, var(--gradient-color-stops));" +
          nl;
      default:
        return;
    }
  }

  private getGradientColorStops(
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

    if (identifier === "from") {
      switch (token) {
        case "current":
          return i + "--gradient-from-color: currentColor;" + nl +
            i + "--gradient-color-stops: var(--gradient-from-color)," + nl +
            i + "  var(--gradient-to-color, rgba(255, 255, 255, 0));" + nl;
        case "transparent":
          return i + "--gradient-from-color: transparent;" + nl +
            i + "--gradient-color-stops: var(--gradient-from-color)," + nl +
            i + "  var(--gradient-to-color, rgba(0, 0, 0, 0));" + nl;
        default:
          if (this.color.has(token)) {
            const c = this.color.get(token) as ColorDefinition;
            return i + "--gradient-from-color: " + c.hex + ";" + nl +
              i + "--gradient-color-stops: var(--gradient-from-color)," + nl +
              i + "  var(--gradient-to-color, rgba(" + c.rgb + ", 0));" + nl;
          }
          return;
      }
    } else if (identifier === "via") {
      switch (token) {
        case "current":
          return i + "--gradient-via-color: currentColor;" + nl +
            i +
            "--gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color)," +
            nl +
            i + "  var(--gradient-to-color, rgba(255, 255, 255, 0));" + nl;
        case "transparent":
          return i + "--gradient-via-color: transparent;" + nl +
            i +
            "--gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color)," +
            nl +
            i + "  var(--gradient-to-color, rgba(0, 0, 0, 0));" + nl;
        default:
          if (this.color.has(token)) {
            const c = this.color.get(token) as ColorDefinition;
            return i + "--gradient-via-color: " + c.hex + ";" + nl +
              i +
              "--gradient-color-stops: var(--gradient-from-color), var(--gradient-via-color)," +
              nl +
              i + "  var(--gradient-to-color, rgba(" + c.rgb + ", 0));" + nl;
          }
          return;
      }
    } else if (identifier == "to") {
      switch (token) {
        case "current":
          return i + "--gradient-to-color: currentColor;" + nl;
        case "transparent":
          return i + "--gradient-to-color: transparent;" + nl;
        default:
          if (this.color.has(token)) {
            const c = this.color.get(token) as ColorDefinition;
            return i + "--gradient-to-color: " + c.hex + ";" + nl;
          }
          return;
      }
    }
  }

  private getFontFamily(
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
      case "sans":
        return i +
          'font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";' +
          nl;
      case "serif":
        return i +
          'font-family: Georgia, Cambria, "Times New Roman", Times, serif;' +
          nl;
      case "mono":
        return i +
          'font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;' +
          nl;
      default:
        return;
    }
  }

  private getFontSize(
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
      case "xs":
        return i + "font-size: 0.75rem;" + nl;
      case "sm":
        return i + "font-size: 0.875rem;" + nl;
      case "base":
        return i + "font-size: 1rem;" + nl;
      case "lg":
        return i + "font-size: 1.125rem;" + nl;
      case "xl":
        return i + "font-size: 1.25rem;" + nl;
      case "2xl":
        return i + "font-size: 1.5rem;" + nl;
      case "3xl":
        return i + "font-size: 1.875rem;" + nl;
      case "4xl":
        return i + "font-size: 2.25rem;" + nl;
      case "5xl":
        return i + "font-size: 3rem;" + nl;
      case "6xl":
        return i + "font-size: 4rem;" + nl;
      default:
        return;
    }
  }

  private getFontSmoothing(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      // Subpixel Antialized
      case "antialiased":
        return i + "-webkit-font-smoothing: auto;" + nl +
          i + "-moz-osx-font-smoothing: auto;" + nl;
      default:
        // Antialized
        return i + "-webkit-font-smoothing: antialiased;" + nl +
          i + "-moz-osx-font-smoothing: grayscale;" + nl;
    }
  }

  private getFontStyle(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      // Not Italic
      case "italic":
        return i + "font-style: normal;" + nl;
      default:
        // Italic
        return i + "font-style: italic;" + nl;
    }
  }

  private getFontWeight(
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
      case "hairline":
        return i + "font-weight: 100;" + nl;
      case "thin":
        return i + "font-weight: 200;" + nl;
      case "light":
        return i + "font-weight: 300;" + nl;
      case "normal":
        return i + "font-weight: 400;" + nl;
      case "medium":
        return i + "font-weight: 500;" + nl;
      case "semibold":
        return i + "font-weight: 600;" + nl;
      case "bold":
        return i + "font-weight: 700;" + nl;
      case "extrabold":
        return i + "font-weight: 800;" + nl;
      case "black":
        return i + "font-weight: 900;" + nl;
      default:
        return;
    }
  }

  private getLetterSpacing(
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
      case "tighter":
        return i + "letter-spacing: -0.05em;" + nl;
      case "tight":
        return i + "letter-spacing: -0.025em;" + nl;
      case "normal":
        return i + "letter-spacing: 0;" + nl;
      case "wide":
        return i + "letter-spacing: 0.025em;" + nl;
      case "wider":
        return i + "letter-spacing: 0.05em;" + nl;
      case "widest":
        return i + "letter-spacing: 0.1em;" + nl;
      default:
        return;
    }
  }

  private getLineHeight(
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
      case "none":
        return i + "line-height: 1;" + nl;
      case "tight":
        return i + "line-height: 1.25;" + nl;
      case "snug":
        return i + "line-height: 1.375;" + nl;
      case "normal":
        return i + "line-height: 1.5;" + nl;
      case "relaxed":
        return i + "line-height: 1.625;" + nl;
      case "loose":
        return i + "line-height: 2;" + nl;
      default:
        if (token === "0") {
          return i + "line-height: 0;" + nl;
        } else {
          return i + "line-height: " + (+token * 0.25) + "rem;" + nl;
        }
        return;
    }
  }

  private getListStyleType(
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
      case "none":
        return i + "list-style-type: none;" + nl;
      case "disc":
        return i + "list-style-type: disc;" + nl;
      case "decimal":
        return i + "list-style-type: decimal;" + nl;
      default:
        return;
    }
  }

  private getListStylePosition(
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
      case "inside":
        return i + "list-style-position: inside;" + nl;
      case "outside":
        return i + "list-style-position: outside;" + nl;
      default:
        return;
    }
  }

  private getPlaceholderColor(
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
    let children = "";

    switch (token) {
      case "current":
        children += i + "background-color: currentColor;" + nl;
        break;
      case "transparent":
        children += i + "background-color: transparent;" + nl;
        break;
      default:
        if (this.color.has(token)) {
          const c = this.color.get(token) as ColorDefinition;
          children += i + "--placeholder-opacity: 1;" + nl;
          children += i + "color: " + c.hex + ";" + nl;
          children += i + "color: rgba(" + c.rgb +
            ", var(--placeholder-opacity));" + nl;
        }
    }

    return {
      post: [
        "::-moz-placeholder",
        ":-ms-input-placeholder",
        "::-ms-input-placeholder",
        "::placeholder",
      ],
      children,
    };
  }

  private getPlaceholderOpacity(
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
    let children = "";

    let amount;
    const pos = token.indexOf("-");
    if (pos !== -1) {
      amount = token.substring(pos + 1);

      if (amount === "0") {
        children += i + "--placeholder-opacity: 0;" + nl;
      } else {
        children += i + "--placeholder-opacity: " + (+amount / 100) +
          ";" + nl;
      }

      return {
        post: [
          "::-moz-placeholder",
          ":-ms-input-placeholder",
          "::-ms-input-placeholder",
          "::placeholder",
        ],
        children,
      };
    }

    return;
  }

  private getTextAlignment(
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
      case "left":
        return i + "text-align: left;" + nl;
      case "center":
        return i + "text-align: center;" + nl;
      case "right":
        return i + "text-align: right;" + nl;
      case "justify":
        return i + "text-align: justify;" + nl;
      default:
        return;
    }
  }

  private getTextColor(
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
      case "current":
        return i + "color: currentColor;" + nl;
      case "transparent":
        return i + "color: transparent;" + nl;
      default:
        if (this.color.has(token)) {
          const c = this.color.get(token) as ColorDefinition;
          return i + "--text-opacity: 1;" + nl +
            i + "color: " + c.hex + ";" + nl +
            i + "color: rgba(" + c.rgb + ", var(--text-opacity));" +
            nl;
        }
        return;
    }
  }

  private getTextOpacity(
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

      if (amount === "0") {
        return i + "--text-opacity: 0;" + nl;
      } else {
        return i + "--text-opacity: " + (+amount / 100) + ";" + nl;
      }
    }

    return;
  }

  private getTextDecoration(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (token) {
      case "through":
        return i + "text-decoration: line-through;" + nl;
      case "underline":
        return i + "text-decoration: none;" + nl;
      default:
        return i + "text-decoration: underline;" + nl;
    }
  }

  private getTextTransform(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    switch (identifier) {
      case "uppercase":
        return i + "text-transform: uppercase;" + nl;
      case "lowercase":
        return i + "text-transform: lowercase;" + nl;
      case "capitalize":
        return i + "text-transform: capitalize;" + nl;
      case "normal":
        return i + "text-transform: none;" + nl;
      default:
        return;
    }
  }

  private getVerticalAlignment(
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

    return i + "vertical-align: " + token + ";" + nl;
  }

  private getWhitespace(
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
      case "normal":
        return i + "white-space: normal;" + nl;
      case "no-wrap":
        return i + "white-space: nowrap;" + nl;
      case "pre":
        return i + "white-space: pre;" + nl;
      case "pre-line":
        return i + "white-space: pre-line;" + nl;
      case "pre-wrap":
        return i + "white-space: pre-wrap;" + nl;
      default:
        return;
    }
  }

  private getWordBreak(
    level: number,
    identifier: string,
    token?: string,
    negative = false,
  ): string | void | ModifyProperty {
    // indent & new line
    const i = this.indent(level + 1);
    const nl = this.newline();

    if (identifier === "truncate") {
      return i + "overflow: hidden" + nl +
        i + "text-overflow: ellipsis;" + nl +
        i + "white-space: nowrap;" + nl;
    }

    switch (token) {
      case "normal":
        return i + "overflow-wrap: normal" + nl +
          i + "word-break: normal;" + nl;
      case "words":
        return i + "overflow-wrap: break-word" + nl;
      case "all":
        return i + "word-break: break-all" + nl;
      default:
        return;
    }
  }
}
