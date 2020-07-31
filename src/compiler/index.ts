import { cyan, red, yellow, bold, delay } from "../deps.ts";
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
} from "../parser/index.ts";
import voidElements from "../dict/voidElements.ts";
import htmlElements from "../dict/htmlElements.ts";
import { resolveData, DataResponse } from "../resolvers/data.ts";

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
//   10.    [ ] ComponentDirective
//   11.    [X] ElementDirective
//   12.    [ ] LayoutDirective
//   13.    [ ] RouterDirective
//   14.    [ ] PathDirective
//   15.    [ ] DynamicPathSegment
//   16.    [ ] StaticPathSegment
//   17.    [ ] DataDirective
//   18.    [ ] SlotDirective
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

export interface State {
  // deno-lint-ignore no-explicit-any
  [key: string]: any | State;
}

export interface ArrayState {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

const nodeTypes = new Map();

// Tag AST Node
const tag = async (node: Tag, state: State): Promise<string> => {
  let attributes = "";
  let children = "";

  // Attributes
  if (node.attributes.length) {
    attributes = await unionAttributes(node.attributes, state);
  }

  // Void Element - Exit Early
  if (voidElements.has(node.data)) {
    return `<${node.data}${attributes}>`;
  }

  // Children
  if (node.children.length) {
    children = await unionChildren(node.children, state);
  }

  return `<${node.data}${attributes}>${children}</${node.data}>`;
};

nodeTypes.set("Tag", tag);

// Attribute AST Node
const attribute = async (
  node: Attribute,
  state: State
): Promise<Array<ArrayState>> => {
  const name = await compileNode(node.name, state);
  const value = await compileNode(node.value, state);

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
  state: State
): string | undefined => {
  return node.data.length === 0 ? undefined : node.data;
};

nodeTypes.set("AttributeValue", attributeValue);

// AttributeExpression AST Node
// deno-lint-ignore no-explicit-any
const attributeExpression = (node: AttributeExpression, state: State): any => {
  return compileNode(node.expression, state);
};

nodeTypes.set("AttributeExpression", attributeExpression);

// AttributeSpread AST Node
const attributeSpread = async (
  node: AttributeSpread,
  state: State
): Promise<Array<ArrayState>> => {
  const output = [];
  const spread = await compileNode(node.expression, state);
  for (let name of Object.keys(spread)) {
    output.push([name, spread[name]]);
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
  state: State
): number | string | boolean | undefined => {
  return node.value;
};

nodeTypes.set("Literal", literal);

// UnaryExpression AST Node
const unaryExpression = async (node: UnaryExpression, state: State) => {
  const argument = await compileNode(node.argument, state);
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
          `Unknown UnaryExpression '${cyan(
            node.operator
          )}'. Returned argument and ignored UnaryExpression`
        );
        return argument;
    }
  } catch (e) {
    return emitWarning(
      `Can't process UnaryExpression '${cyan(
        node.operator
      )}'. Returned undefined amd ignored UnaryExpression.`
    );
  }
};

nodeTypes.set("UnaryExpression", unaryExpression);

// UpdateExpression AST Node
const updateExpression = async (node: UpdateExpression, state: State) => {
  let argument = await compileNode(node.argument, state);
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
      `Unknown UnaryExpression '${cyan(
        node.operator
      )}'. Returned argument and ignored UnaryExpression`
    );
    return argument;
  } catch (e) {
    // Something horrible went wrong
    return emitWarning(
      `Can't process UnaryExpression '${cyan(
        node.operator
      )}'. Returned undefined amd ignored UnaryExpression.`
    );
  }
};

nodeTypes.set("UpdateExpression", updateExpression);

// BinaryExpression AST Node
const binaryExpression = async (node: BinaryExpression, state: State) => {
  const left = await compileNode(node.left, state);
  const right = await compileNode(node.right, state);
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
          `Unknown BinaryExpression '${cyan(
            node.operator
          )}'. Returned undefined amd ignored BinaryExpression.`
        );
    }
  } catch (e) {
    return emitWarning(
      `Can't process BinaryExpression '${cyan(
        node.operator
      )}'. Returned undefined amd ignored BinaryExpression.`
    );
  }
};

nodeTypes.set("BinaryExpression", binaryExpression);

// LogicalExpression AST Node
const logicalExpression = async (node: LogicalExpression, state: State) => {
  const left = await compileNode(node.left, state);
  const right = await compileNode(node.right, state);
  try {
    switch (node.operator) {
      case "||":
        return left || right;
      case "&&":
        return left && right;
      default:
        return emitWarning(
          `Unknown LogicalExpression '${cyan(
            node.operator
          )}'. Returned undefined amd ignored LogicalExpression.`
        );
    }
  } catch (e) {
    return emitWarning(
      `Can't process LogicalExpression '${cyan(
        node.operator
      )}'. Returned undefined amd ignored LogicalExpression.`
    );
  }
};

nodeTypes.set("LogicalExpression", logicalExpression);

// // Text AST Node
const text = (node: Text, state: State) => {
  return node.data;
};

nodeTypes.set("Text", text);

// ElementDirective AST Node
const elementDirective = async (
  node: ElementDirective,
  state: State
): Promise<string> => {
  const tagType = await compileNode(node.expression, state);

  // Can't Render Tag
  if (typeof tagType !== "string") {
    emitWarning(
      `Element Directive '${cyan(
        tagType
      )}' not found in state. Could not render node.`
    );
    return "";
  }

  // Can render but not valid HTML element
  if (!htmlElements.has(tagType)) {
    emitWarning(
      `Element Directive '${cyan(
        tagType
      )}' is not a valid HTML tag. Node still rendered.`
    );
  }

  // Convert to Tag from Element Directive
  delete node.expression;
  const tag = (node as unknown) as Tag;
  tag.type = "Tag";
  tag.data = tagType;

  return compileNode(tag, state);
};

nodeTypes.set("ElementDirective", elementDirective);

// DataDirective AST Node
const dataDirective = async (
  node: DataDirective,
  state: State
): Promise<DataResponse> => {
  let body = "";
  const attrs = new Map();
  const values: State = {};

  // Get Body
  if (node.children.length) {
    body = await unionChildren(node.children, state);
  }

  // Get Attributes
  if (node.attributes.length) {
    const attributes = node.attributes;
    for (let i = 0, aLen = attributes.length; i < aLen; i++) {
      const list = await compileNode(attributes[i], state);
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

  // TODO: need use
  // TODO: key needs to be parsed, should be Identifier or Literal
  // TODO: root should be passed, not hard coded
  const root = `${Deno.cwd()}/src/resolvers`;
  const res = await resolveData("graphcms", values, body, root);

  // Namespace state to key if available
  let outgoingState;
  if (node.key !== undefined) {
    outgoingState = {
      [node.key]: res.response,
    };
  } else {
    outgoingState = res.response;
  }

  throw ["STATE", outgoingState];
};

nodeTypes.set("DataDirective", dataDirective);

// MemberExpression AST Node
const memberExpression = async (node: MemberExpression, state: State) => {
  const obj = await compileNode(node.object, state);
  if (node.property.type === "Literal") {
    const key = await compileNode(node.property, state);
    try {
      return obj[key];
    } catch (e) {
      return emitWarning(`Literal '${cyan(String(key))}' not found in state.`);
    }
  }

  return compileNode(node.property, obj);
};

nodeTypes.set("MemberExpression", memberExpression);

// IfBlock AST Node
const ifBlock = async (node: IfBlock, state: State) => {
  const expression = await compileNode(node.expression, state);
  let output = "";
  if (expression) {
    // Use Children
    if (node.children.length) {
      output = await unionChildren(node.children, state);
    }

    return output;
  } else if (node.else !== null) {
    return await compileNode(node.else, state);
  } else {
    return "";
  }
};

nodeTypes.set("IfBlock", ifBlock);

// ElseBlock AST Node
const elseBlock = async (node: ElseBlock, state: State) => {
  let output = "";
  if (node.children.length) {
    output = await unionChildren(node.children, state);
  }

  return output;
};

nodeTypes.set("ElseBlock", elseBlock);

// ElseIfBlock AST Node
const elseIfBlock = (node: ElseIfBlock, state: State) => {
  // Convert to IfBlock and return results
  const ifBlock = (node as unknown) as IfBlock;
  ifBlock.type = "IfBlock";
  ifBlock.data = ":if";

  return compileNode(ifBlock, state);
};

nodeTypes.set("ElseIfBlock", elseIfBlock);

// SkipBlock AST Node
const skipBlock = async (node: SkipBlock, state: State) => {
  const expression = await compileNode(node.expression, state);
  let output = "";

  // Skip Checks for the inverse of If
  if (!expression) {
    // Use Children
    if (node.children.length) {
      output = await unionChildren(node.children, state);
    }

    return output;
  } else {
    return "";
  }
};

nodeTypes.set("SkipBlock", skipBlock);

// WhenBlock AST Node
const whenBlock = async (node: WhenBlock, state: State): Promise<string> => {
  const match = await compileNode(node.expression, state);
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
          state
        );

        if (match !== expression) {
          continue;
        }

        return unionChildren(contents, state);
      }

      if (node.children[i].type === "ElseBlock") {
        return compileNode(node.children[i], state);
      }
    }
  } else {
    emitWarning(`WhenBlock has no content. Skipping WhenBlock.`);
  }

  return output;
};

nodeTypes.set("WhenBlock", whenBlock);

// IsBlock AST Node
const isBlock = async (node: IsBlock, state: State) => {
  const expression = await compileNode(node.expression, state);

  return [expression, node.children];
};

nodeTypes.set("IsBlock", isBlock);

// EachBlock AST Node
const eachBlock = async (node: EachBlock, state: State): Promise<string> => {
  const expression = await compileNode(node.expression, state);
  const context = node.context.data;
  const index = node.index === null ? null : node.index.data;
  let output = "";

  // Check for else first
  if (
    node.else !== null &&
    (context === undefined || !expression || !expression.length)
  ) {
    return await compileNode(node.else, state);
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
            scopeState(state, internal)
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
      `EachBlock for '${cyan(
        String(node.expression.data)
      )}' has no content. Skipping EachBlock.`
    );
  }

  return output;
};

nodeTypes.set("EachBlock", eachBlock);

// BreakStatement AST Node
const breakStatement = async (
  node: BreakStatement,
  state: State
): Promise<void> => {
  throw ["BREAK"];
};

nodeTypes.set("BreakStatement", breakStatement);

// ContinueStatement AST Node
const continueStatement = async (
  node: ContinueStatement,
  state: State
): Promise<void> => {
  throw ["CONTINUE"];
};

nodeTypes.set("ContinueStatement", continueStatement);

// Special function to return deep copy of state that is modified
const scopeState = (state: State, incomingState: State): State => {
  return { ...state, ...incomingState };
};

// Special function process children
const unionChildren = async (
  children: Array<Node>,
  state: State
): Promise<string> => {
  let scoped = state;
  let output = "";

  for (let i = 0; i < children.length; i++) {
    try {
      output += await compileNode(children[i], scoped);
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
  state: State
): Promise<string> => {
  const attrs = new Map();
  let output = "";

  for (let i = 0, aLen = attributes.length; i < aLen; i++) {
    const list = await compileNode(attributes[i], state);
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
// deno-lint-ignore no-explicit-any
const compileNode = async (node: Node, state: State): Promise<any> => {
  if (nodeTypes.has(node.type)) {
    return await nodeTypes.get(node.type)(node, state);
  } else {
    // TOOD: Emit Warning
    return Promise.resolve("");
  }
};

const emitWarning = (msg: string): undefined => {
  console.warn(`${bold(yellow("WARNING"))} - ${msg}`);
  return undefined;
};

const emitError = (msg: string): undefined => {
  throw new Error(`${bold(red("ERROR"))} - ${msg}`);
};

// Loops over AST array or single AST object
export default async (
  ast: Node | Array<Node>,
  state: State
): Promise<string> => {
  if (Array.isArray(ast) && ast.length) {
    return "" + (await unionChildren(ast, state));
  } else {
    return "" + (await compileNode(ast as Node, state));
  }
};
