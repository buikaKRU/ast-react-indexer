import { AstReader } from './AstReader';

export type DsComponentProp = {
  name: string;
  doc: string;
  type: string;
  optional: boolean;
  defaultValue: undefined;
};
// interface DsComponentProps
export default class AstPropsReader extends AstReader {
  public find = (): DsComponentProp[] => {
    const foundComponentProps: DsComponentProp[] = [];

    return foundComponentProps;
  };
}
