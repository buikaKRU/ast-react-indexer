import * as ts from 'typescript';

export abstract class AstReader {
  constructor(protected file: string) {}
  protected program = ts.createProgram([this.file], { allowJs: true });
  protected sourceFile = this.program.getSourceFile(this.file);
}
