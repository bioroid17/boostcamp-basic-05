import Identifier from "./identifiers";
import Pattern from "./patterns";
import FunctionBody from "./statements";
import Node from "./nodes";

class Function extends Node {
  constructor(id, params, body) {
    this.type = "Function";
    /**
     * @type {Identifier | null}
     */
    this.id = id; // Identifier or null
    /**
     * @type {[Pattern]}
     */
    this.params = params; // Array of Pattern
    /**
     * @type {[FunctionBody]}
     */
    this.body = body; // Array of FunctionBody
  }
}

export default Function;
