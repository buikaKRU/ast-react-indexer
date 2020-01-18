import * as ts from 'typescript';

export default class AstReader {
  constructor(protected file: string) {}
  protected program = ts.createProgram([this.file], { allowJs: true });
  public sourceFile = this.program.getSourceFile(this.file);

  /** Checks if identifier exists in nodes */
  public checkIdentifier = (
    identifier: string,
    nodes: ts.Node,
    toReturn: { value: boolean } = { value: false }
  ): boolean => {
    if (toReturn.value !== true) {
      ts.forEachChild(nodes, node => {
        if (ts.isIdentifier(node) && node.escapedText === identifier) {
          toReturn.value = true;
        } else if (node.getChildCount(this.sourceFile) > 0) {
          this.checkIdentifier(identifier, node, toReturn);
        }
      });
    }
    return toReturn.value;
  };

  /** Finds the first node which passes isCheck() */
  public findFirstNode = (
    isCheck: (node: ts.Node) => boolean,
    nodes: ts.Node = this.sourceFile,
    toReturn: { node: ts.Node } = { node: undefined }
  ): ts.Node => {
    if (!toReturn.node) {
      ts.forEachChild(nodes, node => {
        if (isCheck(node)) {
          toReturn.node = node;
        } else if (node.getChildCount(this.sourceFile) > 0) {
          this.findFirstNode(isCheck, node, toReturn);
        }
      });
    }
    return toReturn.node;
  };

  /** Finds all nodes which passes isCheck() */
  public findNodes = (
    isCheck: (node: ts.Node) => boolean,
    nodes: ts.Node = this.sourceFile,
    toReturn: ts.Node[] = []
  ): ts.Node[] => {
    ts.forEachChild(nodes, node => {
      if (isCheck(node)) {
        toReturn.push(node);
      } else if (node.getChildCount(this.sourceFile) > 0) {
        this.findNodes(isCheck, node, toReturn);
      }
    });
    return toReturn;
  };
}
