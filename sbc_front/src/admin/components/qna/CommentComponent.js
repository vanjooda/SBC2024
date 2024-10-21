import React, { useEffect, useState } from 'react';
import {getCommentList, postCommentAdd, updateComment, deleteComment, deleteOne} from '../../api/qnaApi'; // 필요한 API 함수 가져오기
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ConfirmModal from "../util/ConfirmModal";
import {useSelector} from "react-redux";

function CommentComponent() {
    const [serverData, setServerData] = useState([]); // 댓글 목록 상태
    const [commentContent, setCommentContent] = useState(""); // 댓글 입력 상태
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
    const [editingCommentContent, setEditingCommentContent] = useState(""); // 수정할 댓글 내용
    const { qbID } = useParams(); // URL에서 qbID 가져오기

    const loginState = useSelector((state) => state.loginSlice)

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        const data = await getCommentList(qbID);
        console.log('가져온 댓글 데이터:', data); // 데이터 확인
        setServerData(data);
    };

    useEffect(() => {
        fetchComments(); // 컴포넌트가 마운트될 때 댓글 목록 가져오기
    }, [qbID]);

    const handleChange = (e) => {
        setCommentContent(e.target.value); // 댓글 내용 상태 업데이트
    };

    const handleClickAdd = async (e) => {
        e.preventDefault(); // 기본 동작 방지

        const formData = new FormData();
        formData.append("qCommentContent", commentContent);
        formData.append("memberID", loginState.member.memberId); // 임시 멤버 ID

        try {
            const response = await postCommentAdd(qbID, formData); // 댓글 추가 API 호출
            if (response && response.RESULT) {
                console.log('댓글 등록 성공');
                setCommentContent(""); // 입력 필드 초기화
                fetchComments(); // 댓글 목록 갱신
            } else {
                console.error('댓글 등록 실패:', response);
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleEditChange = (e) => {
        setEditingCommentContent(e.target.value); // 수정할 댓글 내용 상태 업데이트
    };

    const handleClickEdit = (commentId, content) => {
        setEditingCommentId(commentId); // 수정할 댓글 ID 설정
        setEditingCommentContent(content); // 수정할 댓글 내용 설정
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("qCommentContent", editingCommentContent);

            console.log(formData);

            const response = await updateComment(editingCommentId, formData, qbID);
            console.log('응답 데이터:', response); // 확인
            if (response && response.RESULT) {
                console.log('댓글 수정 성공');
                setEditingCommentId(null);
                setEditingCommentContent("");
                fetchComments(); // 데이터 확인을 위해 댓글 목록 갱신
            } else {
                console.error('댓글 수정 실패:', response);
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    // 삭제하기 버튼 클릭 시 호출되는 함수
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(null);

    const handleClickDelete = async (commentId) => {
        setCurrentID(commentId);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteComment(currentID, qbID);
            console.log('댓글 삭제 성공');
            fetchComments(); // 댓글 목록 갱신
        } catch (error) {
            alert("삭제 실패: " + error.message);
            console.error("삭제 중 오류 발생:", error);
        } finally {
            setModalOpen(false); // 작업 후 모달 닫기
        }
    };

    return (
        <div>

            {/* 댓글 목록 렌더링 */}
            <div>
                {serverData.length > 0 ? (
                    serverData.map(comment => (
                        <div key={comment.qcommentID}
                             className="text-gray-700 p-3 m-5 border border-gray-300 rounded-lg relative">
                            <div className="flex justify-between items-center mb-2">
                                {comment.member.memberRole === "ROLE_ADMIN" ? (
                                    <p className="font-bold text-lg">🛠 관리자</p>
                                ) : (
                                    <p className="font-bold text-lg">작성자 : {comment.member.memberName}</p>
                                )}
                                <p className="text-sm text-gray-500">{new Date(comment.qcommentDate).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false,
                                })}</p>
                            </div>
                            {editingCommentId === comment.qcommentID ? (
                                <form onSubmit={handleSubmitEdit} className="mt-2">
                                    <input
                                        type="text"
                                        value={editingCommentContent}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex justify-end mt-2 space-x-2">
                                        <Button type="submit" className="px-3 py-1">수정 완료</Button>
                                        <Button type="button" onClick={() => setEditingCommentId(null)}
                                                className="px-3 py-1">취소</Button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p className="mb-2">{comment.qcommentContent}</p>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            onClick={() => handleClickEdit(comment.qcommentID, comment.qcommentContent)}
                                            className="px-3 py-1">수정</Button>
                                        <Button onClick={() => handleClickDelete(comment.qcommentID)}
                                                className="px-3 py-1">삭제</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
                <hr/>
                {/* 댓글 입력 폼 */}
                <div>
                    <input
                        type="text"
                        value={commentContent}
                        onChange={handleChange}
                        placeholder="내용을 입력하세요"
                        required
                    />
                    <Button onClick={handleClickAdd}>댓글 등록</Button>
                </div>
                <hr/>
                <ConfirmModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="삭제 확인"
                    message="정말 삭제하시겠습니까?"
                />
            </div>
        </div>
    );
}

export default CommentComponent;
