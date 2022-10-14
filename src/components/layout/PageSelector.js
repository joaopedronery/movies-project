import styles from './PageSelector.module.css';
import { useState } from 'react';
import PageSelectorArrows from '../layout/PageSelectorArrows';


function PageSelector({onPageClick, currentPage}) {
    
    const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    
    const pagesClick = (e) => {
        const pag = parseInt(e.target.value);
        const pagIndex = pages.indexOf(pag);
        if (pagIndex >= 4) {
            setPages([(pag-4), (pag-3), (pag-2), (pag-1), pag, (pag+1), (pag+2), (pag+3)]);
        } else if (pagIndex < 4) {
            if (pag > 4) {
                setPages([(pag-4), (pag-3), (pag-2), (pag-1), pag, (pag+1), (pag+2), (pag+3)]);
            } else {
                setPages([1, 2, 3, 4, 5, 6, 7, 8]);
            }
        }
        onPageClick(pag);
    }

    const leftClick = () => {
        if (currentPage > 1) {
        const page = currentPage-1;
        const pageIndex = pages.indexOf(page);
        if (pageIndex >= 4) {
            setPages([(page-4), (page-3), (page-2), (page-1), page, (page+1), (page+2), (page+3)]);
        } else if (pageIndex < 4) {
            if (page > 4) {
                setPages([(page-4), (page-3), (page-2), (page-1), page, (page+1), (page+2), (page+3)]);
            } else {
                setPages([1, 2, 3, 4, 5, 6, 7, 8]);
            }
        }
        onPageClick(page);
        }
    }

    const rightClick = () => {
        const page = currentPage+1;
        const pageIndex = pages.indexOf(page);
        if (pageIndex >= 4) {
            setPages([(page-4), (page-3), (page-2), (page-1), page, (page+1), (page+2), (page+3)]);
        } else if (pageIndex < 4) {
            if (page > 4) {
                setPages([(page-4), (page-3), (page-2), (page-1), page, (page+1), (page+2), (page+3)]);
            } else {
                setPages([1, 2, 3, 4, 5, 6, 7, 8]);
            }
        }
        onPageClick(page);
    }

    return (
        <>
        <div className={styles.selectorContainer}>
            <p>Pages:</p>
            <ul>
                {pages.map((v, i) => (
                    <li key={i}><button className={parseInt(v) === currentPage ? `${styles.selected}` : ''} onClick={pagesClick} value={v}>{v}</button></li>
                ))}
            </ul>
        </div>
        <PageSelectorArrows leftClick={leftClick} rightClick={rightClick} page={currentPage}/>
        </>
    )
}

export default PageSelector