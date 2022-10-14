import styles from './Genres.module.css';
import PageTitle from '../layout/PageTitle';
import {useEffect, useState} from 'react';
import GenreCard from '../layout/GenreCard';


function Genres() {
    
    const [genres, setGenres] = useState([]);
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a0613aadd6388a2410f231f12bddae65&language=en-US', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => setGenres(data.genres))
        .catch((err) => console.log(err))
    },[])
    
    return (
        <div>
            <PageTitle titleText='Genres' />
            <div className={styles.genreListContainer}>
                {genres.map((genre) => (
                    <GenreCard key={genre.id} id={genre.id} name={genre.name} />
                ))
                }
            </div>
        </div>
    )
}

export default Genres