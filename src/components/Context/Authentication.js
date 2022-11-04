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
    const [refreshFM, setRefreshFM] = useState(false);
    const [favoriteMoviesIds, setFavoriteMoviesIds] = useState([]);
    const [refreshFTV, setRefreshFTV] = useState(false);
    const [favoriteTvIds, setFavoriteTvIds] = useState([]);
    const [refreshRM, setRefreshRM] = useState(false);
    const [ratedMoviesIds, setRatedMoviesIds] = useState([]);
    const [refreshRTV, setRefreshRTV] = useState(false);
    const [ratedTvIds, setRatedTvIds] = useState([]);
    const [refreshWTV, setRefreshWTV] = useState(false);
    const [watchlistTvIds, setWatchlistTvIds] = useState([]);
    const [refreshWM, setRefreshWM] = useState(false);
    const [watchlistMoviesIds, setWatchlistMoviesIds] = useState([]);
    const [refreshRating, setRefreshRating] = useState(false);


    return (
        <Authentication.Provider value={{loggedIn, setLoggedIn, sessionId, setSessionId, username, setUsername, accountId, setAccountId, favoriteMovies, setFavoriteMovies, favoriteTv, setFavoriteTv, ratedMovies, setRatedMovies, ratedTv, setRatedTv, watchlistMovies, setWatchlistMovies, watchlistTv, setWatchlistTv, refreshFM, setRefreshFM, favoriteMoviesIds, setFavoriteMoviesIds, refreshFTV, setRefreshFTV, favoriteTvIds, setFavoriteTvIds, refreshRM, setRefreshRM, ratedMoviesIds, setRatedMoviesIds, refreshRTV, setRefreshRTV, ratedTvIds, setRatedTvIds, refreshWTV, setRefreshWTV, watchlistTvIds, setWatchlistTvIds, refreshWM, setRefreshWM, watchlistMoviesIds, setWatchlistMoviesIds, refreshRating, setRefreshRating}}>
            {children}
        </Authentication.Provider>
    )
}

export default AuthenticationProvider