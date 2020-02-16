# React Typescript Functional Components AST Indexer
### v 1.1.0


## Purpose:
From given `*.tsx` AstReactIndexer can:
1. read / check the name of an exprted React.FunctionalComponent type function
2. index props interface with defaultProps values
3. index other component interfaces
4. index component type aliases

## Avaliable scripts:
This is not standalone library. The index.ts file is made only for a develpment.

`npm run dev` compiles from typescript in watch mode and runs index.js in nodemon

## Usage:
Import the `AstReactIndexer` class. Check its *.ts file for avaliable methods.

## Changelog

### v 1.1.0
- support for indexing type aliases added to AstInterfaceReader

### v 1.0.0
- support for indexing all component interfaces added to AstInterfaceReader

### until v 1.0.0
- indexing all React.FunctionalComponent props