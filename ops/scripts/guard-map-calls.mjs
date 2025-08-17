// ESM script: guards every obj.map/flatMap call with Array.isArray(obj)?obj:[]
import fs from 'fs';
import { globSync } from 'glob';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse = traverseModule.default || traverseModule;
import generatorModule from '@babel/generator';
const generate = generatorModule.default || generatorModule;
import * as t from '@babel/types';

const files = globSync('dist/assets/index-*.js');
if (files.length === 0) {
  console.error('No bundle found at dist/assets/index-*.js');
  process.exit(1);
}
const target = files[0];
const code = fs.readFileSync(target, 'utf8');

const ast = parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'optionalChaining'],
});

const guardMethod = (path, methodName) => {
  const callee = path.node.callee;
  if (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.property, { name: methodName })
  ) {
    const obj = callee.object;
    const guarded = t.conditionalExpression(
      t.callExpression(
        t.memberExpression(t.identifier('Array'), t.identifier('isArray')),
        [t.cloneNode(obj)]
      ),
      t.cloneNode(obj),
      t.arrayExpression([])
    );
    path.node.callee = t.memberExpression(guarded, t.identifier(methodName));
  }
};

let patchedCount = 0;
traverse(ast, {
  CallExpression(path) {
    const before = generate(path.node).code;
    guardMethod(path, 'map');
    guardMethod(path, 'flatMap');
    const after = generate(path.node).code;
    if (before !== after) patchedCount += 1;
  },
});

const out = generate(ast, { compact: true }).code;
fs.writeFileSync(target, out, 'utf8');
console.log(`Patched ${target} (changed ${patchedCount} call(s))`);


