import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Trending from './components/pages/Trending';
import Navbar from './components/layout/Navbar';
import Search from './components/pages/Search';
import SignUp from './components/pages/SignUp';
import Genre from './components/pages/Genre';
import Genres from './components/pages/Genres';
import Footer from './components/layout/Footer';
import LoginApproved from './components/pages/LoginApproved';
import {Authentication} from './components/Context/Authentication';
import Account from './components/pages/Account';


function App() {
  const [fullWidth, setFullWidth] = useState(true);
  
  const setContainerFull = () => {
    setFullWidth(true);
  }

  const setContainer80 = () => {
    setFullWidth(false);
  }

  const {loggedIn, sessionId, accountId, setAccountId, setUsername, setFavoriteMovies, favoriteMovies, setFavoriteTv, setRatedMovies, setRatedTv, setWatchlistMovies, setWatchlistTv, refreshFM, favoriteMoviesIds, setFavoriteMoviesIds, refreshFTV, favoriteTvIds, setFavoriteTvIds, refreshRM, ratedMoviesIds, setRatedMoviesIds, refreshRTV, ratedTvIds, setRatedTvIds, refreshWTV, watchlistTvIds, setWatchlistTvIds, refreshWM, watchlistMoviesIds, setWatchlistMoviesIds} = useContext(Authentication);
  
  const setIds = (list, setter) => {
    let idsList;
    if (list.length > 0) {
      idsList = list.map((movie) => (movie.id));
      setter(idsList);
    } else {
      setter([]);
    }
  }


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/account?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUsername(data.username);
            setAccountId(data.id);
            console.log(data.id);
        })
        .catch((err) => console.log(err))
  }, [loggedIn])

  useEffect(() => {
    if (accountId) {
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
    }
  }, [accountId])

  useEffect(() => {
    if (accountId) {
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
  }, [accountId])

  useEffect(() => {
    if (accountId) {  
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
      })
      .catch((err) => console.log(err))
    }
  }, [accountId])

  useEffect(() => {
    if (accountId) {
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
      })
      .catch((err) => console.log(err))
    }
  }, [accountId])

  useEffect(() => {
    if (accountId) {
      fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
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
    }
    }, [accountId])

  
  useEffect(() => {
    if (accountId) {
      fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=a0613aadd6388a2410f231f12bddae65&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
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
  }, [accountId])
  


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container customClass={fullWidth ? 'fullWidth' : ''}>
          <Routes>
            <Route path='/movies-project' element={<Home setContainerFull={setContainerFull} />} />
            <Route path='/trending' element={<Trending setContainer80={setContainer80} />} />
            <Route path='/account' element={<Account setContainer80={setContainer80}/>}/>
            <Route path='/genres' element={<Genres setContainer80={setContainer80} />} />
            <Route path='/genre/:genreId' element={<Genre setContainer80={setContainer80} />} />
            <Route path='/search/:search' element={<Search setContainer80={setContainer80} />} />
            <Route path='/sign-up' element={<SignUp setContainer80={setContainer80} />} />
            <Route path='/approvedLogin' element={<LoginApproved setContainer80={setContainer80} />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
