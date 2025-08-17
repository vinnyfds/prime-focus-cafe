// ops/scripts/guard-map-calls.ts
// Support running under CommonJS loader too
import fs from "fs";
import glob from "glob";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

const files = glob.sync("dist/assets/index-*.js");
if (files.length === 0) {
  console.error("No bundle found at dist/assets/index-*.js");
  process.exit(1);
}
const target = files[0];
const code = fs.readFileSync(target, "utf8");

const ast = parse(code, {
  sourceType: "module",
  plugins: ["jsx", "optionalChaining"],
});

const guardMethod = (path: any, methodName: "map" | "flatMap") => {
  const callee = path.node.callee;
  if (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.property, { name: methodName })
  ) {
    const obj = callee.object;
    const guarded = t.conditionalExpression(
      t.callExpression(
        t.memberExpression(t.identifier("Array"), t.identifier("isArray")),
        [t.cloneNode(obj)]
      ),
      t.cloneNode(obj),
      t.arrayExpression([])
    );
    path.node.callee = t.memberExpression(guarded, t.identifier(methodName));
  }
};

traverse(ast, {
  CallExpression(path) {
    guardMethod(path, "map");
    guardMethod(path, "flatMap");
  },
});

const out = generate(ast, { compact: true }).code;
fs.writeFileSync(target, out, "utf8");
console.log(`Patched ${target}`);
