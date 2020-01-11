import * as ts from 'typescript';
import { AstReader } from './AstReader';

type DsComponentProp = {
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
    this.findDefaultProps(this.sourceFile);
  }

  /** Returns AstPropsReader object
   * @param file - path to file
   */
  static build = (file: string): AstPropsReader => {
    return new AstPropsReader(file);
  };

  private foundComponentProps: DsComponentProp[] = [];

  private foundDefaultProps: { name: string; defaultValue: string }[] = [];

  private find = (): void => {
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

  private compileDefaultProps = (propertyNodes: ts.Node): void => {
    const foundDefaultProps: [string, string][] = [];
    console.log('compile default props');
    propertyNodes.forEachChild(propertyNode => {
      // console.log(node);
      // node is an objectLiteralElement
      if (ts.isObjectLiteralExpression(propertyNode)) {
        console.log('*** *** *** *** *** *** *** \n \n');
        propertyNode.forEachChild(objectLiteralNode => {
          if (ts.isPropertyAssignment(objectLiteralNode)) {
            // console.log(objectLiteralNode.getText(this.sourceFile));
            objectLiteralNode.forEachChild(propertyAssignmentNode => {
              let name: string;
              let value: string;
              if (ts.isIdentifier(propertyAssignmentNode)) {
                name = `${propertyAssignmentNode.escapedText}`;
                value = propertyAssignmentNode
                  .getText(this.sourceFile)
                  .replace(name, '')
                  .replace('?', '')
                  .replace(':', '')
                  .replace(';', '')
                  .replace('\n   ', '');
                console.log(name, ' - ', value);
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
      .replace(/^\s*/, '');
    // .replace('\n', '');

    return componentProp;
  };

  private findDefaultPropsOld = (sourceFile: ts.Node): void => {
    ts.forEachChild(sourceFile, fileNode => {
      if (ts.isPropertyDeclaration(fileNode)) {
        ts.forEachChild(fileNode, propertyNode => {
          if (
            ts.isIdentifier(propertyNode) &&
            propertyNode.escapedText === 'defaultProps'
          ) {
            console.log('$$$$$$$ Default Props Found');
            this.compileDefaultProps(fileNode);
            return;
          }
          // if (ts.isPropertyAssignment(propertyNode)) {
          //   console.log('-------- objectLiteral');
          // }
        });
      } else {
        if (fileNode.getChildCount(this.sourceFile) > 0) {
          this.findDefaultPropsOld(fileNode);
        }
      }
    });
  };

  private findDefaultProps = (sourceFile: ts.Node): void => {
    ts.forEachChild(sourceFile, fileNode => {
      if (ts.isExpressionStatement(fileNode)) {
        ts.forEachChild(fileNode, expressionNode => {
          if (ts.isBinaryExpression(expressionNode)) {
            console.log('binaryExpression found');
            if (this.checkIdentifier('defaultProps', expressionNode)) {
              console.log('defaultProps identifier found');
            }

            return;
          }
        });
      } else if (fileNode.getChildCount(this.sourceFile) > 0) {
        this.findDefaultProps(fileNode);
      }
    });
  };

  /** Returns found component props */
  get get(): DsComponentProp[] {
    return this.foundComponentProps;
  }
}
