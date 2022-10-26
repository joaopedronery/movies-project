import styles from './LoadingSpinner.module.css';

function LoadingSpinner({customClass}) {
    return (
      <div className={`${styles.spinnerContainer} ${styles[customClass]}`}>
        <div className={styles.loadingSpinner}>
        </div>
      </div>
    );
}

export default LoadingSpinner