import * as ts from 'typescript';
import { AstReader } from './AstReader';

export type DsComponentProp = {
  name: string;
  doc: string;
  type: string;
  optional: boolean;
  defaultValue: string;
};
// interface DsComponentProps
export default class AstPropsReader extends AstReader {
  constructor(protected file: string) {
    super(file);
    this.find();
  }

  static build = (file: string): AstPropsReader => {
    return new AstPropsReader(file);
  };

  private foundComponentProps: DsComponentProp[] = [];

  private find = (): void => {
    ts.forEachChild(this.sourceFile, fileNode => {
      if (!ts.isInterfaceDeclaration(fileNode)) {
        return;
      }

      if (fileNode.name.escapedText === 'Props') {
        const propsInterfaceNodes = fileNode.getChildren(this.sourceFile);

        propsInterfaceNodes.forEach(child => {
          if (child.kind === 317) {
            // console.log(fileNode.kind);

            const syntaxList = child.getChildren(this.sourceFile);

            syntaxList.forEach(propertySignature => {
              // console.log(propertySignature.getFullText(this.sourceFile));
              if (ts.isPropertySignature(propertySignature)) {
                this.foundComponentProps.push(
                  this.compileProps(propertySignature)
                );
              }
            });
          }
        });
      }
    });
  };

  private compileProps = (propertySignature: ts.Node): DsComponentProp => {
    const componentProp: DsComponentProp = {
      name: '',
      doc: null,
      type: null,
      optional: false,
      defaultValue: undefined
    };

    propertySignature.getChildren(this.sourceFile).forEach(item => {
      if (ts.isIdentifier(item)) {
        componentProp.name = item.getText(this.sourceFile);
        console.log(componentProp.name);
      }
      if (ts.isJSDoc(item)) {
        componentProp.doc = item
          .getText(this.sourceFile)
          .replace('/**', '')
          .replace('*/', '')
          .replace('*', '');
      }
      if (item.kind === 57) {
        componentProp.optional = true;
      }
    });

    componentProp.type = propertySignature
      .getText(this.sourceFile)
      .replace(componentProp.name, '')
      .replace('?', '')
      .replace(':', '')
      .replace(';', '')
      .replace('\n   ', '');

    return componentProp;
  };

  get get(): DsComponentProp[] {
    return this.foundComponentProps;
  }
}
