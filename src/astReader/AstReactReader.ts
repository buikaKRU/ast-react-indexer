
import AstInterfaceReader, { DsInterface, DsInterfaceProperty } from './AstInterfaceReader';
import AstNameReader from './AstNameReader';
import * as ts from 'typescript';
import AstReader from './AstReader';
import AstPropsReader from './AstPropsReader';

/** React Typescript Functional Components AST reader */
export default class AstReactReader {
  constructor(protected file: string) {
    this.astReader = new AstReader(file);
  }

  static build(file: string): AstReactReader {
    return new AstReactReader(file);
  }

  private astReader: AstReader;

  /** Returns name of found exported React.FunctionComponent type function*/
  public get name() {
    return AstNameReader.build(this.astReader).get;
  }

  /** Checks if there is a given name React.FunctionComponent type function exported*/
  public nameCheck = (name: string) => {
    return AstNameReader.build(this.astReader).check(name);
  };

  /** Returns React Functional Component Interface as an object of props and interfaces found  */
  public get interface(): {
    props: DsInterfaceProperty[];
    interfaces: DsInterface[];
  } {
    const allInterfaces = AstInterfaceReader.build(this.astReader).get;

    return {
      props: AstPropsReader.build(this.astReader).props(allInterfaces),
      interfaces: allInterfaces.filter(el => el.name !== 'Props')
    }
  }
}
