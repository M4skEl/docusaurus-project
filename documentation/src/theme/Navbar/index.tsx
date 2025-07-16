import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import styles from './navbar.module.css';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useHistory} from '@docusaurus/router';
// Импортируем кастомный Select
import { Select } from '../../components/VersionSelect';
import { createRoot } from 'react-dom/client';
// Импортируем компонент SearchInput
import SearchInput from '../../components/SearchInput';
// Импортируем компонент LanguageSelect
import LanguageSelect from '../../components/LanguageSelect';

// Иконка закрытия (крестик)
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): React.ReactElement {
  const location = useLocation();
  const history = useHistory();
  const isHomePage = location.pathname === '/';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
    const button = document.querySelector('button[aria-label="Toggle navigation bar"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
  }, []);

  const themeBtnClick = React.useCallback(() => {
    const button = document.querySelector('button[aria-label^="Switch between dark and light mode"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
  }, []);

  // Обработчик смены версии для кастомного Select
  const handleVersionChange = React.useCallback((selectedVersion: string) => {
    if (selectedVersion === '7.0') {
      history.push('/');
    } else if (selectedVersion === '6.0') {
      history.push('/6.0/');
    }
  }, [history]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleMobileSearchOpen = () => {
    setIsMobileSearchOpen(true);
  };

  const handleMobileSearchClose = () => {
    setIsMobileSearchOpen(false);
    setSearchValue('');
  };

  useEffect(() => {
    function addCustomElements() {
      const navbarMenu = document.querySelector('div.navbar-sidebar__brand');
      if (navbarMenu) {
        // Проверяем, существует ли уже селект
        const existingSelect = navbarMenu.querySelector('.navbar-menu-version-select-react');
        const existingCloseButton = navbarMenu.querySelector('.navbar-menu-close-btn');
        
        if (!existingSelect) {
          const selectReactContainer = document.createElement('div');
          selectReactContainer.className = 'navbar-menu-version-select-react';
          selectReactContainer.style.cssText = `margin: 0; display: inline-block;`;
          navbarMenu.prepend(selectReactContainer);
          // Используем современный способ рендера для React 18+
          const root = createRoot(selectReactContainer);
          root.render(
            <Select
              options={['7.0', '6.0']}
              value={window.location.pathname.startsWith('/6.0') ? '6.0' : '7.0'}
              onChange={handleVersionChange}
            />
          );
        }
        
        if (!existingCloseButton) {
          const closeNavbarMenuButton = document.createElement('button');
          closeNavbarMenuButton.className = 'navbar-menu-close-btn';
          const closeIconImg = document.createElement('img');
          closeIconImg.src = '/img/icons/burger.svg';
          closeIconImg.alt = 'close';
          closeNavbarMenuButton.appendChild(closeIconImg);
          closeNavbarMenuButton.addEventListener('click', () => {
            toggleSidebar();
          });
          navbarMenu.prepend(closeNavbarMenuButton);
        }
      }

      // Добавление кнопки темы в панель сайдбара
      const sidebarPanel = document.querySelector('.theme-layout-navbar-sidebar-panel.navbar-sidebar__item.menu:not([inert])') as HTMLElement;
      if (sidebarPanel) {
        if (getComputedStyle(sidebarPanel).position === 'static') {
          sidebarPanel.style.position = 'relative';
        }

        const existingBtn = sidebarPanel.querySelector('.sidebar-theme-button');
        if (!existingBtn) {
          const themeButton = document.createElement('button');
          themeButton.onclick = themeBtnClick;
          themeButton.className = 'sidebar-theme-button';
          themeButton.style.cssText = `
                position: absolute;
                bottom: 30px;
                right: 30px;
                width: 18px;
                height: 18px;
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
            `;

          const themeIcon = document.createElement('img');
          themeIcon.src = '/img/icons/sun.svg';
          themeIcon.alt = 'Change theme';
          themeIcon.style.width = '100%';
          themeIcon.style.height = '100%';

          themeButton.appendChild(themeIcon);
          sidebarPanel.appendChild(themeButton);
        }

        // Добавление компонента LanguageSelect в панель сайдбара
        const existingLanguageSelect = sidebarPanel.querySelector('.sidebar-language-select-react');
        if (!existingLanguageSelect) {
          const languageSelectContainer = document.createElement('div');
          languageSelectContainer.className = 'sidebar-language-select-react';
          languageSelectContainer.style.cssText = `
                position: absolute;
                bottom: 30px;
                left: 30px;
                z-index: 1000;
            `;
          sidebarPanel.appendChild(languageSelectContainer);
          
          // Используем современный способ рендера для React 18+
          const languageRoot = createRoot(languageSelectContainer);
          languageRoot.render(<LanguageSelect />);
        }
      }
    }

    // Сначала пробуем добавить сразу
    addCustomElements();
    
    // Используем MutationObserver для отслеживания динамически создаваемых элементов
    const observer = new MutationObserver(addCustomElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['inert'],
    });

    return () => {
      observer.disconnect();
    };
  }, [toggleSidebar, handleVersionChange, themeBtnClick]);

  return (
    <div className={styles.navbarWrapper}>
      <Navbar {...props} />
      <div className={styles.navbarContent}>
        <div className={styles.leftContainer}>
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <img 
          src="/img/icons/burger.svg" 
          alt="open menu" 
          style={{ width: '15px', height: '15px' }}
        />
      </button>
        <Link to="/" className={styles.logoLink}>
          <img 
            src="/img/PassworkLogo2.svg" 
            alt="Passwork Logo" 
            className={styles.logo}
          />
          <img 
            src="/img/PassworkLogoDark.svg" 
            alt="Passwork Logo" 
            className={styles.logoDark}
          />
        </Link>
        </div>
        <div className={styles.searchContainer}>
        <SearchInput 
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        </div>
        <div className={styles.rightContainer}>
          {/* Кастомный Select для выбора версии */}
          <Select 
            options={['7.0', '6.0']} 
            value={location.pathname.startsWith('/6.0') ? '6.0' : '7.0'}
            onChange={handleVersionChange}
          />
          <button className={styles.themeBtn} onClick={themeBtnClick} >
            <img src="/img/icons/sun.svg" alt="Theme" style={{ width: '18.75px', height: '18.75px' }} />
          </button>
          <img src="/img/flags/flag-UK.webp" alt="EN" className={styles.flag} />
        </div>
        <div className={styles.mobileSearchContainer}>
          {!isMobileSearchOpen ? (
            <button className={styles.mobileSearchButton} onClick={handleMobileSearchOpen} >
              <img 
                src="/img/icons/search.svg" 
                alt="Поиск" 
                style={{ width: '15px', height: '15px' }}
              />
            </button>
          ) : (
            <div className={styles.mobileSearchInputContainer}>
              <SearchInput 
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search"
              />
              <button className={styles.mobileSearchCloseButton} onClick={handleMobileSearchClose} >
                <img 
                  src="/img/icons/cross.svg" 
                  alt="Close" 
                  style={{ width: '15px', height: '15px' }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
