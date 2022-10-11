import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import DropdownGenres from './DropdownGenres';

function Navbar() {
    
    const [genres, setGenres] = useState([]);
    const [navListActive, setNavListActive] = useState(false);
    const [showGenres, setShowGenres] = useState(false);


    const handleClick = () => {
        setNavListActive(!navListActive);
    }

    const setShowTrue = () => {
        setShowGenres(true);
    }

    const setShowFalse = () => {
        setShowGenres(false);
    }


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => setGenres(data.genres))
        .catch((err) => console.log(err))
    },[])


    return(
        <div className={styles.navbarContainer}>
            <div className={styles.navbar}>
                <div className={styles.logoContainer}>
                    Logo
                </div>
                <div>
                    <button className={styles.menu} onClick={handleClick}><FaBars /></button>
                    <ul className={navListActive ? `${styles.navList} ${styles.navListActive}` : styles.navList }>
                        <li className={styles.navItem}>
                            <Link to='/' className={styles.navLink}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/trending' className={styles.navLink}>Trending</Link>
                        </li>
                        <li onMouseOver={setShowTrue} onMouseOut={setShowFalse} className={styles.navItem}>
                            <Link to='/genres' className={styles.navLink}>Genres</Link>
                            <DropdownGenres  genres={genres} customClass={showGenres ? 'show' : ''} />
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/sign-up' className={styles.navLink}>Sign Up</Link>
                        </li>
                        <SearchBar />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar