import styles from './Home.module.css';
import PageTitle from '../layout/PageTitle';
import {useEffect, useContext, useState} from 'react';
import BenefitsCard from '../layout/BenefitsCard';
import TrendingHome from '../layout/TrendingHome';
import { Authentication } from '../Context/Authentication';
import LoginApproved from './LoginApproved';
import LoginMessage from '../layout/LoginMessage';

function Home({setContainerFull}) {
    const params = new URLSearchParams(window.location.search);
    const [requestToken, setRequestToken] = useState(params.get('request_token'));
    const [loaded, setLoaded] = useState(false);
    const {loggedIn, setLoggedIn, sessionId, setSessionId} = useContext(Authentication);


    useEffect(() => {
        setContainerFull();
        if (requestToken) {
            fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=a0613aadd6388a2410f231f12bddae65&request_token=${requestToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setLoaded(true);
            if (data.session_id) {
                setSessionId(data.session_id);
                setLoggedIn(true);
                setRequestToken(null);
                console.log(data.session_id)
            }
        })
        .catch((err) => console.log(err))
        }

    }, [requestToken])
    return (
        <div className={styles.homeContainer}>
            {requestToken && <LoginMessage loaded={loaded}/>}
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
            <div className={styles.trendingContainer}>
                <TrendingHome />
            </div>
        </div>
    )
}

export default Home