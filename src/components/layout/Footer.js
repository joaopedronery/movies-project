import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.iconsContainer}>
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
            <p className={styles.copyright}><span>TheMoviesHub</span> &copy; 2022</p>
            <p className={styles.copyright}>Created by: <a target='_blank' href='https://www.linkedin.com/in/joão-pedro-soares-nery'>João Pedro Nery</a></p>
        </div>
    )
}

export default Footer