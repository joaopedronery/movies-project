import styles from './Genre.module.css';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import PageTitle from '../layout/PageTitle';
import LoadingSpinner from '../layout/LoadingSpinner';
import PageSelector from '../layout/PageSelector';
import MovieCard from '../layout/MovieCard';

function Genre() {
    const {genreId} = useParams();
    const [moviesData, setMoviesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_monetization_types=flatrate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMoviesData(data.results);
            setIsLoading(false);
        })
        .catch((err) => console.log(err))
    }, [genreId])

    return (
    <div>
        {!isLoading ? <div>
            {moviesData.map((movie) => (
                    <MovieCard
                    key={movie.id}
                    poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    title={movie.title ? movie.title : movie.name}
                    og_title={movie.original_title ? movie.original_title : movie.original_name}
                    overview={movie.overview}
                    type={movie.media_type === 'tv' ? 'Tv show' : 'Movie' }
                    vote_avg={parseFloat(movie.vote_average).toFixed(1)}
                    vote_count={movie.vote_count}
                    release_date={movie.release_date ? movie.release_date : null}
                    first_air_date={movie.first_air_date ? movie.first_air_date : null}
                    />))}
        </div>
        : <LoadingSpinner />
        }
    </div>
    )
}

export default Genre