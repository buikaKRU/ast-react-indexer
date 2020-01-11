import * as ts from 'typescript';

export abstract class AstReader {
  constructor(protected file: string) {}
  protected program = ts.createProgram([this.file], { allowJs: true });
  protected sourceFile = this.program.getSourceFile(this.file);

  /** Checks if identifier exists in nodes */
  protected checkIdentifier = (
    identifier: string,
    nodes: ts.Node,
    parentValue: { value: boolean } = { value: false }
  ): boolean => {
    if (parentValue.value !== true) {
      ts.forEachChild(nodes, node => {
        if (ts.isIdentifier(node) && node.escapedText === identifier) {
          parentValue.value = true;
        } else if (node.getChildCount(this.sourceFile) > 0) {
          this.checkIdentifier(identifier, node, parentValue);
        }
      });
    }
    return parentValue.value;
  };

  protected findNode = (
    isCheck: (node: ts.Node) => boolean,
    nodes: ts.Node,
    parentValue: ts.Node = undefined
  ): ts.Node => {
    if (!parentValue) {
      ts.forEachChild(nodes, node => {
        if (isCheck(node)) {
          console.log(node.getText(this.sourceFile))
          parentValue = node
        } else if (node.getChildCount(this.sourceFile) > 0) {
          this.findNode(isCheck, node, parentValue)
        }
      })
    }
    return parentValue
  };
}
