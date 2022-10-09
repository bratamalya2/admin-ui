import React, {useState, useEffect} from 'react';
import '../styles/footer.css';

//pages count: 1 - 5(max)
function Footer({pages, currentPage, changeCurrentPage, selectedIds, deleteUsers}) {
    const [pagesArr, setPagesArr] = useState([]);
    const [showPreviousBtn, setShowPreviousBtn] = useState(false);
    const [showNextBtn, setShowNextBtn] = useState(false);
    const [showFirstPageBtn, setShowFirstPageBtn] = useState(false);
    const [showLastPageBtn, setShowLastPageBtn] = useState(false);
    const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState(true);

    const getDisplay = (stateParam) => {
        if(stateParam) { return 'blueviolet'; }
        else { return 'grey'; }
    }

    useEffect(() => {
        if(selectedIds.length > 0) {
            setIsDeleteBtnDisabled(false);
        }
        else {
            setIsDeleteBtnDisabled(true);
        }
    }, [selectedIds]);

    useEffect(() => {
        let tmpArr = [];
        for(let i=1; i<=pages; i++) {
            tmpArr.push(i);
        }
        setPagesArr(tmpArr);
    }, [pages]);

    useEffect(() => {
        if(currentPage === 1) {
            setShowPreviousBtn(false);
            setShowFirstPageBtn(false);
        }
        else {
            setShowPreviousBtn(true);
            setShowFirstPageBtn(true);
        }
        if(currentPage === pages) {
            setShowNextBtn(false);
            setShowLastPageBtn(false);
        }
        else {
            setShowNextBtn(true);
            setShowLastPageBtn(true);
        }
    }, [currentPage, pages]);

    return (
        <nav className='footer-nav'>
            <ul>
                <button
                    id='delete-rows-btn'
                    style={
                        {
                            border: isDeleteBtnDisabled? 'none': '2px solid palevioletred', 
                            backgroundColor: isDeleteBtnDisabled? 'grey': 'palevioletred',
                            cursor: isDeleteBtnDisabled? 'none' : 'pointer',
                        }
                    }
                    onClick={deleteUsers}
                >Delete Selected</button>
                <span
                    style={{ backgroundColor: getDisplay(showFirstPageBtn) }}
                    onClick={() => {
                        if(currentPage>1) {
                            changeCurrentPage(1);
                        }
                    }}
                >&lt;&lt;</span>
                <span
                    style={{ backgroundColor: getDisplay(showPreviousBtn) }}
                    onClick={() => {
                        if(currentPage>1) {
                            changeCurrentPage(curr => (curr-1));
                        }
                    }}
                >&lt;</span>
                {
                    pagesArr.map(page => {
                        if(page === currentPage) {
                            return (
                                <span key={page} style={{
                                    backgroundColor: 'white'
                                }}>{page}</span>
                            );
                        }
                        else {
                            return (
                                <span key={page} onClick={() => changeCurrentPage(page)}>{page}</span>
                            );
                        }
                    })
                }
                <span
                    style={{ backgroundColor: getDisplay(showLastPageBtn) }}
                    onClick={() => {
                        if(currentPage<pages) {
                            changeCurrentPage(curr => (curr+1));
                        }
                    }}
                >&gt;</span>
                <span
                    style={{ backgroundColor: getDisplay(showNextBtn) }}
                    onClick={() => {
                        if(currentPage<pages) {
                            changeCurrentPage(pages);
                        }
                    }}
                >&gt;&gt;</span>
            </ul>
        </nav>
    );
}

export default Footer;
