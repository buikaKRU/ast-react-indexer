import { AstReader } from './AstReader';
import * as ts from 'typescript';

/** Reads React functional component name */
export class AstNameReader extends AstReader {
  constructor(protected file: string) {
    super(file);

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
  static build = (file: string): AstNameReader => {
    return new AstNameReader(file);
  };

  private foundReactComponentName: string;

  /** Finds default export variable name */
  private findExport = (): string => {
    let foundExport;
    const exportNode = this.findFirstNode(node => ts.isExportAssignment(node));
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
    this.findNodes(node => ts.isVariableStatement(node)).forEach(node => {
      if (this.checkIdentifier(componentName, node)) {
        const qualifiedNameNode = this.findFirstNode(
          n => ts.isQualifiedName(n),
          node
        );
        if (
          this.checkIdentifier('React', qualifiedNameNode) &&
          this.checkIdentifier('FunctionComponent', qualifiedNameNode)
        ) {
          toReturn = true;
        }
      }
    });
    return toReturn;
  };

  /** Returns first found ts class declaration name */
  get get(): string {
    return this.foundReactComponentName;
  }
}
