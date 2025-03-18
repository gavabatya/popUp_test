import { FC } from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

interface ITagProps {
  value: string;
  onChange?(): void;
  checked?: boolean;
  disabled?: boolean;
}

export const Tag: FC<ITagProps> = ({
  value,
  onChange,
  checked = false,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange();
    }
  };

  const tagClassName = classnames(styles.tag, {
    [styles.tag__disabled]: disabled,
    [styles.tag__notActive]: !checked,
  });

  return (
    <div className={tagClassName} onClick={handleClick}>
      <span>{value}</span>
    </div>
  );
};
