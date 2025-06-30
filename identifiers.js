import Expression from "./expressions.js";

export class Identifier extends Expression {
  constructor(name) {
    this.type = "Identifier";
    /**
     * @type {string}
     */
    this.name = name;
  }
}
