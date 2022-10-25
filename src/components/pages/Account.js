import styles from './Account.module.css';
import { Authentication } from '../Context/Authentication';
import { useContext, useState, useEffect, useRef } from 'react';
import PageTitle from '../layout/PageTitle';

function Account({setContainer80}) {
    
    const {sessionId, username} = useContext(Authentication);
    

    const carouselFavoriteMovies = useRef(null);
    const carouselFavoriteTv = useRef(null);
    const carouselRatedMovies = useRef(null);
    const carouselRatedTv = useRef(null);
    const carouselWatchlistMovies = useRef(null);
    const carouselWatchlistTv = useRef(null);
    
    useEffect(() => {
        setContainer80();
    })

    return (
        <div>
            <PageTitle titleText={username} />
            <div className={styles.carousel}>
                
            </div>
            <div>

            </div>
        </div>
    )
}

export default Account