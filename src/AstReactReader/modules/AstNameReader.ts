import  AstReader  from './AstReader';
import * as ts from 'typescript';

/** Reads React functional component name */
export default class AstNameReader {
  constructor(protected astReader: AstReader) {

    const defaultExportName = this.findExport();
    if (
      defaultExportName &&
      this.checkReactFunctionComponent(defaultExportName)
    ) {
      this.foundReactComponentName = defaultExportName;
    }
  }

  /** Returns AstNameReader object
   * @param astReader - provide AstReader object
   */
  static build = (astReader: AstReader): AstNameReader => {
    return new AstNameReader(astReader);
  };

  private foundReactComponentName: string;

  /** Finds default export variable name */
  private findExport = (): string => {
    let foundExport;
    const exportNode =  this.astReader.findFirstNode(node => ts.isExportAssignment(node));
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
    this.astReader.findNodes(node => ts.isVariableStatement(node)).forEach(node => {
      if (this.astReader.checkIdentifier(componentName, node)) {
        const qualifiedNameNode = this.astReader.findFirstNode(
          n => ts.isQualifiedName(n),
          node
        );
        if (
          this.astReader.checkIdentifier('React', qualifiedNameNode) &&
          this.astReader.checkIdentifier('FunctionComponent', qualifiedNameNode)
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
