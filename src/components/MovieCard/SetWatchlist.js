import styles from './SetWatchlist.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../Context/Authentication';

function SetWatchlist({id, type}) {
    
    const {loggedIn, accountId, sessionId, watchlistMoviesIds, watchlistTvIds, setWatchlistMoviesIds, setWatchlistTvIds, setWatchlistMovies, setWatchlistTv} = useContext(Authentication);
    const navigate = useNavigate();
    const [isWatchlist, setIsWatchlist] = useState(false);

    useEffect(() => {
        checkWatchlist();     
    }, [watchlistMoviesIds, watchlistTvIds])

    const typeFilter = (type) => {
        if (type === 'Movie') {
            return 'movie'
        } else {
            return 'tv'
        }
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
                refreshWatchlist(type);
            })
            .catch((err) => console.log(err))

        }

    }
    const refreshWatchlist = (type) => {
        if (type === 'Movie') {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US&session_id=${sessionId}&sort_by=created_at.desc&page=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setWatchlistMovies(data.results);
                setIds(data.results, setWatchlistMoviesIds);
            })
            .catch((err) => console.log(err))
        } else {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US&session_id=${sessionId}&sort_by=created_at.desc&page=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setWatchlistTv(data.results);
                setIds(data.results, setWatchlistTvIds);
            })
            .catch((err) => console.log(err))
        }
    } 
    return (
        <div className={styles.buttonCard}>
            <button onClick={handleWatchlist}>{!isWatchlist ? <FaEye /> : <FaEyeSlash />}<p>{!isWatchlist ? 'Add to watchlist' : 'Remove from watchlist'}</p></button>
        </div>
    )
}

export default SetWatchlist