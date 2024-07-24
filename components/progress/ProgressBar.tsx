import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${(currentStep - 1) * 33.33}%` }}
        />
      </div>
      <div className={styles.steps}>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`${styles.step} ${currentStep >= step ? styles.completed : ''}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
