import styles from './ActorCard.module.css';

function ActorCard({ name, og_name, role, known_for, profile }) {
    
    const knownForSwitch = (known_for) => {
        if (known_for) {
            if (known_for.length === 1) {
                return known_for[0].title
            } else if (known_for.length === 2) {
                return `${known_for[0].title} and ${known_for[1].title}`
            } else if (known_for.length >= 3) {
                return `${known_for[0].title}, ${known_for[1].title} and ${known_for[2].title}`
            }
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
                <p><span>Known for:</span> {knownForSwitch(known_for)} </p>
            </div>
        </ div>
    )
}

export default ActorCard