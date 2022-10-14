import styles from './GenreCard.module.css';
import {Link} from 'react-router-dom';


function GenreCard({id, name}) {
    return (
        <div className={styles.cardContainer}>
            <Link to={`/genre/${id}`} >{name}</Link>
        </div>
    )
}

export default GenreCard