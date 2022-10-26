import styles from './LoginMessage.module.css';
import { useContext, useState, useEffect } from 'react';
import { Authentication } from '../Context/Authentication';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function LoginMessage({requestToken, loaded}) {
    
    const {loggedIn} = useContext(Authentication);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000)
    }, [])

    return (
        <div className={show ? `${styles.loginStatusContainer} ${styles.show}` : styles.loginStatusContainer}>
            <div className={styles.loginStatusCard}>
                {!loaded && <LoadingSpinner customClass='spinnerContainerHome'/>}
                {loaded && 
                <>
                <h1>{loggedIn ? 'Login Successful' : 'Login Error'}</h1>
                <p>{loggedIn ? <FaCheckCircle className={styles.greenSvg} /> : <FaMinusCircle className={styles.redSvg} />}</p>
                {!loggedIn && <p>Try again <Link to='/sign-up'>here</Link></p>}
                </>
                }
            </div>
        </div>
    )
}

export default LoginMessage