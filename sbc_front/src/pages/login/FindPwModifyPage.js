import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import '../../css/login.css'

const FindPwModifyPage = () => {

    return(
        <BasicLayout>
            <LoginMenu/>
        <div>
            비밀번호 변경
        </div>
        </BasicLayout>
    )

}

export default FindPwModifyPage;