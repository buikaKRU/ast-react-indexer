// import { writeFileSync } from 'fs';
// import { simpleTransformer } from './simpleTransformer';
// import { reprintSections } from './reprintSections';
// import { AstClassReader } from './astReader/AstClassReader';
// import AstPropsReader from './astReader/AstPropsReader';
// import AstInterfaceReader from './astReader/AstInterfaceReader';
import AstReactReader from './astReader/AstReactReader';
import { writeFileSync } from 'fs';

// simpleTransformer();
// reprintSections('typescriptFile.ts', ['testingInterface'])

// const classNameReader = AstClassReader.build('ReactFile.tsx');

// const componentName = classNameReader.get;

// console.log(classNameReader.check(componentName));
// console.log('Class Name:', componentName);
// console.log(componentProps)
// componentProps.forEach(prop => {
//   console.log(prop.name);
//   console.log(prop.type);
// });

// const nameReader = AstNameReader.build('src/DsSelect.tsx');
// console.log(nameReader.check("DsSelect"))
// console.log('Component name: ', nameReader.get);

// const componentPropsReader = AstPropsReader.build('src/DsSelect.tsx');
// const componentProps = componentPropsReader.get;
// writeFileSync(
//   './outputProps.json',
//   JSON.stringify(componentProps, (k, v) => v === undefined ? "undefined" : v, 2)
// );

// const interfaceReader = AstInterfaceReader.build('src/DsSelect.tsx').get
// writeFileSync(
//   './outputInterfaces.json',
//   JSON.stringify(interfaceReader, (k, v) => v === undefined ? "undefined" : v, 2)
// );

const astReact = AstReactReader.build('src/DsNumber.tsx');
const name = astReact.name || 'default'
console.log(astReact.nameCheck('DsSelect'), name);
const interfaces = astReact.interface;
writeFileSync(
  `./${name}.json`,
  JSON.stringify(interfaces, (k, v) => (v === undefined ? 'undefined' : v), 2)
);
