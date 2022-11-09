import styles from './CarouselAccount.module.css';
import { useRef, useContext } from 'react';
import { Authentication } from '../Context/Authentication';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

function CarouselAccount({movieData, title}) {
    
    const carousel = useRef(null);
    
    const leftClick = () => {
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
    
    const rightClick = () => {
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    const handleClick = () => {
        console.log(movieData);
    }

    return (
            <div className={styles.carouselContainer}>
                <h2 className={styles.title}>{title}</h2>
                {movieData.length > 0 ? (
                <div className={styles.carousel} ref={carousel}>
                    {movieData.map((movie) => (
                        <div key={movie.id} className={styles.carouselItem}>
                            <div className={styles.carouselImage}>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                            </div>
                            <button onClick={handleClick}>click</button>
                        </div>
                    ))}
                </div> ) : (
                    <div className={styles.emptyContainer}>
                        <h2>This list is empty</h2>
                    </div>
                )
                    }
                <div className={styles.buttons}>
                    <button onClick={leftClick}><FaArrowCircleLeft /></button>
                    <button onClick={rightClick}><FaArrowCircleRight /></button>
                </div>
            </div>
    )
}

export default CarouselAccount