import styles from './SetFavorite.module.css';
import {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../Context/Authentication';
import {FaLink, FaUnlink} from 'react-icons/fa';

function SetFavorite({type, id}) {
    
    const {loggedIn, accountId, sessionId, favoriteMoviesIds, favoriteTvIds, setFavoriteMoviesIds, setFavoriteTvIds, setFavoriteMovies, setFavoriteTv} = useContext(Authentication);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkFavorite();
    }, [favoriteMoviesIds, favoriteTvIds]);

    const setIds = (list, setter) => {
        let idsList;
        if (list.length > 0) {
          idsList = list.map((movie) => (movie.id));
          setter(idsList);
        } else {
          setter([]);
        }
      }

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

    const checkFavorite = () => {
        if (type === 'Movie') {
            setIsFavorite(favoriteMoviesIds.includes(parseInt(id)));
        } else {
            setIsFavorite(favoriteTvIds.includes(parseInt(id)));
        }
    }

    const handleFavorite = (e) => {
        if (!loggedIn) {
            navigate('/sign-up');
        } else {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favoriteAddOrRemove())
            })
            .then((data) => data.json())
            .then((data) => {
                refreshFavorite(type); 
        })
    }
    }

    const refreshFavorite = (type) => {
        if (type === 'Movie') {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setFavoriteMovies(data.results);
            setIds(data.results, setFavoriteMoviesIds);
        })
        .catch((err) => console.log(err))
        } else {
            fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setFavoriteTv(data.results);
            setIds(data.results, setFavoriteTvIds);
        })
        .catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <div className={styles.buttonCard2}>
                <button onClick={handleFavorite}>{!isFavorite ?<FaLink /> : <FaUnlink /> }<p>{!isFavorite ? 'Add to favorites' : 'Remove from favorites' }</p></button>
            </div>
            <p>hello</p>
        </div>
    )


}

export default SetFavorite