import styles from './PageTitle.module.css';

function PageTitle({titleText}) {
    return (
        <div className={styles.heroImage}>
            <div className={styles.heroText}>
            <h1>{titleText}</h1>
            </div>
        </div>
    )
}

export default PageTitle