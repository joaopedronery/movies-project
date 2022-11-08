import { createContext, useState } from "react";

export const Authentication = createContext();

function AuthenticationProvider({children}) {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [sessionId, setSessionId] = useState();
    const [username, setUsername] = useState('');
    const [accountId, setAccountId] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteTv, setFavoriteTv] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [ratedTv, setRatedTv] = useState([]);
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [watchlistTv, setWatchlistTv] = useState([]);
    const [favoriteMoviesIds, setFavoriteMoviesIds] = useState([]);
    const [favoriteTvIds, setFavoriteTvIds] = useState([]);
    const [ratedMoviesIds, setRatedMoviesIds] = useState([]);
    const [ratedTvIds, setRatedTvIds] = useState([]);
    const [watchlistTvIds, setWatchlistTvIds] = useState([]);
    const [watchlistMoviesIds, setWatchlistMoviesIds] = useState([]);


    return (
        <Authentication.Provider value={{loggedIn, setLoggedIn, sessionId, setSessionId, username, setUsername, accountId, setAccountId, favoriteMovies, setFavoriteMovies, favoriteTv, setFavoriteTv, ratedMovies, setRatedMovies, ratedTv, setRatedTv, watchlistMovies, setWatchlistMovies, watchlistTv, setWatchlistTv, favoriteMoviesIds, setFavoriteMoviesIds, favoriteTvIds, setFavoriteTvIds, ratedMoviesIds, setRatedMoviesIds, ratedTvIds, setRatedTvIds, watchlistTvIds, setWatchlistTvIds, watchlistMoviesIds, setWatchlistMoviesIds}}>
            {children}
        </Authentication.Provider>
    )
}

export default AuthenticationProvider