import * as ts from 'typescript';
import { readFileSync, writeFileSync } from 'fs';

export default class TscCompiler {
  constructor(private filePath: string) {}

  private options: ts.CompilerOptions = {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES2016,
    outDir: './outDir',
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
    declaration: true
  };

  private _transform: string;
  set transform(test: string) {
    this._transform = test
  }


  public compile(): void {
    const createdFiles = {};
    const host = ts.createCompilerHost(this.options);
    // host.getCanonicalFileName = (fileName: string) => 'test'

    host.readFile = (fileName: string) => {
      let content = readFileSync(fileName, 'utf8')
      if (fileName.match(/examples\//)) {
        console.log('@@', fileName)
        content =  content + '//reading test'
        content = content.replace('.scss', '.css')
        // content = ts.transpileModule(content, {
        //   compilerOptions: this.options,
        //   transformers: { after: [this.simpleTransformer()] },
        // }).outputText;
      }
      return content;
    }
    
    
    // host.getSourceFile = (fileName: string):ts.SourceFile =>{
      //   const sourceFile = program.getSourceFile('');
      //   console.log('@@', fileName)
    //   return sourceFile;
    // }

  

    


    


    
    
  

    // host.writeFile = (fileName: string, contents: string) => {
    //   createdFiles[fileName] = contents;
    //   console.log(fileName);
    //   writeFileSync(fileName, contents + '// writing test')
    // };;



    //1 2 3 4 5 6 7
    // [this.filePath].forEach(file => {
    //   console.log("### JavaScript\n")
    //   // console.log(host.readFile(file))
    
    //   console.log("### Type Definition\n")
    //   const dts = file.replace(".js", ".d.ts")
    //   console.log(createdFiles[dts])
    // })
    
    const program = ts.createProgram([this.filePath], this.options, host);
    const emitResult = program.emit();

    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    let diagnosticsFileName = '';
    allDiagnostics.forEach(diagnostic => {
      if (diagnostic.file) {
        if (diagnosticsFileName !== diagnostic.file.fileName) {
          diagnosticsFileName = diagnostic.file.fileName;
          console.log(`--- ${diagnosticsFileName.replace(/^.*\//, '')}`);
        }
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`line (${line + 1},${character + 1}): ${message}`);
      } else {
        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
      }
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    exitCode === 0 && console.log('finieshed without errors');
    // process.exit(exitCode);
  }


  private simpleTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
    return context => {
      const visit: ts.Visitor = node => {
      
        if (ts.isImportDeclaration(node)) {
          console.log(node.getFullText());
          if (node.getFullText().match(/scss/)){
            const importCss = ts.createImportDeclaration(
              undefined,
              undefined,
              undefined,
              ts.createStringLiteral("./XXX.css")
            )
            return importCss;
          } else {
            return node
          }
        }
        return ts.visitEachChild(node, child => visit(child), context);
      };
      return node => ts.visitNode(node, visit);
    };
  }
}
