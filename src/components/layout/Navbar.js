import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaBars, FaFilm, FaUserCircle } from 'react-icons/fa';
import { useState, useEffect, useRef, useContext } from 'react';
import DropdownGenres from './DropdownGenres';
import { Authentication } from '../Context/Authentication';


function Navbar() {
    
    const [genres, setGenres] = useState([]);
    const [navListActive, setNavListActive] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const buttonRef = useRef(null);
    const searchRef = useRef(null);
    const {loggedIn, setLoggedIn, sessionId, setSessionId} = useContext(Authentication);

    const handleClick = () => {
        setNavListActive(!navListActive);
    }

    const setShowTrue = () => {
        setShowGenres(true);
    }

    const setShowFalse = () => {
        setShowGenres(false);
    }

    const onClickOutside = () => {
        setNavListActive(false);
    }

    const onSearchClick = () => {
        setNavListActive(false);
    }

    const onNavLinkClick = () => {
        setNavListActive(false);
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
                    <Link  to='/movies-project'>
                        <FaFilm />
                        <p>The Movies Hub</p>
                    </Link>
                </div>
                <div className={styles.linksContainer}>
                    {loggedIn && <div className={styles.userCircleMobileContainer}>
                        <Link className={styles.userCircleMobile}><FaUserCircle /></Link>
                    </div>}
                    <button ref={buttonRef} className={styles.menu} onClick={handleClick}><FaBars /></button>
                    <ul className={navListActive ? `${styles.navList} ${styles.navListActive}` : styles.navList }>
                        <li className={styles.navItem}>
                            <Link onClick={onNavLinkClick} to='/movies-project' className={styles.navLink}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link onClick={onNavLinkClick} to='/trending' className={styles.navLink}>Trending</Link>
                        </li>
                        <li  onMouseOver={setShowTrue} onMouseOut={setShowFalse} className={styles.navItem}>
                            <Link onClick={onNavLinkClick} to='/genres' className={styles.navLink}>Genres</Link>
                            <DropdownGenres genres={genres} customClass={showGenres ? 'show' : ''} onClickOutside={onClickOutside} buttonRef={buttonRef} searchRef={searchRef}/>
                        </li>
                        <li className={styles.navItem}>
                            {!loggedIn ? <Link onClick={onNavLinkClick} to='/sign-up' className={styles.navLink}>Sign Up</Link> : <Link className={styles.userCircleDesktop}><FaUserCircle /></Link>}
                        </li>
                        <SearchBar handleClick={onSearchClick} refe={searchRef}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar