import styles from './SelectTrending.module.css';

function SelectTrending({ timeWindow, mediaType, mediaChange, timeChange }) {
    
    const switchMediaType = (media) => {
        switch(media) {
            case 'all':
                return 'All';
            case 'movie':
                return 'Movies';
            case 'tv':
                return 'Tv Shows';
            case 'person':
                return 'Person';
            default:
                return 'None';
        }
    }
    
    return (
        <div>
            <div className={styles.trendingInfoShow}>
                <h2><span>Media Type:</span> {switchMediaType(mediaType)}</h2>
                <h2><span>Time Window:</span> {timeWindow === 'day' ? 'Day' : 'Week'}</h2>
            </div>
            <div className={styles.trendingInfoSelect}>
                <form>
                    <label>Media Type:</label>
                    <select defaultValue='movie' name='media_type' onChange={mediaChange} >
                        <option value='all'>All</option>
                        <option value='movie'>Movie</option>
                        <option value='tv'>Tv Shows</option>
                        <option value='person'>Person</option>
                    </select>
                    <label>Time Window:</label>
                    <select defaultValue='week' name='time_window' onChange={timeChange}>
                        <option value='day'>Day</option>
                        <option value='week'>Week</option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default SelectTrending