import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Trending from './components/pages/Trending';
import Navbar from './components/layout/Navbar';
import Search from './components/pages/Search';
import Genres from './components/pages/Genres';
import SignUp from './components/pages/SignUp';
import Genre from './components/pages/Genre';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route path='/trending' element={<Trending />} />
            <Route path='/genres' elements={<Genres />} />
            <Route path='/genre/:genre' elements={<Genre />} />
            <Route path='/search' element={<Search />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Routes>
        </Container>
        <div>footer</div>
      </Router>
    </div>
  );
}

export default App;
