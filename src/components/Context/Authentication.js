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
    
    return (
        <Authentication.Provider value={{loggedIn, setLoggedIn, sessionId, setSessionId, username, setUsername, accountId, setAccountId, favoriteMovies, setFavoriteMovies, favoriteTv, setFavoriteTv, ratedMovies, setRatedMovies, ratedTv, setRatedTv, watchlistMovies, setWatchlistMovies, watchlistTv, setWatchlistTv}}>
            {children}
        </Authentication.Provider>
    )
}

export default AuthenticationProvider