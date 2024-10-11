import { Suspense, lazy } from "react";
import CampingInfoRouter from "./CampingInfoRouter";
import NoticeRouter from "./NoticeRouter";
import ResRouter from "./ResRouter";
import Spinner from 'react-bootstrap/Spinner';
import MypageRouter from "./MypageRouter";
import {Navigate} from "react-router-dom";
import joinRouter from "./JoinRouter";
import CamperRouter from "./CamperRouter";
import {createBrowserRouter} from "react-router-dom";
import resRouter from "../admin/router/resRouter";
import camperRouter from "../admin/router/camperRouter";
import noticeRouter from "../admin/router/noticeRouter";
import qnaRouter from "../admin/router/qnaRouter";
import reviewRouter from "../admin/router/reviewRouter";
import statsRouter from "../admin/router/statsRouter";

const Loading = <Spinner animation="border" />;

/*
사용자 페이지
*/

const Main = lazy(() => import("../pages/MainPage"))
const Campingindex = lazy(() => import("../pages/campinginfo/CampingIndexPage"))
const ResIndex = lazy(() => import("../pages/reservation/ResIndexPage"))
const NoticeIndex = lazy(() => import("../pages/community/NoticeIndexPage"))
const Login = lazy(() => import("../pages/login/LoginPage"))
const Join = lazy(() => import("../pages/login/JoinIndexPage"))
const FindPw = lazy(() => import("../pages/login/FindPwPage"))
const FIndEmail = lazy(() => import("../pages/login/FindEmailPage"))
const ModifyPw = lazy(() => import("../pages/login/FindPwModifyPage"))
const MyPageIndex = lazy(() => import("../pages/member/MypageIndexPage"))
const CamperIndex = lazy(() =>  import("../pages/campers/CamperIndexPage"))


/*
관리자 페이지
*/

// 관리자 메인
const A_Main = lazy(() => import("../admin/pages/MainPage"))
//구역관리페이지
const Site = lazy(() => import("../admin/pages/site/SiteManagementsPage.js"))
//예약 인덱스 페이지(전체/취소/예약은 인덱스페이지 안에서 Outlet으로 분류됨 )

const A_ResIndex = lazy(() => import("../admin/pages/res/ResIndexPage.js"))
const MemberIndex = lazy(() => import("../admin/pages/member/MemberIndexPage"))
const StatsIndex = lazy(() => import("../admin/pages/stats/StatsIndexPage"))

// 커뮤니티
const A_CamperIndex = lazy(() => import("../admin/pages/camper/CamperIndexPage"))
const A_NoticeIndex = lazy(() => import("../admin/pages/notice/NoticeIndexPage"))
const A_QnaIndex = lazy(() => import("../admin/pages/qna/QnaIndexPage"))
const A_ReviewIndex = lazy(() => import("../admin/pages/review/ReviewIndexPage"))

// 관리자 주소
const A_prefix = "admin/"

const root = createBrowserRouter([
    // 사용자

    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path: "logout",
        element: <Navigate replace to="/"/>
    },
    {
        path: "findpw",
        element: <Suspense fallback={Loading}><FindPw/></Suspense>
    },
    {
        path: "findpw/mod",
        element: <Suspense fallback={Loading}><ModifyPw/></Suspense>
    },
    {
        path: "findemail",
        element: <Suspense fallback={Loading}><FIndEmail/></Suspense>
    },
    {
      path: "join",
      element: <Suspense fallback={Loading}><Join/></Suspense>,
      children: joinRouter()
    },
    {
        path: "camping",
        element: <Suspense fallback={Loading}><Campingindex/></Suspense>,
        children: CampingInfoRouter()
    },
    {
        path: "res",
        element: <Suspense fallback={Loading}><ResIndex/></Suspense>,
        children: ResRouter()
    },
    {
        path: "notice",
        element: <Suspense fallback={Loading}><NoticeIndex/></Suspense>,
        children: NoticeRouter()
    },
    {
        path: "mypage",
        element: <Suspense fallback={Loading}><MyPageIndex/></Suspense>,
        children : MypageRouter()
    },
    {
        path: "campers",
        element: <Suspense fallback={Loading}><CamperIndex/></Suspense>,
        children: CamperRouter()
    },

    // 관리자

    {//메인페이지 라우터
        path: `${A_prefix}`,
        element: <Suspense fallback={Loading}><A_Main/></Suspense>
    },

    {//위에서 선언한 lazy지연기능이 포함된 페이지 이동 함수
        //예약관리의 기본경로 자식은 resRouter
        //경로가 하나라 라우터 필요 x
        path: `${A_prefix}site`,
        element: <Suspense fallback={Loading}><Site/></Suspense>,

    },
    {//root 페이지 위에서 선언한 lazy지연기능이 포함된 페이지 이동 함수
        //예약관리의 기본경로 자식은 resRouter
        path: `${A_prefix}res/`,
        element: <Suspense fallback={Loading}><A_ResIndex/></Suspense>,
        children: resRouter()

    },
    { // 기타 모든 경로에 대한 404 페이지
        path: "*",
        element: <div>404 페이지를 찾을 수 없습니다.</div>
    },
    {
        path: `${A_prefix}campers/`,
        element: <Suspense fallback={Loading}><A_CamperIndex/></Suspense>,
        children: camperRouter()
    },
    {
        path: `${A_prefix}notices/`,
        element: <Suspense fallback={Loading}><A_NoticeIndex/></Suspense>,
        children: noticeRouter()
    },
    {
        path: `${A_prefix}qnas/`,
        element: <Suspense fallback={Loading}><A_QnaIndex/></Suspense>,
        children: qnaRouter()
    },
    {
        path: `${A_prefix}reviews/`,
        element: <Suspense fallback={Loading}><A_ReviewIndex/></Suspense>,
        children: reviewRouter()
    },
    {
        path: `${A_prefix}stats/`,
        element: <Suspense fallback={Loading}><StatsIndex/></Suspense>,
        children: statsRouter()
    }
])

export default root;