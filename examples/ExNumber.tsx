import React, { useState } from 'react';
import { TypeExportTest, InterfaceExportTest } from './TypesAndInterfaces';

interface testInterface {
  name: string;
  doc: string;
  type: string;
  optional: TypeExportTest[];
  defaultValue: string;
}

export interface Props {
  /** Quaity Assurance. Set for unique targeting during testing */
  exQa: string;
  /** Label text displayed over the input */
  exLabel?: string;
  /** State of the input. Can be changed internally and externally */
  exValue?: number;
  /** Minium value allowed */
  exMin?: number;
  /** Maximum value allowed */
  exMax?: number;
  /** Input placeholder  */
  exPlaceholder?: string;
  /** Legal number interval */
  exStep?: number;
  /** On Change event method. Occurs when the state of the switch has been changed */
  exOnChange?: (value: number) => void;
  /** Input name */
  exName?: string;
  /** Support for adding Classes to element */
  exClass?: string;
  /** Native HTML5 disabled property */
  disabled?: boolean;
  /** Support for adding ID attribute to element */
  id?: string;
  /** this is just for testing */
  exVariant: 'standard' | 'secondary' | 'primary';
  /** for testing */
  exInterface: (
    testInterface: InterfaceExportTest
  ) => {
    name: string;
    doc: string;
    type: string;
    optional: boolean;
    value: testInterface[];
  };
}

const ExNumber: React.FunctionComponent<Props> = props => {
 
  return (
    <label>
      <input/>
    </label>
  );
};

ExNumber.defaultProps = {
  exStep: 1,
  exMin: 0,
  exMax: 10,
  disabled: false,
  exVariant: 'standard',
  exQa: 'ExNumber'
};

export default ExNumber;
