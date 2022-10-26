import styles from './MovieCard.module.css';

function MovieCard({ title, og_title, overview, type, vote_avg, vote_count, poster, release_date, first_air_date }) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.posterContainer}>
                <img src={poster}/>
            </div>
            <div className={styles.dataContainer}>
                <p><span>Title:</span> {title}</p>
                <p><span>Original title:</span> {og_title}</p>
                <p><span>Overview:</span> {overview}</p>
                <p><span>Type:</span> {type}</p>
                <p><span>Vote average:</span> {vote_avg}</p>
                <p><span>Vote count:</span> {vote_count}</p>
                <p><span>{release_date ? 'Release date:' : 'First air date:'}</span> {release_date ? release_date : first_air_date}</p>
            </div>
            <div>
                
            </div>
        </ div>
    )
}

export default MovieCard