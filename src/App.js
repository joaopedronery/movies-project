import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Trending from './components/pages/Trending';
import Navbar from './components/layout/Navbar';
import Search from './components/pages/Search';
import SignUp from './components/pages/SignUp';
import Genre from './components/pages/Genre';
import Genres from './components/pages/Genres';
import Footer from './components/layout/Footer';


function App() {
  const [fullWidth, setFullWidth] = useState(true);
  
  const setContainerFull = () => {
    setFullWidth(true);
    console.log(fullWidth);
  }

  const setContainer80 = () => {
    setFullWidth(false);
    console.log(fullWidth);
  }
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container customClass={fullWidth ? 'fullWidth' : ''}>
          <Routes>
            <Route path='/movies-project' element={<Home setContainerFull={setContainerFull} />}/>
            <Route path='/trending' element={<Trending setContainer80={setContainer80} />} />
            <Route path='/genres' element={<Genres setContainer80={setContainer80} />} />
            <Route path='/genre/:genreId' element={<Genre setContainer80={setContainer80} />} />
            <Route path='/search/:search' element={<Search setContainer80={setContainer80} />} />
            <Route path='/sign-up' element={<SignUp setContainer80={setContainer80} />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
