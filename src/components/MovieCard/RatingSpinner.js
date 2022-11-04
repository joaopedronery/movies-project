import styles from './RatingSpinner.module.css';

function RatingSpinner() {
    return (
        <div className={styles.ratingSpinnerContainer}>
        <div className={styles.ratingLoadingSpinner}>
        </div>
      </div>
    )
}

export default RatingSpinner