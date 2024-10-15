

import React, { useState, useRef, useEffect } from 'react';
import {getAllNotices} from "../../api/NoticeApi"; // API 모듈에서 함수 가져오기
import { useNavigate } from 'react-router-dom';


const ListComponent = () => {
    // useNavigate 훅을 사용하여 페이지 이동에 필요한 함수 생성
    const navigate = useNavigate();

    // 공지사항 전체 정보 목록을 저장하는 변수
    const [notices, setNotices] = useState([]);




    // '글쓰기' 버튼 클릭 시 호출되는 함수: 공지 등록 페이지로 이동
    const handleAddClick = () => {
        navigate('/admin/notices/add'); // 공지 등록 페이지 경로로 이동
    };

    // 제목 클릭 시 상세보기 페이지로 이동하는 함수
    const handleTitleClick = (id) => {
        console.log("상세 페이지로 이동할 ID:", id);
        navigate(`/admin/notices/read/${id}`); // 상세보기 페이지 경로로 이동
    };

    // 입력 검증 시 발생한 에러 메시지를 저장하는 변수
    const [error, setError] = useState('');

    // 데이터 불러오는 비동기 함수
    const settingNotices = async () => {
        try {
            //변수 data에 getAllNotices의 Responce.data를 할당
            const data = await getAllNotices();
            //set 생성자(변수)
            setNotices(data);
        } catch (err) {
            console.error('Notice 데이터를 불러오는데 실패했습니다:', err);
            setError('Notice 데이터를 불러오는데 실패했습니다.');
        }
    };

    //useEffect를 사용하여 컴포넌트를 부를 때 최신데이터를 부르는 함수 근데 왜 안댐?
    useEffect(()=>{
        settingNotices();
    },[]);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400">
            <h2 className="text-2xl font-bold mb-4">목 록</h2>

            {/* 공지사항 목록을 보여주는 테이블 */}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    {/* 테이블 헤더 */}
                    <th className="w-1/6 px-4 py-2 border-b-2 border-gray-300 text-left">번호</th>
                    <th className="w-1/2 px-4 py-2 border-b-2 border-l border-gray-300 text-left">제목</th>
                    <th className="w-1/6 px-4 py-2 border-b-2 border-l border-gray-300 text-left">작성일</th>
                    <th className="w-1/6 px-4 py-2 border-b-2 border-l border-gray-300 text-left">조회수</th>
                </tr>
                </thead>
                {/* 공지사항 데이터를 테이블 행으로 출력 */}
                <tbody>
                {notices.map((notice) => (
                    <tr key={notice.nboardId} className="hover:bg-gray-100">
                        <td className="w-1/6 border-t border-gray-300 px-4 py-2 text-left">{notice.nboardId}</td>
                        <td
                            className="w-1/2 border-t border-l border-gray-300 px-4 py-2 text-left text-blue-500 cursor-pointer hover:underline"
                            onClick={() => handleTitleClick(notice.nboardId)} // 제목 클릭 시 호출되는 함수
                        >
                            {notice.nboardTitle}
                        </td>
                        <td className="w-1/6 border-t border-l border-gray-300 px-4 py-2 text-left">{notice.nboardDate}</td>
                        <td className="w-1/6 border-t border-l border-gray-300 px-4 py-2 text-left">{notice.nboardViews}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 모양만 */}
            <div className="mt-4 text-center">
                <button className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700">&lt;</button>
                <span className="mx-2">1  2  3  4  5</span>
                <button className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700">&gt;</button>
            </div>

            {/* 글쓰기 버튼 */}
            <div className="mt-4 text-right">
                <button
                    onClick={handleAddClick} // 글쓰기 버튼 클릭 시 호출되는 함수
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    공지 쓰기
                </button>
            </div>
        </div>
    );
};

export default ListComponent;
