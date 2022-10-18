import styles from './NoResults.module.css';

function NoResults({search}) {
    return (
        <div className={styles.resultsContainer}>
            <h1>No results for "{search}"</h1>
        </div>
    )
}

export default NoResults