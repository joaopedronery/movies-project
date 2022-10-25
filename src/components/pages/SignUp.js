import styles from './SignUp.module.css';
import {useEffect, useState} from 'react';
import PageTitle from '../layout/PageTitle';

function SignUp({setContainer80}) {
    
    const [token, setToken] = useState();
    
    useEffect(() => {
        setContainer80();
    })

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=a0613aadd6388a2410f231f12bddae65', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => setToken(data.request_token))
        .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <PageTitle titleText='Sign Up' />
            <div className={styles.signUp}>
                <h2>Sign up for TMDB</h2>
                <p>Sign up for TMDB and use your account on The Movies Hub.</p>
                <p>You can create lists, rate movies and tv shows, mark titles as favorites and much more.</p>
                <p><a href='https://www.themoviedb.org/signup' target='_blank' rel='noreferrer'>Sign Up</a></p>
            </div>
            <div className={styles.login}>
                <h2>Already have a TMDB account?</h2>
                <p>If you already have a TMDB account, you are ready to enjoy and explore The Movies Hub.</p>
                <p><a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=https://joaopedronery.github.io/approvedLogin`}>Login</a></p>
            </div>
        </div>

    )
}

export default SignUp