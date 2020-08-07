/**
 * Parser Nodes
 */

// AST Structure
export type Type =
  | "Comment"
  | "Doctype"
  | "Tag"
  | "Attribute"
  | "AttributeExpression"
  | "AttributeSpread"
  | "AttributeName"
  | "AttributeValue"
  | "Text"
  | "ComponentDirective"
  | "ElementDirective"
  | "LayoutDirective"
  | "RouterDirective"
  | "PathDirective"
  | "DynamicPathSegment"
  | "StaticPathSegment"
  | "DataDirective"
  | "SlotDirective"
  | "IfBlock"
  | "ElseIfBlock"
  | "SkipBlock"
  | "WhenBlock"
  | "IsBlock"
  | "EachBlock"
  | "ElseBlock"
  | "ContinueStatement"
  | "BreakStatement"
  | "BinaryExpression"
  | "LogicalExpression"
  | "MemberExpression"
  | "UnaryExpression"
  | "UpdateExpression"
  | "Identifier"
  | "Literal";

// Basic AST Base
export interface BaseAST {
  type: Type;
  data: string;
  start: number;
  end: number;
}

// HTML Types
export interface Attribute extends BaseAST {
  type: "Attribute";
  name: AttributeName;
  value: AttributeValue | AttributeExpression;
}

export interface AttributeName extends BaseAST {
  type: "AttributeName";
}

export interface AttributeValue extends BaseAST {
  type: "AttributeValue";
}

export interface AttributeExpression extends BaseAST {
  type: "AttributeExpression";
  expression: ExpressionStatement;
}

export interface AttributeSpread extends BaseAST {
  type: "AttributeSpread";
  expression: Identifier;
}

export interface Doctype extends BaseAST {
  type: "Doctype";
}

export interface Comment extends BaseAST {
  type: "Comment";
}

export interface Text extends BaseAST {
  type: "Text";
}

export interface BaseTag extends BaseAST {
  attributes: Array<Attribute | AttributeSpread> | [];
  children: Array<AST> | [];
}

export interface Tag extends BaseTag {
  type: "Tag";
  slot: Literal | undefined;
}

// Directives
export interface ComponentDirective extends BaseTag {
  type: "ComponentDirective";
  expression: Identifier | Literal | MemberExpression;
  slot: Literal | undefined;
}

export interface ElementDirective extends BaseTag {
  type: "ElementDirective";
  expression: Identifier | Literal | MemberExpression;
  slot: Literal | undefined;
}

export interface LayoutDirective extends BaseTag {
  type: "LayoutDirective";
  expression: Identifier | Literal | MemberExpression;
}

export interface RouterDirective extends BaseTag {
  type: "RouterDirective";
}

export interface StaticPathSegment extends BaseAST {
  type: "StaticPathSegment";
}

export interface DynamicPathSegment extends BaseAST {
  type: "DynamicPathSegment";
  expression: Identifier | MemberExpression;
}

export type PathSegment = StaticPathSegment | DynamicPathSegment;

export interface PathDirective extends BaseTag {
  type: "PathDirective";
  path: Array<PathSegment>;
}

export interface DataDirective extends BaseTag {
  type: "DataDirective";
  key: Identifier | Literal | undefined;
  expression: Identifier | Literal | MemberExpression | undefined;
}

export interface SlotDirective extends BaseTag {
  type: "SlotDirective";
  expression: Literal | undefined;
}

export interface RouterDirective extends BaseTag {
  type: "RouterDirective";
}

// Flow Control Blocks and Iteration
export interface IfBlock extends BaseAST {
  type: "IfBlock";
  children: Array<AST> | [];
  expression: ExpressionStatement;
  else: ElseBlock | ElseIfBlock | null;
}

export interface ElseIfBlock extends BaseAST {
  type: "ElseIfBlock";
  children: Array<AST> | [];
  expression: ExpressionStatement;
  else: ElseBlock | ElseIfBlock | null;
}

export interface SkipBlock extends BaseAST {
  type: "SkipBlock";
  children: Array<AST> | [];
  expression: ExpressionStatement;
}

export interface WhenBlock extends BaseAST {
  type: "WhenBlock";
  children: Array<IsBlock | ElseBlock> | [];
  expression: ExpressionStatement;
}

export interface IsBlock extends BaseAST {
  type: "IsBlock";
  children: Array<AST> | [];
  expression: ExpressionStatement;
}

export interface EachBlock extends BaseAST {
  type: "EachBlock";
  children: Array<AST> | [];
  expression: ExpressionStatement;
  context: Identifier;
  index: Identifier | null;
  else: ElseBlock | null;
}

export interface ElseBlock extends BaseAST {
  type: "ElseBlock";
  children: Array<AST> | [];
}

export interface ContinueStatement extends BaseAST {
  type: "ContinueStatement";
}

export interface BreakStatement extends BaseAST {
  type: "BreakStatement";
}

export type ExpressionStatement =
  | BinaryExpression
  | LogicalExpression
  | MemberExpression
  | UnaryExpression
  | UpdateExpression
  | Identifier
  | Literal;

export type BinaryOperator =
  | "|"
  | "^"
  | "&"
  | "=="
  | "!="
  | "==="
  | "!=="
  | "<"
  | ">"
  | "<="
  | ">="
  | "<<"
  | ">>"
  | ">>>"
  | "+"
  | "-"
  | "*"
  | "/"
  | "%";

export interface BinaryExpression extends BaseAST {
  type: "BinaryExpression";
  left: ExpressionStatement;
  operator: BinaryOperator;
  right: ExpressionStatement;
}

export type LogicalOperator = "&&" | "||";

export interface LogicalExpression extends BaseAST {
  type: "LogicalExpression";
  left: ExpressionStatement;
  operator: LogicalOperator;
  right: ExpressionStatement;
}

export interface MemberExpression extends BaseAST {
  type: "MemberExpression";
  object: Identifier | MemberExpression;
  property: Identifier | Literal;
}

export type UnaryOperator = "+" | "-" | "!" | "~";

export interface UnaryExpression extends BaseAST {
  type: "UnaryExpression";
  prefix: boolean;
  operator: UnaryOperator;
  argument: ExpressionStatement;
}

export type UpdateOperator = "++" | "--";

export interface UpdateExpression extends BaseAST {
  type: "UpdateExpression";
  prefix: boolean;
  operator: UpdateOperator;
  argument: ExpressionStatement;
}

export interface Identifier extends BaseAST {
  type: "Identifier";
}

export interface Literal extends BaseAST {
  type: "Literal";
  value: string | boolean | number | undefined;
}

export type AST =
  | Text
  | Tag
  | Comment
  | Doctype
  | ComponentDirective
  | ElementDirective
  | LayoutDirective
  | RouterDirective
  | PathDirective
  | DataDirective
  | SlotDirective
  | IfBlock
  | ElseIfBlock
  | SkipBlock
  | WhenBlock
  | IsBlock
  | EachBlock
  | ElseBlock
  | WhenBlock
  | EachBlock
  | ExpressionStatement
  | ContinueStatement
  | BreakStatement;

export type Node =
  | AST
  | ExpressionStatement
  | Attribute
  | AttributeExpression
  | AttributeName
  | AttributeValue
  | AttributeSpread
  | DynamicPathSegment
  | StaticPathSegment;

export type DynamicTag =
  | ComponentDirective
  | DataDirective
  | ElementDirective
  | LayoutDirective
  | PathDirective
  | PathDirective
  | RouterDirective
  | SlotDirective
  | Tag;

export interface RootAST {
  html: Array<AST>;
  layout: Array<AST> | [];
  router: Array<AST> | [];
}

export type ParserContext = "Layout" | "Component" | "Page";

/**
 * Compiler
 */

export interface State {
  // deno-lint-ignore no-explicit-any
  [key: string]: any | State;
}

/**
 * Resolvers
 */

// Component
export interface ComponentResponse {
  ast: RootAST;
  meta: {
    cacheKey: CacheIdentifier;
    cacheHit: boolean;
  };
}

// Layout
export interface LayoutResponse {
  ast: RootAST;
  meta: {
    cacheKey: CacheIdentifier;
    cacheHit: boolean;
  };
}

// Data

export interface Skip {
  type: "SKIP";
  response: object;
}

export interface End {
  type: "END";
  response: object;
}

export interface Success {
  type: "SUCCESS";
  response: object;
}

export interface Retry {
  type: "RETRY";
  msg: string;
  delay: number;
}

export interface Error {
  type: "ERROR";
  msg: string;
  stack?: TypeError;
}

export interface Response {
  skip: Function;
  end: Function;
  retry: Function;
  error: Function;
  success: Function;
}

export interface Request {
  attrs?: object;
  body?: string;
}

export interface DataResponse {
  type: "SKIP" | "END" | "SUCCESS";
  response: object;
  retries: number;
  meta: {
    cacheKey: CacheKey;
    cacheHit: boolean;
  };
}

/**
 * Standard Libaries - Tagged to 0.61.0 for Deno 1.2.0
 */

// Benchmarks
export {
  BenchmarkTimer,
  BenchmarkRunError,
  BenchmarkResult,
  BenchmarkRunResult,
} from "https://deno.land/std@0.62.0/testing/bench.ts";

/**
 * Third Party
 */

// Pretty Bencing
export {
  GroupDefinition,
  defaultColumns,
} from "https://deno.land/x/pretty_benching@v0.2.0/mod.ts";

// LRU Cache
import { Identifier as CacheIdentifier } from "https://deno.land/x/dash@2.2.1/util.ts";
export type CacheKey = CacheIdentifier;
