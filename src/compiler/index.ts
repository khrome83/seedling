import { cyan, red, yellow, bold } from "../deps.ts";
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
} from "../parser/index.ts";
import voidElements from "../dict/voidElements.ts";
import htmlElements from "../dict/htmlElements.ts";

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
//   24.    [ ] EachBlock
//   25.    [X] ElseBlock
//   26.    [ ] ContinueStatement
//   27.    [ ] BreakStatement
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
const tag = (node: Tag, state: State): string => {
  let attributes = "";
  let children = "";

  // Attributes
  if (node.attributes.length) {
    attributes = unionAttributes(node.attributes, state);
  }

  // Void Element - Exit Early
  if (voidElements.has(node.data)) {
    return `<${node.data}${attributes}>`;
  }

  // Children
  if (node.children.length) {
    children = unionChildren(node.children, state);
  }

  return `<${node.data}${attributes}>${children}</${node.data}>`;
};

nodeTypes.set("Tag", tag);

// Attribute AST Node
const attribute = (node: Attribute, state: State): Array<ArrayState> => {
  const name = compileNode(node.name, state);
  const value = compileNode(node.value, state);

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
const attributeSpread = (
  node: AttributeSpread,
  state: State
): Array<ArrayState> => {
  const output = [];
  const spread = compileNode(node.expression, state);
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
const unaryExpression = (node: UnaryExpression, state: State) => {
  const argument = compileNode(node.argument, state);
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
const updateExpression = (node: UpdateExpression, state: State) => {
  let argument = compileNode(node.argument, state);
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
const binaryExpression = (node: BinaryExpression, state: State) => {
  const left = compileNode(node.left, state);
  const right = compileNode(node.right, state);
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
const logicalExpression = (node: LogicalExpression, state: State) => {
  const left = compileNode(node.left, state);
  const right = compileNode(node.right, state);
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

// Text AST Node
const text = (node: Text, state: State) => {
  return node.data;
};

nodeTypes.set("Text", text);

// ElementDirective AST Node
const elementDirective = (node: ElementDirective, state: State): string => {
  const tagType = compileNode(node.expression, state);

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

// MemberExpression AST Node
const memberExpression = (node: MemberExpression, state: State) => {
  const obj = compileNode(node.object, state);
  if (node.property.type === "Literal") {
    const key = compileNode(node.property, state);
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
const ifBlock = (node: IfBlock, state: State) => {
  const expression = compileNode(node.expression, state);
  let output = "";
  if (expression) {
    // Use Children
    if (node.children.length) {
      output = unionChildren(node.children, state);
    }

    return output;
  } else if (node.else !== null) {
    return compileNode(node.else, state);
  } else {
    return "";
  }
};

nodeTypes.set("IfBlock", ifBlock);

// ElseBlock AST Node
const elseBlock = (node: ElseBlock, state: State) => {
  let output = "";
  if (node.children.length) {
    output = unionChildren(node.children, state);
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
const skipBlock = (node: SkipBlock, state: State) => {
  const expression = compileNode(node.expression, state);
  let output = "";

  // Skip Checks for the inverse of If
  if (!expression) {
    // Use Children
    if (node.children.length) {
      output = unionChildren(node.children, state);
    }

    return output;
  } else {
    return "";
  }
};

nodeTypes.set("SkipBlock", skipBlock);

// WhenBlock AST Node
const whenBlock = (node: WhenBlock, state: State): string => {
  const match = compileNode(node.expression, state);
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
        const [expression, contents] = compileNode(node.children[i], state);

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
    emitWarning(`WhenBlock has not content. Skipping WhenBlock.`);
  }

  return output;
};

nodeTypes.set("WhenBlock", whenBlock);

// IsBlock AST Node
const isBlock = (node: IsBlock, state: State) => {
  const expression = compileNode(node.expression, state);

  return [expression, node.children];
};

nodeTypes.set("IsBlock", isBlock);

// Special function process children
const unionChildren = (children: Array<Node>, state: State): string => {
  let output = "";

  for (let i = 0; i < children.length; i++) {
    output += compileNode(children[i], state);
  }

  return output;
};

// Special function that process attributes
// Undefined and true (boolean) get returned without value
// Null get skipped
const unionAttributes = (
  attributes: Array<Attribute | AttributeSpread>,
  state: State
): string => {
  const attrs = new Map();
  let output = "";

  for (let i = 0, aLen = attributes.length; i < aLen; i++) {
    const list = compileNode(attributes[i], state);
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
const compileNode = (node: Node, state: State): any => {
  return nodeTypes.get(node.type)(node, state);
};

const emitWarning = (msg: string): undefined => {
  console.warn(`${bold(yellow("WARNING"))} - ${msg}`);
  return undefined;
};

const emitError = (msg: string): undefined => {
  throw new Error(`${bold(red("ERROR"))} - ${msg}`);
};

// Loops over AST array or single AST object
export default (ast: Node | Array<Node>, state: State) => {
  let output = "";

  if (Array.isArray(ast)) {
    for (let i = 0, len = ast.length; i < len; i++) {
      output = output + compileNode(ast[i], state);
    }
  } else {
    output = output + compileNode(ast, state);
  }

  return output;
};
