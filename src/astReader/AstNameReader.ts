import { AstReader } from './AstReader';
import * as ts from 'typescript';

/** Reads React functional component name */
export class AstNameReader extends AstReader {
  constructor(protected file: string) {
    super(file);
    const defaultExport = this.findExport();
    if (defaultExport) {
      this.findReactFunctionComponent(defaultExport);
    }
  }

  /** Returns AstNameReader object
   * @param file - path to file
   */
  static build = (file: string): AstNameReader => {
    return new AstNameReader(file);
  };

  private foundReactComponentName: string;

  private findExport = (): string => {
    let foundExport;

    ts.forEachChild(this.sourceFile, fileNode => {
      if (ts.isExportAssignment(fileNode)) {
        ts.forEachChild(fileNode, exportNode => {
          if (ts.isIdentifier(exportNode)) {
            foundExport = exportNode.escapedText;
          }
        });
      }
    });
    return foundExport;
  };

  private findReactFunctionComponent = (componentName: string): void => {
    ts.forEachChild(this.sourceFile, fileNode => {
      if (
        ts.isVariableStatement(fileNode) &&
        this.checkIdentifier(componentName, fileNode)
      ) {
        console.log('-------------!!!!!!!!!!  :)');
      }
    });
  };

  // /** Returns first found ts class declaration name */
  // get get(): string {
  //   return this.foundClasses[0];
  // }

  // /** Checks if there is a given ts class declaration name*/
  // check = (name: string) => {
  //   return this.get === name;
  // };
}
