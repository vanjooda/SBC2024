import axios from "axios";
//서버 주소
export const API_SERVER_HOST = 'http://localhost:8080';

export const prefix = `${API_SERVER_HOST}/api/campers`;

//상세페이지
export const getOne = async (cBoardId) => {
    const res = await axios.get(`${prefix}/${cBoardId}`);
    return res.data;
};

//목록페이지
export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });
    return res.data;
};

//추가
export const postAdd = async (camperObj) => {
    const res = await axios.post(`${prefix}/`, camperObj);
    return res.data;
};

//삭제
export const deleteOne = async (cBoardId) => {
    const res = await axios.delete(`${prefix}/${cBoardId}`);
    return res.data;
};

// 수정
// API 호출을 위한 putOne 함수
export const putOne = async (cBoardId, camperObj) => {
    try {
        const res = await axios.put(`${prefix}/${cBoardId}`, camperObj, {
            headers: {
                'Content-Type': 'application/json'  // Content-Type 설정
            }
        });
        return res.data; // 응답 데이터 반환
    } catch (error) {
        console.error('수정 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
};
// api/camperApi.js 회원정보 가져오기
export const getMemberById = async (memberId) => {
    const response = await fetch(`/api/members/${memberId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch member data');
    }
    return await response.json();
};



