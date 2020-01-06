import { AstReader } from './AstReader';
import * as ts from 'typescript';

/** Reads ts class declaration name */
export class AstClassReader extends AstReader {
  /** Finds ts class declaration names
   *  Returns only the first found class name.
   */
  public find = (): string => {
    const foundClasses: string[] = [];
    ts.forEachChild(this.sourceFile, node => {
      if (ts.isClassDeclaration(node)) {
        const classNodes = node.getChildren(this.sourceFile);
        classNodes.forEach(el => {
          if (ts.isIdentifier(el)) {
            foundClasses.push(el.escapedText as string);
          }
        });
      }
    });

    if (foundClasses.length > 1) {
      console.log('--- multiple classes found');
    }
    if (foundClasses.length === 0) {
      console.log('--- classes not found');
    }
    return foundClasses[0];
  };

  /** Checks if there is a given ts class declaration name*/
  public check = (name: string) => {
    return this.find() === name;
  };
}
