import React, { useState, useRef } from 'react';
import styles from './LanguageSelect.module.css';
import { useOutsideClick } from '../../utils/useOutsideClick';

const LANGUAGES = ['English', 'Deutsch', 'Français', 'Español'];

export default function LanguageSelect() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useOutsideClick(wrapperRef, () => setIsOpen(false));

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectLanguage = (lang: string) => {
        setSelectedLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className={styles.languageSelect} ref={wrapperRef}>
            <button type="button" className={styles.selectButton} onClick={toggleDropdown}>
                <img src="/img/flag_en.png" alt={`${selectedLanguage} flag`} className={styles.flagIcon} />
                <span>{selectedLanguage}</span>
                <img src="/img/arrow.png" alt="arrow" className={`${styles.arrowIcon} ${isOpen ? styles.arrowUp : ''}`} />
            </button>

            {isOpen && (
                <ul className={styles.languageList}>
                    {LANGUAGES.map((lang) => (
                        <li
                            key={lang}
                            className={`${styles.languageItem} ${lang === selectedLanguage ? styles.selectedItem : ''}`}
                            onClick={() => handleSelectLanguage(lang)}
                        >
                            {lang}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
