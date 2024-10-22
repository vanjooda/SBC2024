import { useEffect, useState } from "react";
import { getList, getOne } from "../../api/camperApi"; // API 호출 함수들 임포트
import useCustomMove from "../../hooks/useCustomMove"; // 페이지 이동을 위한 커스텀 훅 임포트
import PageComponent from "../common/PageComponent"; // 페이지 네비게이션 컴포넌트 임포트
import useCustomLogin from "../../hooks/useCustomLogin"; // 로그인 관련 커스텀 훅 임포트

// 초기 상태 설정
const initState = {
  dtoList: [], // 게시물 목록
  pageNumList: [], // 페이지 번호 목록
  pageRequestDTO: null, // 페이지 요청 DTO
  prev: false, // 이전 페이지 여부
  next: false, // 다음 페이지 여부
  totalCount: 0, // 총 게시물 수
  prevPage: 0, // 이전 페이지 번호
  nextPage: 0, // 다음 페이지 번호
  totalPage: 0, // 총 페이지 수
  current: 0, // 현재 페이지 번호
};

const ListComponent = () => {
  // 페이지와 사이즈, 이동 함수들을 커스텀 훅에서 가져옴
  const { page, size, refresh, moveToList, moveToRead, moveToAdd } = useCustomMove();
  const { exceptionHandle } = useCustomLogin(); // 로그인 예외 처리 함수
  const [serverData, setServerData] = useState(initState); // 서버 데이터 상태

  // 컴포넌트가 페이지나 사이즈가 변경될 때마다 데이터 가져오기
  useEffect(() => {
    getList({ page, size }).then(data => {
      setServerData(data); // 가져온 데이터를 상태에 저장
    });
  }, [page, size, refresh]); // 의존성 배열

  // read 페이지로 이동하는 함수
  const handleReadPage = (cBoardId) => {
    getOne(cBoardId) // 게시물 ID로 게시물 데이터 가져오기
        .then(response => {
          if (response) {
            moveToRead(cBoardId); // 게시물 읽기 페이지로 이동
          }
        })
        .catch(error => {
          console.error("게시물 로드 실패:", error.message); // 오류 처리
        });
  };

  // 제목을 28자 이하로 자르고, 넘길 경우 "..." 추가하는 함수
  const truncateTitle = (title) => {
    return title.length > 28 ? title.slice(0, 28) + "..." : title; // 제목 자르기
  };

  return (
      <div className="container mt-5"> {/* 전체 컨테이너 */}
        <div className="row justify-content-center"> {/* 중앙 정렬을 위한 행 */}
          <div className="col-12 mb-3"> {/* 전체 너비의 열 */}
            {serverData.dtoList.length > 0 && ( // 게시물이 있을 경우
                <div className="row text-center fw-bold border-bottom pb-2"> {/* 헤더 행 */}
                  <div className="col-1">번호</div> {/* 번호 열 */}
                  <div className="col-5 text-start">제목</div> {/* 제목 열 */}
                  <div className="col-3">작성자</div> {/* 작성자 열 */}
                  <div className="col-1">조회수</div> {/* 조회수 열 */}
                  <div className="col-2">작성일</div> {/* 작성일 열 */}
                </div>
            )}
          </div>
          {/* 게시물 목록을 반복하여 표시 */}
          {serverData.dtoList.map(camperBoard => (
              <div
                  key={camperBoard.cboardId} // 고유 키 설정
                  className="col-12 mb-2 p-2 border rounded shadow-sm" // 게시물 스타일
                  onClick={() => handleReadPage(camperBoard.cboardID)} // 클릭 시 게시물 읽기
                  style={{ cursor: "pointer", maxWidth: "1200px" }} // 커서 모양 및 최대 너비 설정
              >
                <div className="row align-items-center text-center"> {/* 게시물 내용 행 */}
                  <div className="col-1">{camperBoard.cboardID}</div> {/* 번호 */}
                  <div className="col-5 text-start d-flex justify-content-start align-items-center"> {/* 제목 */}
                    <span className="badge bg-warning me-2">
                                    {camperBoard.cboardCategory} {/* 카테고리*/}
                                </span>
                    <span className="text-truncate" style={{ marginRight: "10px", maxWidth: "200px" }}>
                                    {truncateTitle(camperBoard.cboardTitle)} {/* 제목 */}
                                </span>
                    {camperBoard.cboardAttachment && ( // 첨부파일 아이콘 표시
                        <img
                            src="/path/to/attachment-icon.png" // 아이콘 경로
                            alt="첨부파일 아이콘"
                            style={{ width: "20px", height: "20px", marginLeft: "5px" }} // 아이콘 스타일
                        />
                    )}
                    <span>[{camperBoard.commentCount}]</span> {/* 댓글 수 표시 */}
                  </div>
                  <div className="col-3">{camperBoard.membername}</div> {/* 작성자 */}
                  <div className="col-1">{camperBoard.cboardViews}</div> {/* 조회수 */}
                  <div className="col-2">{camperBoard.cboardDate}</div> {/* 작성일 */}
                </div>
              </div>
          ))}
        </div>

        {/* 페이지 네비게이션 */}
        <div className="d-flex justify-content-between align-items-center mb-3"> {/* 네비게이션 스타일 */}
          <div className="mx-auto"> {/* 중앙 정렬 */}
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent> {/* 페이지 컴포넌트 */}
          </div>
          <button className="btn btn-primary" onClick={() => moveToAdd()}> {/* 등록 버튼 */}
            등록
          </button>
        </div>
      </div>
  );
};

export default ListComponent; // 컴포넌트 내보내기
