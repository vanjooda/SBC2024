import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../layouts/CommunityMenu";
import {Outlet, useNavigate} from "react-router-dom";
import { useCallback} from "react";

const CamperIndexPage = () => {
    const navigate = useNavigate()

    const handleClickList = useCallback(() => {
        navigate({pathname: 'list'})
    })
    const handleClickAdd = useCallback(() => {
        navigate({pathname: 'add'})
    })

    return (
        <BasicLayout>
            <CommunityMenu/>
            <div>
                <div>Hi CamperIndexPage Hi</div>
                <div> 여기를 LIST 페이지로 쓰면 될듯 ???</div>
                <Outlet/>
            </div>
        </BasicLayout>
    )
}
export default CamperIndexPage;