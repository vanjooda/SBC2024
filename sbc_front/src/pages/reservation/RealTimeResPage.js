import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import campingImg from "../../images/campingimg.png"
import OctComponent from "../../components/campingRes/Month/OctComponent";
import NovComponent from "../../components/campingRes/Month/NovComponent";
import DecComponent from "../../components/campingRes/Month/DecComponent";
import JanComponent from "../../components/campingRes/Month/JanComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import {useNavigate} from "react-router-dom";

const RealTimeResPage = () => {

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    const [direction, setDirection] = useState(null); // 방향 상태 추가

    const monthsToAdd = 2;
    const monthSum = (currentMonth + monthsToAdd - 1) % 12 + 1;

    const handleClick = (dir) => {
        setDirection(dir); // 클릭한 방향을 상태에 저장
    };

    useEffect(() => {
        if (direction) { // direction 이 null 이 아닐 때만 실행
            let newYear = year;
            let newMonth = month;

            if (direction === "prev") {
                newMonth -= 1;
                if (newMonth < 1) {
                    newMonth = 12;
                    newYear -= 1;
                }
            } else if (direction === "next") {
                newMonth += 1;
                if (newMonth > 12) {
                    newMonth = 1;
                    newYear += 1;
                }
            }

            setYear(newYear);
            setMonth(newMonth);

            setDirection(null); // direction 상태 초기화
        }
    }, [direction, year, month]);

    const navigate = useNavigate();

    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if(!isLogin){
        return moveToLoginReturn()
    }

    return (
        <div>
            <div style={{marginBottom: "20px"}}><h3>구역지도</h3></div>
            <div style={{
                marginBottom: "30px"
            }}>
                <img style={{
                }} src={campingImg} alt="안나와 왜"/>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "40px",
                }}
            >
                {(year !== currentYear || currentMonth !== month) && (
                    <Button
                        variant="success"
                        className="move"
                        onClick={() => handleClick("prev")}
                    >
                        이전달
                    </Button>
                )}

                <h3 style={{display: "inline", margin: "0 30px"}}>
                    <b>
                        {year}.{month < 10 ? `0${month}` : month}
                    </b>
                </h3>

                {((year < currentYear && year !== currentYear) || month !== monthSum) && (
                    <Button
                        variant="success"
                        className="move"
                        onClick={() => handleClick("next")}
                    >
                        다음달
                    </Button>
                )}
            </div>
            <div>
                {year === 2024 && month === 10 && (
                    <OctComponent></OctComponent>
                )}

                {year === 2024 && month === 11 && (
                    <NovComponent></NovComponent>
                )}

                {year === 2024 && month === 12 && (
                    <DecComponent></DecComponent>
                )}

                {year === 2025 && month === 1 && (
                    <JanComponent></JanComponent>
                )}
            </div>
        </div>
    );
};

export default RealTimeResPage;
