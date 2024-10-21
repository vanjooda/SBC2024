import useCustomMove from '../../../hooks/useCustomMove';
import React, {useCallback, useEffect, useState} from 'react';
import { getCommentList, getList, searchBoard } from '../../api/qnaApi';
import BootstrapPagination from "../util/BootstrapPagination";
import BoardSearchComponent from "../util/BoardSearchComponent";
import Table from "react-bootstrap/Table";
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import fileImage from "../../../images/filehere.png";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
};

function ListComponent(props) {
    const { page, size } = useCustomMove();
    const [currentPage, setCurrentPage] = useState(page); // 현재 페이지 상태
    const [serverData, setServerData] = useState(initState);
    const [commentCounts, setCommentCounts] = useState({});
    const [searchParams, setSearchParams] = useState({ type: 'name', keyword: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = searchParams.keyword
                    ? await searchBoard(searchParams.type, searchParams.keyword, { page: currentPage, size })
                    : await getList({ page: currentPage, size });

                setServerData(data);

                const commentCounts = await Promise.all(
                    data.dtoList.map(async (qb) => {
                        const commentsData = await getCommentList(qb.qboardID);
                        return { qbID: qb.qboardID, count: commentsData.length || 0 };
                    })
                );

                const countsMap = commentCounts.reduce((acc, { qbID, count }) => {
                    acc[qbID] = count;
                    return acc;
                }, {});
                setCommentCounts(countsMap);
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [currentPage, size, searchParams]); // currentPage를 의존성으로 추가

    const totalPages = serverData.totalPage;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // 현재 페이지를 업데이트
    };

    const handleSearch = (type, keyword) => {
        setSearchParams({ type, keyword });
    };

    const handleAddClick = () => {
        navigate('/admin/qnas/add');
    };

    const handleReadClick = (qbID) => {
        navigate(`/admin/qnas/read/${qbID}`);
    };

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}${MM}${dd}`;
    };

    return (
        <div>
            <Table bordered hover responsive className="text-sm-center">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                    <th>답변상태</th>
                </tr>
                </thead>
                <tbody>
                {serverData.dtoList.map(qb => (
                    <tr key={qb.qboardID}>
                        {qb.member.memberRole === "ROLE_ADMIN" ? (
                            <td>
                                <p style={{
                                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                                    color: 'red',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    fontWeight: 'bold',
                                    border: 'red 1px solid',
                                }}>공지</p>
                            </td>
                        ) : (
                            <td>{qb.qboardID}</td>
                        )}
                        <td onClick={() => handleReadClick(qb.qboardID)}>
                            {qb.qboardTitle}
                            {qb.qboardAttachment && (
                                <img
                                    src={fileImage}
                                    alt="첨부 이미지"
                                    style={{
                                        width: '1em', // 글자 크기에 맞춰 조정
                                        height: '1em', // 글자 크기에 맞춰 조정
                                        verticalAlign: 'middle', // 수직 정렬
                                        marginLeft: '4px' // 제목과 이미지 사이 간격 조정
                                    }}
                                />
                            )}
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red'
                            }}>
        {commentCounts[qb.qboardID] > 0 ? `[${commentCounts[qb.qboardID]}]` : ''}
    </span>
                        </td>
                        <td>{qb.member.memberName}</td>
                        <td>{formatDate(new Date(qb.qboardDate))}</td>
                        <td>{qb.qboardViews}</td>
                        <td>
                            {qb.member.memberRole === "ROLE_ADMIN" ? '' :
                                qb.qboardAsked.trim().toUpperCase() === "Y" ? "답변 완료" : "미답변"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button onClick={handleAddClick}>글쓰기</Button>

            <BootstrapPagination
                currentPage={currentPage} // 수정된 현재 페이지 상태
                totalPages={totalPages}
                onPageChange={handlePageChange} // 페이지 변경 함수
            />
            <BoardSearchComponent onSearch={handleSearch}/>
        </div>
    );
}

export default ListComponent;