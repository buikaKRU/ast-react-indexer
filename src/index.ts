import AstReactReader from './AstReactIndexer/AstReactIndexer';
import { writeFileSync } from 'fs';


const astReact = AstReactReader.build('examples/ExSelect.tsx');
const name = astReact.name || 'default'
const interfaces = astReact.interface;

writeFileSync(
  `./examples/${name}.json`,
  JSON.stringify(interfaces, (k, v) => (v === undefined ? 'undefined' : v), 2)
);
