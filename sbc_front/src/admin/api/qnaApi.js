import axios from "axios"

// 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/admin/qnas`

// getList : 페이지 처리 및 전체 게시글 목록 가져오기
export const getList = async (pageParam) => {
    const {page,size} = pageParam
    const res = await axios.get(`${prefix}/list`, {params: {page:page, size:size}})

    console.log(res.data)

    return res.data
}

// getCommentList : 해당 게시글의 댓글 목록 가져오기
export const getCommentList = async (qbID) => {
    try {
        const res = await axios.get(`${prefix}/comments/list/${qbID}`);
        const count = res.data ? Object.keys(res.data).length : 0; // 데이터가 있는 경우만 카운트
        console.log(res.data);
        console.log(`댓글 갯수 : ${count}`);
        return res.data;
    } catch (error) {
        console.error('댓글 리스트 가져오기 중 오류 발생:', error);
        return []; // 오류 발생 시 빈 배열 반환
    }
};

// searchBoard : 게시글 검색
export const searchBoard = async (type, keyword, pageParam) => {
    const { page, size } = pageParam;

    // 검색할 파라미터 설정
    const params = {
        page: page,
        size: size,
        type: type,
        keyword: keyword
    };

    // 요청 보내기
    const res = await axios.get(`${prefix}/search`, { params });

    console.log(res.data);
    return res.data;
}

// getOne : 게시글 상세 페이지(read)
export const getOne = async (qbID) => {
    const res = await axios.get(`${prefix}/${qbID}`);
    console.log(res.data);
    return res.data
}