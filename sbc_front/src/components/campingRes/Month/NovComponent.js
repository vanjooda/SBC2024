import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const NovComponent = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(11);

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
                    <td style={{backgroundColor: "lightgray"}}></td>
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
                                        state={{year: year, month: month, day: "1"}}
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
                                            state={{year: year, month: month, day: "2"}}
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
                </tr>
                <tr>
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
                                            state={{year: year, month: month, day: "3"}}
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
                                            state={{year: year, month: month, day: "4"}}
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
                                            state={{year: year, month: month, day: "5"}}
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
                                            state={{year: year, month: month, day: "6"}}
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
                                            state={{year: year, month: month, day: "7"}}
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
                                            state={{year: year, month: month, day: "8"}}
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
                                            state={{year: year, month: month, day: "9"}}
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
                </tr>
                <tr>
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
                                            state={{year: year, month: month, day: "10"}}
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
                                            state={{year: year, month: month, day: "11"}}
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
                                            state={{year: year, month: month, day: "12"}}
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
                                            state={{year: year, month: month, day: "13"}}
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
                                            state={{year: year, month: month, day: "14"}}
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
                                            state={{year: year, month: month, day: "15"}}
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
                                            state={{year: year, month: month, day: "16"}}
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
                </tr>
                <tr>
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
                                            state={{year: year, month: month, day: "17"}}
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
                                            state={{year: year, month: month, day: "18"}}
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
                                            state={{year: year, month: month, day: "19"}}
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
                                            state={{year: year, month: month, day: "20"}}
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
                                            state={{year: year, month: month, day: "21"}}
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
                                            state={{year: year, month: month, day: "22"}}
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
                                            state={{year: year, month: month, day: "23"}}
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
                </tr>
                <tr>
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
                                            state={{year: year, month: month, day: "24"}}
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
                                            state={{year: year, month: month, day: "25"}}
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
                                            state={{year: year, month: month, day: "26"}}
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
                                            state={{year: year, month: month, day: "27"}}
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
                                            state={{year: year, month: month, day: "28"}}
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
                                            state={{year: year, month: month, day: "29"}}
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
                                            state={{year: year, month: month, day: "30"}}
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
                </tr>
                </tbody>
            </Table>
        </div>
    );
};
export default NovComponent;