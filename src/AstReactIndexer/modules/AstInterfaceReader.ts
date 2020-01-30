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

/** Reads React Functional Component Interfaces */
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
    const interfaceNodes = this.astReader.findNodes(node => ts.isInterfaceDeclaration(node))
    interfaceNodes.forEach(interfaceNode => {
        const newInterface: DsInterface = {
          name: (interfaceNode as ts.InterfaceDeclaration).name.escapedText as string,
          properties: [],
          exported: this.astReader.findFirstNode(
            node => node.kind === ts.SyntaxKind.ExportKeyword,
            interfaceNode
          )
            ? true
            : false
        };

        const propsInterfaceNodes = interfaceNode.getChildren(this.astReader.sourceFile);
        propsInterfaceNodes.forEach(child => {
          if (child.kind === ts.SyntaxKind.SyntaxList) {
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
      optional: false
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
