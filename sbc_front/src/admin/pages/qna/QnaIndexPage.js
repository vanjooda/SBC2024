import {Outlet, useNavigate} from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../components/menus/CommunityMenu";
import useCustomLogin from "../../../hooks/useCustomLogin";

const QnaIndexPage = () =>{

    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if(!isLogin){
        alert('회원만 이용가능합니다.')
        return moveToLoginReturn()
    }

    return(
        <BasicLayout>
            <div>
            <CommunityMenu/>
            </div>
            <div><h1>문의 게시판</h1></div>
            <div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default QnaIndexPage;