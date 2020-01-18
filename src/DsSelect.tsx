import React from 'react';
import './DsSelect.scss';

export interface DsOption {
  /** id of an optio */
  id: string | number;
  /** text value */
  value: string;
}

export interface Props {
  /** Quaity Assurance. Set for unique targeting during testing */
  dsQa: string;
  /** The form HTML elment id the DsSelect select element belongs to*/
  dsForm?: string;
  /** Label text displayed over the Select */
  dsLabel?: string;
  /** Select options array*/
  dsOptions: DsOption[];
  /** Default selected option id. Provide as id of option you want to be selected by default */
  dsDefaultOptionId?: string | number;
  /** Placeholder. Displayed only if no dsDefaultValue provided */
  dsPlaceholder?: string;
  /** Event callback on user selecting an option */
  dsOnChange?: (
    selectedOption: DsOption,
    event: React.FormEvent<HTMLSelectElement>
  ) => void;
  /** Input name */
  dsName?: string;
  /** Support for adding Classes to element */
  dsClass?: string;
  /** Native properties from HTML5, React etc. are not prefixed */
  disabled?: boolean;
  /** Support for adding ID attribute to element */
  id?: string;
}

const DsSelect: React.FunctionComponent<Props> = props => {
  const {
    dsQa,
    dsForm,
    dsLabel,
    dsDefaultOptionId,
    dsOptions,
    dsPlaceholder,
    dsOnChange,
    disabled,
    dsName,
    dsClass,
    id
  } = props;

  const labelContent = dsLabel ? (
    <strong className="ds-Select_Label">{dsLabel}</strong>
  ) : null;

  const optionsContent = dsOptions.map(option => (
    <option value={option.id} key={option.id}>
      {option.value}
    </option>
  ));

  const placeholder = dsPlaceholder ? (
    <option disabled={true}>{dsPlaceholder}</option>
  ) : null;

  const defaultValue = (): string | number | undefined => {
    if (dsDefaultOptionId) {
      const defaultOption = dsOptions.find(el => el.id == dsDefaultOptionId);
      if (defaultOption) {
        return defaultOption.id;
      }
    }
    return dsPlaceholder ? dsPlaceholder : undefined;
  };

  // This function gets called every time user selects an option
  const handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    const selectedId = event.currentTarget.value;
    dsOnChange &&
      dsOnChange(dsOptions.find(el => el.id == selectedId) as DsOption, event);
  };

  return (
    <label
      id={id ? id : undefined}
      className={[
        'ds-Select',
        disabled ? 'ds-Select-disabled' : '',
        dsClass ? dsClass : ''
      ].join(' ')}
    >
      {labelContent}
      <select
        name={dsName}
        data-qa={dsQa}
        form={dsForm}
        disabled={disabled}
        defaultValue={defaultValue()}
        onChange={handleChange}
      >
        {placeholder}
        {optionsContent}
      </select>
    </label>
  );
};

DsSelect.defaultProps = {
  disabled: false
};

export default DsSelect;
