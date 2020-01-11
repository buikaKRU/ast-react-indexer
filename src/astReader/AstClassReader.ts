import { AstReader } from './AstReader';
import * as ts from 'typescript';

/** Reads ts class declaration name */
export class AstClassReader extends AstReader {
  /** Returns AstClassReader object
   * @param file - path to file
   */
  static build = (file: string): AstClassReader => {
    return new AstClassReader(file);
  };

  private foundClasses: string[] = [];

  private find = (): void => {
    ts.forEachChild(this.sourceFile, node => {
      if (ts.isClassDeclaration(node)) {
        const classNodes = node.getChildren(this.sourceFile);
        classNodes.forEach(el => {
          if (ts.isIdentifier(el)) {
            this.foundClasses.push(el.escapedText as string);
          }
        });
      }
    });
  };
  constructor(protected file: string) {
    super(file);
    this.find();
  }

  /** Returns first found ts class declaration name */
  get get(): string {
    return this.foundClasses[0];
  }

  /** Checks if there is a given ts class declaration name*/
  check = (name: string) => {
    return this.get === name;
  };
}
