import Expressions from "./expressions.js";

export class Literal extends Expressions {
  constructor(value) {
    this.type = "Literal";
    /**
     * @type {string | number | boolean | null | RegExp}
     */
    this.value = value;
  }
}

export class RegExpLiteral extends Literal {
  constructor(pattern, flags) {
    super(new RegExp(pattern, flags));
    this.type = "RegExpLiteral";
    /**
     * @type {string}
     */
    this.pattern = pattern; // String
    /**
     * @type {string}
     */
    this.flags = flags; // String
  }

  toString() {
    return `/${this.pattern}/${this.flags}`;
  }
}
