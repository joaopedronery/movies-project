import styles from './SetRating.module.css';
import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../Context/Authentication';
import RatingSpinner from './RatingSpinner';


function SetRating({id, type}) {
    
    const {loggedIn, accountId, sessionId, ratedMoviesIds, ratedTvIds, ratedMovies, ratedTv, setRatedMoviesIds, setRatedTvIds, setRatedMovies, setRatedTv} = useContext(Authentication);

    const navigate = useNavigate();
    const [rating, setRating] = useState();
    const [isRated, setIsRated] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [serverRating, setServerRating] = useState();
    const [ratingLoading, setRatingLoading] = useState(false);

    useEffect(() => {
        checkRated();
    }, [ratedMoviesIds, ratedTvIds])

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

    const setIds = (list, setter) => {
        let idsList;
        if (list.length > 0) {
          idsList = list.map((movie) => (movie.id));
          setter(idsList);
        } else {
          setter([]);
        }
      }

    const handleChange = (e) => {
        const rating = parseFloat(e.target.value);
        setRating(rating);
        if (rating && (rating < 0.5 || rating > 10.0 || (rating * 10) % 5 != 0)) {
            setRatingError(true);
        } else {
            setRatingError(false);
        }
        }

    const handleSubmit = (e) => {
        if (0.5 <= rating && rating <= 10.0 && (rating * 10) % 5 === 0) {
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
                        if (data.success === true) {
                            setRatingLoading(true);
                            setTimeout(() => {
                                refreshRating('movies');
                            }, 1000);
                        }
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
                        if (data.success === true) {
                            setRatingLoading(true);
                            setTimeout(() => {
                                refreshRating('tv'); 
                            }, 1000);
  
                        }
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
                    if (data.success === true) {
                        setRatingLoading(true);
                        setTimeout(() => {
                            refreshRating('movies');
                        }, 1000);

                    }
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
                    if (data.success === true) {
                        setRatingLoading(true);
                        setTimeout(() => {
                            refreshRating('tv');
                        }, 1000);
                    }
                })
            }
        }
    }

    const refreshRating = (mediaType) => {
        if (mediaType === 'movies') {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRatedMovies(data.results);
            setIds(data.results, setRatedMoviesIds);
            setRatingLoading(false);
        })
        .catch((err) => console.log(err))
        } else if (mediaType === 'tv') {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/rated/tv?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRatedTv(data.results);
            setIds(data.results, setRatedTvIds);
            setRatingLoading(false);
        })
        .catch((err) => console.log(err))
        }
    }
    
    return (
        <div>
            {!isRated ? <div>
                <p>Rate Movie (from 0.5 to 10.0)</p>
                    <p className={!ratingError ? `${styles.ratingStatus}` : `${styles.ratingStatus} ${styles.ratingStatusShow}`}>Invalid rating</p>
                    <input onChange={handleChange} type='number'></input>
                    <button onClick={handleSubmit}>Submit</button>
                    {ratingLoading && <RatingSpinner />}
                </div> :
                <div>
                    <p>Your rating: {serverRating}</p>
                    <button onClick={handleDelete}>Delete rating</button>
                    {ratingLoading && <RatingSpinner />}
                </div>
                }
        </div>
    )
}

export default SetRating