import { FC } from 'react';

import styles from './styles.module.scss';
interface ITextButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

export const TextButton: FC<ITextButtonProps> = ({
  title,
  className,
  onClick,
}) => {
  return (
    <div className={styles.textButton} onClick={onClick}>
      {title}
    </div>
  );
};
