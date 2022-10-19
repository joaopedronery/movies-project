import styles from './BenefitsCard.module.css';
import {FaCoins, FaSearch, FaUserCheck} from 'react-icons/fa';

function BenefitsCard() {
    return(
    <div className={styles.cardsContainer}>
        <div className={styles.card}>
            <div className={styles.svgContainer}>
                <FaCoins className={styles.coins} />
            </div>
            <h2>Always Free</h2>
            <p>Search and discover new movies and tv shows for free. No subscription required.</p>
        </div>
        <div className={styles.card}>
            <div className={styles.svgContainer}>
                <FaSearch className={styles.search}/>
            </div>
            <h2>Tons to Discover</h2>
            <p>Explore more than 100,000 titles from all over the world and from all genres.</p>
        </div>
        <div className={styles.card}>
            <div className={styles.svgContainer}>
                <FaUserCheck className={styles.user} />
            </div>
            <h2>User-Friendly Interface</h2>
            <p>Enjoy our simple and user-friendly interface and worry about nothing.</p>
        </div>
    </div>
    )
}

export default BenefitsCard