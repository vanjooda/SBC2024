import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/member`

// 예약 내역 (전체) 가져오기
export const getReservations = async (memberId) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const res = await jwtAxios.post(`${host}/memberRes`, JSON.stringify(memberId), header);
    return res.data;
}

// 예약 내역 (상세) 가져오기
export const getResDetail = async (resId) => {
    const res = await jwtAxios.post(`${host}/${resId}`);
    return res.data;
}

// 예약 취소 (상태를 예약완료 -> 예약취소로 변경)
export const cancleRes = async (resId) => {
    const res = await jwtAxios.put(`${host}/${resId}`);
    return res.data;
}

// 회원정보 수정 - 비밀번호 인증
export const authPw = async (member) => {
    console.log('back 보내기 전 member : ',member)
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const res = await jwtAxios.post(`${host}/pwauth`, member, header);
    console.log('mypageApi - authPw 결과 : ', res);
    return res.data;
}