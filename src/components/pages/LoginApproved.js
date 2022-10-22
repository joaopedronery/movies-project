import styles from './LoginApproved.module.css';
import {useEffect} from 'react';
import { Authentication } from '../Context/Authentication';
import { useContext, useState } from 'react';

function LoginApproved({setContainer80}) {
    const params = new URLSearchParams(window.location.search);
    const [requestToken, setRequestToken] = useState(params.get('request_token'));
    const {loggedIn, setLoggedIn, sessionId, setSessionId} = useContext(Authentication);

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
            if (resp.session_id) {
            setSessionId(resp.session_id);
            setLoggedIn(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        
    }, [])
    
    const handleClick = () => {
        console.log(sessionId);
        console.log(loggedIn);
    }

    return (
        <div>
            <h1>approved</h1>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default LoginApproved