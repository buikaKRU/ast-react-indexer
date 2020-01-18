import AstReactReader from './AstReactReader/AstReactReader';
import { writeFileSync } from 'fs';

const astReact = AstReactReader.build('src/DsNumber.tsx');
const name = astReact.name || 'default'
console.log(astReact.nameCheck('DsSelect'), name);
const interfaces = astReact.interface;

writeFileSync(
  `./${name}.json`,
  JSON.stringify(interfaces, (k, v) => (v === undefined ? 'undefined' : v), 2)
);
