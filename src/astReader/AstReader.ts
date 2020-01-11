import * as ts from 'typescript';

export abstract class AstReader {
  constructor(protected file: string) {}
  protected program = ts.createProgram([this.file], { allowJs: true });
  protected sourceFile = this.program.getSourceFile(this.file);

  /** Finds identifier in nodes */
  protected findIdentifier = (identifier: string, nodes: ts.Node, parentValue: {value: boolean} = {value: false}):boolean => {
    if (parentValue.value !== true) {
      ts.forEachChild(nodes, node => {
        if (ts.isIdentifier(node) && node.getText(this.sourceFile) === identifier) {
          parentValue.value = true
        } else if (node.getChildCount(this.sourceFile) > 0) {
          this.findIdentifier(identifier ,node, parentValue)
        }
      })
    }
    return parentValue.value;
  }
}





