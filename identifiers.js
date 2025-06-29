import Expression from "./expressions.js";

class Identifier extends Expression {
  constructor(name) {
    this.type = "Identifier";
    /**
     * @type {string}
     */
    this.name = name;
  }
}

export default Identifier;
