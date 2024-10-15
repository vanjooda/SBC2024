import { useEffect, useState } from "react";
import { getList, getOne } from "../../api/camperApi"; // getOne API 호출 추가
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent"; // 올바른 경로로 수정

// 초기 상태 설정
const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
};

const ListComponent = () => {
    const { page, size, refresh, moveToList, moveToRead, moveToAdd } = useCustomMove(); // moveToAdd 사용
    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size }).then(data => {
            console.log(data); // 데이터 확인
            setServerData(data);
        });
    }, [page, size, refresh]);

    // 상세 페이지로 이동하는 함수
    const handleReadPage = (cBoardId) => {
        console.log("Selected cBoardId:", cBoardId); // cBoardId 확인
        if (!cBoardId) {
            console.error("cBoardId is undefined or invalid."); // ID가 유효하지 않을 때 처리
            return;
        }

        // API 요청
        getOne(cBoardId)
            .then(response => {
                if (response) {
                    // 성공적으로 데이터를 가져온 경우 상세 페이지로 이동
                    moveToRead(cBoardId);
                }
            })
            .catch(error => {
                console.error("게시물 로드 실패:", error.message); // 오류 메시지 출력
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 mb-3">
                    <div className="row text-center fw-bold border-bottom pb-2">
                        <div className="col-1">번호</div>
                        <div className="col-4">제목</div>
                        <div className="col-4">내용</div>
                        <div className="col-1" style={{ whiteSpace: "nowrap" }}>조회수</div>
                        <div className="col-2">작성일</div>
                    </div>
                </div>
                {serverData.dtoList.map(camperBoard => (
                    <div
                        key={camperBoard.cboardId} // 고유한 key prop 사용
                        className="col-12 mb-2 p-2 border rounded shadow-sm"
                        onClick={() => {
                            console.log("CamperBoard:", camperBoard); // camperBoard 객체 출력
                            handleReadPage(camperBoard.cboardID); // 클릭 시 cboardId 전달
                        }}
                        style={{ cursor: "pointer", maxWidth: "1200px" }} // 좌우 길이 최대값 설정
                    >
                        <div className="row text-center">
                            <div className="col-1">{camperBoard.cboardID}</div> {/* cboardId 확인 */}
                            <div className="col-4 text-truncate">{camperBoard.cboardTitle}</div> {/* 제목 */}
                            <div className="col-4 text-truncate">{camperBoard.cboardContent}</div> {/* 내용 */}
                            <div className="col-1">{camperBoard.cboardViews}</div> {/* 조회수 */}
                            <div className="col-2">{camperBoard.cboardDate}</div> {/* 작성일 */}
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지 네비게이션과 등록 버튼 */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>

                {/* 등록 버튼 */}
                <button
                    className="btn btn-primary"
                    onClick={() => moveToAdd("/addPage")} // 클릭 시 addPage로 이동
                >
                    등록
                </button>
            </div>
        </div>
    );
};

export default ListComponent;
