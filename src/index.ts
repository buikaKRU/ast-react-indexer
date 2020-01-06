import { simpleTransformer } from './simpleTransformer';
import { reprintSections } from './reprintSections';
import { AstClassReader } from './astReader/AstClassReader';

// simpleTransformer();
// reprintSections('typescriptFile.ts', ['testingInterface'])

const classNameReader = new AstClassReader('simpleTsFile.ts');
console.log(classNameReader.check('TestClass2'));
