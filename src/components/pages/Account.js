import styles from './Account.module.css';
import { Authentication } from '../Context/Authentication';
import { useContext, useState, useEffect, useRef } from 'react';
import PageTitle from '../layout/PageTitle';
import CarouselAccount from '../layout/CarouselAccount';
import { useNavigate } from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';

function Account({setContainer80}) {
    
    const {setLoggedIn, setSessionId, setUsername, setAccountId, setFavoriteMovies, setFavoriteTv, setRatedMovies, setRatedTv, setWatchlistMovies, setWatchlistTv, setFavoriteMoviesIds, setFavoriteTvIds, setRatedMoviesIds, setRatedTvIds, setWatchlistTvIds, setWatchlistMoviesIds, sessionId, username, favoriteTv, favoriteMovies, ratedMovies, ratedTv, watchlistMovies, watchlistTv} = useContext(Authentication);
    
    const navigate = useNavigate();
    const carouselFavoriteMovies = useRef(null);
    const carouselFavoriteTv = useRef(null);
    const carouselRatedMovies = useRef(null);
    const carouselRatedTv = useRef(null);
    const carouselWatchlistMovies = useRef(null);
    const carouselWatchlistTv = useRef(null);
    
    useEffect(() => {
        setContainer80();
    })

    const handleLogout = () => {
        setLoggedIn(false);
        setSessionId('');
        setUsername('');
        setAccountId('');
        setFavoriteMovies([]);
        setFavoriteMoviesIds([]);
        setFavoriteTv([]);
        setFavoriteTvIds([]);
        setRatedMovies([]);
        setRatedMoviesIds([]);
        setRatedTv([]);
        setRatedTvIds([]);
        setWatchlistMovies([]);
        setWatchlistMoviesIds([]);
        setWatchlistTv([]);
        setWatchlistTvIds([]);
        navigate('/movies-project');
    }

    return (
        <div className={styles.accountContainer}>
            <PageTitle titleText={username} />
            <div className={styles.buttonContainer}>
                <button onClick={handleLogout}>Logout <FaTimes /></button>
            </div>
            <CarouselAccount movieData={favoriteMovies} title='Favorite Movies' type='Movie' action='favorite'/>
            <CarouselAccount movieData={favoriteTv} title='Favorite Tv Shows' type='Tv' action='favorite'/>
            <CarouselAccount movieData={watchlistMovies} title='Movies Watchlist' type='Movie' action='watchlist'/>
            <CarouselAccount movieData={watchlistTv} title='Tv Shows Watchlist' type='Tv' action='watchlist'/>
            <CarouselAccount movieData={ratedMovies} title='Rated Movies' type='Movie' action='rating'/>
            <CarouselAccount movieData={ratedTv} title='Rated Tv Shows' type='Tv' action='rating'/>
        </div>
    )
}

export default Account