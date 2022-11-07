import styles from './MovieCard.module.css';
import { FaPlusSquare, FaMinusSquare, FaLink, FaUnlink, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../Context/Authentication';
import SetRating from '../MovieCard/SetRating';
import SetFavorite from '../MovieCard/SetFavorite';


function MovieCard({fullObject, id, title, og_title, overview, type, vote_avg, vote_count, poster, release_date, first_air_date }) {
    
    const {loggedIn, accountId, sessionId, setRefreshFM, refreshFM, refreshFTV, setRefreshFTV, refreshRM, setRefreshRM, refreshRTV, setRefreshRTV, refreshWTV, setRefreshWTV, refreshWM, setRefreshWM, favoriteMoviesIds, favoriteTvIds, ratedMoviesIds, ratedTvIds, watchlistTvIds, watchlistMoviesIds, ratedMovies, ratedTv, refreshRating, setRefreshRating} = useContext(Authentication);
    
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchlist, setIsWatchlist] = useState(false);
    const [rating, setRating] = useState();
    const [isRated, setIsRated] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [serverRating, setServerRating] = useState();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Favorites --------------------------------------------------------------------------------------------------------
    useEffect(() => {
        checkFavorite();
    }, [favoriteMoviesIds, favoriteTvIds]);
    
    const typeFilter = (type) => {
        if (type === 'Movie') {
            return 'movie'
        } else {
            return 'tv'
        }
    }

    const favoriteBodyAdd = {
        media_type: typeFilter(type),
        media_id: parseInt(id),
        favorite: true
    }

    const favoriteBodyRemove = {
        media_type: typeFilter(type),
        media_id: parseInt(id),
        favorite: false
    }

    const favoriteAddOrRemove = () => {
        if (isFavorite) {
            return favoriteBodyRemove
        } else {
            return favoriteBodyAdd
        }
    }

    
    
    const handleFavorite = (e) => {
        if (!loggedIn) {
            navigate('/sign-up');
        } else {
            fetch(`
            https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favoriteAddOrRemove())
            })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (type === 'Movie') {
                    setRefreshFM(!refreshFM);
                } else {
                    setRefreshFTV(!refreshFTV);
                }
            })
        }
    }

    const checkFavorite = () => {
        if (type === 'Movie') {
            setIsFavorite(favoriteMoviesIds.includes(parseInt(id)));
        } else {
            setIsFavorite(favoriteTvIds.includes(parseInt(id)));
        }
    }

    //Favorites end ----------------------------------------------------------------------------------------------------------
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Watchlist -----------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        checkWatchlist();     
    }, [watchlistMoviesIds, watchlistTvIds])

    const watchlistBodyAdd = {
        media_type: typeFilter(type),
        media_id: parseInt(id),
        watchlist: true
    }

    const watchlistBodyRemove = {
        media_type: typeFilter(type),
        media_id: parseInt(id),
        watchlist: false
    }

    const watchlistAddOrRemove = () => {
        if (isWatchlist) {
            return watchlistBodyRemove
        } else {
            return watchlistBodyAdd
        }
    }

    const checkWatchlist = () => {
        if (type === 'Movie') {
            setIsWatchlist(watchlistMoviesIds.includes(parseInt(id)));
        } else {
            setIsWatchlist(watchlistTvIds.includes(parseInt(id)));
        }
    }

    const handleWatchlist = (e) => {
        if (!loggedIn) {
            navigate('/sign-up');
    } else {
        fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(watchlistAddOrRemove())
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (type === 'Movie') {
                setRefreshWM(!refreshWM);
            } else {
                setRefreshWTV(!refreshWTV);
            }
        })
    }
    }

    //Wathclist End --------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Rating --------------------------------------------------------------------------------------------------------

    useEffect(() => {
        checkRated();
    }, [ratedMoviesIds, ratedTvIds, refreshRating])

    const checkRated = () => {
        if (type === 'Movie') {
            setIsRated(ratedMoviesIds.includes(parseInt(id)));
            if (ratedMoviesIds.includes(parseInt(id))) {
                setServerRating(ratedMovies.map((movie) => {
                    if (movie.id === id) {
                        return movie.rating
                    }
                }))
            }
        } else {
            setIsRated(ratedTvIds.includes(parseInt(id)));
            if (ratedTvIds.includes(parseInt(id))) {
                setServerRating(ratedTv.map((movie) => {
                    if (movie.id === id) {
                        return movie.rating
                    }
                }))
            }
        }
    }



    const rateBody = {
        value: parseFloat(rating)
    }
    
    const handleChange = (e) => {
        const rating = parseFloat(e.target.value);
        setRating(rating);
        if (rating < 0.5 || rating > 10.0) {
            setRatingError(true);
        } else {
            setRatingError(false);
        }
        }

    
    
    const handleSubmit = (e) => {
        if (0.5 <= rating && rating <= 10.0) {
            if (!loggedIn) {
                navigate('/sign-up');
            } else {
                if (type === 'Movie') {
                    fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(rateBody)
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setRefreshRM(!refreshRM);
                    })
                } else {
                    fetch(`https://api.themoviedb.org/3/tv/${id}/rating?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(rateBody)
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setRefreshRTV(!refreshRTV);
                    })
                }
            }
    }
}
    const handleDelete = () => {
        if (!loggedIn) {
            navigate('/sign-up');
        } else {
            if (type === 'Movie') {
                fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setRefreshRM(!refreshRM);
                })
            } else {
                fetch(`https://api.themoviedb.org/3/tv/${id}/rating?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setRefreshFTV(!refreshFTV);
                })
            }
        }
    }

    const buttonClick = () => {
        console.log(ratedMovies);
        console.log(ratedMoviesIds);
        console.log(ratedMoviesIds.includes(parseInt(id)));
    }


    //Rating End --------------------------------------------------------------------------------------------------------
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
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
            <div className={styles.actionsContainer}>
                <div className={styles.rateCard}>
                <button onClick={buttonClick}>click</button>
                {!isRated ? <div>
                    <p>Rate Movie (from 0.5 to 10.0)</p>
                        <p className={!ratingError ? `${styles.ratingStatus}` : `${styles.ratingStatus} ${styles.ratingStatusShow}`}>Invalid rating</p>
                        <input onChange={handleChange} type='number'></input>
                        <button onClick={handleSubmit}>Submit</button>
                    </div> : 
                    <div>
                        <p>Your rating: {serverRating}</p>
                        <p className={!ratingError ? `${styles.ratingStatus}` : `${styles.ratingStatus} ${styles.ratingStatusShow}`}>Invalid rating</p>
                        <input onChange={handleChange} type='number'></input>
                        <button onClick={handleSubmit}>Edit</button>
                        <button onClick={handleDelete}>Delete rating</button>
                    </div>
                    }
                <SetRating id={id} type={type} fullObject={fullObject}/>
                </div>
                <div className={styles.buttonCard}>
                    <button onClick={handleFavorite}>{!isFavorite ?<FaLink /> : <FaUnlink /> }<p>{!isFavorite ? 'Add to favorites' : 'Remove from favorites' }</p></button>
                </div>
                <SetFavorite type={type} id={id}/>
                <div className={styles.buttonCard}>
                    <button onClick={handleWatchlist}>{!isWatchlist ? <FaEye /> : <FaEyeSlash />}<p>{!isWatchlist ? 'Add to watchlist' : 'Remove from watchlist'}</p></button>
                </div>
            </div>
        </ div>
    )
}

export default MovieCard