import React, { useState } from 'react';
import './DsNumber.scss';

interface Props {
  /** Quaity Assurance. Set for unique targeting during testing */
  dsQa: string;
  /** Label text displayed over the input */
  dsLabel?: string;
  /** State of the input. Can be changed internally and externally */
  dsValue?: number;
  /** Minium value allowed */
  dsMin?: number;
  /** Maximum value allowed */
  dsMax?: number;
  /** Input placeholder  */
  dsPlaceholder?: string;
  /** Legal number interval */
  dsStep?: number;
  /** On Change event method. Occurs when the state of the switch has been changed */
  dsOnChange?: (value: number) => void;
  /** Input name */
  dsName?: string;
  /** Support for adding Classes to element */
  dsClass?: string;
  /** Native HTML5 disabled property */
  disabled?: boolean;
  /** Support for adding ID attribute to element */
  id?: string;
  /** this is just for testing */
  dsVariant: 'standard' | 'secondary' | 'primary';
}

const DsNumber: React.FunctionComponent<Props> = props => {
  const {
    dsQa,
    dsLabel,
    dsValue,
    dsMin,
    dsMax,
    dsStep,
    dsPlaceholder,
    dsOnChange,
    dsName,
    disabled,
    dsClass,
    id
  } = props;

  const [value, setValue] = useState<number | undefined>(dsValue);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = parseFloat(event.currentTarget.value);
    setValue(value);
    dsOnChange && dsOnChange(value);
  };

  const labelContent = dsLabel ? (
    <strong className={`ds-Number_Label`}>{dsLabel}</strong>
  ) : null;

  return (
    <label
      id={id ? id : undefined}
      className={[
        'ds-Number',
        disabled ? 'ds-Number-disabled' : '',
        dsClass ? dsClass : ''
      ].join(' ')}
    >
      {labelContent}
      <input
        className="ds-Number_Input"
        data-qa={dsQa}
        disabled={disabled}
        type="number"
        name={dsName ? dsName : undefined}
        step={dsStep}
        value={dsValue ? value : undefined}
        min={dsMin}
        max={dsMax}
        placeholder={dsPlaceholder ? dsPlaceholder : undefined}
        onChange={handleChange}
      />
    </label>
  );
};

DsNumber.defaultProps = {
  dsStep: 1,
  dsMin: 0,
  dsMax: 10,
  disabled: false,
  dsVariant: 'standard'
};

export default DsNumber;
