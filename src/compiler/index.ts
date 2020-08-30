import { cyan, red, yellow, bold } from "../../deps.ts";
import {
  Node,
  Identifier,
  Literal,
  Text,
  MemberExpression,
  Doctype,
  Comment,
  Tag,
  Attribute,
  AttributeName,
  AttributeValue,
  AttributeExpression,
  AttributeSpread,
  ElementDirective,
  UnaryExpression,
  UpdateExpression,
  BinaryExpression,
  LogicalExpression,
  IfBlock,
  ElseBlock,
  ElseIfBlock,
  SkipBlock,
  IsBlock,
  WhenBlock,
  EachBlock,
  BreakStatement,
  ContinueStatement,
  DataDirective,
  DataResponse,
  State,
  ComponentDirective,
  SlotDirective,
  LayoutDirective,
  RouterDirective,
  PathDirective,
  StaticPathSegment,
  OptionalPathSegment,
  PaginationPathSegment,
  RangePathSegment,
  DynamicPathSegment,
  PathDefinition,
  PathPart,
  PathSegment,
  ScriptTag,
  StyleTag,
  UpdateType,
  CompilerResponse,
  ScriptInstance,
  StyleInstance,
  HeadDirective,
} from "../types.ts";
import voidElements from "../dict/voidElements.ts";
import htmlElements from "../dict/htmlElements.ts";
import { resolveData } from "../resolvers/data.ts";
import { resolveComponent } from "../resolvers/component.ts";
import { resolveLayout } from "../resolvers/layout.ts";
import config from "../config/index.ts";

// TODO: Finish All Types
//
//   01.    [X] Comment
//   02.    [X] Doctype
//   03.    [X] Tags
//   04.    [X] Attribute
//   05.    [X] AttributeExpression
//   06.    [X] AttributeSpread
//   07.    [X] AttributeName
//   08.    [X] AttributeValue
//   09.    [X] Text
//   10.    [X] ComponentDirective
//   11.    [X] ElementDirective
//   12.    [X] LayoutDirective
//   13.    [X] RouterDirective
//   14.    [X] PathDirective
//   15.    [X] DynamicPathSegment
//   16.    [X] StaticPathSegment
//   17.    [X] OptionalPathSegment
//   18.    [X] PaginationPathSegment
//   19.    [X] RangePathSegment
//   17.    [X] DataDirective
//   18.    [X] SlotDirective
//   19.    [X] IfBlock
//   20.    [X] ElseIfBlock
//   21.    [X] SkipBlock
//   22.    [X] WhenBlock
//   23.    [X] IsBlock
//   24.    [X] EachBlock
//   25.    [X] ElseBlock
//   26.    [X] ContinueStatement
//   27.    [X] BreakStatement
//   28.    [X] BinaryExpression
//   29.    [X] LogicalExpression
//   30.    [X] MemberExpression
//   31.    [X] UnaryExpression
//   32.    [X] UpdateExpression
//   33.    [X] Identifier
//   34.    [X] Literal
//   35.    [ ] ScriptTag - missing file
//   36.    [ ] StyleTag - missing file
//   37.    [X] HeadDirective

const nodeTypes = new Map();

// Tag AST Node
const tag = async (node: Tag, state: State, cb: Function): Promise<string> => {
  let attributes = "";
  let children = "";

  // Attributes
  if (node.attributes.length) {
    attributes = await unionAttributes(node.attributes, state, cb);
  }

  // Report
  if (node.classes.length) {
    cb(["Classes", node.classes]);
  }

  // Void Element - Exit Early
  if (voidElements.has(node.data)) {
    return `<${node.data}${attributes}>`;
  }

  // Children
  if (node.children.length) {
    children = await unionChildren(node.children, state, cb);
  }

  return `<${node.data}${attributes}>${children}</${node.data}>`;
};

nodeTypes.set("Tag", tag);

// ScriptTag AST Node
const scriptTag = async (
  node: ScriptTag,
  state: State,
  cb: Function,
): Promise<string> => {
  let attributes = "";
  let children = "";

  // Attributes
  if (node.attributes.length) {
    attributes = await unionAttributes(node.attributes, state, cb);
  }

  // Children
  if (node.children.length) {
    children = await unionChildren(node.children, state, cb);
  }

  // Lang
  let lang = "js";
  if (node.lang !== undefined) {
    lang = await compileNode(node.lang, state, cb);
    if (lang.toLowerCase() === "ts") {
      lang = "ts";
    }
  }

  if (!children.length) {
    // Script tags include src
    return `<${node.data}${attributes}>${children}</${node.data}>`;
  } else {
    // Report - Inline Script
    cb(["Scripts", {
      file: state.__internals__.fileName,
      source: children,
      lang,
    }]);
    return "";
  }
};

nodeTypes.set("ScriptTag", scriptTag);

// StyleTag AST Node
const styleTag = async (
  node: StyleTag,
  state: State,
  cb: Function,
): Promise<string> => {
  let children = "";

  // Attributes
  if (node.attributes.length) {
    emitWarning(`Style Tag has invalid attributes that will be ignored`);
  }

  // Children
  if (node.children.length) {
    children = await unionChildren(node.children, state, cb);
  }

  // Report
  cb(["Styles", {
    file: state.__internals__.fileName,
    source: children,
  }]);

  return "";
};

nodeTypes.set("StyleTag", styleTag);

// Attribute AST Node
const attribute = async (
  node: Attribute,
  state: State,
  cb: Function,
): Promise<Array<State>> => {
  const name = await compileNode(node.name, state, cb);
  const value = await compileNode(node.value, state, cb);
  const classes = [];

  if (
    name === "class" && node.value.type === "AttributeExpression" &&
    value === "string"
  ) {
    const parts = (value as string).split(" ");

    for (let i = 0, len = parts.length; i < len; i++) {
      if (parts[i] === undefined || parts[i].length === 0) {
        continue;
      }
      classes.push(parts[i]);
    }
  }

  // Report
  if (classes.length) {
    cb(["Classes", classes]);
  }

  return [[name, value]];
};

nodeTypes.set("Attribute", attribute);

// AttributeName AST Node
const attributeName = (node: AttributeName, state: State): string => {
  return node.data;
};

nodeTypes.set("AttributeName", attributeName);

// AttributeValue AST Node
const attributeValue = (
  node: AttributeValue,
  state: State,
): string | undefined => {
  return node.data.length === 0 ? undefined : node.data;
};

nodeTypes.set("AttributeValue", attributeValue);

// AttributeExpression AST Node
const attributeExpression = (
  node: AttributeExpression,
  state: State,
  cb: Function,
  // deno-lint-ignore no-explicit-any
): any => {
  return compileNode(node.expression, state, cb);
};

nodeTypes.set("AttributeExpression", attributeExpression);

// AttributeSpread AST Node
const attributeSpread = async (
  node: AttributeSpread,
  state: State,
  cb: Function,
): Promise<Array<State>> => {
  const output = [];
  const classes = [];
  const spread = await compileNode(node.expression, state, cb);
  for (let name of Object.keys(spread)) {
    if (name === "class") {
      const parts = spread[name].value.split(" ");

      for (let i = 0, len = parts.length; i < len; i++) {
        if (parts[i] === undefined || parts[i].length === 0) {
          continue;
        }
        classes.push(parts[i]);
      }
    }

    output.push([name, spread[name]]);
  }

  // Report
  if (classes.length) {
    cb(["Classes", classes]);
  }

  return output;
};

nodeTypes.set("AttributeSpread", attributeSpread);

// Doctype AST Node
const doctype = (node: Doctype, state: State): string => {
  return node.data;
};

nodeTypes.set("Doctype", doctype);

// Comment AST Node
const comment = (node: Comment, state: State): string => {
  return "<!--" + node.data + "-->";
};

nodeTypes.set("Comment", comment);

// Identifier AST Node
// deno-lint-ignore no-explicit-any
const identifier = (node: Identifier, state: State): any => {
  if (node.data === "__internals__") {
    return emitWarning(`Identifier '${cyan(node.data)}' is disallowed.`);
  }

  try {
    return state[node.data];
  } catch (e) {
    return emitWarning(`Identifier '${cyan(node.data)}' not found in state.`);
  }
};

nodeTypes.set("Identifier", identifier);

// Literal AST Node
const literal = (
  node: Literal,
  state: State,
): number | string | boolean | undefined => {
  return node.value;
};

nodeTypes.set("Literal", literal);

// UnaryExpression AST Node
const unaryExpression = async (
  node: UnaryExpression,
  state: State,
  cb: Function,
) => {
  const argument = await compileNode(node.argument, state, cb);
  try {
    switch (node.operator) {
      case "!":
        return !argument;
      case "+":
        return +argument;
      case "-":
        return -argument;
      case "~":
        return ~argument;
      default:
        emitWarning(
          `Unknown UnaryExpression '${
            cyan(
              node.operator,
            )
          }'. Returned argument and ignored UnaryExpression`,
        );
        return argument;
    }
  } catch (e) {
    return emitWarning(
      `Can't process UnaryExpression '${
        cyan(
          node.operator,
        )
      }'. Returned undefined amd ignored UnaryExpression.`,
    );
  }
};

nodeTypes.set("UnaryExpression", unaryExpression);

// UpdateExpression AST Node
const updateExpression = async (
  node: UpdateExpression,
  state: State,
  cb: Function,
) => {
  let argument = await compileNode(node.argument, state, cb);
  let output;
  try {
    if (node.operator === "++" && node.prefix) {
      return ++argument;
    } else if (node.operator === "++" && !node.prefix) {
      // return argument++;
      return ++argument; // Do we need to handle postfix?
    } else if (node.operator === "--" && node.prefix) {
      return --argument;
    } else if (node.operator === "--" && !node.prefix) {
      // return argument--;
      return --argument; // Do we need to handle postfix?
    }

    // Unknonw UnaryExpression
    emitWarning(
      `Unknown UnaryExpression '${
        cyan(
          node.operator,
        )
      }'. Returned argument and ignored UnaryExpression`,
    );
    return argument;
  } catch (e) {
    // Something horrible went wrong
    return emitWarning(
      `Can't process UnaryExpression '${
        cyan(
          node.operator,
        )
      }'. Returned undefined amd ignored UnaryExpression.`,
    );
  }
};

nodeTypes.set("UpdateExpression", updateExpression);

// BinaryExpression AST Node
const binaryExpression = async (
  node: BinaryExpression,
  state: State,
  cb: Function,
) => {
  const left = await compileNode(node.left, state, cb);
  const right = await compileNode(node.right, state, cb);
  try {
    switch (node.operator) {
      case "|":
        return left | right;
      case "^":
        return left ^ right;
      case "&":
        return left & right;
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "===":
        return left === right;
      case "!==":
        return left !== right;
      case "<":
        return left < right;
      case ">":
        return left > right;
      case "<=":
        return left <= right;
      case ">=":
        return left >= right;
      case "<<":
        return left << right;
      case ">>":
        return left >> right;
      case ">>>":
        return left >>> right;
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      case "%":
        return left % right;
      default:
        return emitWarning(
          `Unknown BinaryExpression '${
            cyan(
              node.operator,
            )
          }'. Returned undefined amd ignored BinaryExpression.`,
        );
    }
  } catch (e) {
    return emitWarning(
      `Can't process BinaryExpression '${
        cyan(
          node.operator,
        )
      }'. Returned undefined amd ignored BinaryExpression.`,
    );
  }
};

nodeTypes.set("BinaryExpression", binaryExpression);

// LogicalExpression AST Node
const logicalExpression = async (
  node: LogicalExpression,
  state: State,
  cb: Function,
) => {
  const left = await compileNode(node.left, state, cb);
  const right = await compileNode(node.right, state, cb);
  try {
    switch (node.operator) {
      case "||":
        return left || right;
      case "&&":
        return left && right;
      default:
        return emitWarning(
          `Unknown LogicalExpression '${
            cyan(
              node.operator,
            )
          }'. Returned undefined amd ignored LogicalExpression.`,
        );
    }
  } catch (e) {
    return emitWarning(
      `Can't process LogicalExpression '${
        cyan(
          node.operator,
        )
      }'. Returned undefined amd ignored LogicalExpression.`,
    );
  }
};

nodeTypes.set("LogicalExpression", logicalExpression);

// Text AST Node
const text = (node: Text, state: State, cb: Function) => {
  return node.data;
};

nodeTypes.set("Text", text);

// HeadDirective AST Node
const headDirective = async (
  node: HeadDirective,
  state: State,
  cb: Function,
): Promise<string> => {
  // Report
  if (node.children.length) {
    cb(["Head", node.children]);
  } else {
    emitWarning(`HeadDirective has no children, ignoring.`);
  }

  return "";
};

nodeTypes.set("HeadDirective", headDirective);

// ComponentDirective AST Node
const componentDirective = async (
  node: ComponentDirective,
  state: State,
  cb: Function,
): Promise<string> => {
  const component = await compileNode(node.expression, state, cb);
  const attrs = new Map();
  let localState: State = {
    __internals__: {
      slots: {},
    },
  };

  // Can't Render Component
  if (typeof component !== "string") {
    emitWarning(
      `Component Directive '${
        cyan(
          component,
        )
      }' not found in state. Could not render node.`,
    );
    return "";
  }

  // Need to build a map of all attributes and process
  for (let i = 0, aLen = node.attributes.length; i < aLen; i++) {
    const list = await compileNode(node.attributes[i], state, cb);
    for (let x = 0, lLen = list.length; x < lLen; x++) {
      const [name, value] = list[x];
      attrs.set(name, value);
    }
  }

  // Build Local State
  const attrsIterator = attrs[Symbol.iterator]();
  for (const [name, value] of attrsIterator) {
    localState[name] = value;
  }

  const root = localState.__internals__.slots;
  root.default = [];
  // Add Slot Information
  for (let i = 0, len = node.children.length; i < len; i++) {
    const child = node.children[i];
    if (
      child.type === "ComponentDirective" ||
      child.type === "ElementDirective" ||
      child.type === "Tag"
    ) {
      if (
        (child as ComponentDirective | ElementDirective | Tag).slot !==
          undefined
      ) {
        // Named
        const slot = await compileNode(child.slot as Literal, state, cb);

        if (typeof slot !== "string") {
          emitWarning(
            `Slot name '${
              cyan(
                slot,
              )
            }' not found in state. Passed as default slot.`,
          );
          root.default.push(child);
        }

        if (!Array.isArray(root[slot])) {
          root[slot] = [];
        }

        root[slot].push(child);
      } else {
        // Default
        root.default.push(child);
      }
    } else {
      // Default
      root.default.push(child);
    }
  }

  // Get Component
  try {
    // Return Component
    const res = await resolveComponent(component);

    // Report
    if (res.meta.file) {
      cb(["File", res.meta.file]);
      localState.__internals__.fileName = res.meta.file;
      if (res.meta.cacheHit) {
        cb(["CacheHit"]);
      } else {
        cb(["CacheMiss"]);
      }
    }

    return await unionChildren(res.ast.html, localState, cb);
  } catch (e) {
    emitError(`Unable to process Component Directive ${bold(red(component))}.`);
    return "";
  }
};

nodeTypes.set("ComponentDirective", componentDirective);

// LayoutDirective AST Node
const layoutDirective = async (
  node: LayoutDirective,
  state: State,
  cb: Function,
): Promise<string> => {
  const layout = await compileNode(node.expression, state, cb);
  const attrs = new Map();
  let localState: State = {
    __internals__: {
      fileName: "",
    },
  };

  // Can't Render Component
  if (typeof layout !== "string") {
    emitWarning(
      `Layout Directive '${
        cyan(
          layout,
        )
      }' not found in state. Could not render node.`,
    );
    return "";
  }

  // Need to build a map of all attributes and process
  for (let i = 0, aLen = node.attributes.length; i < aLen; i++) {
    const list = await compileNode(node.attributes[i], state, cb);
    for (let x = 0, lLen = list.length; x < lLen; x++) {
      const [name, value] = list[x];
      attrs.set(name, value);
    }
  }

  // Build Local State
  const attrsIterator = attrs[Symbol.iterator]();
  for (const [name, value] of attrsIterator) {
    localState[name] = value;
  }

  // Get Layout
  try {
    // Return Layout
    const res = await resolveLayout(layout);

    // Report
    if (res.meta.file) {
      cb(["File", res.meta.file]);
      localState.__internals__.fileName = res.meta.file;
      if (res.meta.cacheHit) {
        cb(["CacheHit"]);
      } else {
        cb(["CacheMiss"]);
      }
    }

    return await unionChildren(res.ast.html, scopeState(state, localState), cb);
  } catch (e) {
    emitError(`Unable to process Layout Directive ${bold(red(layout))}.`);
    return "";
  }
};

nodeTypes.set("LayoutDirective", layoutDirective);

// SlotDirective AST Node
const slotDirective = async (
  node: SlotDirective,
  state: State,
  cb: Function,
): Promise<string> => {
  let name = "default";
  if (node.expression) {
    name = await compileNode(node.expression, state, cb);
  }

  // Can't Render Tag
  if (typeof name !== "string") {
    emitWarning(
      `Slot Directive '${
        cyan(
          name,
        )
      }' not found in state. Could not render node.`,
    );
    return "";
  }

  // Return Default or Children, or Nothing
  const slots = state?.["__internals__"]?.["slots"];

  if (slots?.[name] && slots?.[name].length) {
    return await unionChildren(slots[name], state, cb);
  } else if (node.children.length) {
    return await unionChildren(node.children, state, cb);
  } else {
    return "";
  }
};

nodeTypes.set("SlotDirective", slotDirective);

// ElementDirective AST Node
const elementDirective = async (
  node: ElementDirective,
  state: State,
  cb: Function,
): Promise<string> => {
  const tagType = await compileNode(node.expression, state, cb);

  // Can't Render Tag
  if (typeof tagType !== "string") {
    emitWarning(
      `Element Directive '${
        cyan(
          tagType,
        )
      }' not found in state. Could not render node.`,
    );
    return "";
  }

  // Can render but not valid HTML element
  if (!htmlElements.has(tagType)) {
    emitWarning(
      `Element Directive '${
        cyan(
          tagType,
        )
      }' is not a valid HTML tag. Node still rendered.`,
    );
  }

  // Convert to Tag from Element Directive
  delete node.expression;
  const tag = (node as unknown) as Tag;
  tag.type = "Tag";
  tag.data = tagType;

  return await compileNode(tag, state, cb);
};

nodeTypes.set("ElementDirective", elementDirective);

// DataDirective AST Node
const dataDirective = async (
  node: DataDirective,
  state: State,
  cb: Function,
): Promise<DataResponse> => {
  let body = "";
  const use = await compileNode(node.expression, state, cb);
  const attrs = new Map();
  const values: State = {};

  // Get Body
  if (node.children.length) {
    body = await unionChildren(node.children, state, cb);
  }

  // Get Attributes
  if (node.attributes.length) {
    const attributes = node.attributes;
    for (let i = 0, aLen = attributes.length; i < aLen; i++) {
      const list = await compileNode(attributes[i], state, cb);
      for (let x = 0, lLen = list.length; x < lLen; x++) {
        const [name, value] = list[x];
        attrs.set(name, value);
      }
    }

    const attrsIterator = attrs[Symbol.iterator]();
    for (const [name, value] of attrsIterator) {
      values[name] = value === undefined ? name : value;
    }
  }

  const res = await resolveData(use, values, body);

  // Report
  if (res.meta.file) {
    cb(["File", res.meta.file]);
    if (res.meta.cacheHit) {
      cb(["CacheHit"]);
    } else {
      cb(["CacheMiss"]);
    }
  }

  // Namespace state to key if available
  let outgoingState;
  if (node.key !== undefined) {
    const key = await compileNode(node.key, state, cb);
    outgoingState = {
      [key]: res.response,
    };
  } else {
    outgoingState = res.response;
  }

  if (res.type === "SUCCESS") {
    throw ["STATE", outgoingState];
  } else {
    throw [res.type, outgoingState];
  }
};

nodeTypes.set("DataDirective", dataDirective);

// MemberExpression AST Node
const memberExpression = async (
  node: MemberExpression,
  state: State,
  cb: Function,
) => {
  const obj = await compileNode(node.object, state, cb);
  if (node.property.type === "Literal") {
    const key = await compileNode(node.property, state, cb);
    try {
      return obj[key];
    } catch (e) {
      return emitWarning(`Literal '${cyan(String(key))}' not found in state.`);
    }
  }

  return compileNode(node.property, obj, cb);
};

nodeTypes.set("MemberExpression", memberExpression);

// IfBlock AST Node
const ifBlock = async (node: IfBlock, state: State, cb: Function) => {
  const expression = await compileNode(node.expression, state, cb);
  let output = "";
  if (expression) {
    // Use Children
    if (node.children.length) {
      output = await unionChildren(node.children, state, cb);
    }

    return output;
  } else if (node.else !== null) {
    return await compileNode(node.else, state, cb);
  } else {
    return "";
  }
};

nodeTypes.set("IfBlock", ifBlock);

// ElseBlock AST Node
const elseBlock = async (node: ElseBlock, state: State, cb: Function) => {
  let output = "";
  if (node.children.length) {
    output = await unionChildren(node.children, state, cb);
  }

  return output;
};

nodeTypes.set("ElseBlock", elseBlock);

// ElseIfBlock AST Node
const elseIfBlock = (node: ElseIfBlock, state: State, cb: Function) => {
  // Convert to IfBlock and return results
  const ifBlock = (node as unknown) as IfBlock;
  ifBlock.type = "IfBlock";
  ifBlock.data = ":if";

  return compileNode(ifBlock, state, cb);
};

nodeTypes.set("ElseIfBlock", elseIfBlock);

// SkipBlock AST Node
const skipBlock = async (node: SkipBlock, state: State, cb: Function) => {
  const expression = await compileNode(node.expression, state, cb);
  let output = "";

  // Skip Checks for the inverse of If
  if (!expression) {
    // Use Children
    if (node.children.length) {
      output = await unionChildren(node.children, state, cb);
    }

    return output;
  } else {
    return "";
  }
};

nodeTypes.set("SkipBlock", skipBlock);

// WhenBlock AST Node
const whenBlock = async (
  node: WhenBlock,
  state: State,
  cb: Function,
): Promise<string> => {
  const match = await compileNode(node.expression, state, cb);
  let output = "";

  if (node.children.length) {
    for (let i = 0; i < node.children.length; i++) {
      if (
        node.children[i].type !== "IsBlock" &&
        node.children[i].type !== "ElseBlock"
      ) {
        continue;
      }

      if (node.children[i].type === "IsBlock") {
        const [expression, contents] = await compileNode(
          node.children[i],
          state,
          cb,
        );

        if (match !== expression) {
          continue;
        }

        return unionChildren(contents, state, cb);
      }

      if (node.children[i].type === "ElseBlock") {
        return compileNode(node.children[i], state, cb);
      }
    }
  } else {
    emitWarning(`WhenBlock has no content. Skipping WhenBlock.`);
  }

  return output;
};

nodeTypes.set("WhenBlock", whenBlock);

// IsBlock AST Node
const isBlock = async (node: IsBlock, state: State, cb: Function) => {
  const expression = await compileNode(node.expression, state, cb);

  return [expression, node.children];
};

nodeTypes.set("IsBlock", isBlock);

// EachBlock AST Node
const eachBlock = async (
  node: EachBlock,
  state: State,
  cb: Function,
): Promise<string> => {
  const expression = await compileNode(node.expression, state, cb);
  const context = node.context.data;
  const index = node.index === null ? null : node.index.data;
  let output = "";

  // Check for else first
  if (
    node.else !== null &&
    (context === undefined || !expression || !expression.length)
  ) {
    return await compileNode(node.else, state, cb);
  }

  // The loop contents
  if (expression && expression.length) {
    for (let i = 0; i < expression.length; i++) {
      // Setup value to defined context
      const internal = {
        [context]: expression[i],
      };

      // Add index is requested
      if (index !== null) {
        internal[index] = i;
      }

      // Process instance of children
      try {
        if (node.children.length) {
          output += await unionChildren(
            node.children,
            scopeState(state, internal),
            cb,
          );
        }
      } catch (capture) {
        if (Array.isArray(capture)) {
          const [code, append] = capture;

          if (code === "BREAK") {
            output += append;
            break;
          } else if (code === "CONTINUE") {
            output += append;
            continue;
          } else {
            emitError(`Uncaught Error - ${capture}`);
          }
        } else {
          emitError(`Uncaught Error - ${capture}`);
        }
      }
    }
  } else {
    emitWarning(
      `EachBlock for '${
        cyan(
          String(node.expression.data),
        )
      }' has no content. Skipping EachBlock.`,
    );
  }

  return output;
};

nodeTypes.set("EachBlock", eachBlock);

// BreakStatement AST Node
const breakStatement = async (
  node: BreakStatement,
  state: State,
  cb: Function,
): Promise<void> => {
  throw ["BREAK"];
};

nodeTypes.set("BreakStatement", breakStatement);

// ContinueStatement AST Node
const continueStatement = async (
  node: ContinueStatement,
  state: State,
  cb: Function,
): Promise<void> => {
  throw ["CONTINUE"];
};

nodeTypes.set("ContinueStatement", continueStatement);

// Special function to return deep copy of state that is modified
const scopeState = (...states: Array<State>): State => {
  const isObject = (obj: State): boolean => obj && typeof obj === "object";

  return states.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = scopeState(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
};

// RangePathSegment AST Node
const rangePathSegment = async (
  node: RangePathSegment,
  state: State,
  cb: Function,
): Promise<PathPart[]> => {
  const stateKey = await compileNode(node.expression, state, cb);
  const firstExpression = await compileNode(node.first, state, cb);
  const lastExpression = await compileNode(node.last, state, cb);
  let outputPaths: PathPart[] = [];

  try {
    const first = parseInt(firstExpression, 10);
    const last = parseInt(lastExpression, 10);

    if (last < first) {
      emitError(
        `Invalid RangePathSegment, expect first param (${first}) to be less than or equal to last param (${last})`,
      );
    }

    for (let i = first; i <= last; i++) {
      outputPaths.push(["" + i, { "$params": { [stateKey]: "" + i } }]);
    }
  } catch (e) {
    emitError(
      `Invalid params passed to RangePathSegment, :[${firstExpression},${lastExpression}]${stateKey}`,
    );
  }

  return outputPaths;
};

nodeTypes.set("RangePathSegment", rangePathSegment);

// PaginationPathSegment AST Node
const paginationPathSegment = async (
  node: PaginationPathSegment,
  state: State,
  cb: Function,
): Promise<PathPart[]> => {
  const stateKey = await compileNode(node.expression, state, cb);
  let scoped: State = state;
  let outputPaths: PathPart[] = [];
  let counter = 0;

  const data = state.__internals__.data;
  if (!data.length) {
    emitError(
      `Invalid PaginationPathSegment. Pagination requires atleast one DataDirective recieving '${stateKey}' attribute.`,
    );
  }

  while (true) {
    try {
      // Process Data, Pass the Counter as State
      scoped = scopeState(scoped, { $params: { [stateKey]: "" + counter } });

      // Call all nested data directives
      for (let i = 0; i < data.length; i++) {
        try {
          await compileNode(data[i], scoped, cb);
        } catch (capture) {
          if (Array.isArray(capture)) {
            const [code, append] = capture;
            // Bypases all state changes for multiple data items
            if (code === "STATE") {
              if (i === data.length - 1) {
                throw [code, append];
              } else {
                scoped = scopeState(scoped, append);
              }
              continue;
            } else {
              // Bubble up SKIP and END
              throw [code, append];
            }
          } else {
            emitError(`Uncaught Error - ${capture}`);
          }
        }
      }
    } catch (capture) {
      // Speacial handling for bubbling via throws to capture the last output
      // Used when something impacts state or impacts flow
      if (Array.isArray(capture)) {
        const [code, append] = capture;
        if (code === "STATE") {
          // Modifies the Scoped State for DataDirective that
          // are not hoisted to the top or part of a router/path
          scoped = scopeState(scoped, append);
          outputPaths.push(
            ["" + counter, { "$params": { [stateKey]: "" + counter } }],
          );
          counter++;
          continue;
        } else if (code === "SKIP") {
          // DataDirective return a SKIP response, so we don't return the PathPart
          // Continue with Loop
          counter++;
          continue;
        } else if (code === "END") {
          // DataDirective return END response, so we don't return the PathPart
          // End the Loop
          break;
        } else {
          emitError(`Uncaught Error - ${capture}`);
        }
      } else {
        emitError(`Uncaught Error - ${capture}`);
      }
    }
  }

  return outputPaths;
};

nodeTypes.set("PaginationPathSegment", paginationPathSegment);

// OptionalPathSegment AST Node
const optionalPathSegment = async (
  node: OptionalPathSegment,
  state: State,
  cb: Function,
): Promise<PathPart[]> => {
  // Reuse Dynamic parsing by converting type and rerunning
  // since all Optional is is Dynamic plus empty path segment
  const tag = (node as unknown) as DynamicPathSegment;
  tag.type = "DynamicPathSegment";
  const key = tag.expression.data;
  const output = await compileNode(tag, state, cb);

  return [["", { "$params": { [key]: "" } }], ...output];
};

nodeTypes.set("OptionalPathSegment", optionalPathSegment);

// DynamicPathSegment AST Node
const dynamicPathSegment = async (
  node: DynamicPathSegment,
  state: State,
  cb: Function,
): Promise<PathPart[]> => {
  const stateKey = node.expression.data;
  const newPaths = await compileNode(node.expression, state, cb);
  let outputPaths: PathPart[] = [];

  // Validate segments and convert to string if possible
  try {
    if (typeof newPaths === "string") {
      outputPaths.push([newPaths, { "$params": { [stateKey]: newPaths } }]);
    } else if (Array.isArray(newPaths)) {
      for (let i = 0; i < newPaths.length; i++) {
        const p = convertPaths(newPaths[i]);
        outputPaths.push([p, { "$params": { [stateKey]: p } }]);
      }
    } else if (newPaths !== null && typeof newPaths === "object") {
      for (let key of Object.keys(newPaths)) {
        const p = convertPaths(key);
        outputPaths.push([p, { "$params": { [stateKey]: p } }]);
      }
    } else {
      emitError(`Unable to use path ${newPaths}`);
    }
  } catch (e) {
    emitError(`Unable to use path ${newPaths}`);
  }

  return outputPaths;
};

nodeTypes.set("DynamicPathSegment", dynamicPathSegment);

// StaticPathSegment AST Node
const staticPathSegment = async (
  node: StaticPathSegment,
  state: State,
  cb: Function,
): Promise<PathPart[]> => {
  return [[node.data, {}]];
};

nodeTypes.set("StaticPathSegment", staticPathSegment);

// PathDirective AST Node
const pathDirective = async (
  node: PathDirective,
  state: State,
  cb: Function,
): Promise<PathDefinition[]> => {
  let paths: PathDefinition[] = [];
  let data: DataDirective[] = [];

  // Add DataDirective of Children
  if (node.children.length) {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].type === "DataDirective") {
        data.push(children[i] as DataDirective);
      }
    }
  }

  // Callback for Recording final Paths
  const routerCB = (p: string, s: State) => {
    paths.push({
      path: p,
      state: s,
      data,
    });
  };

  // Passes data array for PaginationPathSegment to use
  let localState: State = {
    __internals__: {
      data,
    },
  };

  // Process the Paths
  if (node.path.length) {
    await processPathPart(
      "",
      scopeState(state, localState),
      node.path,
      routerCB,
      cb,
    );
  } else {
    // Special processing for Root
    routerCB("/", scopeState(state, localState));
  }

  return paths;
};

nodeTypes.set("PathDirective", pathDirective);

// RouterDirective AST Node
const routerDirective = async (
  node: RouterDirective,
  state: State,
  cb: Function,
): Promise<PathDefinition[]> => {
  let scoped: State = state;
  let paths: PathDefinition[] = [];
  if (node.children.length) {
    const children = node.children;
    for (let i = 0; i < node.children.length; i++) {
      try {
        // Skip children that are Text
        if (children[i].type === "Text") {
          continue;
        }

        const newPaths = await compileNode(children[i], scoped, cb);
        paths = [...paths, ...newPaths];
      } catch (capture) {
        // Speacial handling for bubbling via throws to capture the last output
        // Used when something impacts state or impacts flow
        if (Array.isArray(capture)) {
          const [code, append] = capture;

          if (code === "STATE") {
            // Modifies the Scoped State for DataDirective that
            // are not hoisted to the top or part of a router/path
            scoped = scopeState(scoped, append);
            continue;
          } else {
            // Continues to bubble for items like "CONTINUE" and "BREAK"
            throw [code, paths];
          }
        } else {
          emitError(`Uncaught Error - ${capture}`);
        }
      }
    }
  } else {
    emitWarning(`RouterDirective has no content. Skipping RouterDirective.`);
  }

  return paths;
};

nodeTypes.set("RouterDirective", routerDirective);

// Special function to recurvily handle processing Path Segment
const processPathPart = async (
  path: string,
  state: State,
  pathSegments: PathSegment[],
  routerCB: Function,
  cb: Function,
): Promise<void> => {
  const [first, ...rest] = pathSegments || [];
  const newPathParts = await compileNode(first, state, cb);
  for (let i = 0; i < newPathParts.length; i++) {
    const [p, s] = newPathParts[i];
    const newPath = (path === "/") ? path + p : path + "/" + p;
    const scoped = scopeState(state, s);
    if (rest.length) {
      await processPathPart(newPath, scoped, rest, routerCB, cb);
    } else {
      routerCB(newPath, scoped);
    }
  }
};

// Special function to protect paths
const convertPaths = (path: string | number): string => {
  return "" + path;
};

// Special function process children
const unionChildren = async (
  children: Array<Node>,
  state: State,
  cb: Function,
): Promise<string> => {
  let scoped = state;
  let output = "";

  for (let i = 0; i < children.length; i++) {
    try {
      output += await compileNode(children[i], scoped, cb);
    } catch (capture) {
      // Speacial handling for bubbling via throws to capture the last output
      // Used when something impacts state or impacts flow
      if (Array.isArray(capture)) {
        const [code, append] = capture;

        if (code === "STATE") {
          // Modifies the Scoped State for DataDirective that
          // are not hoisted to the top or part of a router/path
          scoped = scopeState(scoped, append);
          continue;
        } else {
          // Continues to bubble for items like "CONTINUE" and "BREAK"
          throw [code, output];
        }
      } else {
        emitError(`Uncaught Error - ${capture}`);
      }
    }
  }

  return output;
};

// Special function that process attributes
// Undefined and true (boolean) get returned without value
// Null get skipped
const unionAttributes = async (
  attributes: Array<Attribute | AttributeSpread>,
  state: State,
  cb: Function,
): Promise<string> => {
  const attrs = new Map();
  let output = "";

  for (let i = 0, aLen = attributes.length; i < aLen; i++) {
    const list = await compileNode(attributes[i], state, cb);
    for (let x = 0, lLen = list.length; x < lLen; x++) {
      const [name, value] = list[x];
      attrs.set(name, value);
    }
  }

  const attrsIterator = attrs[Symbol.iterator]();
  for (const [name, value] of attrsIterator) {
    if (value === null) {
      continue;
    } else if (value === undefined || value === true) {
      output += " " + name;
    } else {
      output += " " + `${name}="${value}"`;
    }
  }

  return output;
};

// Hands off to the correct compile function
const compileNode = async (
  node: Node,
  state: State,
  cb: Function,
  // deno-lint-ignore no-explicit-any
): Promise<any> => {
  if (nodeTypes.has(node.type)) {
    return await nodeTypes.get(node.type)(node, state, cb);
  } else {
    // TOOD: Emit Warning
    return Promise.resolve("");
  }
};

const emitWarning = (msg: string): undefined => {
  if (config.log === "verbose") {
    console.warn(`${bold(yellow("WARNING"))} - ${msg}`);
  }

  return undefined;
};

const emitError = (msg: string): undefined => {
  throw new Error(`${bold(red("ERROR"))} - ${msg}`);
};

const compileAST = async (
  ast: Node | Array<Node>,
  state: State,
  cb: Function,
): Promise<string | PathDefinition[]> => {
  if (Array.isArray(ast) && ast.length) {
    return "" + (await unionChildren(ast, state, cb));
  } else if ((ast as Node).type === "RouterDirective") {
    // Special processing for RouterDirective
    // Should not be passed back as string
    return await compileNode(ast as Node, state, cb) as PathDefinition[];
  } else {
    return "" + (await compileNode(ast as Node, state, cb));
  }
};

// Loops over AST array or single AST object
export default async (
  ast: Node | Array<Node>,
  state: State,
  fileName: string,
): Promise<CompilerResponse> => {
  // Stubbed Out Compiler Response
  const output: CompilerResponse = {
    cacheHits: 0,
    cacheMisses: 0,
    files: new Set(),
    classes: new Set(),
    styles: new Set(),
    scripts: new Set(),
    head: [],
    paths: [],
    source: undefined,
  };

  // Add File to State
  let localState: State = {
    __internals__: {
      fileName: fileName,
    },
  };

  // And Reporting
  output.files.add(fileName);

  // Callback to report stats and bundled data
  const cb = (
    update: UpdateType,
  ) => {
    switch (update[0]) {
      case "CacheHit":
        output.cacheHits = output.cacheHits + 1;
        break;
      case "CacheMiss":
        output.cacheMisses = output.cacheMisses + 1;
        break;
      case "File":
        if (typeof update[1] === "string") {
          output.files.add(update[1]);
        } else {
          emitError(
            `Unable to add file entry to compiler output, unsupported type ${
              bold(red(typeof update[1]))
            }.`,
          );
        }
        break;
      case "Classes":
        if (Array.isArray(update[1])) {
          for (let i = 0, len = update[1].length; i < len; i++) {
            output.classes.add(update[1][i] as string);
          }
        } else {
          emitError(
            `Unable to add classes entry to compiler output, unsupported type ${
              bold(red(typeof update[1]))
            }.`,
          );
        }
        break;
      case "Styles":
        if (
          (update[1] as StyleInstance)?.file &&
          (update[1] as StyleInstance)?.source
        ) {
          output.styles.add(update[1] as StyleInstance);
        } else {
          emitError(
            `Unable to add styles entry to compiler output, unsupported type ${
              bold(red(typeof update[1]))
            }.`,
          );
        }
        break;
      case "Scripts":
        if (
          (update[1] as ScriptInstance)?.file &&
          (update[1] as ScriptInstance)?.source
        ) {
          output.scripts.add(update[1] as ScriptInstance);
        } else {
          emitError(
            `Unable to add scripts entry to compiler output, unsupported type ${
              bold(red(typeof update[1]))
            }.`,
          );
        }
        break;
      case "Head":
        if (Array.isArray(update[1])) {
          for (let i = 0, len = update[1].length; i < len; i++) {
            output.head.push(update[1][i] as Node);
          }
        } else {
          emitError(
            `Unable to add head entires to compiler output, unsupported type ${
              bold(red(typeof update[1]))
            }.`,
          );
        }
        break;
      default:
        emitError(
          `Unable to add unknown update entry to compiler output, unsupported type ${
            bold(red(typeof update[1]))
          } for ${bold(yellow(update[0]))}.`,
        );
    }
  };

  // Compile Contents
  const compiled = await compileAST(ast, scopeState(state, localState), cb);

  // Finish populating Output
  if (typeof compiled === "string") {
    output.source = compiled;
  } else if (Array.isArray(compiled)) {
    output.paths = compiled;
  } else {
    emitError(
      `Unable to compile, unsupported response type ${
        bold(red(typeof compiled))
      }.`,
    );
  }

  return output;
};
