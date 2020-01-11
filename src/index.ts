import { AstNameReader } from './astReader/AstNameReader';
import { writeFileSync } from 'fs';
import { simpleTransformer } from './simpleTransformer';
import { reprintSections } from './reprintSections';
import { AstClassReader } from './astReader/AstClassReader';
import AstPropsReader from './astReader/AstPropsReader';

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


const nameReader = AstNameReader.build('src/DsNumber.tsx');
console.log('Component name: ', nameReader.get);

const componentPropsReader = AstPropsReader.build('src/DsNumber.tsx');
const componentProps = componentPropsReader.get;
writeFileSync(
  './outputProps.json',
  JSON.stringify(componentProps, null, 2)
);
