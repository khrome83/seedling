import { cyan, yellow, bold } from "../deps.ts";
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
} from "../parser/index.ts";
import voidElements from "../dict/voidElements.ts";

// TODO: Finish All Types
//
//   01.    [X] Comment
//   02.    [X] Doctype
//   03.    [X] Tagss
//   04.    [X] Attribute
//   05.    [X] AttributeExpression
//   06.    [X] AttributeSpread
//   07.    [X] AttributeName
//   08.    [X] AttributeValue
//   09.    [X] Text
//   10.    [ ] ComponentDirective
//   11.    [ ] ElementDirective
//   12.    [ ] LayoutDirective
//   13.    [ ] RouterDirective
//   14.    [ ] PathDirective
//   15.    [ ] DynamicPathSegment
//   16.    [ ] StaticPathSegment
//   17.    [ ] DataDirective
//   18.    [ ] SlotDirective
//   19.    [ ] IfBlock
//   20.    [ ] ElseIfBlock
//   21.    [ ] SkipBlock
//   22.    [ ] WhenBlock
//   23.    [ ] IsBlock
//   24.    [ ] EachBlock
//   25.    [ ] ElseBlock
//   26.    [ ] ContinueStatement
//   27.    [ ] BreakStatement
//   28.    [ ] BinaryExpression
//   29.    [ ] LogicalExpression
//   30.    [X] MemberExpression
//   31.    [ ] UnaryExpression
//   32.    [ ] UpdateExpression
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
    for (let i = 0; i < node.children.length; i++) {
      children += compileNode(node.children[i], state);
    }
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
const literal = (node: Literal, state: State) => {
  return node.value;
};

nodeTypes.set("Literal", literal);

// Text AST Node
const text = (node: Text, state: State) => {
  return node.data;
};

nodeTypes.set("Text", text);

// Member Expression AST Node
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
