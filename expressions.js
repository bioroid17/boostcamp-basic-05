import Literal from "./literals.js";
import Identifier from "./identifiers.js";
import Node from "./nodes.js";

class Expression extends Node {}

class ThisExpression extends Expression {
  constructor() {
    super();
    this.type = "ThisExpression";
  }

  toString() {
    return "this";
  }
}

class ArrayExpression extends Expression {
  constructor(elements) {
    super();
    this.type = "ArrayExpression";
    /**
     * @type {[Expression | null]}
     */
    this.elements = elements; // Array of Expression
  }

  toString() {
    return `[${this.elements.join(", ")}]`;
  }
}
class ObjectExpression extends Expression {
  constructor(properties) {
    super();
    this.type = "ObjectExpression";
    /**
     * @type {[Property]}
     */
    this.properties = properties; // Array of Property
  }

  toString() {
    return `{${this.properties.join(", ")}}`;
  }
}
class Property extends Node {
  constructor(key, value, kind = "init") {
    super();
    this.type = "Property";
    /**
     * @type {Literal | Identifier}
     */
    this.key = key; // Identifier or Literal
    /**
     * @type {Expression}
     */
    this.value = value; // Expression
    /**
     * @type {string} ["init" | "get" | "set"]
     */
    this.kind = kind; // Always "init" for property assignments
  }

  toString() {
    return `${this.key}: ${this.value}`;
  }
}
class FunctionExpression extends Expression {
  constructor(id, params, body) {
    super();
    this.type = "FunctionExpression";
    /**
     * @type {Identifier | null}
     */
    this.id = id; // Identifier or null
    /**
     * @type {[Identifier]}
     */
    this.params = params; // Array of Identifier
    /**
     * @type {[Statement | Declaration]}
     */
    this.body = body; // Array of Statement or Declaration
  }

  toString() {
    const paramsStr = this.params.map((param) => param.toString()).join(", ");
    return `function ${
      this.id ? this.id.toString() + " " : ""
    }(${paramsStr}) {${this.body.join("; ")}}`;
  }
}

// Unary operations
class UnaryExpression extends Expression {
  constructor(operator, argument, prefix) {
    super();
    this.type = "UnaryExpression";
    /**
     * @type {Enumerator("-","+","!","~","typeof","void","delete")}
     */
    this.operator = operator; // e.g., "!", "-", "typeof", etc.
    /**
     * @type {Expression}
     */
    this.argument = argument; // Expression
    /**
     * @type {boolean}
     */
    this.prefix = prefix; // true for prefix, false for postfix
  }

  toString() {
    return `${this.operator}${this.argument}`;
  }
}

class UpdateExpression extends Expression {
  constructor(operator, argument, prefix) {
    super();
    this.type = "UpdateExpression";
    /**
     * @type {Enumerator("++","--")}
     */
    this.operator = operator; // e.g., "!", "-", "typeof", etc.
    /**
     * @type {Expression}
     */
    this.argument = argument; // Expression
    /**
     * @type {boolean}
     */
    this.prefix = prefix;
  }

  toString() {
    return `${this.operator}${this.argument}`;
  }
}

// Binary operations
class BinaryExpression extends Expression {
  constructor(left, operator, right) {
    super();
    this.type = "BinaryExpression";
    /**
     * @type {Expression}
     */
    this.left = left; // Expression
    /**
     * @type {Enumerator("+","-","*","/","%","<<",">>",">>>","<",">","<=",">=","==","!=","===","!==","&","|","^","instanceof","in")}
     */
    this.operator = operator; // e.g., "+", "-", "*", etc.
    /**
     * @type {Expression}
     */
    this.right = right; // Expression
  }

  toString() {
    return `${this.left} ${this.operator} ${this.right}`;
  }
}

class AssignmentExpression extends Expression {
  constructor(left, operator, right) {
    super();
    this.type = "AssignmentExpression";
    /**
     * @type {Expression}
     */
    this.left = left; // Expression
    /**
     * @type {Enumerator("=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^=")}
     */
    this.operator = operator; // e.g., "=", "+=", "-=", etc.
    /**
     * @type {Expression}
     */
    this.right = right; // Expression
  }

  toString() {
    return `${this.left} ${this.operator} ${this.right}`;
  }
}

class LogicalExpression extends Expression {
  constructor(left, operator, right) {
    super();
    this.type = "LogicalExpression";
    /**
     * @type {Expression}
     */
    this.left = left; // Expression
    /**
     * @type {Enumerator("&&","||")}
     */
    this.operator = operator; // e.g., "&&", "||"
    /**
     * @type {Expression}
     */
    this.right = right; // Expression
  }

  toString() {
    return `${this.left} ${this.operator} ${this.right}`;
  }
}

// Member expressions
class MemberExpression extends Expression {
  constructor(object, property, computed) {
    super();
    this.type = "MemberExpression";
    /**
     * @type {Expression}
     */
    this.object = object; // Expression
    /**
     * @type {Expression | Identifier}
     */
    this.property = property; // Expression or Identifier
    /**
     * @type {boolean}
     */
    this.computed = computed; // true for computed property access, false for dot notation
  }

  toString() {
    return this.computed
      ? `${this.object}[${this.property}]`
      : `${this.object}.${this.property}`;
  }
}

// Conditional expressions
class ConditionalExpression extends Expression {
  constructor(test, consequent, alternate) {
    super();
    this.type = "ConditionalExpression";
    /**
     * @type {Expression}
     */
    this.test = test; // Expression
    /**
     * @type {Expression}
     */
    this.consequent = consequent; // Expression
    /**
     * @type {Expression}
     */
    this.alternate = alternate; // Expression
  }

  toString() {
    return `${this.test} ? ${this.consequent} : ${this.alternate}`;
  }
}

// Call expressions
class CallExpression extends Expression {
  constructor(callee, argumentsList) {
    super();
    this.type = "CallExpression";
    /**
     * @type {Expression}
     */
    this.callee = callee; // Expression
    /**
     * @type {[Expression]}
     */
    this.arguments = argumentsList; // Array of Expression
  }

  toString() {
    return `${this.callee}(${this.arguments.join(", ")})`;
  }
}

// New expressions
class NewExpression extends Expression {
  constructor(callee, argumentsList) {
    super();
    this.type = "NewExpression";
    /**
     * @type {Expression}
     */
    this.callee = callee; // Expression
    /**
     * @type {[Expression]}
     */
    this.arguments = argumentsList; // Array of Expression
  }

  toString() {
    return `new ${this.callee}(${this.arguments.join(", ")})`;
  }
}

// Sequence expressions
class SequenceExpression extends Expression {
  constructor(expressions) {
    super();
    this.type = "SequenceExpression";
    /**
     * @type {[Expression]}
     */
    this.expressions = expressions; // Array of Expression
  }

  toString() {
    return this.expressions.join(", ");
  }
}

export default {
  Expression,
  ThisExpression,
  ArrayExpression,
  ObjectExpression,
  Property,
  FunctionExpression,
  UnaryExpression,
  UpdateExpression,
  BinaryExpression,
  AssignmentExpression,
  LogicalExpression,
  MemberExpression,
  ConditionalExpression,
  CallExpression,
  NewExpression,
  SequenceExpression,
};
