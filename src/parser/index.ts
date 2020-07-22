import { bold, cyan, yellow, red } from "https://deno.land/std/fmt/colors.ts";
import voidElements from "../dict/voidElements.ts";
import htmlElements from "../dict/htmlElements.ts";
import alpineAttributes from "../dict/alpineAttributes.ts";

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
  expression: ExpressionStatment;
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
}

// Directives
export interface ComponentDirective extends BaseTag {
  type: "ComponentDirective";
  expression: Identifier | Literal | MemberExpression;
}

export interface ElementDirective extends BaseTag {
  type: "ElementDirective";
  expression: Identifier | Literal | MemberExpression;
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
  key: string;
}

export interface SlotDirective extends BaseTag {
  type: "SlotDirective";
  expression: Literal | null;
}

export interface RouterDirective extends BaseTag {
  type: "RouterDirective";
}

// Flow Control Blocks and Iteration
export interface IfBlock extends BaseAST {
  type: "IfBlock";
  children: Array<AST> | [];
  expression: ExpressionStatment;
  else: ElseBlock | ElseIfBlock | null;
}

export interface ElseIfBlock extends BaseAST {
  type: "ElseIfBlock";
  children: Array<AST> | [];
  expression: ExpressionStatment;
  else: ElseBlock | ElseIfBlock | null;
}

export interface SkipBlock extends BaseAST {
  type: "SkipBlock";
  children: Array<AST> | [];
  expression: ExpressionStatment;
}

export interface WhenBlock extends BaseAST {
  type: "WhenBlock";
  children: Array<IsBlock | ElseBlock> | [];
  expression: ExpressionStatment;
}

export interface IsBlock extends BaseAST {
  type: "IsBlock";
  children: Array<AST> | [];
  expression: ExpressionStatment;
}

export interface EachBlock extends BaseAST {
  type: "EachBlock";
  children: Array<AST> | [];
  expression: ExpressionStatment;
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

export type ExpressionStatment =
  | BinaryExpression
  | LogicalExpression
  | MemberExpression
  | UnaryExpression
  | UpdateExpression
  | Identifier
  | Literal;

export type BinaryOperator =
  | "||"
  | "&&"
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
  left: ExpressionStatment;
  operator: BinaryOperator;
  right: ExpressionStatment;
}

export type LogicalOperator = "&&" | "||";

export interface LogicalExpression extends BaseAST {
  type: "LogicalExpression";
  left: ExpressionStatment;
  operator: LogicalOperator;
  right: ExpressionStatment;
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
  argument: ExpressionStatment;
}

export type UpdateOperator = "++" | "--";

export interface UpdateExpression extends BaseAST {
  type: "UpdateExpression";
  prefix: boolean;
  operator: UpdateOperator;
  argument: ExpressionStatment;
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
  | ExpressionStatment
  | ContinueStatement
  | BreakStatement;

export interface RootAST {
  html: Array<AST>;
}

// Parser
export class Parser {
  private pos = 0;
  private stack: Array<AST> = [];
  private template: string;

  constructor(template: string) {
    if (typeof template !== "string") {
      throw new TypeError("Template must be a string");
    }

    this.template = template.replace(/\s+$/, "");
  }

  public parse(): RootAST {
    while (this.template) {
      const tag = this.parseTags(this.template);
      if (tag) {
        this.advance(tag.end - this.pos);
        this.stack.push(tag);
      }
    }

    return { html: this.stack };
  }

  // Parese Tags
  // - Doctype, Comments, Tags, Text
  private parseTags(template: string): AST {
    // Doctype
    const doctypeString = template.match(/^<!DOCTYPE [^>]+>/)?.[0];
    if (doctypeString) {
      return this.getDoctype(doctypeString, doctypeString.length);
    }

    // Comment
    if (template.indexOf("<!--") === 0) {
      const endComment = template.indexOf("-->");

      if (endComment === -1) {
        throw this.throwError("Comment Missing End Tag");
      } else if (endComment >= 0) {
        return this.getComment(
          template.substring(4, endComment),
          endComment + 3
        );
      }
    }

    // Expression or Flow Control
    if (template.indexOf("{") === 0) {
      // Expression or Flow Control
      if (template.indexOf(":") === 1) {
        // Flow Control
        const start = this.pos;
        // Handle Expressions and Store Tag
        template = this.advance(1);
        const [tagName] = template.match(/^\:\w+/gm) || [];
        template = this.advance(tagName.length);

        if (tagName === ":break") {
          return this.getBreakStatement(tagName, start, this.pos + 1);
        }

        if (tagName === ":continue") {
          return this.getContinueStatement(tagName, start, this.pos + 1);
        }

        let expression;
        let childTemplate;
        let context = null;
        let index = null;

        // Handle Expressions only for Blocks with Expressions
        if (
          tagName === ":if" ||
          tagName === ":elseif" ||
          tagName === ":skip" ||
          tagName === ":when" ||
          tagName === ":is"
        ) {
          const expressionTemplate = template.substring(
            0,
            template.indexOf("}")
          );
          expression = this.parseExpressions(
            expressionTemplate,
            this.pos,
            undefined
          );
          childTemplate = this.advance(expressionTemplate.length + 1);
        } else if (tagName === ":each") {
          // Handle Expression
          const expressionTemplate = template.substring(
            0,
            template.indexOf("}")
          );

          expression = this.parseExpressions(
            expressionTemplate.substring(0, expressionTemplate.indexOf(" as ")),
            this.pos,
            undefined
          );
          // childTemplate = this.advance(expressionTemplate.length + 1);

          // Handle Context and Optional Index
          const contextAndIndexTemplate = expressionTemplate.substring(
            expressionTemplate.indexOf(" as ") + 4
          );

          // Handle with Index
          const hasIndex = contextAndIndexTemplate.indexOf(",");
          if (hasIndex > 0) {
            context = this.parseExpressions(
              contextAndIndexTemplate.substring(0, hasIndex),
              expression.end + 4,
              undefined
            );
            index = this.parseExpressions(
              contextAndIndexTemplate.substring(hasIndex + 1),
              expression.end + 4 + hasIndex + 1,
              undefined
            );
          } else {
            context = this.parseExpressions(
              contextAndIndexTemplate,
              expression.end + 4,
              undefined
            );
          }

          // Valiadate Context (required)
          if (context.type !== "Identifier") {
            throw this.throwError(
              `Invalid context in the each block ${cyan(bold(context.data))}`
            );
          }

          // Validate Index (optional as null)
          if (index !== null && index.type !== "Identifier") {
            throw this.throwError(
              `Invalid index in the each block ${cyan(bold(index.data))}`
            );
          }

          childTemplate = this.advance(expressionTemplate.length + 1);
        } else {
          childTemplate = this.advance(template.indexOf("}") + 1);
        }

        // Preparing for Children
        const children: Array<AST> = [];
        let elseBlock: ElseIfBlock | ElseBlock | null = null;
        let child;

        // Closes Tag with Children
        let reClosingTag;
        switch (tagName) {
          case ":if":
            reClosingTag = /^\{\/\s*\:if\s*\}/gm;
            break;
          case ":elseif":
            reClosingTag = /^(\{\s*\:elseif|\{\s*\:else\s*\}|\{\/\s*\:if\s*\})/gm;
            break;
          case ":else":
            reClosingTag = /^(\{\/\s*\:if\s*\}|\{\/\s*\:when\s*\}|\{\/\s*\:each\s*\})/gm;
            break;
          case ":skip":
            reClosingTag = /^\{\/\s*\:skip\s*\}/gm;
            break;
          case ":when":
            reClosingTag = /^\{\/\s*\:when\s*\}/gm;
            break;
          case ":is":
            reClosingTag = /^(\{\s*\:is|\{\s*\:else\s*\}|\{\/\s*\:when\s*\})/gm;
            break;
          case ":each":
            reClosingTag = /^\{\/\s*\:each\s*\}/gm;
            break;
          default:
            throw this.throwError(`Unknown Block ${cyan(bold(tagName))}`);
        }

        while ((child = this.parseTags(childTemplate)) !== null) {
          if (tagName === ":when") {
            if (child.type !== "IsBlock" && child.type !== "ElseBlock") {
              if (child.type === "Text" && !/[^\s]/gm.test(child.data)) {
                // Good to Push While Child
                children.push(child as IsBlock | ElseBlock);
              } else {
                throw this.throwError(
                  `When block has disallowed direct child ${cyan(
                    bold(child.data)
                  )}`
                );
              }
            }

            // Good to Push While Child
            children.push(child as IsBlock | ElseBlock);
          } else if (tagName === ":if" || tagName === ":elseif") {
            if (child.type === "ElseBlock" || child.type === "ElseIfBlock") {
              if (elseBlock === null) {
                elseBlock = child as ElseIfBlock | ElseBlock;
              } else {
                let instance = elseBlock;
                while (true) {
                  if (
                    !Object.prototype.hasOwnProperty.call(instance, "else") ||
                    instance.type === "ElseBlock"
                  ) {
                    throw this.throwError(
                      `Bad chaining of ${cyan(bold(child.data))}`
                    );
                  } else if (instance.else !== null) {
                    instance = instance.else;
                  } else {
                    instance.else = child as ElseIfBlock | ElseBlock;
                    break;
                  }
                }
              }
            } else {
              children.push(child);
            }
          } else if (tagName === ":each") {
            if (child.type === "ElseBlock") {
              elseBlock = child as ElseBlock;
            } else {
              children.push(child);
            }
          } else {
            // Good to Push Other Block Child
            children.push(child);
          }

          childTemplate = this.advance(child.end - this.pos);

          const [endMatch] = childTemplate.match(reClosingTag) || [];

          if (endMatch) {
            switch (tagName) {
              case ":if":
                return this.getIfBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children,
                  expression as ExpressionStatment,
                  elseBlock
                );
              case ":elseif":
                return this.getElseIfBlock(
                  tagName,
                  start,
                  this.pos,
                  children,
                  expression as ExpressionStatment,
                  elseBlock
                );
              case ":else":
                return this.getElseBlock(tagName, start, this.pos, children);
              case ":skip":
                return this.getSkipBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children,
                  expression as ExpressionStatment
                );
              case ":when":
                return this.getWhenBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children as (IsBlock | ElseBlock)[],
                  expression as ExpressionStatment
                );
              case ":is":
                return this.getIsBlock(
                  tagName,
                  start,
                  this.pos,
                  children,
                  expression as ExpressionStatment
                );
              case ":each":
                return this.getEachBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children,
                  expression as ExpressionStatment,
                  elseBlock as ElseBlock | null,
                  context as Identifier,
                  index as Identifier | null
                );
              default:
                throw this.throwError(`Unknown Block ${cyan(bold(tagName))}`);
            }
          }
        }
      } else {
        // Expression
        template = this.advance(1);
        const expressionTemplate = template.substring(0, template.indexOf("}"));
        const statement = this.parseExpressions(
          expressionTemplate,
          this.pos,
          undefined
        );
        this.advance(expressionTemplate.length + 1);
        return statement;
      }
    }

    // Closing Expression or Flow Control

    // Opening Tag
    if (this.template.indexOf("<") === 0) {
      // Opening
      const [full, tagName, directive] = this.template.match(/^<((:?)\w+)/) || [
        null,
        null,
        null,
      ];
      if (tagName) {
        const start = this.pos;
        const getDynamicTag = this.getTagType(tagName, !!directive);

        // Get Any Attributes
        const attributes = this.parseAttributes(
          this.advance(tagName.length + 1)
        );

        // Get Closing Start Tag
        const [full, selfClosing] = this.template.match(/^\s*(\/?)>/) || [
          ">",
          "",
        ];
        if (selfClosing || voidElements.has(tagName)) {
          return getDynamicTag(
            tagName,
            start,
            this.pos + full.length,
            attributes,
            []
          );
        } else if (
          tagName === "script" ||
          tagName === "style" ||
          tagName === "textarea" ||
          tagName === ":data"
        ) {
          // All Text Content Tags, Skip to the end of the Text Content

          this.advance(full.length);
          const endTag = `</${tagName}>`;
          const endPos = this.template.indexOf(endTag);

          if (endPos === -1) {
            throw this.throwError(`Unclosed tag ${tagName}`);
          }

          const children = [
            this.getText(this.template.substring(0, endPos), endPos),
          ];

          return getDynamicTag(
            tagName,
            start,
            this.pos + endPos + endTag.length,
            attributes,
            children
          );
        } else {
          // Get Children of Tags
          const children: Array<AST> = [];
          let child;
          let childTemplate = this.advance(full.length);

          // Closes Tag with no Children
          const endMatch = childTemplate.match(
            new RegExp(`^<\\/${tagName}[^>]*>`)
          );
          if (endMatch) {
            return getDynamicTag(
              tagName,
              start,
              this.pos + endMatch[0].length,
              attributes,
              children
            );
          }

          // If no closing tag in our future, throw error
          if (childTemplate.indexOf(`</${tagName}>`) === -1) {
            throw this.throwError(`Unclosed tag ${cyan(bold(tagName))}`);
          }

          while ((child = this.parseTags(childTemplate)) !== null) {
            children.push(child);
            childTemplate = this.advance(child.end - this.pos);

            // Closes Tag with Children
            const endMatch = childTemplate.match(
              new RegExp(`^<\\/${tagName}[^>]*>`)
            );

            if (endMatch) {
              return getDynamicTag(
                tagName,
                start,
                this.pos + endMatch[0].length,
                attributes,
                children
              );
            }
          }
        }
      }
    }

    // Text Node
    const expStart = template.indexOf("{");
    let endText = template.indexOf("<");

    // If a expression is before a closing tag
    // Let's use that instead
    if (
      (expStart > -1 && endText === -1) ||
      (expStart !== -1 && endText > expStart)
    ) {
      endText = expStart;
    }

    if (endText === -1) {
      // Assume everything left is a Text Node
      return this.getText(template, template.length);
    } else if (endText > 0) {
      // Everything up to '<' or '{' is part of Text Node
      return this.getText(template.substring(0, endText), endText);
    }

    // Did not Match Anything...
    throw this.throwError("Invalid Syntax Found");
  }

  // Parse Expressions in Text and Flow Controls
  private parseExpressions(
    template: string,
    startPos: number,
    expression?: ExpressionStatment | undefined
  ): ExpressionStatment {
    const reToken = /^\s*(\!|\!\!|\+|\-|\~)?(\+\+|\-\-)?('[$\w.\-\"\`\s]+'|"[$\w.\-\'\`\s]+"|`[$\w.\-\"\'\s]+`|[$\w.\-\[\]]+)(\+\+|\-\-)?\s*/gm;
    const reNested = /^\s*\(([^\)]+)\)\s*/gm;
    const reBinary = /^\s*(\||\^|\&|\=\=\=|\=\=|\!\=\=|\!\=|\>\=|\<\=|\>|\<|\<\<|\>\>|\>\>\>|\+\-|\*|\/|\%)\s*/gm;
    const isString = /^['`"][$\w.\-\"\`\s]+['`"]$/;
    let parts;
    let advance = 0;

    if (template.indexOf("||") !== -1) {
      // Handle Logical || Operations
      const operator = template.lastIndexOf("||");
      const rightStart = operator + 2;

      expression = this.getLogicalExpression(
        "||",
        this.parseExpressions(template.substring(0, operator), startPos),
        "||",
        this.parseExpressions(
          template.substring(rightStart),
          startPos + rightStart
        ),
        startPos,
        startPos + template.length
      );

      // Logical Operations eat the whole template each time
      advance = template.length;
    } else if (template.indexOf("&&") !== -1) {
      // Handle Logical && Operations
      const operator = template.lastIndexOf("&&");
      const rightStart = operator + 2;

      expression = this.getLogicalExpression(
        "&&",
        this.parseExpressions(template.substring(0, operator), startPos),
        "&&",
        this.parseExpressions(
          template.substring(rightStart),
          startPos + rightStart
        ),
        startPos,
        startPos + template.length
      );

      // Logical Operations eat the whole template each time
      advance = template.length;
    } else if (reNested.test(template)) {
      // Nested Expression
      // Advance past starting ( and )
      const start = template.indexOf("(") + 1;
      expression = this.parseExpressions(
        template.substring(start, template.indexOf(")")),
        startPos + start
      );

      // Advanced Past Matched String
      advance = template.indexOf(")") + 1;
    } else if ((parts = [...(reToken.exec(template) || [])]).length) {
      // Identifier or Literal
      // Also includes unary and update operators
      const [
        full,
        unaryPrefix,
        updatePrefix,
        identifierORLiteral,
        updatePostfix,
        ...rest
      ] = parts;

      if (isString.test(identifierORLiteral)) {
        expression = this.getLiteral(
          identifierORLiteral,
          identifierORLiteral,
          full,
          startPos
        );
      } else if (
        parseFloat(identifierORLiteral).toString() === identifierORLiteral
      ) {
        expression = this.getLiteral(
          identifierORLiteral,
          parseFloat(identifierORLiteral),
          full,
          startPos
        );
      } else if (
        parseInt(identifierORLiteral, 10).toString() === identifierORLiteral
      ) {
        expression = this.getLiteral(
          identifierORLiteral,
          parseInt(identifierORLiteral, 10),
          full,
          startPos
        );
      } else if (identifierORLiteral === "true") {
        expression = this.getLiteral(identifierORLiteral, true, full, startPos);
      } else if (identifierORLiteral === "false") {
        expression = this.getLiteral(
          identifierORLiteral,
          false,
          full,
          startPos
        );
      } else if (identifierORLiteral === "undefined") {
        expression = this.getLiteral(
          identifierORLiteral,
          undefined,
          full,
          startPos
        );
      } else {
        if (
          identifierORLiteral.indexOf(".") > -1 ||
          identifierORLiteral.indexOf("[") > -1 ||
          identifierORLiteral.indexOf("]") > -1
        ) {
          // Appears to be a chained Identifier/Literal
          const tokens = [
            ...identifierORLiteral.matchAll(/([^.\n\[\]]+)([.\[\]]*)/gm),
          ];
          let memberExps;
          let memberData = "";
          let previousToken = "";
          let offset = full.indexOf(identifierORLiteral.trim());
          for (let i = 0, len = tokens.length; i < len; i++) {
            if (memberExps === undefined) {
              const [objFull, objRaw, objToken] = tokens[i];
              const [propFull, propRaw, propToken] = tokens[++i];
              const object = this.parseExpressions(objRaw, startPos + offset);
              const property = this.parseExpressions(
                propRaw,
                startPos + offset + objFull.length
              );
              memberData = `${memberData}${previousToken}${objRaw}${objToken}${propRaw}`;
              previousToken = propToken;

              if (object.type !== "Identifier") {
                throw this.throwError(
                  `Incorrect object type for member expression ${cyan(
                    bold(objRaw)
                  )}`
                );
              }

              if (
                property.type !== "Literal" &&
                property.type !== "Identifier"
              ) {
                throw this.throwError(
                  `Incorrect property type for member expression ${cyan(
                    bold(propRaw)
                  )}`
                );
              }

              memberExps = this.getMemberExpression(
                previousToken.indexOf("]") === 0
                  ? `${memberData}]`
                  : memberData,
                object as Identifier,
                property as Identifier | Literal,
                startPos + offset,
                property.end
              );
            } else {
              const [propFull, propRaw, propToken] = tokens[i];
              const property = this.parseExpressions(
                propRaw,
                memberExps.end + previousToken.length
              );

              memberData = `${memberData}${previousToken}${propRaw}`;
              previousToken = propToken;

              if (
                property.type !== "Literal" &&
                property.type !== "Identifier"
              ) {
                throw this.throwError(
                  `Incorrect property type for member expression ${cyan(
                    bold(propRaw)
                  )}`
                );
              }

              memberExps = this.getMemberExpression(
                previousToken.indexOf("]") === 0
                  ? `${memberData}]`
                  : memberData,
                memberExps,
                property as Identifier | Literal,
                startPos,
                property.end
              );
            }
          }

          if (memberExps === undefined) {
            throw this.throwError(
              `Unable to build member expression ${cyan(
                bold(identifierORLiteral)
              )}`
            );
          }

          expression = memberExps;
        } else {
          // Not a chained Identrifier
          expression = this.getIdentifier(identifierORLiteral, full, startPos);
        }
      }

      // Too much of a good thing.....
      if (!!updatePrefix && !!updatePostfix) {
        throw this.throwError(
          `Too many update expressions on ${yellow(updatePrefix)}${cyan(
            bold(identifierORLiteral)
          )}${red(updatePostfix)}`
        );
      }

      // Update Expression
      if (!!updatePrefix || !!updatePostfix) {
        const updateOperator = updatePrefix ? updatePrefix : updatePostfix;
        expression = this.getUpdateExpression(
          updateOperator,
          !!updatePrefix,
          updateOperator as UpdateOperator,
          expression,
          full,
          startPos
        );
      }

      // Unary Expression, special handling for double !!
      if (unaryPrefix) {
        const unaryOperator = unaryPrefix === "!!" ? "!" : unaryPrefix;
        const maybeNestedExpression =
          unaryPrefix === "!!"
            ? this.getUnaryExpression(
                "!",
                true,
                "!",
                expression,
                full.replace("!!", " !"),
                startPos
              )
            : expression;

        expression = this.getUnaryExpression(
          unaryOperator,
          true,
          unaryOperator as UnaryOperator,
          maybeNestedExpression,
          unaryPrefix === "!!" ? full.replace("!!", "! ") : full,
          startPos
        );
      }

      // Advanced Past Matched String
      advance = full.length;
    } else if (
      (parts = [...(reBinary.exec(template) || [])]).length &&
      expression
    ) {
      // Binary Operator
      const [full, operator, ...rest] = parts;
      expression = this.getBinaryExpression(
        operator,
        expression,
        operator as BinaryOperator,
        this.parseExpressions(
          template.substring(full.length),
          startPos + full.length
        )
      );

      // Advanced Past Matched String
      advance = expression.end - expression.start;
    }

    // Safety Check
    if (expression === undefined) {
      throw this.throwError(`Something went wrong when parsing expression`);
    }

    // Advance Past Closing Expression
    template = template.substring(advance);
    const closingExp = template.match(/^\s*[\}\)]/gm);
    if (template.length === 0 || (closingExp?.length && closingExp[0].length)) {
      return expression;
    } else {
      return this.parseExpressions(template, startPos + advance, expression);
    }
  }

  private getBinaryExpression(
    data: string,
    left: ExpressionStatment,
    operator: BinaryOperator,
    right: ExpressionStatment
  ): BinaryExpression {
    return {
      type: "BinaryExpression",
      data,
      left,
      operator,
      right,
      start: left.start,
      end: right.end,
    };
  }

  private getLogicalExpression(
    data: string,
    left: ExpressionStatment,
    operator: LogicalOperator,
    right: ExpressionStatment,
    start: number,
    end: number
  ): LogicalExpression {
    return {
      type: "LogicalExpression",
      data,
      left,
      operator,
      right,
      start,
      end,
    };
  }

  private getMemberExpression(
    data: string,
    object: Identifier | MemberExpression,
    property: Identifier | Literal,
    start: number,
    end: number
  ): MemberExpression {
    return {
      type: "MemberExpression",
      data,
      object,
      property,
      start,
      end,
    };
  }

  private getUnaryExpression(
    data: string,
    prefix: boolean,
    operator: UnaryOperator,
    argument: ExpressionStatment,
    full: string,
    startPos: number
  ): UnaryExpression {
    const pos = full.indexOf(data);
    return {
      type: "UnaryExpression",
      data,
      prefix,
      operator,
      argument,
      start: startPos + pos,
      end: startPos + pos + data.length,
    };
  }

  private getUpdateExpression(
    data: string,
    prefix: boolean,
    operator: UpdateOperator,
    argument: ExpressionStatment,
    full: string,
    startPos: number
  ): UpdateExpression {
    const pos = full.indexOf(data);
    return {
      type: "UpdateExpression",
      data,
      prefix,
      operator,
      argument,
      start: startPos + pos,
      end: startPos + pos + data.length,
    };
  }

  private getIdentifier(
    data: string,
    full: string,
    startPos: number
  ): Identifier {
    const pos = full.indexOf(data);
    return {
      type: "Identifier",
      data,
      start: startPos + pos,
      end: startPos + pos + data.length,
    };
  }

  private getLiteral(
    data: string,
    value: string | boolean | number | undefined,
    full: string,
    startPos: number
  ): Literal {
    const pos = full.indexOf(data);
    return {
      type: "Literal",
      data,
      value,
      start: startPos + pos,
      end: startPos + pos + data.length,
    };
  }

  // Parse Attributes in Tags
  private parseAttributes(
    template: string
  ): Array<Attribute | AttributeSpread> {
    const attrs = [];
    // const regex = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    const regex = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*((:?")(?:[^"]*)(:?")+|'(?:[^']*)'+|(?:[^\s"'=<>`]+)))?/;
    let parts;

    while ((parts = regex.exec(template)) !== null) {
      const [full, name, eq, value, ...rest] = parts;

      if (
        !alpineAttributes.has(name) &&
        full.indexOf("{") > -1 &&
        full.indexOf("}") > -1
      ) {
        // Attribute has Expression
        if (full.indexOf("...") > -1) {
          // Spread Opperator
          const [[fullMatch, identifier]] = full.matchAll(
            /\{\.\.\.([\w\-.]+)\}/gm
          );

          const distance = full.indexOf(identifier);
          const expression = this.parseExpressions(
            identifier,
            this.pos + distance
          );

          // Safety Check
          if (expression.type !== "Identifier") {
            throw this.throwError(
              `Invalid Identifier ${cyan(bold(expression.data))}`
            );
          }

          attrs.push(
            this.getSpreadAttribute(
              fullMatch,
              expression,
              this.pos + full.indexOf("{"),
              this.pos + full.indexOf("}") + 1
            )
          );
        } else {
          // Expression Template
          const startDistance = full.indexOf("{") + 1;
          const endDistance = full.indexOf("}");
          const expression = this.parseExpressions(
            full.substring(startDistance, endDistance),
            this.pos + startDistance
          );

          if (value === undefined && expression.type === "Identifier") {
            // Name is Implicit
            const expressionStatement = this.getExpressionAttribute(
              name,
              expression,
              this.pos + full.indexOf("{"),
              this.pos + full.indexOf("}") + 1
            );
            attrs.push(
              this.getAttribute(full, expression.data, expressionStatement)
            );
          } else {
            // Name is Specified
            const expressionStatement = this.getExpressionAttribute(
              value,
              expression,
              this.pos + full.indexOf("{"),
              this.pos + full.indexOf("}") + 1
            );
            attrs.push(this.getAttribute(full, name, expressionStatement));
          }
        }
      } else {
        // Normal Attribute
        attrs.push(this.getAttribute(full, name, value));
      }

      template = this.advance(full.length);
    }

    return attrs;
  }

  // Advance postition and template string
  private advance(amount: number) {
    // Can never go backwards
    // Some things, like Literals and Identifiers force skipping over expression tags '{', '}'
    if (amount < 0) {
      return this.template;
    }

    this.pos += amount;
    this.template = this.template.substring(amount);
    return this.template;
  }

  // Look ahead at all direct children and validate against whitelist
  private validateChildren(
    children: Array<AST> | [],
    whitelist: Array<string>,
    tagName: string,
    ignoreWhitespace = true
  ): void {
    const allowed = new Set(whitelist);
    const disallowed = new Set();

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i].data;

      // Ignore any Whitespace when validating children
      if (ignoreWhitespace && !/[^\\n\s]/gm.test(child)) {
        continue;
      }

      if (!allowed.has(child)) disallowed.add(child);
    }

    // Throw if invalid children
    if (disallowed.size > 0) {
      throw this.throwError(
        `Disallowed children ${cyan(
          bold(JSON.stringify([...disallowed.values()]))
        )} in ${bold(`<${tagName}>`)}`,
        `Only ${cyan(
          bold(JSON.stringify(whitelist))
        )} children are supported in the <${tagName}> directive.`
      );
    }
  }

  // Determines the Tag AST Object to Use
  private getTagType(tagName: string, directive: boolean) {
    if (directive) {
      // Registry of Known Directives
      switch (tagName) {
        case ":component":
          return this.getComponentDirective.bind(this);
        case ":data":
          return this.getDataDirective.bind(this);
        case ":element":
          return this.getElementDirective.bind(this);
        case ":layout":
          return this.getLayoutDirective.bind(this);
        case ":path":
          return this.getPathDirective.bind(this);
        case ":router":
          return this.getRouterDirective.bind(this);
        case ":slot":
          return this.getSlotDirective.bind(this);
        default:
          throw this.throwError(`Unknown Directive ${cyan(bold(tagName))}`);
      }
    } else if (htmlElements.has(tagName)) {
      return this.getTag.bind(this);
    }

    return this.getComponentDirective.bind(this);
  }

  // Doctype AST Object
  private getDoctype(data: string, length: number): Doctype {
    return {
      type: "Doctype",
      data,
      start: this.pos,
      end: this.pos + length,
    };
  }

  // Comment AST Object
  private getComment(data: string, length: number): Comment {
    return {
      type: "Comment",
      data,
      start: this.pos,
      end: this.pos + length,
    };
  }

  // Text AST Object
  private getText(data: string, length: number): Text {
    return {
      type: "Text",
      data,
      start: this.pos,
      end: this.pos + length,
    };
  }

  // Tag AST Object
  private getTag(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): Tag {
    return {
      type: "Tag",
      data,
      attributes,
      children,
      start,
      end,
    };
  }

  // Component Directive AST Object
  private getComponentDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): ComponentDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use"
    ) as Attribute;

    let expression;
    if (found?.value?.type === "AttributeExpression") {
      expression = found.value.expression;
    } else {
      let use = found?.value?.data;
      if (data === ":component" && !use) {
        // Throw only if bind is missing from a :component directive
        // Don't throw if this is a <CustomComponent> tag
        throw this.throwError("Missing Use Argument For Component Directive");
      }
      const expressionTemplate = use === undefined ? data : use;
      const expressionPos = use ? found.value.start : start;
      expression = this.parseExpressions(expressionTemplate, expressionPos);
    }

    // Remove unneeded attributes
    if (data === ":component") {
      // Remove unneeded attributes
      attributes = this.removeAttribute(attributes, "use");
    }

    if (
      expression.type !== "Identifier" &&
      expression.type !== "Literal" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Use Argument ${cyan(
          bold(found.value.data)
        )} For Component Directive`
      );
    }

    return {
      type: "ComponentDirective",
      data: ":component",
      attributes,
      children,
      expression: expression as Identifier | Literal | MemberExpression,
      start,
      end,
    };
  }

  // Element Directive AST Object
  private getElementDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): ElementDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use"
    ) as Attribute;

    let expression;
    if (found?.value?.type === "AttributeExpression") {
      expression = found.value.expression;
    } else {
      if (!found?.value?.data) {
        throw this.throwError("Missing Use Argument For Element Directive");
      }

      expression = this.parseExpressions(found.value.data, found.value.start);
    }

    // Remove unneeded attributes
    attributes = this.removeAttribute(attributes, "use");

    if (
      expression.type !== "Identifier" &&
      expression.type !== "Literal" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Use Argument ${cyan(
          bold(found.value.data)
        )} For Element Directive`
      );
    }

    return {
      type: "ElementDirective",
      data,
      attributes,
      children,
      expression: expression as Identifier | Literal | MemberExpression,
      start,
      end,
    };
  }

  // Element Directive AST Object
  private getLayoutDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): LayoutDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use"
    ) as Attribute;

    let expression;
    if (found?.value?.type === "AttributeExpression") {
      expression = found.value.expression;
    } else {
      if (!found?.value?.data) {
        throw this.throwError("Missing Use Argument For Layout Directive");
      }

      expression = this.parseExpressions(found.value.data, found.value.start);
    }

    // Remove unneeded attributes
    attributes = this.removeAttribute(attributes, "use");

    if (
      expression.type !== "Identifier" &&
      expression.type !== "Literal" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Use Argument ${cyan(
          bold(found.value.data)
        )} For Layout Directive`
      );
    }

    return {
      type: "LayoutDirective",
      data,
      attributes,
      children,
      expression: expression as Identifier | Literal | MemberExpression,
      start,
      end,
    };
  }

  // Router Directive AST Object
  private getRouterDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): RouterDirective {
    if (children.length === 0) {
      throw this.throwError(
        `Missing required ${cyan(bold("<:path>"))} Directives inside <:router>`
      );
    }

    // Restrict Allowed Children
    this.validateChildren(children, [":path", ":data"], data);

    return {
      type: "RouterDirective",
      data,
      attributes,
      children,
      start,
      end,
    };
  }

  // Path Directive AST Object
  private getPathDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): PathDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "url"
    ) as Attribute;
    const url = found?.value?.data;
    const startPath = found?.value?.start;

    if (!url) {
      throw this.throwError(
        `Invalid <:path> Directive. Missing required ${cyan(
          bold("url")
        )} attribute`
      );
    }

    // Remove unneeded attributes
    attributes = this.removeAttribute(attributes, "url");

    // Restrict Allowed Children
    this.validateChildren(children, [":data"], data);

    return {
      type: "PathDirective",
      data,
      attributes,
      children,
      path: this.parsePathUrl(url, startPath - 1),
      start,
      end,
    };
  }

  // Parse URL into Path Objects
  private parsePathUrl(path: string, startPath: number): Array<PathSegment> {
    const segments = [];
    const regex = /\/((:)?([A-Za-z0-9-_%]+))/gm;
    let parts;

    while ((parts = regex.exec(path)) !== null) {
      const [full, data, dynamic, bind] = parts;
      const start = startPath + path.indexOf(data);
      const end = start + data.length;

      if (dynamic) {
        segments.push(this.getDynamicPathSegment(data, bind, start, end));
      } else {
        segments.push(this.getStaticPathSegment(data, start, end));
      }
    }

    return segments;
  }

  // Satic Path Segment AST
  private getStaticPathSegment(
    data: string,
    start: number,
    end: number
  ): StaticPathSegment {
    return {
      type: "StaticPathSegment",
      data,
      start,
      end,
    };
  }

  // Dynamic Path Segment AST
  private getDynamicPathSegment(
    data: string,
    bind: string,
    start: number,
    end: number
  ): DynamicPathSegment {
    const expression = this.parseExpressions(bind, start);

    if (
      expression.type !== "Identifier" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Path Segment ${cyan(bold(data))} For Path Directive`
      );
    }

    return {
      type: "DynamicPathSegment",
      data,
      expression,
      start,
      end,
    };
  }

  // Data Directive AST Object
  private getDataDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): DataDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "key"
    ) as Attribute;
    const key = found?.value?.data;

    // Remove unneeded attributes
    attributes = this.removeAttribute(attributes, "key");

    return {
      type: "DataDirective",
      data,
      attributes,
      children,
      key: key || "$",
      start,
      end,
    };
  }

  // Slot Directive AST Object
  private getSlotDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = []
  ): SlotDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "name"
    ) as Attribute;
    const name = found?.value?.data;
    let expression = null;
    if (name) {
      expression = this.parseExpressions(name, found.value.start);

      // Remove unneeded attributes
      attributes = this.removeAttribute(attributes, "name");

      if (expression.type !== "Literal") {
        // Throw if we have a invalid type used for a name statement
        throw this.throwError(
          `Invalid Name Argument ${cyan(bold(name))} For Slot Directive`
        );
      }
    }

    return {
      type: "SlotDirective",
      data,
      attributes,
      children,
      expression: expression as Literal | null,
      start,
      end,
    };
  }

  // If Block AST Object
  private getIfBlock(
    data: string,
    start: number,
    end: number,
    children: Array<AST> = [],
    expression: ExpressionStatment,
    elseBlock: ElseBlock | ElseIfBlock | null
  ): IfBlock {
    return {
      type: "IfBlock",
      data,
      children,
      expression,
      else: elseBlock,
      start,
      end,
    };
  }

  // Else If Block AST Object
  private getElseIfBlock(
    data: string,
    start: number,
    end: number,
    children: Array<AST> = [],
    expression: ExpressionStatment,
    elseBlock: ElseBlock | ElseIfBlock | null
  ): ElseIfBlock {
    return {
      type: "ElseIfBlock",
      data,
      children,
      expression,
      else: elseBlock,
      start,
      end,
    };
  }

  // Else Block AST Object
  private getElseBlock(
    data: string,
    start: number,
    end: number,
    children: Array<AST> = []
  ): ElseBlock {
    return {
      type: "ElseBlock",
      data,
      children,
      start,
      end,
    };
  }

  // Skip Block AST Object
  private getSkipBlock(
    data: string,
    start: number,
    end: number,
    children: Array<AST> = [],
    expression: ExpressionStatment
  ): SkipBlock {
    return {
      type: "SkipBlock",
      data,
      children,
      expression,
      start,
      end,
    };
  }

  // When Block AST Object
  private getWhenBlock(
    data: string,
    start: number,
    end: number,
    children: Array<IsBlock | ElseBlock> = [],
    expression: ExpressionStatment
  ): WhenBlock {
    return {
      type: "WhenBlock",
      data,
      children,
      expression,
      start,
      end,
    };
  }

  // Is Block AST Object
  private getIsBlock(
    data: string,
    start: number,
    end: number,
    children: Array<AST> = [],
    expression: ExpressionStatment
  ): IsBlock {
    return {
      type: "IsBlock",
      data,
      children,
      expression,
      start,
      end,
    };
  }

  // Each Block AST Object
  private getEachBlock(
    data: string,
    start: number,
    end: number,
    children: Array<AST> = [],
    expression: ExpressionStatment,
    elseBlock: ElseBlock | null,
    context: Identifier,
    index: Identifier | null
  ): EachBlock {
    return {
      type: "EachBlock",
      data,
      children,
      expression,
      context,
      index,
      else: elseBlock,
      start,
      end,
    };
  }

  // ContinueStatement AST Object
  private getContinueStatement(
    data: string,
    start: number,
    end: number
  ): ContinueStatement {
    return {
      type: "ContinueStatement",
      data,
      start,
      end,
    };
  }

  // ContinueStatement AST Object
  private getBreakStatement(
    data: string,
    start: number,
    end: number
  ): BreakStatement {
    return {
      type: "BreakStatement",
      data,
      start,
      end,
    };
  }

  // ExpressionAttribute AST Object
  private getExpressionAttribute(
    data: string,
    expression: ExpressionStatment,
    start: number,
    end: number
  ): AttributeExpression {
    return {
      type: "AttributeExpression",
      data,
      expression,
      start,
      end,
    };
  }

  // SpreadAttribute AST Object
  private getSpreadAttribute(
    data: string,
    expression: Identifier,
    start: number,
    end: number
  ): AttributeSpread {
    return {
      type: "AttributeSpread",
      data,
      expression,
      start,
      end,
    };
  }

  // Attribute AST Object
  private getAttribute(
    data: string,
    name: string,
    value: string | AttributeExpression = ""
  ): Attribute {
    const nameLen = name.length;
    const junk = data.match(/^\s*/)?.[0].length || 0;
    const nameStart = this.pos + junk;
    let valueOut;
    if (typeof value === "string") {
      // Typically Attribute
      const valueLen = value?.length || 0;
      const valueStart = (valueLen ? this.pos + 2 : this.pos) + junk + nameLen;
      valueOut = this.getAttributeValue(
        value,
        valueStart,
        valueStart + valueLen
      );
    } else {
      // Expression Statement
      valueOut = value;
    }

    return {
      type: "Attribute",
      data,
      start: this.pos,
      end: this.pos + data.length,
      name: this.getAttributeName(name, nameStart, nameStart + nameLen),
      value: valueOut,
    };
  }

  // Attribute Name AST Object
  private getAttributeName(
    data: string,
    start: number,
    end: number
  ): AttributeName {
    return {
      type: "AttributeName",
      data,
      start,
      end,
    };
  }

  // Attribute Value AST Object
  private getAttributeValue(
    data: string,
    start: number,
    end: number
  ): AttributeValue {
    return {
      type: "AttributeValue",
      data,
      start,
      end,
    };
  }

  // Remove Attribute from Attributes Array
  private removeAttribute(
    attributes: Array<Attribute | AttributeSpread>,
    name: string
  ) {
    // Remove unneeded attributes
    return attributes.filter(
      (element) =>
        element?.type !== "Attribute" ||
        (element?.type === "Attribute" && element?.name?.data !== name)
    );
  }

  // Throw Error
  private throwError(message: string, help?: string): Error {
    return new Error(`\n${message} at position ${yellow(bold(`${this.pos}`))}

      ${this.template.substring(0, 20)}
      ${red("^")}${help ? `\n\n     ${yellow(bold("TIP - "))}${help}` : ""}  
    `);
  }
}
