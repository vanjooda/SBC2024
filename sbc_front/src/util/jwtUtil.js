import axios from "axios";
import API_SERVER_HOST from "../api/memberApi";
import {getCookie, setCookie} from "./cookieUtil";

// STS-7 p.37 (342) 참고
const jwtAxios = axios.create();

// Refresh Token
const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers: {'Authorization': `Bearer ${accessToken}`}};
    const res = await axios(`${host}/api/auth/refresh?refreshToken=${refreshToken}`, header);
    console.log("-------------"+res.data);
    return res.data;
}

// 요청 전
const beforeRequest = (config) => {
    console.log("before request")
    return config;
}

// 요청 실패
const requestFail = (err) => {
    console.log("requset error")
    return Promise.reject(err);
}

// 응답 전
const beforeResponse = async (res) => {
    console.log("before response")
    console.log(res)

    const data = res.data;

    if(data && data.error === "ERROR_ACCESS_TOKEN"){ // 해당 Error인 경우 리프레쉬 토큰으로 한 번 더 호출
        const memberCookieValue = getCookie("memberCookie")
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);
        console.log("refresh JWT RESULT : ", result);

        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie("memberCookie", JSON.stringify(memberCookieValue), 1);

        // 갱신한 토큰으로 다시 시도
        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);
    }
    return res;
}

// 응답 실패
const responseFail = (err) => {
    console.log("response fail error")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeRequest, requestFail);
jwtAxios.interceptors.response.use(beforeResponse, responseFail);
export default jwtAxios;