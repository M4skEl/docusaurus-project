import { createGlobalStyle } from 'styled-components';

export const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Museo Sans Cyrillic';
    src: url('/fonts/museo-sans-cyrillic_300.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrillic';
    src: url('/fonts/museo-sans-cyrillic_500.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Museo Sans Cyrillic';
    src: url('/fonts/museo-sans-cyrillic_700.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
