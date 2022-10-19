import styles from './Home.module.css';
import PageTitle from '../layout/PageTitle';
import {useEffect} from 'react';
import BenefitsCard from '../layout/BenefitsCard';

function Home({setContainerFull}) {
    useEffect(() => {
        setContainerFull();
        
    })
    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroImage}>
                <div className={styles.heroText}>
                    <h2>Welcome to</h2>
                    <h2><span className={styles.spanText}>The Movies Hub</span></h2>
                    <p>Search for movies and tv shows by genre, name or trending.</p>
                    <p>It`s <span className={styles.spanText}>free!</span></p>
                </div>
            </div>
            <div className={styles.benefitsContainer}>
                <BenefitsCard />
            </div>
        </div>
    )
}

export default Home