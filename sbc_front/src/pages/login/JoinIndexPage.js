import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import {Outlet} from "react-router-dom";
import "../../css/join.css";

const JoinIndexPage = () => {
    return(
        <BasicLayout>
            <LoginMenu/>
            <div style={{marginTop : '10px'}}>
                <h3>회원가입</h3>
                <hr></hr>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default JoinIndexPage;