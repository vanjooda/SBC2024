import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../components/menus/CommunityMenu";

const CamperIndexPage = () =>{
    return(
        <BasicLayout>
            <div>
            <CommunityMenu/>
            </div>
            <div>
                <div> Camper Index Page </div>
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default CamperIndexPage;