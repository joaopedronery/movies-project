import styles from './DropdownGenres.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function DropdownGenres({genres, customClass, onClickOutside, buttonRef}) {
    const ref = useRef(null);
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [onClickOutside])
    
    return (
        <div ref={ref} className={`${styles.divGenres} ${styles[customClass]}`}>
            {genres.map((genre) => (
                <Link className={styles.genre} key={genre.id} to={`genre/${genre.id}`}>{genre.name}</Link>
            ))}
        </div>
    )
}

export default DropdownGenres