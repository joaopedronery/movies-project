import styles from './MovieCard.module.css';
import { FaPlusSquare, FaMinusSquare, FaLink, FaUnlink, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../Context/Authentication';
import SetRating from '../MovieCard/SetRating';
import SetFavorite from '../MovieCard/SetFavorite';
import SetWatchlist from '../MovieCard/SetWatchlist';


function MovieCard({fullObject, id, title, og_title, overview, type, vote_avg, vote_count, poster, release_date, first_air_date }) {
    
    return (
        <div className={styles.cardContainer}>
            <div className={styles.posterContainer}>
                <img src={poster}/>
            </div>
            <div className={styles.dataContainer}>
                <p><span>Title:</span> {title}</p>
                <p><span>Original title:</span> {og_title}</p>
                <p><span>Overview:</span> {overview}</p>
                <p><span>Type:</span> {type}</p>
                <p><span>Vote average:</span> {vote_avg}</p>
                <p><span>Vote count:</span> {vote_count}</p>
                <p><span>{release_date ? 'Release date:' : 'First air date:'}</span> {release_date ? release_date : first_air_date}</p>
            </div>
            <div className={styles.actionsContainer}>
                <SetRating id={id} type={type} />
                <SetFavorite type={type} id={id}/>
                <SetWatchlist type={type} id={id} />
            </div>
        </ div>
    )
}

export default MovieCard