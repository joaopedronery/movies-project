import styles from './PageTitle.module.css';

function PageTitle({titleText, customClass}) {
    return (
        <div className={styles.heroImage}>
            <div className={`${styles.heroText} ${styles[customClass]}`}>
            <h1>{titleText}</h1>
            </div>
        </div>
    )
}

export default PageTitle