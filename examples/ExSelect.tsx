import React from './node_modules/react';
import './ExSelect.scss';
import { InterfaceExportTest } from './TypesAndInterfaces';

export type ExOption = {
  /** id of an option */
  id: string | number;
  /** text value */
  value: string;
}

type olusia_podpowedz = {
  '4xg17level_[border:3': boolean;
  1: number;
  /** test test description */
  option: ExOption;
};


export interface ExTest extends InterfaceExportTest {

  name: string;
  option: ExOption[];
  variant: 'normal' | 'unknown'
  hint?: olusia_podpowedz[]
};

export interface Props {
  /** Quaity Assurance. Set for unique targeting during testing */
  exQa: string;
  /** The form HTML elment id the ExSelect select element belongs to*/
  exForm?: string;
  /** Label text displayed over the Select */
  exLabel?: string;
  /** Select options array*/
  exOptions: ExOption[];
  /** Default selected option id. Provide as id of option you want to be selected by default */
  exDefaultOptionId?: string | number;
  /** Placeholder. Displayed only if no exDefaultValue provided */
  exPlaceholder?: string;
  /** Event callback on user selecting an option */
  exOnChange?: (selectedOption: ExOption, event: React.FormEvent<HTMLSelectElement>) => void;
  /** Input name */
  exName?: string;
  /** Support for adding Classes to element */
  exClass?: string;
  /** Native properties from HTML5, React etc. are not prefixed */
  disabled?: boolean;
  /** Support for adding ID attribute to element */
  id?: string;
  /** Just a testing */
  exTest: {
    id: number;
    props: olusia_podpowedz[];
  }[];
}

const ExSelect: React.FunctionComponent<Props> = props => {
  return (
    <label>
      <select></select>
    </label>
  );
};

ExSelect.defaultProps = {
  disabled: false,
  exPlaceholder: 'placeholder'
};

export default ExSelect;
