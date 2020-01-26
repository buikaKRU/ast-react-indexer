import AstReactReader from './AstReactIndexer/AstReactIndexer';
import { writeFileSync } from 'fs';

const astReact = AstReactReader.build('examples/ExSelect.tsx');
const name = astReact.name || 'default';
const interfaces = astReact.interface;

writeFileSync(
  `./examples/${name}.json`,
  JSON.stringify(interfaces, (k, v) => (v === undefined ? 'undefined' : v), 2)
);
import ts = require('typescript');

function simpleTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      if (ts.isClassDeclaration(node) && node.decorators && node.name) {
      const decorator = node.decorators.find(decorator => {
        const decoratorExpr = decorator.expression;

        return (
          ts.isCallExpression(decoratorExpr) &&
          decoratorExpr.expression.getText() === 'customElement'
        );
      });

      if (decorator) {
        node.decorators = ts.createNodeArray(node.decorators.filter(d => d !== decorator));
        const name = (decorator.expression as ts.CallExpression).arguments[0];
        const defineCall = ts.createStatement(
          ts.createCall(
            ts.createPropertyAccess(
              ts.createIdentifier('customElements'),
              ts.createIdentifier('define')
            ),
            undefined,
            [name, node.name]
          )
        );

        return [node, defineCall];
      }

        return node;
      }

      if (ts.isImportDeclaration(node)) {
        console.log(node.getFullText());
        // node.decorators = ts.createNodeArray()

        const importCss = ts.createImportDeclaration(
          undefined,
          undefined,
          undefined,
          ts.createStringLiteral("./DsNumber.css")
        )

        return importCss;
      }
      return ts.visitEachChild(node, child => visit(child), context);
    };

    return node => ts.visitNode(node, visit);
  };
}

let source = `
import './ExNumber.scss'

@customElement('x-foo')
class XFoo {}

`;
let result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
  transformers: { before: [simpleTransformer()] }
});

// console.log(result.outputText);;

// writeFileSync(
//   `./transpilerResult.js`,result.outputText
// );

// function makeFactorialFunction() {
//   const functionName = ts.createIdentifier('factorial');
//   const paramName = ts.createIdentifier('k');
//   const parameter = ts.createParameter(
//     /*decorators*/ undefined,
//     /*modifiers*/ undefined,
//     /*dotDotDotToken*/ undefined,
//     paramName
//   );

//   const condition = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.LessThanEqualsToken,
//     ts.createLiteral(1)
//   );
//   const ifBody = ts.createBlock([ts.createReturn(ts.createLiteral(1))], /*multiline*/ true);

//   const decrementedArg = ts.createBinary(paramName, ts.SyntaxKind.MinusToken, ts.createLiteral(1));
//   const recurse = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.AsteriskToken,
//     ts.createCall(functionName, /*typeArgs*/ undefined, [decrementedArg])
//   );
//   const statements = [ts.createIf(condition, ifBody), ts.createReturn(recurse)];

//   return ts.createFunctionDeclaration(
//     /*decorators*/ undefined,
//     /*modifiers*/ [ts.createToken(ts.SyntaxKind.ExportKeyword)],
//     /*asteriskToken*/ undefined,
//     functionName,
//     /*typeParameters*/ undefined,
//     [parameter],
//     /*returnType*/ ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
//     ts.createBlock(statements, /*multiline*/ true)
//   );
// }

// const resultFile = ts.createSourceFile(
//   'someFileName.ts',
//   '',
//   ts.ScriptTarget.Latest,
//   /*setParentNodes*/ false,
//   ts.ScriptKind.TS
// );
// const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

// const result = printer.printNode(ts.EmitHint.Unspecified, makeFactorialFunction(), resultFile);
// console.log(result);;
// console.log(resultFile)
