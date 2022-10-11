import styles from './SearchBar.module.css';

function SearchBar() {

    return (
        <div>
            <form>
                <input className={styles.input} />
                <input className={styles.submit} value='Search' type='submit' />
            </form>
        </div>
    )
}

export default SearchBar