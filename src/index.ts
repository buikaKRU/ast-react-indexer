import AstReactReader from './AstReactIndexer/AstReactIndexer';
import { writeFileSync } from 'fs';

const astReact = AstReactReader.build('examples/ExSelect.tsx');
const name = astReact.name || 'default';
const interfaces = astReact.interface;

writeFileSync(
  `./examples/${name}.json`,
  JSON.stringify(interfaces, (k, v) => (v === undefined ? 'undefined' : v), 2)
);


import TscCompiler from './TscCompiler';
const tscCompiler = new TscCompiler('./examples/index.tsx')
tscCompiler.transform = 'a test'
tscCompiler.compile();
//1 2 3 4







import ts = require('typescript');

function simpleTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      // if (ts.isClassDeclaration(node) && node.decorators && node.name) {
      // const decorator = node.decorators.find(decorator => {
      //   const decoratorExpr = decorator.expression;

      //   return (
      //     ts.isCallExpression(decoratorExpr) &&
      //     decoratorExpr.expression.getText() === 'customElement'
      //   );
      // });

      // if (decorator) {
      //   node.decorators = ts.createNodeArray(node.decorators.filter(d => d !== decorator));
      //   const name = (decorator.expression as ts.CallExpression).arguments[0];
      //   const defineCall = ts.createStatement(
      //     ts.createCall(
      //       ts.createPropertyAccess(
      //         ts.createIdentifier('customElements'),
      //         ts.createIdentifier('define')
      //       ),
      //       undefined,
      //       [name, node.name]
      //     )
      //   );

      //   return [node, defineCall];
      // }

      //   return node;
      // }

      if (ts.isImportDeclaration(node)) {
        console.log(node.getFullText());

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
};

// let source = `
// import './ExNumber.scss'
// import './ExSrc.scss'

// @customElement('x-foo')
// class XFoo {}

// `;
// let result = ts.transpileModule(source, {
//   compilerOptions: { module: ts.ModuleKind.CommonJS },
//   transformers: { before: [simpleTransformer()] }
// });

// // console.log(result.outputText);;

// writeFileSync(
//   `./outDir/transpilerResult.js`,result.outputText
// );

