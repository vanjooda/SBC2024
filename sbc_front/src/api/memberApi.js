import axios from "axios";

const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api`

const rest_api_key = `9ee86052c294ac349a0fe4f3546cc55a`
const redirect_uri = `http://localhost:3000/login/kakao`
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`
const access_token_url = `https://kauth.kakao.com/oauth/token`

// 로그인(POST) 요청
export const loginPost = async (loginParam) => {
    const header = {
        headers : {'Content-Type': 'x-www-form-urlencoded'}
    }
    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)

    const result = await axios.post(`${host}/auth/login`, form, header)
    //console.log(result);

    return result.data;
}

// 카카오 로그인 요청
export const getkakaoLoginLink = () => {
    console.log("카카오 로그인 요청")
    return `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
}

// 카카오 토큰 가져오기
export const getKakaoAccessToken = async (authCode) => {
    const header = {
        headers :{
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode,
    }
    const res = await axios.post(access_token_url, params, header)
    const accessToken = res.data.access_token
    return accessToken
}

// 카카오 - 자바API 서버 호출
export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${host}/auth/kakao?accessToken=${accessToken}`)
    return res.data
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

// 카카오 회원가입 요청
export const joinKakaoPost = async (member) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const result = await axios.post(`${host}/member/kakao/`, JSON.stringify(member), header);
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

// 이름 + 핸드폰 번호로 이메일 찾기
export const findEmail = async (member) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const res = await axios.post(`${host}/auth/findemail`, JSON.stringify(member), header);
    console.log(res);
    return res.data;
}

// 비밀번호 찾기 1 - 이름 + 이메일로 회원 조회
export const findpwMember = async (member) => {
    const header = {
        headers:{'Content-Type': 'application/json'}
    }
    const res = await axios.post(`${host}/auth/findpw`, JSON.stringify(member), header);
    console.log(res); // 일치하는 회원이 존재하면 "result" : "exist" 못 찾으면 "not_exist" 반환
    return res.data;
}

// 비밀번호 찾기 2 - 비밀번호 변경
export const modifyPw = async (member) => {
    console.log('값 확인 : ', member)
    // const header = {
    //     headers:{'Content-Type': 'application/json'}
    // }
    const res = await axios.post(`${host}/auth/modpw`, member);
    console.log(res); // "msg" : "success" 또는 "fail
    return res.data;
}

export default API_SERVER_HOST;
