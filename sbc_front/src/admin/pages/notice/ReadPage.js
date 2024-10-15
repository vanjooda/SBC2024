// src/admin/pages/notice/ReadPage.js

import React from 'react';
import ReadComponent from '../../components/notice/ReadComponent';


const ReadPage = () => {
    return (
        <div>
            <h1>공지사항 게시판</h1>
            {/*상세페이지 랜더링*/}
            <ReadComponent />
        </div>
    );
};

export default ReadPage;
