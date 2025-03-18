import React, { ButtonHTMLAttributes, FC } from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  size?: 'xs' | 's' | 'm' | 'l';
  className?: string;
  withBorder?: boolean;
};

export const Button: FC<TButtonProps> = ({
  title,
  size = 'm',
  disabled,
  withBorder,
  className,
  ...otherProps
}) => {
  const buttonClassName = classnames(className, styles.button, {
    [styles.button__small]: size === 's',
    [styles.button__extraSmall]: size === 'xs',
    [styles.button__large]: size === 'l',
    [styles.button__disabled]: disabled,
    [styles.button__withBorder]: withBorder,
  });

  return (
    <button className={buttonClassName} {...otherProps}>
      {title}
    </button>
  );
};
