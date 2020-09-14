/**
 * Parser Nodes
 */

// AST Structure
export type Type =
  | "Comment"
  | "Doctype"
  | "Tag"
  | "ScriptTag"
  | "StyleTag"
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
  | "HeadDirective"
  | "DynamicPathSegment"
  | "StaticPathSegment"
  | "OptionalPathSegment"
  | "RangePathSegment"
  | "PaginationPathSegment"
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
  classes: string[];
}

export interface ScriptTag extends BaseTag {
  type: "ScriptTag";
  lang: Literal | undefined;
}

export interface StyleTag extends BaseTag {
  type: "StyleTag";
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
  classes: string[];
}

export interface LayoutDirective extends BaseTag {
  type: "LayoutDirective";
  expression: Identifier | Literal | MemberExpression;
}

export interface RouterDirective extends BaseTag {
  type: "RouterDirective";
}

export interface HeadDirective extends BaseTag {
  type: "HeadDirective";
}

export interface StaticPathSegment extends BaseAST {
  type: "StaticPathSegment";
}

export interface DynamicPathSegment extends BaseAST {
  type: "DynamicPathSegment";
  expression: Identifier | MemberExpression;
}

export interface OptionalPathSegment extends BaseAST {
  type: "OptionalPathSegment";
  expression: Identifier | MemberExpression;
}

export interface RangePathSegment extends BaseAST {
  type: "RangePathSegment";
  expression: Literal;
  first: Literal | Identifier | MemberExpression;
  last: Literal | Identifier | MemberExpression;
}

export interface PaginationPathSegment extends BaseAST {
  type: "PaginationPathSegment";
  expression: Literal;
}

export type PathSegment =
  | StaticPathSegment
  | DynamicPathSegment
  | OptionalPathSegment
  | RangePathSegment
  | PaginationPathSegment;

export interface PathDirective extends BaseTag {
  type: "PathDirective";
  path: Array<PathSegment>;
}

export interface DataDirective extends BaseTag {
  type: "DataDirective";
  key: Identifier | Literal | undefined;
  expression: Identifier | Literal | MemberExpression;
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
  | ScriptTag
  | StyleTag
  | Comment
  | Doctype
  | ComponentDirective
  | ElementDirective
  | LayoutDirective
  | RouterDirective
  | PathDirective
  | DataDirective
  | SlotDirective
  | HeadDirective
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
  | StaticPathSegment
  | OptionalPathSegment
  | PaginationPathSegment
  | RangePathSegment;

export type DynamicTag =
  | ComponentDirective
  | DataDirective
  | ElementDirective
  | LayoutDirective
  | PathDirective
  | PathDirective
  | RouterDirective
  | SlotDirective
  | HeadDirective
  | Tag
  | ScriptTag
  | StyleTag;

export interface RootAST {
  html: AST[];
  layout: AST[] | [];
  router?: RouterDirective;
}

export type ParserContext = "Layout" | "Component" | "Page";

/**
 * Compiler
 */

export interface State {
  // deno-lint-ignore no-explicit-any
  [key: string]: any | State;
}

export interface PathDefinition {
  path: string;
  state: State;
  data: Array<DataDirective>;
}

export type PathPart = [string, Record<string, unknown>];

// Instance of a Style
export interface StyleInstance {
  file: string;
  source: string;
}

// Instance of a Script
export interface ScriptInstance {
  file: string;
  source: string;
  lang: "js" | "ts";
}

// Returned from Compiler
export interface CompilerResponse {
  cacheHits: number;
  cacheMisses: number;
  files: Set<string>;
  classes: Set<string>;
  scripts: Set<ScriptInstance>;
  styles: Set<StyleInstance>;
  head: Array<Node>;
  paths: Array<PathDefinition>;
  source: string | undefined;
}

// Types of Callback Updates
export type UpdateType =
  | ["CacheHit"]
  | ["CacheMiss"]
  | ["File", string]
  | ["Classes", Array<string>]
  | ["Styles", StyleInstance]
  | ["Scripts", ScriptInstance]
  | ["Head", Array<Node>];

/**
 * Resolvers
 */

// Component
export interface ComponentResponse {
  ast: RootAST;
  meta: {
    cacheKey: CacheIdentifier;
    cacheHit: boolean;
    file?: string;
  };
}

// Layout
export interface LayoutResponse {
  ast: RootAST;
  meta: {
    cacheKey: CacheIdentifier;
    cacheHit: boolean;
    file?: string;
  };
}

// Data

export interface Skip {
  type: "SKIP";
  response: Record<string, unknown>;
}

export interface End {
  type: "END";
  response: Record<string, unknown>;
}

export interface Success {
  type: "SUCCESS";
  response: Record<string, unknown>;
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
  // deno-lint-ignore ban-types
  skip: Function;
  // deno-lint-ignore ban-types
  end: Function;
  // deno-lint-ignore ban-types
  retry: Function;
  // deno-lint-ignore ban-types
  error: Function;
  // deno-lint-ignore ban-types
  success: Function;
}

export interface Request {
  attrs?: Record<string, unknown>;
  body?: string;
  root: string;
}

export interface DataResponse {
  type: "SKIP" | "END" | "SUCCESS";
  response: Record<string, unknown>;
  retries: number;
  meta: {
    cacheKey: CacheKey;
    cacheHit: boolean;
    file?: string;
  };
}

/**
 * Tailwind CSS Types
 */

export interface ModifySelector {
  pre: string;
  post: string;
}

export interface MediaQueryDefintion {
  pre: string;
  post: string;
  children: Map<string, MediaQueryDefintion | SelectorDefinition>;
}

export interface SelectorDefinition {
  pre: string;
  post: string;
  children: string;
}

export interface ModifyProperty {
  children: string;
  pre?: string;
  post?: string | string[];
}

export interface ColorDefinition {
  hex: string;
  rgb: string;
}

/**
 * Standard Libaries - Tagged to 0.65.0 for Deno 1.3.0
 */

// Benchmarks
export type {
  BenchmarkTimer,
  BenchmarkRunError,
  BenchmarkResult,
  BenchmarkRunResult,
} from "https://deno.land/std@0.69.0/testing/bench.ts";

export type {
  WebSocket,
} from "https://deno.land/std@0.69.0/ws/mod.ts";

export type { ServerRequest } from "https://deno.land/std@0.69.0/http/server.ts";

/**
 * Third Party
 */

// LRU Cache
import type { Identifier as CacheIdentifier } from "https://deno.land/x/dash@2.2.1/util.ts";
export type CacheKey = CacheIdentifier;
