import AstNameReader from './AstNameReader';
import * as ts from 'typescript';
import  AstReader  from './AstReader';

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
    return AstNameReader.build(this.astReader).check(name)
  }
}
