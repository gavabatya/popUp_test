import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ChangeEvent,
  useState,
} from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

export type IInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  value?: string;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  label: string;
};

export const Input: FC<IInputProps> = ({
  value = '',
  disabled,
  onChange,
  error,
  errorMessage,
  label,
  ...otherProps
}) => {
  const [inputError, setInputError] = useState(false);

  const validateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputError(false);
      onChange?.(e);
    } else {
      setInputError(true);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div
        className={classnames(styles.inputBox, {
          [styles.inputBox__error]: error || inputError,
          [styles.inputBox__disabled]: disabled,
        })}
      >
        <input
          className={classnames(styles.input)}
          onChange={validateInput}
          value={value}
          type="text"
          placeholder="1000"
          disabled={disabled}
          {...otherProps}
        />
      </div>
      {(errorMessage || inputError) && (
        <span className={styles.errorMessage}>
          {inputError ? 'Поле обязательно для заполнения' : errorMessage}
        </span>
      )}
    </div>
  );
};
