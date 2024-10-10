import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil";

const initState = {
    member : {
        memberEmail: ''
    },
}

// 쿠키로 저장된 로그인 결과 전달
const loadMemberCookie = () => {
    const memberInfo = getCookie("memberCookie")
    if(memberInfo){ // 쿠키가 있으면 JSON 문자열을 객체로 파싱
        try {
            return JSON.parse(memberInfo);
        } catch (e){
            console.log("ERROR PARSING MEMBER COOKIE : ", e);
            return null;
        }
    }
    // 쿠키가 없으면 null 반환
    return null;
}

// 로그인 API 서버에 요청
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState : loadMemberCookie() || initState, // 쿠키가 없으면 초기값 사용
    reducers : {
        logout : (state, action) => {
            removeCookie("memberCookie") // 쿠키 삭제
            state.member.memberEmail = '';
        }
    },
    // 비동기 호출상태에 따른 동작 (1. fulfilled, 2. pending, 3. rejected)
    extraReducers : (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            // 로그인 완료
            console.log('fulfilled', action.payload);
            const payload = action.payload;

            if(!payload.error){
                setCookie("memberCookie", JSON.stringify(payload),1); // 쿠키 1일
                console.log('쿠키 저장');
                state.member.memberEmail = payload.member.memberEmail;
            }
            return state; // 기본 상태 반환
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending : 처리중")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected : 오류")
        })
    }
})

export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer;
