import styles from './DropdownGenres.module.css';
import { Link } from 'react-router-dom';

function DropdownGenres({genres, customClass}) {
    const handleClick = () => {
        console.log(genres)
    }
    
    return (
        <div className={`${styles.divGenres} ${styles[customClass]}`}>
            {genres.map((genre) => (
                <Link className={styles.genre} key={genre.id} to={`genre/${genre.id}`}>{genre.name}</Link>
            ))}
        </div>
    )
}

export default DropdownGenres