import axios from "axios";

const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api`

// 로그인(POST) 요청
export const loginPost = async (loginParam) => {
    const header = {
        headers : {'Content-Type': 'x-www-form-urlencoded'}
    }
    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)

    const result = await axios.post(`${host}/auth/login`, form, header)
    console.log("로그인요청 결과 : ", result);

    return result.data;
}

// 회원가입(POST) 요청
export const joinPost = async (member) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const result = await axios.post(`${host}/member/`, JSON.stringify(member), header);
    console.log(result);
    return result.data;
}

// 이메일 중복체크 요청
export const emailCheck = async (email) => {
    const res = await axios.get(`${host}/auth/emailcheck`,
        {params: {email}});
    console.log(res);
    return res.data;
}

// 이름, 핸드폰 번호로 아이디 찾기
export const findEmail = async (member) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const res = await axios.post(`${host}/auth/findemail`, JSON.stringify(member), header);
    console.log(res);
    return res.data;
}

export default API_SERVER_HOST;
