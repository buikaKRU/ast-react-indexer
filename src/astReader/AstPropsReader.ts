import * as ts from 'typescript';
import  AstReader  from './AstReader';

export type DsComponentProp = {
  name: string;
  doc: string;
  type: string;
  optional: boolean;
  defaultValue: string;
};

type DsDefaultProp = {
  name: string;
  value: string;
};

// interface DsComponentProps
export default class AstPropsReader extends AstReader {
  constructor(protected file: string) {
    super(file);
    this.findProps();
    this.findDefaultProps();
    this.mergeDefaultProps();
  }

  /** Returns AstPropsReader object
   * @param file - path to file
   */
  static build = (file: string): AstPropsReader => {
    return new AstPropsReader(file);
  };

  private foundComponentProps: DsComponentProp[] = [];

  private foundDefaultProps: DsDefaultProp[] = [];

  private findProps = (): void => {
    ts.forEachChild(this.sourceFile, fileNode => {
      if (!ts.isInterfaceDeclaration(fileNode)) {
        return;
      }

      if (fileNode.name.escapedText === 'Props') {
        const propsInterfaceNodes = fileNode.getChildren(this.sourceFile);

        propsInterfaceNodes.forEach(child => {
          if (child.kind === 317) {
            const syntaxList = child.getChildren(this.sourceFile);
            syntaxList.forEach(propertySignature => {
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

  private findDefaultProps = (): void => {
    this.findNodes(n => ts.isExpressionStatement(n), this.sourceFile).forEach(
      node => {
        const binaryExpressionNode = this.findFirstNode(
          n => ts.isBinaryExpression(n),
          node
        );
        if (
          binaryExpressionNode &&
          this.checkIdentifier('defaultProps', binaryExpressionNode)
        ) {
          const objectExpressionNode = this.findFirstNode(
            n => ts.isObjectLiteralExpression(n),
            node
          );
          if (objectExpressionNode) {
            ts.forEachChild(objectExpressionNode, propertyNode => {
              this.foundDefaultProps.push(
                this.compileDefaultProp(propertyNode)
              );
            });
          }
        }
      }
    );
  };

  private compileProps = (propertySignature: ts.Node): DsComponentProp => {
    const componentProp: DsComponentProp = {
      name: '',
      doc: null,
      type: null,
      optional: false,
      defaultValue: null
    };

    propertySignature.getChildren(this.sourceFile).forEach(item => {
      if (ts.isIdentifier(item)) {
        componentProp.name = item.getText(this.sourceFile);
      }
      if (ts.isJSDoc(item)) {
        componentProp.doc = item
          .getText(this.sourceFile)
          .replace('/**', '')
          .replace('*/', '')
          .replace('*', '')
          .replace(/^\s*/, '');
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
      .replace(/\n\s*/gm, '')
      .replace(/^\s*/, '');

    return componentProp;
  };

  private compileDefaultProp = (propertyNode: ts.Node): DsDefaultProp => {
    let name: string;
    let value: string;

    ts.forEachChild(propertyNode, node => {
      if (ts.isIdentifier(node)) {
        name = `${node.escapedText}`;
        value = propertyNode
          .getText(this.sourceFile)
          .replace(name, '')
          .replace('?', '')
          .replace(':', '')
          .replace(';', '')
          .replace(/^\s*/, '');
      }
    });
    return { name: name, value: value };
  };

  private mergeDefaultProps = (): void => {
    if (this.foundComponentProps && this.foundDefaultProps) {
      this.foundDefaultProps.forEach(defaultProp => {
        this.foundComponentProps.find(
          prop => prop.name === defaultProp.name
        ).defaultValue = defaultProp.value;
      });
    }
  };

  /** Returns found component props */
  get get(): DsComponentProp[] {
    return this.foundComponentProps;
  }
}
