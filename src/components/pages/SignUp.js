import styles from './SignUp.module.css';
import {useEffect} from 'react';
import PageTitle from '../layout/PageTitle';

function SignUp({setContainer80}) {
    useEffect(() => {
        setContainer80();
    })

    return (
        <PageTitle titleText='Sign Up' />
    )
}

export default SignUp