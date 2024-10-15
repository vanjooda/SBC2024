import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Search from '../res/Search'; // 검색 컴포넌트 경로
import { getAllRes } from '../../api/ResApi'; // 실제 데이터를 가져오기 위한 API 함수 임포트

const CancelList = () => {
    // 예약 데이터를 저장하는 변수
    const [reservations, setReservations] = useState([]);

    // 에러 문구 세팅 변수
    const [error, setError] = useState('');

    // 검색어 상태 변수
    const [searchTerm, setSearchTerm] = useState('');

    // 선택된 컬럼 상태 변수, 셀렉값의 기본은 예약번호
    const [selectedColumn, setSelectedColumn] = useState('resId');

    // 데이터 불러오는 비동기 함수
    const settingReservation = async () => {
        try {
            const data = await getAllRes(); // API 호출하여 데이터 가져오기
            setReservations(data);
        } catch (err) {
            console.error('예약 취소 데이터를 불러오는데 실패했습니다:', err);
            setError('예약 취소 데이터를 불러오는데 실패했습니다.');
        }
    };

    // 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        settingReservation();
    }, []);


    // 검색어와 선택된 컬럼에 따라 필터링된 예약 데이터 할당
    const filteredReservations = reservations.filter((reservation) => {

        // resStatus가 "예약취소"가 아닌 경우 제외
        if (reservation.resStatus !== "예약취소") return false;

        //검색어가 없다면 true를 반환해서 필터링 되지 않은 데이터를 출력
        if (!searchTerm) return true;

        // 선택된 컬럼의 값을 문자열로 변환하고 소문자로 변경하여 대소문자를 구분하지 않도록 함
        //밸류를 문자열로 바꾼후 LowerCase를 적용시킴
        const value = reservation[selectedColumn]?.toString().toLowerCase();

        // 검색어를 소문자로 변환하고, 해당 값에 검색어가 포함되어 있는지 확인
        // value.includes(searchTerm을 소문자로 변경한 값) - 포함된 것만 반환
        return value?.includes(searchTerm.toLowerCase());


    });

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* **페이지 제목** */}
            <h2 className="text-2xl font-bold mb-4">예약 취소 리스트</h2>

            {/* 서치 컴포넌트(자식) */}
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />

            {/* **에러 메시지 표시** */}
            {error && <div className="text-danger mb-4">{error}</div>}

            {/* **예약 정보 테이블** */}
            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr>
                    <th className="text-center">예약번호</th>
                    <th className="text-center">예약한 날짜</th>
                    <th className="text-center">예약 구역 이름</th>
                    <th className="text-center">회원 이름</th>
                    <th className="text-center">회원 전화번호</th>
                    <th className="text-center">이용자명</th>
                    <th className="text-center">이용자 전화번호</th>
                    <th className="text-center">취소 날짜</th>
                    <th className="text-right">환불금액</th>
                </tr>
                </thead>

                <tbody>
                {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                        <tr key={reservation.resId}>
                            <td className="text-center">{reservation.resId}</td>
                            <td className="text-center">{reservation.resDate}</td>
                            <td className="text-left">{reservation.site.siteName}</td>
                            <td className="text-left">{reservation.member.memberName}</td>
                            <td className="text-center">{reservation.member.memberPhone}</td>
                            <td className="text-left">{reservation.resUserName}</td>
                            <td className="text-center">{reservation.resUserPhone}</td>
                            <td className="text-center">{reservation.resCancelDate}</td>
                            <td className="text-right">{reservation.resTotalPay}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="text-center">예약 데이터가 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default CancelList;