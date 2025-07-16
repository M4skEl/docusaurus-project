import React from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  width?: string | number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ width = '100%', value, onChange, placeholder = 'Search' }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <img src={'/img/icons/search.svg'} alt="search" width={15} height={15} />
      </span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
