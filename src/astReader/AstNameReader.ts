import  AstReader  from './AstReader';
import * as ts from 'typescript';

/** Reads React functional component name */
export default class AstNameReader {
  constructor(protected ast: AstReader) {

    const defaultExportName = this.findExport();
    if (
      defaultExportName &&
      this.checkReactFunctionComponent(defaultExportName)
    ) {
      this.foundReactComponentName = defaultExportName;
    }
  }

  /** Returns AstNameReader object
   * @param file - path to file
   */
  static build = (astReader: AstReader): AstNameReader => {
    return new AstNameReader(astReader);
  };

  private foundReactComponentName: string;

  /** Finds default export variable name */
  private findExport = (): string => {
    let foundExport;
    const exportNode =  this.ast.findFirstNode(node => ts.isExportAssignment(node));
    if (exportNode) {
      ts.forEachChild(exportNode, node => {
        foundExport = ts.isIdentifier(node) ? node.escapedText : undefined;
      });
    }
    return foundExport;
  };

  /** Checks if variable with specified name exists as React.FunctionalComponent type */
  private checkReactFunctionComponent = (componentName: string): boolean => {
    let toReturn = false;
    this.ast.findNodes(node => ts.isVariableStatement(node)).forEach(node => {
      if (this.ast.checkIdentifier(componentName, node)) {
        const qualifiedNameNode = this.ast.findFirstNode(
          n => ts.isQualifiedName(n),
          node
        );
        if (
          this.ast.checkIdentifier('React', qualifiedNameNode) &&
          this.ast.checkIdentifier('FunctionComponent', qualifiedNameNode)
        ) {
          toReturn = true;
        }
      }
    });
    return toReturn;
  };

  /** Returns name of found exported React.FunctionComponent */
  get get(): string {
    return this.foundReactComponentName;
  }

  /** Checks if there is a given name React.FunctionComponent exported*/
  check = (name: string) => {
    return this.get === name;
  };
}
