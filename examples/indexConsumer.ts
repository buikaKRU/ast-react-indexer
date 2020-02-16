
import { DS } from './index';

let a: DS.ExSelect.olusia_podpowedz;
let b: DS.ExSelect.ExTest = {
  id: 0,
  name: 'testName',
  option: [{ id: '', value: '' }],
  variant: 'normal',
  onClick: value => {
    return { name: '', id: 3, value: value.toString() };
  }
};
let c: DS.ExSelect.ExOption;
let d: DS.ExSelect.ExOptionInterface;
let p: DS.ExSelect.Props;
