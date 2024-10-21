import BasicLayout from '../layouts/BasicLayout';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import '../css/mainPage.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useNavigate} from "react-router-dom";

const MainPage = () => {

    const navigate = useNavigate();

    return(
        <BasicLayout>

            {/* 메인 사진 */}
            <Carousel>
                <Carousel.Item>
                    <div id='slider1'>
                        <div className='slider1_text'>
                            <h2>일상 속 힐링타임</h2>
                            <h5>행복한 추억과 낭만을 만들어가는 도덕산의 힐링 캠핑 명소</h5>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div id='slider2'>
                        <div className='slider1_text'>
                            <h2></h2>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

            {/* 중간 퀵메뉴*/}
            <ButtonGroup aria-label="Basic example" className='quickmenuwrap'>
                <Button variant="light" onClick={()=>navigate('/res/realtime')}>실시간 예약</Button>
                <Button variant="light" onClick={()=>navigate('/mypage/res')}>예약 확인</Button>
                <Button variant="light" onClick={()=>navigate('/res/info')}>이용 요금 안내</Button>
                <Button variant="light" onClick={()=>navigate('/camping/guide')}>시설안내도</Button>
                <Button variant="light" onClick={()=>navigate('/camping/how')}>찾아오시는 길</Button>
            </ButtonGroup>

            {/* 서스펜션 브릿지 캠핑장 커뮤니티 */}
            <div className='text-center m-5'>
                <div className="communitywrap">
                    <h3>서스펜션 브릿지 캠핑장 커뮤니티</h3>
                    <div className='m-4'>
                        <h5>S U S P E N S I O N B R I D G E C A M P I N G</h5>
                    </div>
                </div>

                {/* 공지사항 */}
                <div id="main_board_left" className="wrap">
                    <div className="main_board_inner">
                        <div id="tabs">
                            <ul className="etabs">
                                <img width="50" height="50" src="https://img.icons8.com/?size=100&id=KLsuT6PnzOQL&format=png&color=000000" alt="error"/>
                                <li className="etl_01">
                                    <h5>공지사항</h5>
                                </li>
                            </ul>
                            <div id="tabs-1">
                                <ul className="board_list">
                                <li>
                                        <a href="#">
                                            <p className="date_day"><span className="big_day">16</span>
                                                <br/>2024.10</p>
                                            <h6>부전-마산 복선전철 공사 관련</h6>
                                            <span className="s_noti_desc">안녕하세요 관리자입니다.캠핑장 옆 인근에 이전부터 진행중인 부전-마산 복선전철 공사가 아직 진행중이라 다소 소음과 진동이 발생될 수 있습니다.소음이나 진동에 민감하신 분께서는 B사이트로 예약을 해주시면 감사하겠습니다.</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <p className="date_day"><span className="big_day">30</span>
                                                <br/>2024.09</p>
                                            <h6>10월12~13일 사상강변축제</h6>
                                            <span className="s_noti_desc">안녕하세요10.12~13일&nbsp; 삼락생태공원 내 문화마당에서 사상강변축제가 있습니다18:00부터23시까지 음악회 불꽃축제로 소음발생 예상됩니다이점 참고하셔서 예약 부탁드리겠습니다감사합니다&nbsp;</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <p className="date_day"><span className="big_day">11</span>
                                                <br/>2024.06</p>
                                            <h6>이용불가 회원관리</h6>
                                            <span className="s_noti_desc">안녕하세요 삼락오토캠핑장입니다.3회이상 취소시 이용불가 회원 분들께서 문의주셔서 공지 합니다.해당 시스템은 메크로사용이나 단순취소로 인해 다른분들께 피해가 되는 사례를 막고자 만들어진 시스템이었습니다.다만,현재는 무의미하게 작용되고 있어 시스템을 삭제요청하였으나 불가능하다는 답변을 받았습니다.일정변경이나 자리변경으로 인해 아이디가 잠궈지는 경우가 많아 이용불가로 잠궈진 아이디 해제를 원하시는분께서는010 2582 9062로 아이디와 성함을 기재하셔서 &quot;이용불가 해제요청&quot; 이라고 보내주시면 즉시 해제가 가능합니다.감사합니다.</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div id="tabs-2">
                                <ul className="board_list">
                                </ul>
                            </div>
                        </div>

                        <div className="board_right">
                            <div className="facility">
                                <a href="/camping/guide">
                                <h2>시설안내</h2>
                                <p>
                                    <span>삼락오토캠핑장</span>에서<br/>
                                    원하시는정보를 찾아보세요!
                                </p>
                                </a>
                            </div>
                            <div className="call">
                                <h2>문의 및 안내전화</h2>
                                <p className="call_number">
                                    031-1111-7777, <br/> 010-3113-1331
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginBottom:'150px'}}></div>


        </BasicLayout>
    );
}

export default MainPage;