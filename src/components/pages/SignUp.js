import styles from './SignUp.module.css';
import {useEffect} from 'react';
import PageTitle from '../layout/PageTitle';

function SignUp({setContainer80}) {
    useEffect(() => {
        setContainer80();
    })

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
                <p><a href='#'>Login</a></p>
            </div>
        </div>

    )
}

export default SignUp