import { bold, cyan, yellow, red } from "../../deps.ts";
import voidElements from "../dict/voidElements.ts";
import htmlElements from "../dict/htmlElements.ts";
import alpineAttributes from "../dict/alpineAttributes.ts";
import type {
  RootAST,
  AST,
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
  ExpressionStatement,
  DataDirective,
  UpdateOperator,
  BinaryOperator,
  UnaryOperator,
  LogicalOperator,
  ComponentDirective,
  LayoutDirective,
  PathDirective,
  RouterDirective,
  PathSegment,
  DynamicPathSegment,
  StaticPathSegment,
  SlotDirective,
  DynamicTag,
  ParserContext,
  OptionalPathSegment,
  PaginationPathSegment,
  RangePathSegment,
  ScriptTag,
  StyleTag,
  HeadDirective,
} from "../types.ts";

// Parser
export class Parser {
  private pos = 0;
  private html: Array<AST> = [];
  private layout: Array<AST> = [];
  private router: RouterDirective | undefined = undefined;
  private template: string;
  private context: ParserContext;

  constructor(template: string, context: ParserContext = "Page") {
    if (typeof template !== "string") {
      throw new TypeError("Template must be a string");
    }

    this.template = template.replace(/\s+$/, "");
    this.context = context;
  }

  public parse(): RootAST {
    while (this.template) {
      const tag = this.parseTags(this.template);
      if (tag) {
        // Validate Root Level Items for Layout
        if (this.context === "Layout") {
          if (
            tag.type === "RouterDirective" ||
            tag.type === "PathDirective" ||
            tag.type === "SlotDirective" ||
            tag.type === "LayoutDirective"
          ) {
            throw this.throwError(
              `Invalid root level type ${
                cyan(
                  bold(tag.type),
                )
              }, disallowed in Layout`,
            );
          }
        }

        // Validate Root Level Items for Component
        if (this.context === "Component") {
          if (
            tag.type === "RouterDirective" ||
            tag.type === "PathDirective" ||
            tag.type === "SlotDirective" ||
            tag.type === "LayoutDirective"
          ) {
            throw this.throwError(
              `Invalid root level type ${
                cyan(
                  bold(tag.type),
                )
              }, disallowed in Component`,
            );
          }
        }

        // Validate Root Level Items for Page
        if (this.context === "Page") {
          if (tag.type === "SlotDirective" || tag.type === "PathDirective") {
            throw this.throwError(
              `Invalid root level type ${
                cyan(
                  bold(tag.type),
                )
              }, disallowed in Page`,
            );
          }
        }

        // Advance
        this.advance(tag.end - this.pos);

        // Place in Correct Place
        if (tag.type === "LayoutDirective") {
          this.layout.push(tag);
        } else if (tag.type === "RouterDirective") {
          if (this.router !== undefined) {
            throw this.throwError(
              "Multiple RouterDirectives found. Pages can only contain one Router Directive.",
            );
          }

          this.router = tag;
        } else {
          this.html.push(tag);
        }
      }
    }

    return {
      html: this.html,
      router: this.router,
      layout: this.layout,
    };
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
          endComment + 3,
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
        const [tagName] = template.match(/^\:\w+/g) || [];
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
            template.indexOf("}"),
          );
          expression = this.parseExpressions(
            expressionTemplate,
            this.pos,
            undefined,
          );
          childTemplate = this.advance(expressionTemplate.length + 1);
        } else if (tagName === ":each") {
          // Handle Expression
          const expressionTemplate = template.substring(
            0,
            template.indexOf("}"),
          );

          expression = this.parseExpressions(
            expressionTemplate.substring(0, expressionTemplate.indexOf(" as ")),
            this.pos,
            undefined,
          );
          // childTemplate = this.advance(expressionTemplate.length + 1);

          // Handle Context and Optional Index
          const contextAndIndexTemplate = expressionTemplate.substring(
            expressionTemplate.indexOf(" as ") + 4,
          );

          // Handle with Index
          const hasIndex = contextAndIndexTemplate.indexOf(",");
          if (hasIndex > 0) {
            context = this.parseExpressions(
              contextAndIndexTemplate.substring(0, hasIndex),
              expression.end + 4,
              undefined,
            );
            index = this.parseExpressions(
              contextAndIndexTemplate.substring(hasIndex + 1),
              expression.end + 4 + hasIndex + 1,
              undefined,
            );
          } else {
            context = this.parseExpressions(
              contextAndIndexTemplate,
              expression.end + 4,
              undefined,
            );
          }

          // Valiadate Context (required)
          if (context.type !== "Identifier") {
            throw this.throwError(
              `Invalid context in the each block ${cyan(bold(context.data))}`,
            );
          }

          // Validate Index (optional as null)
          if (index !== null && index.type !== "Identifier") {
            throw this.throwError(
              `Invalid index in the each block ${cyan(bold(index.data))}`,
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
            reClosingTag = /^\{\/\s*\:if\s*\}/g;
            break;
          case ":elseif":
            reClosingTag =
              /^(\{\s*\:elseif|\{\s*\:else\s*\}|\{\/\s*\:if\s*\})/g;
            break;
          case ":else":
            reClosingTag =
              /^(\{\/\s*\:if\s*\}|\{\/\s*\:when\s*\}|\{\/\s*\:each\s*\})/g;
            break;
          case ":skip":
            reClosingTag = /^\{\/\s*\:skip\s*\}/g;
            break;
          case ":when":
            reClosingTag = /^\{\/\s*\:when\s*\}/g;
            break;
          case ":is":
            reClosingTag = /^(\{\s*\:is|\{\s*\:else\s*\}|\{\/\s*\:when\s*\})/g;
            break;
          case ":each":
            reClosingTag = /^\{\/\s*\:each\s*\}/g;
            break;
          default:
            throw this.throwError(`Unknown Block ${cyan(bold(tagName))}`);
        }

        while ((child = this.parseTags(childTemplate)) !== null) {
          if (tagName === ":when") {
            if (child.type !== "IsBlock" && child.type !== "ElseBlock") {
              if (child.type === "Text" && !/[^\s]/g.test(child.data)) {
                // Good to Push While Child
                children.push((child as unknown) as IsBlock | ElseBlock);
              } else {
                throw this.throwError(
                  `When block has disallowed direct child ${
                    cyan(
                      bold(child.data),
                    )
                  }`,
                );
              }
            } else {
              // Good to Push While Child
              children.push(child as IsBlock | ElseBlock);
            }
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
                      `Bad chaining of ${cyan(bold(child.data))}`,
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
                  expression as ExpressionStatement,
                  elseBlock,
                );
              case ":elseif":
                return this.getElseIfBlock(
                  tagName,
                  start,
                  this.pos,
                  children,
                  expression as ExpressionStatement,
                  elseBlock,
                );
              case ":else":
                return this.getElseBlock(tagName, start, this.pos, children);
              case ":skip":
                return this.getSkipBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children,
                  expression as ExpressionStatement,
                );
              case ":when":
                return this.getWhenBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children as (IsBlock | ElseBlock)[],
                  expression as ExpressionStatement,
                );
              case ":is":
                return this.getIsBlock(
                  tagName,
                  start,
                  this.pos,
                  children,
                  expression as ExpressionStatement,
                );
              case ":each":
                return this.getEachBlock(
                  tagName,
                  start,
                  this.pos + endMatch.length,
                  children,
                  expression as ExpressionStatement,
                  elseBlock as ElseBlock | null,
                  context as Identifier,
                  index as Identifier | null,
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
          undefined,
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
          this.advance(tagName.length + 1),
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
            [],
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
            children,
          );
        } else {
          // Get Children of Tags
          const children: Array<AST> = [];
          let child;
          let childTemplate = this.advance(full.length);

          // Closes Tag with no Children
          const endMatch = childTemplate.match(
            new RegExp(`^<\\/${tagName}[^>]*>`),
          );
          if (endMatch) {
            return getDynamicTag(
              tagName,
              start,
              this.pos + endMatch[0].length,
              attributes,
              children,
            );
          }

          // If no closing tag in our future, throw error
          if (childTemplate.indexOf(`</${tagName}>`) === -1) {
            throw this.throwError(`Unclosed tag ${cyan(bold(tagName))}`);
          }

          while (
            (child = this.parseTags(childTemplate) as DynamicTag) !== null
          ) {
            // Validate slot attribute is directly below component
            if (getDynamicTag.name !== "bound getComponentDirective") {
              if (
                child.type === "ComponentDirective" ||
                child.type === "ElementDirective" ||
                child.type === "Tag"
              ) {
                // If found, and not direct child, emit error
                if (
                  (child as ComponentDirective | ElementDirective | Tag)
                    .slot !== undefined
                ) {
                  throw this.throwError(
                    `Element '${
                      cyan(
                        bold(child.data),
                      )
                    }' with attribute ${
                      yellow(
                        'slot="..."',
                      )
                    } must be a direct child of a Component Directive`,
                  );
                }
              }
            }

            children.push(child);
            childTemplate = this.advance(child.end - this.pos);

            // Closes Tag with Children
            const endMatch = childTemplate.match(
              new RegExp(`^<\\/${tagName}[^>]*>`),
            );

            if (endMatch) {
              return getDynamicTag(
                tagName,
                start,
                this.pos + endMatch[0].length,
                attributes,
                children,
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
    expression?: ExpressionStatement | undefined,
  ): ExpressionStatement {
    const reToken =
      /^\s*(\!|\!\!|\+|\-|\~)?(\+\+|\-\-)?('[$\w.\-\"\`\s]+'|"[$\w.\-\'\`\s]+"|`[$\w.\-\"\'\s]+`|[$\w.\-\[\]]+)(\+\+|\-\-)?\s*/g;
    const reNested = /^\s*\(([^\)]+)\)\s*/g;
    const reBinary =
      /^\s*(\||\^|\&|\=\=\=|\=\=|\!\=\=|\!\=|\>\=|\<\=|\>|\<|\<\<|\>\>|\>\>\>|\+\-|\*|\/|\%)\s*/g;
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
          startPos + rightStart,
        ),
        startPos,
        startPos + template.length,
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
          startPos + rightStart,
        ),
        startPos,
        startPos + template.length,
      );

      // Logical Operations eat the whole template each time
      advance = template.length;
    } else if (reNested.test(template)) {
      // Nested Expression
      // Advance past starting ( and )
      const start = template.indexOf("(") + 1;
      expression = this.parseExpressions(
        template.substring(start, template.indexOf(")")),
        startPos + start,
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
          startPos,
        );
      } else if (
        parseFloat(identifierORLiteral).toString() === identifierORLiteral
      ) {
        expression = this.getLiteral(
          identifierORLiteral,
          parseFloat(identifierORLiteral),
          full,
          startPos,
        );
      } else if (
        parseInt(identifierORLiteral, 10).toString() === identifierORLiteral
      ) {
        expression = this.getLiteral(
          identifierORLiteral,
          parseInt(identifierORLiteral, 10),
          full,
          startPos,
        );
      } else if (identifierORLiteral === "true") {
        expression = this.getLiteral(identifierORLiteral, true, full, startPos);
      } else if (identifierORLiteral === "false") {
        expression = this.getLiteral(
          identifierORLiteral,
          false,
          full,
          startPos,
        );
      } else if (identifierORLiteral === "undefined") {
        expression = this.getLiteral(
          identifierORLiteral,
          undefined,
          full,
          startPos,
        );
      } else {
        if (
          identifierORLiteral.indexOf(".") > -1 ||
          identifierORLiteral.indexOf("[") > -1 ||
          identifierORLiteral.indexOf("]") > -1
        ) {
          // Appears to be a chained Identifier/Literal
          const tokens = [
            ...identifierORLiteral.matchAll(/([^.\n\[\]]+)([.\[\]]*)/g),
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
                startPos + offset + objFull.length,
              );
              memberData =
                `${memberData}${previousToken}${objRaw}${objToken}${propRaw}`;
              previousToken = propToken;

              if (object.type !== "Identifier") {
                throw this.throwError(
                  `Incorrect object type for member expression ${
                    cyan(
                      bold(objRaw),
                    )
                  }`,
                );
              }

              if (
                property.type !== "Literal" &&
                property.type !== "Identifier"
              ) {
                throw this.throwError(
                  `Incorrect property type for member expression ${
                    cyan(
                      bold(propRaw),
                    )
                  }`,
                );
              }

              memberExps = this.getMemberExpression(
                previousToken.indexOf("]") === 0
                  ? `${memberData}]`
                  : memberData,
                object as Identifier,
                property as Identifier | Literal,
                startPos + offset,
                property.end,
              );
            } else {
              const [propFull, propRaw, propToken] = tokens[i];
              const property = this.parseExpressions(
                propRaw,
                memberExps.end + previousToken.length,
              );

              memberData = `${memberData}${previousToken}${propRaw}`;
              previousToken = propToken;

              if (
                property.type !== "Literal" &&
                property.type !== "Identifier"
              ) {
                throw this.throwError(
                  `Incorrect property type for member expression ${
                    cyan(
                      bold(propRaw),
                    )
                  }`,
                );
              }

              memberExps = this.getMemberExpression(
                previousToken.indexOf("]") === 0
                  ? `${memberData}]`
                  : memberData,
                memberExps,
                property as Identifier | Literal,
                startPos,
                property.end,
              );
            }
          }

          if (memberExps === undefined) {
            throw this.throwError(
              `Unable to build member expression ${
                cyan(
                  bold(identifierORLiteral),
                )
              }`,
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
          `Too many update expressions on ${yellow(updatePrefix)}${
            cyan(
              bold(identifierORLiteral),
            )
          }${red(updatePostfix)}`,
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
          startPos,
        );
      }

      // Unary Expression, special handling for double !!
      if (unaryPrefix) {
        const unaryOperator = unaryPrefix === "!!" ? "!" : unaryPrefix;
        const maybeNestedExpression = unaryPrefix === "!!"
          ? this.getUnaryExpression(
            "!",
            true,
            "!",
            expression,
            full.replace("!!", " !"),
            startPos,
          )
          : expression;

        expression = this.getUnaryExpression(
          unaryOperator,
          true,
          unaryOperator as UnaryOperator,
          maybeNestedExpression,
          unaryPrefix === "!!" ? full.replace("!!", "! ") : full,
          startPos,
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
          startPos + full.length,
        ),
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
    const closingExp = template.match(/^\s*[\}\)]/g);
    if (template.length === 0 || (closingExp?.length && closingExp[0].length)) {
      return expression;
    } else {
      return this.parseExpressions(template, startPos + advance, expression);
    }
  }

  private getBinaryExpression(
    data: string,
    left: ExpressionStatement,
    operator: BinaryOperator,
    right: ExpressionStatement,
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
    left: ExpressionStatement,
    operator: LogicalOperator,
    right: ExpressionStatement,
    start: number,
    end: number,
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
    end: number,
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
    argument: ExpressionStatement,
    full: string,
    startPos: number,
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
    argument: ExpressionStatement,
    full: string,
    startPos: number,
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
    startPos: number,
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
    startPos: number,
  ): Literal {
    let modifiedValue = value;

    // Remove quotes if string has quotes on edges (eg. "'example'")
    if (typeof value === "string") {
      const [full, unquoted] = value.match(/^["'`](.*)["'`]$/) || [];
      if (unquoted !== undefined) {
        modifiedValue = unquoted;
      }
    }

    const pos = full.indexOf(data);
    return {
      type: "Literal",
      data,
      value: modifiedValue,
      start: startPos + pos,
      end: startPos + pos + data.length,
    };
  }

  // Parse Attributes in Tags
  private parseAttributes(
    template: string,
  ): Array<Attribute | AttributeSpread> {
    const attrs = [];
    // const regex = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    const regex =
      /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*((:?")(?:[^"]*)(:?")+|'(?:[^']*)'+|(?:[^\s"'=<>`]+)))?/;
    let parts;

    while ((parts = regex.exec(template)) !== null) {
      const [full, name, eq, value, ...rest] = parts;

      if (
        !this.isAlpineAttribute(name) &&
        full.indexOf("{") > -1 &&
        full.indexOf("}") > -1
      ) {
        // Attribute has Expression
        if (full.indexOf("...") > -1) {
          // Spread Opperator
          const [[fullMatch, identifier]] = full.matchAll(
            /\{\.\.\.([\w\-.]+)\}/g,
          );

          const distance = full.indexOf(identifier);
          const expression = this.parseExpressions(
            identifier,
            this.pos + distance,
          );

          // Safety Check
          if (expression.type !== "Identifier") {
            throw this.throwError(
              `Invalid Identifier ${cyan(bold(expression.data))}`,
            );
          }

          attrs.push(
            this.getSpreadAttribute(
              fullMatch,
              expression,
              this.pos + full.indexOf("{"),
              this.pos + full.indexOf("}") + 1,
            ),
          );
        } else {
          // Expression Template
          const startDistance = full.indexOf("{") + 1;
          const endDistance = full.indexOf("}");
          const expression = this.parseExpressions(
            full.substring(startDistance, endDistance),
            this.pos + startDistance,
          );

          if (value === undefined && expression.type === "Identifier") {
            // Name is Implicit
            const expressionStatement = this.getAttributeExpression(
              name,
              expression,
              this.pos + full.indexOf("{"),
              this.pos + full.indexOf("}") + 1,
            );
            attrs.push(
              this.getAttribute(full, expression.data, expressionStatement),
            );
          } else {
            // Name is Specified
            const expressionStatement = this.getAttributeExpression(
              value,
              expression,
              this.pos + full.indexOf("{"),
              this.pos + full.indexOf("}") + 1,
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
    ignoreWhitespace = true,
  ): void {
    const allowed = new Set(whitelist);
    const disallowed = new Set();

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i].data;

      // Ignore any Whitespace when validating children
      if (ignoreWhitespace && !/[^\\n\s]/g.test(child)) {
        continue;
      }

      if (!allowed.has(child)) disallowed.add(child);
    }

    // Throw if invalid children
    if (disallowed.size > 0) {
      throw this.throwError(
        `Disallowed children ${
          cyan(
            bold(JSON.stringify([...disallowed.values()])),
          )
        } in ${bold(`<${tagName}>`)}`,
        `Only ${
          cyan(
            bold(JSON.stringify(whitelist)),
          )
        } children are supported in the <${tagName}> directive.`,
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
        case ":head":
          return this.getHeadDirective.bind(this);
        default:
          throw this.throwError(`Unknown Directive ${cyan(bold(tagName))}`);
      }
    } else if (htmlElements.has(tagName)) {
      switch (tagName) {
        case "style":
          return this.getStyleTag.bind(this);
        case "script":
          return this.getScriptTag.bind(this);
        default:
          return this.getTag.bind(this);
      }
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
    children: Array<AST> = [],
  ): Tag {
    let slot;
    const foundSlot = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "slot",
    ) as Attribute;

    if (foundSlot) {
      if (foundSlot?.value?.type === "AttributeExpression") {
        slot = foundSlot.value.expression;
      } else {
        slot = this.parseExpressions(
          `"${foundSlot?.value?.data}"`,
          foundSlot.value.start,
        );
      }

      // Remove unneeded attributes
      attributes = this.removeAttribute(attributes, "slot");
    }

    if (slot !== undefined && slot.type !== "Literal") {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Slot Argument ${cyan(bold(foundSlot.value.data))} For Tag.`,
      );
    }

    return {
      type: "Tag",
      data,
      attributes,
      children,
      slot: slot as Literal | undefined,
      classes: this.getClasses(attributes),
      start,
      end,
    };
  }

  // Tag AST Object
  private getScriptTag(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = [],
  ): ScriptTag {
    let lang;
    const foundLang = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "lang",
    ) as Attribute;

    if (foundLang) {
      if (foundLang?.value?.type === "AttributeExpression") {
        lang = foundLang.value.expression;
      } else {
        lang = this.parseExpressions(
          `"${foundLang?.value?.data}"`,
          foundLang.value.start,
        );
      }

      // Remove unneeded attributes
      attributes = this.removeAttribute(attributes, "lang");
    }

    if (lang !== undefined && lang.type !== "Literal") {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Lang Argument ${cyan(bold(foundLang.value.data))} For Tag.`,
      );
    }

    return {
      type: "ScriptTag",
      data,
      attributes,
      children,
      lang: lang as Literal | undefined,
      start,
      end,
    };
  }

  // Tag AST Object
  private getStyleTag(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = [],
  ): StyleTag {
    return {
      type: "StyleTag",
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
    children: Array<AST> = [],
  ): ComponentDirective {
    let slot;
    const foundSlot = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "slot",
    ) as Attribute;

    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use",
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
      expression = this.parseExpressions(
        `"${expressionTemplate}"`,
        expressionPos,
      );
    }

    if (foundSlot) {
      if (foundSlot?.value?.type === "AttributeExpression") {
        slot = foundSlot.value.expression;
      } else {
        slot = this.parseExpressions(
          `"${foundSlot?.value?.data}"`,
          foundSlot.value.start,
        );
      }

      // Remove unneeded attributes
      attributes = this.removeAttribute(attributes, "slot");
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
        `Invalid Use Argument ${
          cyan(
            bold(found.value.data),
          )
        } For Component Directive`,
      );
    }

    if (slot !== undefined && slot.type !== "Literal") {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Slot Argument ${cyan(bold(foundSlot.value.data))} For Tag.`,
      );
    }

    return {
      type: "ComponentDirective",
      data: ":component",
      attributes,
      children,
      expression: expression as Identifier | Literal | MemberExpression,
      slot: slot as Literal | undefined,
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
    children: Array<AST> = [],
  ): ElementDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use",
    ) as Attribute;

    const foundSlot = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "slot",
    ) as Attribute;

    let slot;
    let expression;
    if (found?.value?.type === "AttributeExpression") {
      expression = found.value.expression;
    } else {
      if (!found?.value?.data) {
        throw this.throwError("Missing Use Argument For Element Directive");
      }

      expression = this.parseExpressions(
        `"${found.value.data}"`,
        found.value.start,
      );
    }

    if (foundSlot) {
      if (foundSlot?.value?.type === "AttributeExpression") {
        slot = foundSlot.value.expression;
      } else {
        slot = this.parseExpressions(
          `"${foundSlot?.value?.data}"`,
          foundSlot.value.start,
        );
      }
    }

    // Remove unneeded attributes
    attributes = this.removeAttribute(attributes, "use");
    attributes = this.removeAttribute(attributes, "slot");

    if (
      expression.type !== "Identifier" &&
      expression.type !== "Literal" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Use Argument ${
          cyan(
            bold(found.value.data),
          )
        } For Element Directive`,
      );
    }

    if (slot !== undefined && slot.type !== "Literal") {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Slot Argument ${cyan(bold(foundSlot.value.data))} For Tag.`,
      );
    }

    return {
      type: "ElementDirective",
      data,
      attributes,
      children,
      expression: expression as Identifier | Literal | MemberExpression,
      slot: slot as Literal | undefined,
      classes: this.getClasses(attributes),
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
    children: Array<AST> = [],
  ): LayoutDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use",
    ) as Attribute;

    let expression;
    if (found?.value?.type === "AttributeExpression") {
      expression = found.value.expression;
    } else {
      if (!found?.value?.data) {
        throw this.throwError("Missing Use Argument For Layout Directive");
      }

      expression = this.parseExpressions(
        `"${found.value.data}"`,
        found.value.start,
      );
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
        `Invalid Use Argument ${
          cyan(
            bold(found.value.data),
          )
        } For Layout Directive`,
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
    children: Array<AST> = [],
  ): RouterDirective {
    if (children.length === 0) {
      throw this.throwError(
        `Missing required ${cyan(bold("<:path>"))} Directives inside <:router>`,
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
    children: Array<AST> = [],
  ): PathDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "url",
    ) as Attribute;
    const url = found?.value?.data;
    const startPath = found?.value?.start;

    if (!url) {
      throw this.throwError(
        `Invalid <:path> Directive. Missing required ${
          cyan(
            bold("url"),
          )
        } attribute`,
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
      path: this.parsePathUrl(`"${url}"`, startPath - 1),
      start,
      end,
    };
  }

  // Parse URL into Path Objects
  private parsePathUrl(path: string, startPath: number): Array<PathSegment> {
    const segments = [];
    const regex = /\/((:|:#|:\?|:\[(\w+)\,(\w+)\])?([A-Za-z0-9-_%]+))/g;
    let parts;

    while ((parts = regex.exec(path)) !== null) {
      const [full, data, token, first, last, bind] = parts;
      const start = startPath + path.indexOf(data);
      const end = start + data.length;

      if (token) {
        switch (token.charAt(1)) {
          case "#": // Pagination
            segments.push(
              this.getPaginationPathSegment(data, bind, start, end),
            );
            break;
          case "?": // Optional
            segments.push(this.getOptionalPathSegment(data, bind, start, end));
            break;
          case "[": // Range
            segments.push(
              this.getRangePathSegment(data, bind, first, last, start, end),
            );
            break;
          default: // Dynamic
            segments.push(this.getDynamicPathSegment(data, bind, start, end));
        }
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
    end: number,
  ): StaticPathSegment {
    return {
      type: "StaticPathSegment",
      data,
      start,
      end,
    };
  }

  // Range Path Segment AST
  private getRangePathSegment(
    data: string,
    bind: string,
    first: string,
    last: string,
    start: number,
    end: number,
  ): RangePathSegment {
    const expression = this.parseExpressions(`"${bind}"`, start);
    const firstExpression = this.parseExpressions(first, start);
    const lastExpression = this.parseExpressions(last, start);

    if (expression.type !== "Literal") {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Range Segment ${cyan(bold(data))} For Path Directive`,
      );
    }

    if (
      firstExpression.type !== "Literal" &&
      firstExpression.type !== "Identifier" &&
      firstExpression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Range Segment ${cyan(bold(data))} For Path Directive`,
      );
    }

    if (
      lastExpression.type !== "Literal" &&
      lastExpression.type !== "Identifier" &&
      lastExpression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Range Segment ${cyan(bold(data))} For Path Directive`,
      );
    }

    return {
      type: "RangePathSegment",
      data,
      expression,
      first: firstExpression,
      last: lastExpression,
      start,
      end,
    };
  }

  // Pagination Path Segment AST
  private getPaginationPathSegment(
    data: string,
    bind: string,
    start: number,
    end: number,
  ): PaginationPathSegment {
    const expression = this.parseExpressions(`"${bind}"`, start);

    if (expression.type !== "Literal") {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Path Segment ${cyan(bold(data))} For Path Directive`,
      );
    }

    return {
      type: "PaginationPathSegment",
      data,
      expression,
      start,
      end,
    };
  }

  // Optional Path Segment AST
  private getOptionalPathSegment(
    data: string,
    bind: string,
    start: number,
    end: number,
  ): OptionalPathSegment {
    const expression = this.parseExpressions(bind, start);

    if (
      expression.type !== "Identifier" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Path Segment ${cyan(bold(data))} For Path Directive`,
      );
    }

    return {
      type: "OptionalPathSegment",
      data,
      expression,
      start,
      end,
    };
  }

  // Dynamic Path Segment AST
  private getDynamicPathSegment(
    data: string,
    bind: string,
    start: number,
    end: number,
  ): DynamicPathSegment {
    const expression = this.parseExpressions(bind, start);

    if (
      expression.type !== "Identifier" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Path Segment ${cyan(bold(data))} For Path Directive`,
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
    children: Array<AST> = [],
  ): DataDirective {
    // Key
    const foundKey = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "key",
    ) as Attribute;

    let key;
    if (foundKey?.value?.type === "AttributeExpression") {
      key = foundKey.value.expression;
    } else {
      if (foundKey?.value?.data) {
        key = this.parseExpressions(
          `"${foundKey.value.data}"`,
          foundKey.value.start,
        );
      }
    }

    if (
      key !== undefined &&
      key.type !== "Identifier" &&
      key.type !== "Literal"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Key Argument ${
          cyan(
            bold(foundKey.value.data),
          )
        } For Data Directive`,
      );
    }

    // Use
    const foundUse = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "use",
    ) as Attribute;

    let expression;
    if (foundUse?.value?.type === "AttributeExpression") {
      expression = foundUse.value.expression;
    } else {
      if (!foundUse?.value?.data) {
        throw this.throwError("Missing Use Argument For Data Directive");
      }

      expression = this.parseExpressions(
        `"${foundUse.value.data}"`,
        foundUse.value.start,
      );
    }

    if (
      expression.type !== "Identifier" &&
      expression.type !== "Literal" &&
      expression.type !== "MemberExpression"
    ) {
      // Throw if we have a invalid type used for a use statement
      throw this.throwError(
        `Invalid Use Argument ${
          cyan(
            bold(foundUse.value.data),
          )
        } For Data Directive`,
      );
    }

    // Remove unneeded attributes
    attributes = this.removeAttribute(attributes, "key");
    attributes = this.removeAttribute(attributes, "use");

    return {
      type: "DataDirective",
      data,
      attributes,
      children,
      key: key as Literal | Identifier | undefined,
      expression: expression as Literal | Identifier | MemberExpression,
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
    children: Array<AST> = [],
  ): SlotDirective {
    const found = attributes.find(
      (element) =>
        element?.type === "Attribute" && element?.name?.data === "name",
    ) as Attribute;
    const name = found?.value?.data;
    let expression;
    if (name) {
      expression = this.parseExpressions(`"${name}"`, found.value.start);

      // Remove unneeded attributes
      attributes = this.removeAttribute(attributes, "name");

      if (expression.type !== "Literal") {
        // Throw if we have a invalid type used for a name statement
        throw this.throwError(
          `Invalid Name Argument ${cyan(bold(name))} For Slot Directive`,
        );
      }
    }

    return {
      type: "SlotDirective",
      data,
      attributes,
      children,
      expression: expression as Literal | undefined,
      start,
      end,
    };
  }

  // Slot Directive AST Object
  private getHeadDirective(
    data: string,
    start: number,
    end: number,
    attributes: Array<Attribute | AttributeSpread> = [],
    children: Array<AST> = [],
  ): HeadDirective {
    // Should not contain attributes
    if (attributes.length) {
      throw this.throwError(
        `No attributes are allowed for Head Directive`,
      );
    }

    // Should contain children
    if (!children.length) {
      throw this.throwError(
        `Head Directive is missing children. Need to specify what to apply to <head> tag.`,
      );
    }

    return {
      type: "HeadDirective",
      data,
      attributes,
      children,
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
    expression: ExpressionStatement,
    elseBlock: ElseBlock | ElseIfBlock | null,
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
    expression: ExpressionStatement,
    elseBlock: ElseBlock | ElseIfBlock | null,
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
    children: Array<AST> = [],
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
    expression: ExpressionStatement,
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
    expression: ExpressionStatement,
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
    expression: ExpressionStatement,
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
    expression: ExpressionStatement,
    elseBlock: ElseBlock | null,
    context: Identifier,
    index: Identifier | null,
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
    end: number,
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
    end: number,
  ): BreakStatement {
    return {
      type: "BreakStatement",
      data,
      start,
      end,
    };
  }

  // ExpressionAttribute AST Object
  private getAttributeExpression(
    data: string,
    expression: ExpressionStatement,
    start: number,
    end: number,
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
    end: number,
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
    value: string | AttributeExpression = "",
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
        valueStart + valueLen,
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
    end: number,
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
    end: number,
  ): AttributeValue {
    let modified = data;

    // Remove quotes if string has quotes on edges (eg. "'example'")
    if (typeof data === "string") {
      const [full, unquoted] = data.match(/^["'`](.*)["'`]$/) || [];
      if (unquoted !== undefined) {
        modified = unquoted;
      }
    }

    return {
      type: "AttributeValue",
      data: modified,
      start,
      end,
    };
  }

  private getClasses(attributes: Array<Attribute | AttributeSpread>): string[] {
    let classes: string[] = [];

    for (let i = 0, iLen = attributes.length; i < iLen; i++) {
      // Can only handle Attributes with AttributeValues right now
      // AttributeSpread && AttributeExpressionsneeds to be done by the compiler
      // since it relies on real time data
      if (
        attributes[i].type === "Attribute" &&
        (attributes[i] as Attribute).value.type === "AttributeValue"
      ) {
        const name = (attributes[i] as Attribute).name.data;
        if (name === "class") {
          // Handle Standard class="foo bar etc"
          const parts = (attributes[i] as Attribute).value.data.split(" ");
          classes = this.mergeArrays(classes, parts);
        } else if (name === ":class" || name === "x-bind:class") {
          // Handle Alpine x-bind:class && :class syntax - :class="{'foo': true, 'bar': false}"
          const regex = /(?:'([\w:-]+)'|"([\w:-]+)"|`([\w:-]+)`)\s?:/g;
          const matches =
            [...(attributes[i] as Attribute).value.data.matchAll(regex)] || [];
          for (let n = 0, nLen = matches.length; n < nLen; n++) {
            const [full, ...parts] = matches[n];
            classes = this.mergeArrays(classes, parts);
          }
        } else if (name.indexOf("class:") !== -1) {
          // Handle Seedling class:<foo> syntax
          classes.push(name.substring(6));
        }
      }
    }

    return classes;
  }

  private isAlpineAttribute(name: string): boolean {
    if (
      alpineAttributes.has(name) || name.indexOf(":") === 0 ||
      name.indexOf("@") === 0 || name.indexOf("x-") === 0
    ) {
      return true;
    }

    return false;
  }

  private mergeArrays(original: string[], added: string[]): Array<string> {
    const originalLen = original.length;
    const addedLen = added.length;
    const addedModified = [];

    // Filter undefines and empty strings out
    for (let i = 0; i < addedLen; i++) {
      if (added[i] === undefined || added[i].length === 0) {
        continue;
      }
      addedModified.push(added[i]);
    }

    // Pre allocate size
    const addedModifiedLen = addedModified.length;
    original.length = originalLen + addedModifiedLen;

    // Append Classes
    for (let i = 0; i < addedModifiedLen; i++) {
      original[originalLen + i] = addedModified[i];
    }

    return original;
  }

  // Remove Attribute from Attributes Array
  private removeAttribute(
    attributes: Array<Attribute | AttributeSpread>,
    name: string,
  ) {
    // Remove unneeded attributes
    return attributes.filter(
      (element) =>
        element?.type !== "Attribute" ||
        (element?.type === "Attribute" && element?.name?.data !== name),
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
