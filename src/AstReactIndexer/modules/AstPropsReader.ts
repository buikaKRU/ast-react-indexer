import { DsInterfaceProperty, DsInterface } from './AstInterfaceReader';
import * as ts from 'typescript';
import AstReader from './AstReader';

type DsDefaultProp = {
  name: string;
  value: string;
};

/** Compiles React Functional Component Props with defaultProps*/
export default class AstPropsReader {
  constructor(private astReader: AstReader) {
    this.findDefaultProps();
  }

  /** Returns AstPropsReader object s*/
  static build = (astReader: AstReader): AstPropsReader => {
    return new AstPropsReader(astReader);
  };

  private foundDefaultProps: DsDefaultProp[] = [];

  private findDefaultProps = (): void => {
    this.astReader
      .findNodes(n => ts.isExpressionStatement(n), this.astReader.sourceFile)
      .forEach(node => {
        const binaryExpressionNode = this.astReader.findFirstNode(
          n => ts.isBinaryExpression(n),
          node
        );
        if (
          binaryExpressionNode &&
          this.astReader.checkIdentifier('defaultProps', binaryExpressionNode)
        ) {
          const objectExpressionNode = this.astReader.findFirstNode(
            n => ts.isObjectLiteralExpression(n),
            node
          );
          if (objectExpressionNode) {
            ts.forEachChild(objectExpressionNode, propertyNode => {
              this.foundDefaultProps.push(this.compileDefaultProp(propertyNode));
            });
          }
        }
      });
  };

  private compileDefaultProp = (propertyNode: ts.Node): DsDefaultProp => {
    let name: string;
    let value: string;

    ts.forEachChild(propertyNode, node => {
      if (ts.isIdentifier(node)) {
        name = `${node.escapedText}`;
        value = propertyNode
          .getText(this.astReader.sourceFile)
          .replace(name, '')
          .replace('?', '')
          .replace(':', '')
          .replace(';', '')
          .replace(/^\s*/, '');
      }
    });
    return { name: name, value: value };
  };

  public props = (componentInterface: DsInterface[]): DsInterfaceProperty[] => {
    const componentProps: DsInterfaceProperty[] = [];
    const propsInterfaceArr = componentInterface.filter(el => el.name === 'Props');
    propsInterfaceArr.length > 0 &&
      propsInterfaceArr[0].properties.forEach(prop =>
        componentProps.push({ ...prop, defaultValue: undefined })
      );

    this.foundDefaultProps.forEach(defaultProp => {
      componentProps.find(prop => prop.name === defaultProp.name).defaultValue = defaultProp.value;
    });
    
    return componentProps;
  };
}
