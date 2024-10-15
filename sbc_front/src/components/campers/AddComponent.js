import { useState, useEffect } from "react";
import { postAdd } from "../../api/camperApi"; // 회원 정보를 가져오는 API 제거
import useCustomMove from "../../hooks/useCustomMove";

// 초기 상태 설정
const initState = {
    cboardCategory: '',
    cboardTitle: '',
    cboardContent: '',
    cboardDate: '',
    cboardViews: 0,
    cboardAttachment: '', // 단일 첨부파일로 수정
    cboardId: '', // 고정된 ID
};

const AddComponent = () => {
    const [todo, setTodo] = useState({ ...initState });

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // yyyy-mm-dd 형식
        setTodo((prev) => ({ ...prev, cboardDate: currentDate }));
    }, []);

    const { moveToList } = useCustomMove();

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 선택한 파일 하나만 가져옴
        if (file) {
            setTodo((prev) => ({
                ...prev,
                cboardAttachment: file // 단일 파일 업데이트
            }));
        }
    };

    const handleChangeTodo = (e) => {
        const { name, value } = e.target;
        setTodo((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickAdd = async () => {
        const camperObj = {
            cboardCategory: todo.cboardCategory,
            cboardTitle: todo.cboardTitle,
            cboardContent: todo.cboardContent,
            // cboardViews와 cboardDate는 서버에서 처리하므로 제외합니다.
        };

        await postAdd(camperObj, todo.cboardAttachment) // 첨부파일을 추가
            .then(result => {
                console.log("등록 서버 응답:", result);
                moveToList(); // 등록 완료 후 campers/list 페이지로 이동
            })
            .catch(e => {
                console.error("API 호출 오류:", e);
            });
    };

    return (
        <div className="border border-primary mt-4 p-4">
            <div className="mb-3">
                {/* 나머지 필드들 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">카테고리</label>
                    <div className="col-sm-10">
                        <select
                            className="form-select"
                            name="cboardCategory"
                            value={todo.cboardCategory}
                            onChange={handleChangeTodo}
                        >
                            <option value="">카테고리를 선택하세요</option>
                            <option value="잡담">잡담</option>
                            <option value="정보">정보</option>
                        </select>
                    </div>
                </div>

                {/* 제목, 첨부파일, 내용 등 추가 필드 */}
                {/* 제목 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">제목</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="cboardTitle"
                            type="text"
                            value={todo.cboardTitle}
                            onChange={handleChangeTodo}
                        />
                    </div>
                </div>

                {/* 첨부파일 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">첨부파일</label>
                    <div className="col-sm-10">
                        <input
                            type="file"
                            className="form-control"
                            name="cboardAttachment"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* 내용 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">내용</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            name="cboardContent"
                            value={todo.cboardContent}
                            onChange={handleChangeTodo}
                            rows="4"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClickAdd}
                >
                    등록
                </button>
            </div>
        </div>
    );
};

export default AddComponent;
