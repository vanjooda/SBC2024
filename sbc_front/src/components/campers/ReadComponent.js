import { useEffect, useState } from "react";
import { getOne, deleteOne, getMemberById, prefix } from "../../api/camperApi";  // API 함수 가져오기
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    member: {
        memberName: '',  // 작성자 이름
        memberId: ''
    },
    cboardCategory: '',
    cboardTitle: '',
    cboardContent: '',
    cboardDate: '',
    cboardViews: 0,
    cboardAttachment: '',  //
    cboardId: null,
};

const ReadComponent = ({ cBoardId }) => {
    const [camper, setCamper] = useState(initState);  // 게시글 데이터 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const { moveToList, moveToModify } = useCustomMove();  // 페이지 이동 훅

    // 게시글 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOne(cBoardId);
                if (data) {
                    setCamper(data);  // 게시글 데이터 상태 업데이트

                    // 작성자 정보를 가져오기 위해 memberId를 사용
                    if (data.memberId) {
                        const memberData = await getMemberById(data.memberId);
                        setCamper(prevCamper => ({
                            ...prevCamper,
                            member: memberData
                        }));
                    }
                } else {
                    console.log("데이터가 없습니다.");
                }
            } catch (error) {
                console.error("API 호출 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cBoardId]);

    // 게시글 삭제 함수
    const handleDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await deleteOne(cBoardId);  // API 호출로 게시글 삭제
                alert("게시글이 삭제되었습니다.");
                moveToList();  // 삭제 후 목록으로 이동
            } catch (error) {
                console.error("삭제 중 오류 발생:", error);
            }
        }
    };

    // 파일이 이미지인지 확인하는 함수
    const isImageFile = (fileName) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']; // 이미지 확장자 목록
        const extension = fileName.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    };

    if (loading) {
        return <div>Loading...</div>;  // 로딩 상태 표시
    }

    return (
        <div className="container mt-4">
            <div className="border p-4 rounded" style={{ maxWidth: "600px", margin: "auto" }}>
                {/* 카테고리와 제목 */}
                <h1>{camper.cboardCategory} - {camper.cboardTitle}</h1>
                <hr />

                {/* 작성일과 조회수 */}
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <strong>작성일: </strong>{camper.cboardDate}
                    </div>
                    <div className="col-sm-6">
                        <strong>조회수: </strong>{camper.cboardViews}
                    </div>
                </div>
                <hr />

                {/* 작성자 */}
                <div className="mb-2">
                    <strong>작성자: </strong>
                    {camper.member && camper.member.memberName ? camper.member.memberName : '작성자가 없습니다.'}
                </div>
                <hr />

                <div className="mb-2">
                    <strong>첨부파일: </strong>
                    {camper.cboardAttachment ? (
                        isImageFile(camper.cboardAttachment) ? (
                            // 이미지 파일인 경우 표시
                            <img
                                src={`${prefix}/view/${camper.cboardAttachment}`}
                                alt="첨부 이미지"
                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                            />
                        ) : (
                            // 일반 파일의 경우 다운로드 링크 제공
                            <a
                                href={`/api/campers/files/${camper.cboardAttachment}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                첨부파일 보기
                            </a>
                        )
                    ) : (
                        <span>없음</span>
                    )}
                </div>
                <hr />

                {/* 내용 */}
                <div className="mb-2">
                    <strong>내용: </strong>
                    <textarea
                        className="form-control"
                        value={camper.cboardContent}
                        readOnly
                        rows="6"
                    />
                </div>

                {/* 버튼 */}
                <div className="d-flex justify-content-center mt-4">
                    <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={moveToList}
                    >
                        목록으로
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning me-2"
                        onClick={() => moveToModify(cBoardId)}
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadComponent;
