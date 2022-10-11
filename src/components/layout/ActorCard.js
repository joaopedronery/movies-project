import styles from './ActorCard.module.css';

function ActorCard({ name, og_name, role, known_for,known_for_length, profile }) {
    
    const knowForSwitch = (known_for, known_for_length) => {
        if (known_for) {

        } else {
            return 'Missing info'
        }
    }
    
    return (
        <div className={styles.cardContainer}>
            <div className={styles.posterContainer}>
                <img src={profile}/>
            </div>
            <div className={styles.dataContainer}>
                <p><span>Name:</span> {name}</p>
                <p><span>Original name:</span> {og_name}</p>
                <p><span>Role:</span> {role}</p>
                <p><span>Known for:</span> {known_for} </p>
            </div>
        </ div>
    )
}

export default ActorCard