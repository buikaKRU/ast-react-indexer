import * as ts from 'typescript';

export abstract class AstReader {
  constructor(private file: string) {}

  protected abstract processNode(node: ts.Node): void;
  protected program = ts.createProgram([this.file], { allowJs: true });
  protected sourceFile = this.program.getSourceFile(this.file);

  // read = (): void => {
  //   // Create a Program to represent the project, then pull out the
  //   // source file to parse its AST.
  //   console.log('----------------- Working');

  //   ts.forEachChild(this.sourceFile, node => {
  //     this.processNode(node);
  //   });
  // };
}
