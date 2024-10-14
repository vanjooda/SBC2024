import "../../css/mypage.css"
import {useSelector} from "react-redux";
import {cancleRes, getReservations} from "../../api/mypageApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import {useEffect, useState} from "react";
import useCustomMove from "../../hooks/useCustomMove";
import {useNavigate} from "react-router-dom";

const initState = {
    resList: [],
}


function handleReview(resId) {
    
}

const MyPageResPage = () => {

    const loginState = useSelector((state) => state.loginSlice)
    const [serverData, setServerData] = useState(initState);
    const { refresh} = useCustomMove()
    const navigate = useNavigate();

    const { exceptionHandle } = useCustomLogin()
    const memberId = loginState.member.memberId;

    useEffect(() => {
        getReservations(memberId).then(data => {
            setServerData(data);
            console.log(serverData)
        }).catch(error => {
            console.log('오류')
            exceptionHandle(error);
        });
    }, [refresh]);


    const handleClickResId = (e) => {
        const resId = e.target.value;
        navigate(`/mypage/detail?resId=${resId}`);
    };


    function handleCancel(resId) {
        try {
            cancleRes(resId);
            navigate('/mypage/res')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>예약 내역</h3>
            <div className="tablewrap">
            {serverData.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>예약번호</th>
                        <th>예약일</th>
                        <th>입실일</th>
                        <th>퇴실일</th>
                        <th>결제금액</th>
                        <th>상태</th>
                        <th>비고</th>
                    </tr>
                    </thead>
                    <tbody>
                    {serverData.map((reservation) => (
                        <tr key={reservation.resId}>
                            <td><button className="resbtn" onClick={handleClickResId} value={reservation.resId}>{reservation.resId}</button></td>
                            <td>{reservation.resDate}</td>
                            <td>{reservation.checkinDate}</td>
                            <td>{reservation.checkoutDate}</td>
                            <td>{reservation.resTotalPay} 원</td>
                            <td>{reservation.resStatus}</td>
                            <td>{reservation.resStatus === '예약완료' && (
                                <button onClick={() => handleCancel(reservation.resId)} className="canclebtn">예약취소</button>
                            )}
                                {reservation.resStatus === '예약취소' && (
                                    <span>-</span>
                                )}
                                {reservation.resStatus === '사용완료' && (
                                    <button onClick={() => handleReview(reservation.resId)} className="reviewbtn">리뷰작성</button>
                                )}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>예약 정보가 없습니다.</p>
            )}
            </div>
        </div>
    );
}

export default MyPageResPage;