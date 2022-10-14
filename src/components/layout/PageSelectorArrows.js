import styles from './PageSelectorArrows.module.css';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

function PageSelectorArrows({leftClick, rightClick}) {
    

    return (
        <div className={styles.buttonDivContainer}>
            <div>
                <button onClick={leftClick}>
                    <FaArrowCircleLeft />
                </button>
            </div>
            <div>
                <button onClick={rightClick}>
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    )
}

export default PageSelectorArrows