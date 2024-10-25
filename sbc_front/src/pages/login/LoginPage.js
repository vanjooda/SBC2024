import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import '../../css/login.css'
import {useState} from "react";
import useCustomLogin from "../../hooks/useCustomLogin"
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [loginParam, setLoginParams] = useState({email : '',pw : ''})
    const { doLogin, moveToPath } = useCustomLogin()
    const navigate = useNavigate();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;
        setLoginParams({...loginParam});
    }

    const handleClickLogin = (e) => {
        e.preventDefault();
        doLogin(loginParam)
            .then(data => {
                //console.log('로그인 정보', data);
                if(data.error){
                    alert('이메일과 비밀번호를 확인해주세요.')
                } else{
                    //alert('로그인 성공')
                    if(data.member.memberRole === 'ROLE_ADMIN'){
                        moveToPath('/admin')
                    }else{
                        moveToPath('/')
                    }
                }
            })
    }

    return(
        <BasicLayout>
            <LoginMenu/>

            <div id="loginwrap">
                <div>
                    <h3>로그인</h3>
                </div>
                <div >
                    <form id="loginbox">
                        <input type="email" name="email" value={loginParam.email} onChange={handleChange}
                               placeholder={" 이메일을 입력해주세요"} style={{fontSize:"13px"}}></input><br></br>
                        <input type="password" name="pw" value={loginParam.pw} onChange={handleChange}
                               placeholder={" 비밀번호 (영소문자, 숫자, 특수문자 포함 10-15자)"} style={{fontSize:"13px"}}></input>
                        <div className="btn-box">
                            <button onClick={handleClickLogin} className={"loginbutton_default"}>로그인</button>
                            <br></br>
                        </div>
                    </form>
                </div>
                <div className={"findwrap"}>
                    <button className={"findbutton"} onClick={() => navigate('/findemail')}>이메일찾기</button>
                    <button className={"findbutton"} onClick={() => navigate('/findpw')}>비밀번호찾기</button>
                    <button className={"findbutton"} onClick={() => navigate('/join/agreed')}>회원가입</button>
                </div>
            </div>

        </BasicLayout>
    );
}

export default LoginPage;