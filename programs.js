import { Directive, Statement } from "./statements.js";
import Node from "./nodes.js";

export class Program extends Node {
  constructor() {
    this.type = "Program";
    /**
     * @type {[Statement | Directive]}
     */
    this.body = [];
  }

  addStatement(statement) {
    this.body.push(statement);
  }
}
