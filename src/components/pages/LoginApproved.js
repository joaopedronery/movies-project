import styles from './LoginApproved.module.css';
import {useEffect} from 'react';
import { Authentication } from '../Context/Authentication';
import { useContext, useState } from 'react';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import LoadingSpinner from '../layout/LoadingSpinner';

function LoginApproved({setContainer80}) {
    const params = new URLSearchParams(window.location.search);
    const [requestToken, setRequestToken] = useState(params.get('request_token'));
    const [loaded, setLoaded] = useState(false);
    const {loggedIn, setLoggedIn, sessionId, setSessionId} = useContext(Authentication);
    const navigate = useNavigate();

    useEffect(() => {
        setContainer80();
    })

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=a0613aadd6388a2410f231f12bddae65&request_token=${requestToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
            setLoaded(true);
            if (resp.session_id) {
            setSessionId(resp.session_id);
            setLoggedIn(true);
            console.log(resp.session_id);
            redirect();
            }
        })
        .catch((err) => {
            console.log(err);
        })
        
    }, [])

    const redirect = () => {
        setTimeout(() => {
            navigate('/movies-project')
        }, 2500);
    }


    return (
        <div className={styles.allContainer}>
        <div className={loaded ? `${styles.loaderContainer}` : `${styles.loaderContainer} ${styles.show}`}>
            <LoadingSpinner />
        </div>
        <div className={loaded ? `${styles.loginStatusContainer} ${styles.show}` : `${styles.loginStatusContainer}`}>
            <h1>{loggedIn ? 'Login Sucessful!' : 'Login Error!'}</h1>
            <p>{loggedIn ? <FaCheckCircle className={styles.greenSvg} /> : <FaMinusCircle className={styles.redSvg} />}</p>
            {!loggedIn && <p>Try again <Link to='/sign-up'>here</Link></p>}
            {loggedIn && <p>Redirecting to home page...</p>}
        </div>
        </div>
    )
}

export default LoginApproved