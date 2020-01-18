import { Props } from './../DsSelect';
import AstInterfaceReader, { DsInterface, DsInterfaceProperty } from './AstInterfaceReader';
import AstNameReader from './AstNameReader';
import * as ts from 'typescript';
import AstReader from './AstReader';

// export interface  {

// }
export default class AstReactReader {
  constructor(protected file: string) {
    this.astReader = new AstReader(file);
  }

  static build(file: string): AstReactReader {
    return new AstReactReader(file);
  }

  private astReader: AstReader;

  /** Returns name of found exported React.FunctionComponent */
  public get name() {
    return AstNameReader.build(this.astReader).get;
  }

  /** Checks if there is a given name React.FunctionComponent exported*/
  public nameCheck = (name: string) => {
    return AstNameReader.build(this.astReader).check(name);
  };

  public get interface(): {
    props: DsInterfaceProperty[];
    interfaces: DsInterface[];
  } {
    const componentInterface = AstInterfaceReader.build(this.astReader).get;
    const componentProps: DsInterfaceProperty[] = []
    const propsInterfaceArr = componentInterface.filter(el => el.name === 'Props')
    propsInterfaceArr.length > 0 && propsInterfaceArr[0].properties.forEach(p => componentProps.push(p))
    
    return {
      props: componentProps,
      interfaces: componentInterface.filter(el => el.name !== 'Props')
    }
  }
}
