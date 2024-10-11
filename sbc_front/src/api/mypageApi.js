import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/member`

// 예약 내역 가져오기
export const getReservations = async (memberId) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const res = await axios.post(`${host}/memberRes`, JSON.stringify(memberId), header);
    console.log(res);
    return res.data;
}
