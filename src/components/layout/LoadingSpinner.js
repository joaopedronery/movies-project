import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.loadingSpinner}>
        </div>
      </div>
    );
}

export default LoadingSpinner