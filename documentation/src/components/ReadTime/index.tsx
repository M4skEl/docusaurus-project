import React from 'react';
import styles from './ReadTime.module.css';
import TimerIcon from '@site/static/img/icons/Timer.svg';

interface ReadTimeProps {
  readTime: number;
}

const ReadTime: React.FC<ReadTimeProps> = ({ readTime }) => {
  return (
    <div className={styles.readTime}>
      <div className={styles.clockIcon}>
        <TimerIcon />
      </div>
      <span className={styles.timeText}>
        {readTime} min
      </span>
    </div>
  );
};

export default ReadTime;
