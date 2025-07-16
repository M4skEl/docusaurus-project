import React from 'react';
import type { ReactNode } from 'react';
import styles from './TextHilighter.module.css';

interface TextHilighterProps {
  children: ReactNode;
  className?: string;
}

export default function TextHilighter({ children, className }: TextHilighterProps): ReactNode {
  return (
    <span className={`${styles.textHilighter} ${className || ''}`}>
      {children}
    </span>
  );
}
