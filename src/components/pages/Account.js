import styles from './Account.module.css';
import { Authentication } from '../Context/Authentication';
import { useContext, useState, useEffect, useRef } from 'react';
import PageTitle from '../layout/PageTitle';
import CarouselAccount from '../layout/CarouselAccount';


function Account({setContainer80}) {
    
    const {sessionId, username, favoriteTv, favoriteMovies, ratedMovies, ratedTv, watchlistMovies, watchlistTv} = useContext(Authentication);
    

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
        <div className={styles.accountContainer}>
            <PageTitle titleText={username} />
            <CarouselAccount movieData={favoriteMovies} title='Favorite Movies' type='movies' action='favorite'/>
            <CarouselAccount movieData={favoriteTv} title='Favorite Tv Shows' type='tv' action='favorite'/>
            <CarouselAccount movieData={watchlistMovies} title='Movies Watchlist' type='movies' action='watchlist'/>
            <CarouselAccount movieData={watchlistTv} title='Tv Shows Watchlist' type='tv' action='watchlist'/>
            <CarouselAccount movieData={ratedMovies} title='Rated Movies' type='movies' action='rating'/>
            <CarouselAccount movieData={ratedTv} title='Rated Tv Shows' type='tv' action='rating'/>
        </div>
    )
}

export default Account