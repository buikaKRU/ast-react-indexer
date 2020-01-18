import * as ts from 'typescript';
import AstReader from './AstReader';

export type DsInterfaceProperty = {
  name: string;
  doc: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
};

export type DsInterface = {
  name: string;
  exported: boolean;
  properties: DsInterfaceProperty[];
};

// interface DsComponentProps
export default class AstInterfaceReader {
  constructor(private astReader: AstReader) {
    this.findInterface();
  }

  /** Returns AstPropsReader object
   * @param file - path to file
   */
  static build = (astReder: AstReader): AstInterfaceReader => {
    return new AstInterfaceReader(astReder);
  };

  private foundInterfaces: DsInterface[] = [];

  private findInterface = (): void => {
    //TODO: chenge to ast.findNodes
    ts.forEachChild(this.astReader.sourceFile, fileNode => {
      if (!ts.isInterfaceDeclaration(fileNode)) {
        return;
      }
      const newInterface: DsInterface = {
        name: fileNode.name.escapedText as string,
        properties: [],
        exported: this.astReader.findFirstNode(node => node.kind === ts.SyntaxKind.ExportKeyword, fileNode)
          ? true
          : false
      };

      const propsInterfaceNodes = fileNode.getChildren(this.astReader.sourceFile);

      propsInterfaceNodes.forEach(child => {
        if (child.kind === 317) {
          const syntaxList = child.getChildren(this.astReader.sourceFile);
          syntaxList.forEach(propertySignature => {
            if (ts.isPropertySignature(propertySignature)) {
              newInterface.properties.push(this.compileInterface(propertySignature));
            }
          });
        }
      });
      this.foundInterfaces.push(newInterface);
    });
  };

  private compileInterface = (propertySignature: ts.Node): DsInterfaceProperty => {
    const interfaceProp: DsInterfaceProperty = {
      name: '',
      doc: null,
      type: null,
      optional: false,
    };

    propertySignature.getChildren(this.astReader.sourceFile).forEach(item => {
      if (ts.isIdentifier(item)) {
        interfaceProp.name = item.getText(this.astReader.sourceFile);
      }
      if (ts.isJSDoc(item)) {
        interfaceProp.doc = item
          .getText(this.astReader.sourceFile)
          .replace('/**', '')
          .replace('*/', '')
          .replace('*', '')
          .replace(/^\s*/, '');
      }
      if (item.kind === ts.SyntaxKind.QuestionToken) {
        interfaceProp.optional = true;
      }
    });

    interfaceProp.type = propertySignature
      .getText(this.astReader.sourceFile)
      .replace(interfaceProp.name, '')
      .replace('?', '')
      .replace(':', '')
      .replace(';', '')
      .replace(/\n\s*/gm, '')
      .replace(/^\s*/, '');

    return interfaceProp;
  };

  /** Returns found component props */
  get get(): DsInterface[] {
    return this.foundInterfaces;
  }
}
