import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../../../pages/reservation/css/RealTimeResPage.css"
import {getSiteList} from "../../../api/ResApi";
import {useSelector} from "react-redux";

// td 태그를 재사용 하고싶은데 어케할까? 흠....

const OctComponent = () => {

    const initState = {
        0: {
            siteID: 0,
            siteName: ''
        },
        1: {
            siteID: 0,
            siteName: ''
        }

    }

    const [site, setSite] = useState(initState);

    useEffect(() => {
        getSiteList().then(data => {
            console.log(data)
            setSite(data)
        })
    }, []);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(10);

    const loginState = useSelector((state) => state.loginSlice)

    const isPastDate = (setMonth, setDay) => {
        // 날짜 비교 : 현재 날짜보다 과거인지 확인
        if (year < currentYear) return true;
        if (year === currentYear && setMonth < currentMonth) return true;
        if (year === currentYear && setMonth === currentMonth && setDay < currentDay) return true;

        return false;
    }

    return (
        <div>
            <Table responsive bordered>
                <thead>
                <tr>
                    <th>일요일</th>
                    <th>월요일</th>
                    <th>화요일</th>
                    <th>수요일</th>
                    <th>목요일</th>
                    <th>금요일</th>
                    <th>토요일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{backgroundColor: "lightgray"}}></td>
                    <td style={{backgroundColor: "lightgray"}}></td>
                    <td style={isPastDate(month, 1) ? {backgroundColor: "lightgray"} : {}}>
                        <span>1</span>
                        <ul>
                            <li>
                                {isPastDate(month, 1) ? (
                                    <div>
                                        예약 불가
                                    </div>
                                ) : (
                                    <Link
                                        to={`/res/respage`}
                                        state={{
                                            year: year,
                                            month: month,
                                            day: "1",
                                            memberId: loginState.member.memberId,
                                            memberName: loginState.member.memberName,
                                            memberPhone: loginState.member.memberPhone,
                                            memberEmail: loginState.member.memberEmail,
                                            siteId: site[0].siteId,
                                            siteName: site[0].siteName
                                        }}
                                    >
                                        Site A
                                        <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </td>
                    <td style={isPastDate(month, 2) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>2</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 2) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "2",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 3) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>3</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 3) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "3",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 4) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>4</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 4) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "4",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 5) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>5</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 5) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "5",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={isPastDate(month, 6) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>6</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 6) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "6",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 7) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>7</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 7) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "7",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 8) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>8</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 8) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "8",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 9) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>9</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 9) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "9",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 10) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>10</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 10) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "10",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 11) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>11</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 11) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "11",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 12) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>12</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 12) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "12",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={isPastDate(month, 13) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>13</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 13) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "13",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 14) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>14</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 14) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "14",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 15) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>15</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 15) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "15",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 16) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>16</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 16) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "16",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 17) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>17</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 17) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "17",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 18) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>18</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 18) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "18",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 19) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>19</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 19) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "19",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={isPastDate(month, 20) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>20</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 20) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "20",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 21) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>21</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 21) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "21",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 22) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>22</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 22) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "22",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 23) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>23</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 23) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "23",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 24) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>24</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 24) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "24",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 25) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>25</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 25) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "25",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 26) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>26</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 26) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "26",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={isPastDate(month, 27) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>27</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 27) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "27",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 28) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>28</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 28) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "28",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 29) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>29</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 29) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "29",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(month, 30) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>30</span>
                            <ul>
                                <li>
                                    {isPastDate(month, 30) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "30",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(10, 31) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>31</span>
                            <ul>
                                <li>
                                    {isPastDate(10, 31) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: month,
                                                day: "31",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(11, 1) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>11/1</span>
                            <ul>
                                <li>
                                    {isPastDate(11, 1) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: "11",
                                                day: "1",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td style={isPastDate(11, 2) ? {backgroundColor: "lightgray"} : {}}>
                        <div>
                            <span>11/2</span>
                            <ul>
                                <li>
                                    {isPastDate(11, 2) ? (
                                        <div>
                                            예약 불가
                                        </div>
                                    ) : (
                                        <Link
                                            to={`/res/respage`}
                                            state={{
                                                year: year,
                                                month: "11",
                                                day: "2",
                                                memberId: loginState.member.memberId,
                                                memberName: loginState.member.memberName,
                                                memberPhone: loginState.member.memberPhone,
                                                memberEmail: loginState.member.memberEmail,
                                                siteId: site[0].siteId,
                                                siteName: site[0].siteName
                                            }}
                                        >
                                            Site A
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;80000원
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default OctComponent;