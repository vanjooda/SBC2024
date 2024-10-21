import CustomerComponent from "../../components/stats/CustomerComponent";
import ReviewComponent from "../../components/stats/ReviewComponent";
import {useState} from "react";
import DateSearchComponent from "../../components/stats/DateSearchComponent";
import {Tab, Tabs} from "react-bootstrap";
import SalesComponent from "../../components/stats/SalesComponent";
import ResRateComponent from "../../components/stats/ResRateComponent";
import ResCancelComponent from "../../components/stats/ResCancelComponent";
import {SiteSelect} from "./ReservationSalesPage";

const CustomerPage = () => {
    const [currentComponent, setCurrentComponent] = useState('customer');

    const handleButtonClick = (component) => {
        setCurrentComponent(component);
    }

    return (
        <>
            <h1>고객 통계</h1>
            <hr/>
            <nav>
                <Tabs
                    defaultActiveKey="customer"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="customer" title="예약 고객 현황">
                        <CustomerComponent/>
                    </Tab>
                    <Tab eventKey="review" title="고객 리뷰 현황">
                        <ReviewComponent/>
                    </Tab>
                </Tabs>
            </nav>

        </>
    );
}

export default CustomerPage;