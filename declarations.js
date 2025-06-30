import Statement from "./statements.js";
import Identifier from "./identifiers.js";
import Pattern from "./patterns.js";
import FunctionBody from "./statements.js";

export class Declaration extends Statement {}

export class FunctionDeclaration extends Declaration {
  constructor(id, params, body) {
    super();
    this.type = "FunctionDeclaration";
    /**
     * @type {Identifier}
     */
    this.id = id; // Identifier
    /**
     * @type {[Pattern]}
     */
    this.params = params; // Array of Pattern
    /**
     * @type {[FunctionBody]}
     */
    this.body = body; // Array of FunctionBody
  }

  toString() {
    return `function ${this.id}(${this.params.join(", ")}) ${this.body}`;
  }
}

export class VariableDeclaration extends Declaration {
  constructor(declarations, kind = "var") {
    super();
    this.type = "VariableDeclaration";
    /**
     * @type {[VariableDeclarator]}
     */
    this.declarations = declarations; // Array of VariableDeclarator
    /**
     * @type {string} ["var" | "let" | "const"]
     */
    this.kind = kind; // Always "var", "let", or "const"
  }

  toString() {
    return `${this.kind} ${this.declarations.join(", ")}`;
  }
}

export class VariableDeclarator extends Statement {
  constructor(id, init = null) {
    super();
    this.type = "VariableDeclarator";
    /**
     * @type {Pattern}
     */
    this.id = id; // Pattern
    /**
     * @type {Expression | null}
     */
    this.init = init; // Expression or null
  }

  toString() {
    return `${this.id}${this.init ? ` = ${this.init}` : ""}`;
  }
}
