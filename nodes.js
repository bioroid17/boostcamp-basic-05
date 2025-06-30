export class Node {
  constructor() {
    /**
     * @type {string}
     */
    this.type = "Node";
    /**
     * @type {SourceLocation | null}
     */
    this.loc = null;

    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  toString() {
    return `${this.type}: ${this.value}`;
  }
}

export class SourceLocation {
  constructor(source, start, end) {
    /**
     * @type {string | null}
     */
    this.source = null;
    /**
     * @type {Position}
     */
    this.start = start;
    /**
     * @type {Position}
     */
    this.end = end;
  }
}

export class Position {
  constructor(line, column) {
    /**
     * @type {number}
     */
    this.line = line; // >= 1
    /**
     * @type {number}
     */
    this.column = column; // >= 0
  }
}
