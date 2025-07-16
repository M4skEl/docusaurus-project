import React, { useRef, useState } from 'react';
import { useOutsideClick } from '../../utils/useOutsideClick';
import styles from './VersionSelect.module.css';

interface SelectProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setOpen(false));

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block'}}>
      {/* Кнопка выбора */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={styles.selectContainer}
       
      >
        <span className={styles.selectedText}>{selected}</span>
        <img
          src="/img/arrow.png"
          alt="arrow"
          style={{
            width: 20,
            height: 20,
            transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
            display: 'block',
          }}
        />
      </div>
      {/* Выпадающий блок с вариантами */}
      {open && (
        <div
          className={styles.dropdown}
          
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`${styles.dropdownItem} ${option === selected ? styles.selected : ''}`}
              
              onMouseDown={e => e.preventDefault()} // чтобы не терять фокус
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
