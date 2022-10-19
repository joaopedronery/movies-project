import styles from './Search.module.css';
import PageTitle from '../layout/PageTitle';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import MovieCard from '../layout/MovieCard';
import LoadingSpinner from '../layout/LoadingSpinner';
import PageSelector from '../layout/PageSelector';
import profileMiss from '../../img/profile_miss4.jpg';
import NoResults from '../layout/NoResults';

function Search({setContainer80}) {
    const {search} = useParams();
    const [movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setContainer80();
    })

    useEffect(() =>{
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US&query=${search}&page=${page}&include_adult=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMovieData(data.results);
            setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }, [search, page])

    const onPageClick = (page) => {
        setPage(page);
    }

    return (
        <div>
        <PageTitle customClass='smallFont' titleText={`Search: "${search}"`} />
        <div>
        <PageSelector onPageClick={onPageClick} currentPage={page} />
        {!isLoading && movieData.length > 0 &&
        <div className={styles.cardsContainer}>
                {movieData.map((movie) => (
                    <MovieCard
                    key={movie.id}
                    poster={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : profileMiss }
                    title={movie.title ? movie.title : movie.name}
                    og_title={movie.original_title ? movie.original_title : movie.original_name}
                    overview={movie.overview}
                    type={movie.media_type === 'tv' ? 'Tv show' : 'Movie' }
                    vote_avg={parseFloat(movie.vote_average).toFixed(1)}
                    vote_count={movie.vote_count}
                    release_date={movie.release_date ? movie.release_date : null}
                    first_air_date={movie.first_air_date ? movie.first_air_date : null}
                    />))}
                    </div>}
        {!isLoading && movieData.length === 0 && <NoResults search={search} />}
        {isLoading && <LoadingSpinner />}
            
        </div>
                    
        </div>
    )
}

export default Search