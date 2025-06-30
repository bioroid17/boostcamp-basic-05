import { Node, Position, SourceLocation } from "./nodes.js";
import { Program } from "./programs.js";

// var a = new A.init();
// 위 코드를 AST로 만들어보자.

const code = "var a = new A.init();";

const ast = new Program();
