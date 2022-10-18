import styles from './SearchBar.module.css';
import {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';


function SearchBar({handleClick}) {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = () => {
        if (search) {
            navigate(`/search/${search}`);
        }
        handleClick();
    }
    return (
        <div>
            <input onChange={(handleOnChange)} className={styles.input} />
            <button onClick={handleSubmit} className={styles.submit}>Search</button>
        </div>
    )
}

export default SearchBar