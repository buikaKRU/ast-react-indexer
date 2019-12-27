import * as ts from 'typescript';
import { writeFileSync } from 'fs';

const nodesArray: any[] = [];
/**
 * Prints out particular nodes from a source file
 *
 * @param file a path to a file
 * @param identifiers top level identifiers available
 */
export function reprintSections(file: string, identifiers: string[]): void {
  console.log(process.argv[1]);

  // Create a Program to represent the project, then pull out the
  // source file to parse its AST.
  let program = ts.createProgram([file], { allowJs: true });
  const sourceFile = program.getSourceFile(file);
  // console.log('sourceFile', sourceFile)

  // To print the AST, we'll use TypeScript's printer
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // To give constructive error messages, keep track of found and un-found identifiers
  const unfoundNodes = [],
    foundNodes = [];

  // Loop through the root AST nodes of the file
  ts.forEachChild(sourceFile, node => {
    // console.log(node)
    nodesArray.push(node);
    let name = '';

    // This is an incomplete set of AST nodes which could have a top level identifier
    // it's left to you to expand this list, which you can do by using
    // https://ts-ast-viewer.com/ to see the AST of a file then use the same patterns
    // as below
    if (ts.isFunctionDeclaration(node)) {
      name = node.name.text;
      // Hide the method body when printing
      node.body = undefined;
    } else if (ts.isVariableStatement(node)) {
      name = node.declarationList.declarations[0].name.getText(sourceFile);
    } else if (ts.isInterfaceDeclaration(node)) {
      name = node.name.text;
    }

    const container = identifiers.includes(name) ? foundNodes : unfoundNodes;
    container.push([name, node]);

    findProps(node, sourceFile);
  });

  // Either print the found nodes, or offer a list of what identifiers were found
  if (!foundNodes.length) {
    console.log(
      `Could not find any of ${identifiers.join(
        ', '
      )} in ${file}, found: ${unfoundNodes
        .filter(f => f[0])
        .map(f => f[0])
        .join(', ')}.`
    );
    process.exitCode = 1;
  } else {
    foundNodes.map(f => {
      const [name, node] = f;
      console.log('### ' + name + '\n');
      console.log(
        printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
      ) + '\n';
    });
  }

  //writeFileSync('./output.json', JSON.stringify(nodesArray, null, 2));
}

// Run the extract function with the script's arguments
// extract(process.argv[2], process.argv.slice(3));

const findProps = (node: ts.Node, sourceFile: ts.SourceFile) => {
  let foundProps = {
    name: '',
    comment: '',
    members: []
  };

  if (!ts.isInterfaceDeclaration(node)) {
    return;
  }

  if (node.name.escapedText === 'Props') {
    foundProps.name = 'Props';
    findPropsGetChildren(node, sourceFile)
    ts.forEachChild(node, currentNode => {
      // console.log(currentNode)

      if (ts.isIdentifier(currentNode)) {
      }

      if (ts.isPropertySignature(currentNode)) {
        const propertySignatureNode = currentNode;
        let props = {
          name: '',
          optional: false,
          value: ''
        };

        ts.forEachChild(propertySignatureNode, node => {
          if (ts.isIdentifier(node)) {
            props.name = node.text;
          }
          if (ts.isToken(node)) {
            if (node.kind === 57) {
              console.log(node);
              props.optional = true;
            }
          }
        });

        const value = currentNode
          .getFullText(sourceFile)
          .replace(props.name, '')
          .replace('?', '')
          .replace(':', '')
          .replace(';', '')
          .replace('\n   ', '')

        props.value = value;
        foundProps.members.push(props);
      }
    });
  } else {
    return;
  }

  writeFileSync('./outputProps.json', JSON.stringify(foundProps, null, 2));
};

const findPropsGetChildren = (node: ts.Node, sourceFile: ts.SourceFile) => {

  const children = node.getChildren(sourceFile);
  let content = []

  children.forEach(child => {
    if (ts.isIdentifier(child)){
      content.push({name: child.getText(sourceFile)})
    }
    if (ts.isJSDoc(child)) {
      content.push({doc: child.getText(sourceFile)})
    }
  })
  writeFileSync('./outputPropsChildren.json', JSON.stringify(content, null, 2));

}
