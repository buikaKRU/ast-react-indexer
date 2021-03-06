import AstInterfaceReader, { DsInterface, DsInterfaceProperty } from './modules/AstInterfaceReader';
import AstNameReader from './modules/AstNameReader';
import AstReader from './modules/AstReader';
import AstPropsReader from './modules/AstPropsReader';

/** React Typescript Functional Components AST indexer for interfaces, types aliases and props */
export default class AstReactIndexer {
  constructor(protected file: string) {
    this.astReader = new AstReader(file);
  }

  /**  Builds the AST React Indexer
   * @param file - path to processed file
   */
  static build(file: string): AstReactIndexer {
    return new AstReactIndexer(file);
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

  /** Indexes and returns React Functional Component props, interfaces and types aliases  */
  public get interface(): {
    props: DsInterfaceProperty[];
    interfaces: DsInterface[];
    types: DsInterface[];
  } {
    const interfaceReader = AstInterfaceReader.build(this.astReader);
    const allInterfaces = interfaceReader.getInterfaces;
    const typesAliases = interfaceReader.typesAliases;
    return {
      props: AstPropsReader.build(this.astReader).props(allInterfaces),
      interfaces: allInterfaces.filter(el => el.name !== 'Props'),
      types: typesAliases
    };
  }
}
