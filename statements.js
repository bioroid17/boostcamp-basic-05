import Node from "./nodes.js";
import Expression from "./expressions.js";
import Literal from "./literals.js";
import Identifier from "./identifiers.js";
import Pattern from "./patterns.js";
import VariableDeclaration from "./declarations.js";

class Statement extends Node {}

class ExpressionStatement extends Statement {
  constructor(expression) {
    super();
    this.type = "ExpressionStatement";
    /**
     * @type {Expression}
     */
    this.expression = expression; // Expression
  }

  toString() {
    return `${this.expression};`;
  }
}

class Directive extends ExpressionStatement {
  constructor(expression, directive) {
    super(expression);
    /**
     * @type {Literal}
     */
    this.expression = expression; // Literal
    /**
     * @type {string}
     */
    this.directive = directive; // String literal
  }

  toString() {
    return `"${this.directive}";`;
  }
}

class BlockStatement extends Statement {
  constructor(body) {
    super();
    this.type = "BlockStatement";
    /**
     * @type {[Statement]}
     */
    this.body = body; // Array of Statement
  }

  toString() {
    return `{ ${this.body.join("; ")} }`;
  }
}

class FunctionBody extends BlockStatement {
  constructor(body) {
    super(body);
    /**
     * @type {[Statement | Declaration]}
     */
    this.body = body;
  }

  toString() {
    return `function() ${super.toString()}`;
  }
}

class EmptyStatement extends Statement {
  constructor() {
    super();
    this.type = "EmptyStatement";
  }

  toString() {
    return ";";
  }
}

class DebuggerStatement extends Statement {
  constructor() {
    super();
    this.type = "DebuggerStatement";
  }

  toString() {
    return "debugger;";
  }
}

class WithStatement extends Statement {
  constructor(object, body) {
    super();
    this.type = "WithStatement";
    /**
     * @type {Expression}
     */
    this.object = object; // Expression
    /**
     * @type {Statement}
     */
    this.body = body; // Statement
  }

  toString() {
    return `with (${this.object}) ${this.body}`;
  }
}

// Control flow
class ReturnStatement extends Statement {
  constructor(argument) {
    super();
    this.type = "ReturnStatement";
    /**
     * @type {Expression | null}
     */
    this.argument = argument; // Expression or null
  }

  toString() {
    return `return ${this.argument ? this.argument : ""};`;
  }
}

class LabeledStatement extends Statement {
  constructor(label, body) {
    super();
    this.type = "LabeledStatement";
    /**
     * @type {Identifier}
     */
    this.label = label; // Identifier
    /**
     * @type {Statement}
     */
    this.body = body; // Statement
  }

  toString() {
    return `${this.label}: ${this.body}`;
  }
}

class BreakStatement extends Statement {
  constructor(label) {
    super();
    this.type = "BreakStatement";
    /**
     * @type {Identifier | null}
     */
    this.label = label; // Identifier or null
  }

  toString() {
    return `break${this.label ? " " + this.label : ""};`;
  }
}

class ContinueStatement extends Statement {
  constructor(label) {
    super();
    this.type = "ContinueStatement";
    /**
     * @type {Identifier | null}
     */
    this.label = label; // Identifier or null
  }

  toString() {
    return `continue${this.label ? " " + this.label : ""};`;
  }
}

// Choice
class IfStatement extends Statement {
  constructor(test, consequent, alternate) {
    super();
    this.type = "IfStatement";
    /**
     * @type {Expression}
     */
    this.test = test; // Expression
    /**
     * @type {Statement}
     */
    this.consequent = consequent; // Statement
    /**
     * @type {Statement | null}
     */
    this.alternate = alternate; // Statement or null
  }

  toString() {
    return `if (${this.test}) ${this.consequent}${
      this.alternate ? " else " + this.alternate : ""
    }`;
  }
}

class SwitchStatement extends Statement {
  constructor(discriminant, cases) {
    super();
    this.type = "SwitchStatement";
    /**
     * @type {Expression}
     */
    this.discriminant = discriminant; // Expression
    /**
     * @type {[SwitchCase]}
     */
    this.cases = cases; // Array of SwitchCase
  }

  toString() {
    return `switch (${this.discriminant}) { ${this.cases.join(" ")} }`;
  }
}

class SwitchCase extends Node {
  constructor(test, consequent) {
    super();
    this.type = "SwitchCase";
    /**
     * @type {Expression | null}
     */
    this.test = test; // Expression or null
    /**
     * @type {[Statement]}
     */
    this.consequent = consequent; // Array of Statement
  }

  toString() {
    return `${
      this.test ? "case " + this.test + ":" : "default:"
    } ${this.consequent.join(" ")}`;
  }
}

// Exceptions
class ThrowStatement extends Statement {
  constructor(argument) {
    super();
    this.type = "ThrowStatement";
    /**
     * @type {Expression}
     */
    this.argument = argument; // Expression
  }

  toString() {
    return `throw ${this.argument};`;
  }
}

class TryStatement extends Statement {
  constructor(block, handler, finalizer) {
    super();
    this.type = "TryStatement";
    /**
     * @type {BlockStatement}
     */
    this.block = block; // BlockStatement
    /**
     * @type {CatchClause | null}
     */
    this.handler = handler; // CatchClause or null
    /**
     * @type {BlockStatement | null}
     */
    this.finalizer = finalizer; // BlockStatement or null
  }

  toString() {
    return `try ${this.block}${this.handler ? " " + this.handler : ""}${
      this.finalizer ? " finally " + this.finalizer : ""
    }`;
  }
}

class CatchClause extends Node {
  constructor(param, body) {
    super();
    this.type = "CatchClause";
    /**
     * @type {Pattern}
     */
    this.param = param; // Pattern
    /**
     * @type {BlockStatement}
     */
    this.body = body; // BlockStatement
  }

  toString() {
    return `catch (${this.param}) ${this.body}`;
  }
}

// Loops
class WhileStatement extends Statement {
  constructor(test, body) {
    super();
    this.type = "WhileStatement";
    /**
     * @type {Expression}
     */
    this.test = test; // Expression
    /**
     * @type {Statement}
     */
    this.body = body; // Statement
  }

  toString() {
    return `while (${this.test}) ${this.body}`;
  }
}

class DoWhileStatement extends Statement {
  constructor(body, test) {
    super();
    this.type = "DoWhileStatement";
    /**
     * @type {Statement}
     */
    this.body = body; // Statement
    /**
     * @type {Expression}
     */
    this.test = test; // Expression
  }

  toString() {
    return `do ${this.body} while (${this.test});`;
  }
}

class ForStatement extends Statement {
  constructor(init, test, update, body) {
    super();
    this.type = "ForStatement";
    /**
     * @type {VariableDeclaration | Expression | null}
     */
    this.init = init; // Statement or Expression or null
    /**
     * @type {Expression | null}
     */
    this.test = test; // Expression or null
    /**
     * @type {Expression | null}
     */
    this.update = update; // Expression or null
    /**
     * @type {Statement}
     */
    this.body = body; // Statement
  }

  toString() {
    return `for (${this.init ? this.init : ""}; ${
      this.test ? this.test : ""
    }; ${this.update ? this.update : ""}) ${this.body}`;
  }
}

class ForInStatement extends Statement {
  constructor(left, right, body) {
    super();
    this.type = "ForInStatement";
    /**
     * @type {VariableDeclaration | Pattern}
     */
    this.left = left; // VariableDeclaration or Pattern
    /**
     * @type {Expression}
     */
    this.right = right; // Expression
    /**
     * @type {Statement}
     */
    this.body = body; // Statement
  }

  toString() {
    return `for (${this.left} in ${this.right}) ${this.body}`;
  }
}

export default {
  Statement,
  ExpressionStatement,
  Directive,
  BlockStatement,
  FunctionBody,
  EmptyStatement,
  DebuggerStatement,
  WithStatement,
  ReturnStatement,
  LabeledStatement,
  BreakStatement,
  ContinueStatement,
  IfStatement,
  SwitchStatement,
  SwitchCase,
  ThrowStatement,
  TryStatement,
  CatchClause,
  WhileStatement,
  DoWhileStatement,
  ForStatement,
  ForInStatement,
};
