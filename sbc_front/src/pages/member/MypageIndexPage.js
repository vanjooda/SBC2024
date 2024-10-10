import BasicLayout from "../../layouts/BasicLayout";
import MypageMenu from "../../layouts/MypageMenu";
import {Outlet} from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import {useSelector} from "react-redux";

const MypageIndexPage = () => {

    const loginState = useSelector(state => state.loginSlice);


    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if(!isLogin){
        return moveToLoginReturn()
    }

    return(
        <BasicLayout>
            <MypageMenu/>
            <div>
                <Outlet/>
                {/* loginState.memberEmail은 현재 loginSlice의 memberEmail을 참조함 */}
                <div>이메일: {loginState.member.memberEmail}</div>
                <div>이름: {loginState.member.memberName}</div>
                <div>생일 : {loginState.member.memberBirth}</div>
            </div>
        </BasicLayout>
    );
}

export default MypageIndexPage;