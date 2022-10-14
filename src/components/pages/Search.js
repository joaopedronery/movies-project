import styles from './Search.module.css';
import PageTitle from '../layout/PageTitle';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import MovieCard from '../layout/MovieCard';
import LoadingSpinner from '../layout/LoadingSpinner';

function Search() {
    const {search} = useParams();
    const [movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() =>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US&query=${search}&page=${page}&include_adult=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => setMovieData(data.results))
        .catch((err) => console.log(err))
    }, [search, page])


    return (
        <>
        <PageTitle titleText={`Search: "${search}"`} />

        </>
    )
}

export default Search