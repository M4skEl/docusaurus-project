import React, {type ReactNode} from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import styles from './Footer.module.css';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  return (
    <>
      <div className={styles.hideOriginalFooter}>
        <Footer {...props} />
      </div>
      
      <footer className={styles.customFooter}>
        <div className={styles.footerContent}>
        <div className={styles.textContainer}>
          <span className={styles.footerTitle}>
            © 2014–2025 Passwork Europe SL, Barcelona, Spain
            </span>

        </div>
        <div className={styles.socialsContainer}>
          
          <a href='https://linkedin.com/company/passworkpro/' target='_blank' rel='noopener noreferrer nofollow'>
          <img src='/img/socials/linkedin.svg' alt='linkedin' className={styles.socialIcon} />
          </a>

          <a href='http://facebook.com/passwork.pro' target='_blank' rel='noopener noreferrer nofollow'>
            <img src='/img/socials/facebook.svg' alt='facebook' className={styles.socialIcon} />
          </a>

          <a href='http://x.com/passwork_pro' target='_blank' rel='noopener noreferrer nofollow'>
            <img src='/img/socials/x.svg' alt='x' className={styles.socialIcon} />
          </a>
          <a href='https://t.me/passwork_pro' target='_blank' rel='noopener noreferrer nofollow'>
            <img src='/img/socials/telegram.svg' alt='telegram' className={styles.socialIcon} />
          </a>
            
        </div>
        </div>
      </footer>
    </>
  );
}
