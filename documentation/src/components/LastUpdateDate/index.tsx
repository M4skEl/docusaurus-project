import React from "react";
import styles from "./LastUpdateDate.module.css";

interface LastUpdateDateProps {
  children: string;
}

const LastUpdateDate: React.FC<LastUpdateDateProps> = ({ children }) => (
    <div className={styles.container}>
        <span className={styles.lastUpdateDate}>
            {children}
        </span>
    </div>
);

export default LastUpdateDate;
