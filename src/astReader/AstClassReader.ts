import { AstReader } from './AstReader';
import * as ts from 'typescript';
export class AstClassReader extends AstReader {
  protected processNode(node): void {
    if (ts.isClassDeclaration(node)) {
      const classNodes = node.getChildren(this.sourceFile);

      classNodes.forEach(el => {
        if (ts.isIdentifier(el)) {
          console.log('@@@@@ class: ', el.escapedText);
        }
      });
    }
  }

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

  public check = (name: string) => {
    return this.find() === name;
  };
}
