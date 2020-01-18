
// import * as ts from 'typescript';
// import { AstReader } from './AstReader';

// export type DsInterfaceProperty = {
//   name: string;
//   doc: string;
//   type: string;
//   optional: boolean;
//   defaultValue: null;
// };

// export type DsInterface = {
//   name: string;
//   exported: boolean;
//   properties: DsInterfaceProperty[];
// };

// // interface DsComponentProps
// export default class AstInterfaceReader extends AstReader {
//   constructor(protected file: string) {
//     super(file);
//     this.findInterface();
//   }

//   /** Returns AstPropsReader object
//    * @param file - path to file
//    */
//   static build = (file: string): AstInterfaceReader => {
//     return new AstInterfaceReader(file);
//   };

//   private foundInterfaces: DsInterface[] = [];

//   private findInterface = (): void => {
//     ts.forEachChild(this.sourceFile, fileNode => {
//       if (!ts.isInterfaceDeclaration(fileNode)) {
//         return;
//       }

//       const newInterface: DsInterface = {
//         name: fileNode.name.escapedText as string,
//         properties: [],
//         exported: this.findFirstNode(node => node.kind === ts.SyntaxKind.ExportKeyword, fileNode)
//           ? true
//           : false
//       };
//       console.log(newInterface);
      
//       const propsInterfaceNodes = fileNode.getChildren(this.sourceFile);
      
//       propsInterfaceNodes.forEach(child => {
//         if (child.kind === 317) {
//           const syntaxList = child.getChildren(this.sourceFile);
//           syntaxList.forEach(propertySignature => {
//             if (ts.isPropertySignature(propertySignature)) {
//               newInterface.properties.push(this.compileInterface(propertySignature));
//             }
//           });
//         }
//       });
//       this.foundInterfaces.push(newInterface)
//     });
//   };

//   private compileInterface = (propertySignature: ts.Node): DsInterfaceProperty => {
//     const interfaceProp: DsInterfaceProperty = {
//       name: '',
//       doc: null,
//       type: null,
//       optional: false,
//       defaultValue: null
//     };

//     propertySignature.getChildren(this.sourceFile).forEach(item => {
//       if (ts.isIdentifier(item)) {
//         interfaceProp.name = item.getText(this.sourceFile);
//       }
//       if (ts.isJSDoc(item)) {
//         interfaceProp.doc = item
//           .getText(this.sourceFile)
//           .replace('/**', '')
//           .replace('*/', '')
//           .replace('*', '')
//           .replace(/^\s*/, '');
//       }
//       if (item.kind === ts.SyntaxKind.QuestionToken) {
//         interfaceProp.optional = true;
//       }
//     });

//     interfaceProp.type = propertySignature
//       .getText(this.sourceFile)
//       .replace(interfaceProp.name, '')
//       .replace('?', '')
//       .replace(':', '')
//       .replace(';', '')
//       .replace(/\n\s*/gm, '')
//       .replace(/^\s*/, '');

//     return interfaceProp;
//   };

//   /** Returns found component props */
//   get get(): DsInterface[] {
//     return this.foundInterfaces;
//   }
// }
