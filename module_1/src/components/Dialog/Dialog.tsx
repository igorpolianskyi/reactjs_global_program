import React from 'react';
import { FocusTrap } from 'focus-trap-react';
import { Portal } from 'react-portal';
import styles from './Dialog.module.css';

interface DialogProps {
  title: string | JSX.Element;
  children: React.ReactNode;
  onClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({ title, children, onClose }) => {
  return (
    <Portal node={document.getElementById("portal-root")!}>
      <FocusTrap>
        <div className={styles.backdrop}>
          <div className={styles.dialog}>
            <button className={styles.close} onClick={onClose}>
                ✕
            </button>
            <h2 className={styles.title}>{title}</h2>
            <div>{children}</div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
} 