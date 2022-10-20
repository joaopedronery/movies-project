import styles from './TrendingHome.module.css';
import {useEffect, useState, useRef} from 'react';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

function TrendingHome() {
    
    const [trending, setTrending] = useState([]);
    const carousel = useRef(null);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=a0613aadd6388a2410f231f12bddae65&page=1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
        .then((data) => {
            setTrending(data.results);
        })
        .catch(err => console.log(err))
    }, [])

    const leftClick = () => {
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
    
    const rightClick = () => {
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    
    return (
        <div>
            <h2 className={styles.trending}>Trending today</h2>
            <div className={styles.carousel} ref={carousel}>
                {trending.map((movie) => (
                    <div key={movie.id} className={styles.carouselItem}>
                        <div className={styles.carouselImage}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttons}>
                <button onClick={leftClick}><FaArrowCircleLeft /></button>
                <button onClick={rightClick}><FaArrowCircleRight /></button>
            </div>
        </div>
    )
}

export default TrendingHome