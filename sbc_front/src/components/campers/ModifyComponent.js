import { useState, useEffect } from "react";
import { getOne, putOne } from "../../api/camperApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const initState = {
    member: {
        memberName: '',
    },
    cboardCategory: '',
    cboardTitle: '',
    cboardContent: '',
    cboardDate: '', // 작성 날짜
    cboardViews: 0,
    cboardAttachment: null, // 단일 첨부파일로 수정
};

const ModifyComponent = ({ cBoardId }) => {
    const [todo, setTodo] = useState({ ...initState });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getOne(cBoardId).then((data) => {
            if (data) {
                // 여기서 반환된 데이터의 구조에 맞게 상태를 설정
                setTodo({
                    ...initState,
                    cboardId: data.cboardId, // cboardId 추가
                    member: data.member, // 작성자 정보
                    cboardCategory: data.cboardCategory,
                    cboardTitle: data.cboardTitle,
                    cboardContent: data.cboardContent,
                    cboardDate: data.cboardDate,
                    cboardViews: data.cboardViews,
                    cboardAttachment: data.cboardAttachment || null, // 단일 첨부파일
                });
                console.log(data);
            } else {
                console.log("데이터가 없습니다.");
            }
        });
    }, [cBoardId]);

    const handleClickModify = async () => {
        try {
            // cboardDate의 형식을 yyyy-MM-dd로 변환
            const formattedDate = new Date(todo.cboardDate).toISOString().split('T')[0];

            // 요청할 데이터 객체 생성
            const camperObj = {
                cboardCategory: todo.cboardCategory,
                cboardTitle: todo.cboardTitle,
                cboardContent: todo.cboardContent,
                cboardViews: todo.cboardViews,
                cboardDate: formattedDate, // 날짜 형식 맞추기
                cboardAttachment: todo.cboardAttachment, // 첨부파일 처리
            };
            console.log('camperObj:', camperObj);

            // API 요청
            const response = await putOne(cBoardId, camperObj);
            console.log('수정 성공:', response);
        } catch (error) {
            // 오류 처리 개선
            if (error.response) {
                console.error('수정 중 오류 발생:', error.response.data);
                setError(`수정 중 오류가 발생했습니다: ${error.response.data.message}`);
            } else {
                console.error('수정 중 오류 발생:', error.message);
                setError('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleClickCancel = () => {
        navigate(`/campers/read/${cBoardId}`);
    };

    const handleChangeTodo = (e) => {
        const { name, value } = e.target;
        setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 첫 번째 파일만 가져옴
        setTodo((prevTodo) => ({ ...prevTodo, cboardAttachment: file })); // 단일 파일 업데이트
    };

    return (
        <div className="container mt-4 p-4 border border-primary">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label font-weight-bold">WRITER</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        value={todo.member.memberName}
                        readOnly
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label font-weight-bold">CATEGORY</label>
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

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label font-weight-bold">TITLE</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        name="cboardTitle"
                        value={todo.cboardTitle}
                        onChange={handleChangeTodo}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label font-weight-bold">CONTENT</label>
                <div className="col-sm-10">
                    <textarea
                        name="cboardContent"
                        className="form-control"
                        value={todo.cboardContent}
                        onChange={handleChangeTodo}
                        rows="4"
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label font-weight-bold">DATE</label>
                <div className="col-sm-10">
                    <input
                        name="cboardDate"
                        type="date"
                        className="form-control"
                        value={todo.cboardDate}
                        readOnly // 수정 불가
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label font-weight-bold">ATTACHMENT</label>
                <div className="col-sm-10">
                    <input
                        type="file"
                        className="form-control"
                        name="cboardAttachment"
                        onChange={handleFileChange} // 단일 파일만 선택 가능
                    />
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={handleClickCancel}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary mx-2"
                    onClick={handleClickModify}
                >
                    Modify
                </button>
            </div>
        </div>
    );
};

export default ModifyComponent;
