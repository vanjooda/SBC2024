// src/admin/pages/res/TotalPage.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelList from '../../components/res/CancelList';
import ResList from '../../components/res/ResList';
import TotalList from '../../components/res/TotalList';



const TotalPage = () => {
    // 컴포넌트 상태 관리
    const [nowComponent, setNowComponent] = useState('TotalList');  //
    const [searchTerm, setSearchTerm] = useState(''); // search기능의 검생어를 정장해놓음 변수

    //리액트에서 지원하는 이동함수
    const navigate = useNavigate();
    //리액트 에서 지원하는 현재url의 정보를 가져오는 함수의 값을 변수에 할당하여 현재 무슨 페이지에 있는지 판별 할 수 있음
    const location = useLocation();

    // 컴포넌트 렌더링 함수
    //스위치문으로 컴포넌트 갈아끼우기
    const renderComponent = () => {
        switch (nowComponent) {
            case 'TotalList':   // 상태 값이 전체리스트의 경우에 출력
                return <TotalList searchTerm={searchTerm} />;
            case 'ResList':     // 상태 값이 예약리스트의 경우에 출력
                return <ResList searchTerm={searchTerm} />;
            case 'CancelList':  // 상태 값이 취소리스트의 경우에 출력
                return <CancelList searchTerm={searchTerm} />;
            default:            // 에러방지를 위해 디폴트를 설정해주고 디폴트는 기본 화면인 전체 리스트로 설정
                return <TotalList searchTerm={searchTerm} />;
        }
    };

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">전체 예약 조회 페이지</h1>



            {/* 드롭다운 스타일의 컴포넌트 선택 셀렉 */}
            <div className="flex justify-end mb-4">
                <select
                    value={nowComponent}    //값은 매개변수
                    onChange={(e) => setNowComponent(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="TotalList">전체 예약 조회</option> {/*1옵션*/}
                    <option value="ResList">예약 완료 조회</option>   {/*2옵션*/}
                    <option value="CancelList">예약 취소 조회</option>{/*3옵션*/}
                </select>
            </div>


            <div className="mt-4 border-t border-gray-300 pt-4">
                {/*전체리스트(TotalList),
                예약리스트(ResList),
                취소리스트(CancelList)중에서 현제 셀렉값이 들어옴 위의 스위치문 참조  */}
                {renderComponent()}
            </div>
        </div>
    );
};

export default TotalPage;
