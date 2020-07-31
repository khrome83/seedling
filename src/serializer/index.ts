import { RootAST, Text, Tag, Comment, Doctype, Attribute } from "../types.ts";
import voidElements from "../dict/voidElements.ts";

interface SerializerMap {
  [key: string]: Function;
}

// Parser
export class Serializer {
  private stack: RootAST;
  private astMap: SerializerMap = {
    Comment: this.comment,
    Doctype: this.doctype,
    Tag: this.tag,
    Text: this.text,
  };

  constructor(ast: RootAST) {
    if (typeof ast !== "object" || !ast?.html?.length) {
      throw new TypeError("AST must contain data");
    }

    this.stack = ast;
  }

  public serialize(): string {
    const htmlAST = this.stack.html;
    let template = "";

    if (htmlAST.length) {
      for (let i = 0; i < htmlAST.length; i++) {
        template += this.astMap[htmlAST[i].type](htmlAST[i], this.astMap);
      }
    } else {
      return template;
    }

    return template;
  }

  private comment(ast: Comment): string {
    return `<!--${ast.data}-->`;
  }

  private doctype(ast: Doctype): string {
    return ast.data;
  }

  private tag(ast: Tag, astMap: SerializerMap): string {
    let attributes = "";
    let children = "";

    // TODO: use name and value instead of attribute data
    if (ast.attributes.length) {
      for (let i = 0; i < ast.attributes.length; i++) {
        if (!(ast.attributes[i] as Attribute).value.data) {
          attributes = `${attributes} ${
            (ast.attributes[i] as Attribute).name.data
          }`;
        } else {
          attributes = `${attributes} ${
            (ast.attributes[i] as Attribute).name.data
          }=${(ast.attributes[i] as Attribute).value.data}`;
        }
      }
    }

    if (voidElements.has(ast.data)) {
      return `<${ast.data}${attributes}>`;
    }

    if (ast.children.length) {
      for (let i = 0; i < ast.children.length; i++) {
        children += astMap[ast.children[i].type](ast.children[i], astMap);
      }
    }

    return `<${ast.data}${attributes}>${children}</${ast.data}>`;
  }

  private text(ast: Text): string {
    return ast.data;
  }
}
