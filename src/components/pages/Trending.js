import { useState, useEffect } from 'react';
import styles from './Trending.module.css';
import MovieCard from '../layout/MovieCard';
import SelectTrending from '../layout/SelectTrending';
import ActorCard from '../layout/ActorCard';
import profileMiss from '../../img/profile_miss4.jpg';
import LoadingSpinner from '../layout/LoadingSpinner';
import PageTitle from '../layout/PageTitle';
import PageSelector from '../layout/PageSelector';

function Trending({setContainer80}) {
    const [mediaType, setMediaType] = useState('movie');
    const [timeWindow, setTimeWindow] = useState('week');
    const [moviesData, setMoviesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setContainer80();
    })

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=a0613aadd6388a2410f231f12bddae65&page=${page}`, {
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
    }, [mediaType, timeWindow, page])

    
    const timeChange = (e) => {
        setTimeWindow(e.target.value);
    }

    const mediaChange = (e) => {
        setMediaType(e.target.value);
    }

    const onPageClick = (page) => {
        setPage(page);
    }


    return (
        <>
        <PageTitle titleText='Trending' />
        <div>
            <SelectTrending timeWindow={timeWindow} mediaType={mediaType} mediaChange={mediaChange} timeChange={timeChange} />
            <PageSelector onPageClick={onPageClick} currentPage={page}/>
            {!isLoading ? <div className={styles.cardsContainer}>
                {moviesData.map((movie) =>  movie.media_type === 'tv' || movie.media_type === 'movie' ? (
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
                    />
                ) : (
                    <ActorCard
                    key={movie.id} 
                    profile={movie.profile_path ? `https://image.tmdb.org/t/p/w200${movie.profile_path}` : profileMiss}
                    name={movie.name}
                    og_name={movie.original_name}
                    role={movie.known_for_department}
                    known_for={movie.known_for.length !== 0 ? movie.known_for : null}
                    />

                ))}
            </div> : <LoadingSpinner />}
        </div>
        </>
        
    )
    

}

export default Trending