import React, { FC, PropsWithChildren, MouseEvent } from 'react';

import styles from './styles.module.scss';

export interface IPopUPProps {
  isOpen: boolean;
  onClose(): void;
}

export const PopUp: FC<PropsWithChildren<IPopUPProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  const handleClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.popUp} onMouseDown={handleClose}>
      <div className={styles.popUp__content}>{children}</div>
    </div>
  );
};
