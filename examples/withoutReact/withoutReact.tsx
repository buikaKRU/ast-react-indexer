import './ExSelect.scss';

export interface ExOption {
  /** id of an option */
  id: string | number;
  /** text value */
  value: string;
}

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
  exOnChange?: (selectedOption: ExOption, event: any) => void;
  /** Input name */
  exName?: string;
  /** Support for adding Classes to element */
  exClass?: string;
  /** Native properties from HTML5, React etc. are not prefixed */
  disabled?: boolean;
  /** Support for adding ID attribute to element */
  id?: string;
}

const ExSelect = (props: any): void => {
  return null;
};

ExSelect.defaultProps = {
  disabled: false
};

export default ExSelect;
