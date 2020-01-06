import { simpleTransformer } from './simpleTransformer';
import { reprintSections } from './reprintSections';
import { AstClassReader } from './astReader/AstClassReader';
import AstPropsReader from './astReader/AstPropsReader';

// simpleTransformer();
// reprintSections('typescriptFile.ts', ['testingInterface'])

const classNameReader = AstClassReader.build('ReactFile.tsx');
console.log(classNameReader.get);
console.log(classNameReader.check('TestClass'));

const componentPropsReader = AstPropsReader.build('ReactFile.tsx');
console.log(componentPropsReader.get);
