import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {postAdd} from "../../api/reviewApi";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const ReviewAddComponent = () => {

    const loginState = useSelector((state) => state.loginSlice)

    const location = useLocation()
    const {resData} = location.state || {}

    console.log(resData)

    const initState = {
        reviewTitle: '',
        reviewContent: '',
        member: {
            memberId: loginState.member.memberId,
            memberRole: loginState.member.memberRole,
        },
        reservation: {
            resId: resData.resId
        },
        rtag_Clean: '',
        rtag_Price: '',
        rtag_Facility: '',
        rtag_Photo: '',
        rtag_Silence: '',
        rtag_Kind: '',
        rtag_View: '',
        file: null
    }

    const [review, setReview] = useState({...initState})
    const navigate = useNavigate();

    // 태그 선택
    const [value, setValue] = useState([]);

    // 태그 선택시 상태 업데이트
    const handleChange = (val) => {
        setValue(val)
        setReview((prev) => ({
            ...prev,
            rtag_Clean: val.includes('1') ? 'Y' : 'N',
            rtag_Price: val.includes('2') ? 'Y' : 'N',
            rtag_Facility: val.includes('3') ? 'Y' : 'N',
            rtag_Photo: val.includes('4') ? 'Y' : 'N',
            rtag_Silence: val.includes('5') ? 'Y' : 'N',
            rtag_Kind: val.includes('6') ? 'Y' : 'N',
            rtag_View: val.includes('7') ? 'Y' : 'N',
        }))
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setReview((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setReview((prev) => ({
            ...prev,
            file: e.target.files[0] // 파일 ㅓㄴ택
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("reviewTitle", review.reviewTitle)
        formData.append("reviewContent", review.reviewContent)
        formData.append("memberId", review.member.memberId)
        formData.append("resId", review.reservation.resId)

        // 태그 값들도 추가
        formData.append("rtag_Clean", review.rtag_Clean);
        formData.append("rtag_Price", review.rtag_Price);
        formData.append("rtag_Facility", review.rtag_Facility);
        formData.append("rtag_Photo", review.rtag_Photo);
        formData.append("rtag_Silence", review.rtag_Silence);
        formData.append("rtag_Kind", review.rtag_Kind);
        formData.append("rtag_View", review.rtag_View);

        // 파일이 선택된 경우에만 추가
        if (review.file) {
            formData.append("file", review.file)
        }

        try {
            await postAdd(formData);
            setReview({...initState});
            alert("게시글 등록 완료")
            navigate("/review/list");
        } catch (error) {
            alert(error.message);
            console.log("error upload", error)
        }
    }

    useEffect(() => {
        if (review.rtag_Clean === 'Y'){
            setValue(['1']);
        }

    }, [review.rtag_Clean]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700" style={{
                    marginTop: "18px"
                }}>제목</label>
                <input
                    name="reviewTitle"
                    type="text"
                    value={review.reviewTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="제목을 입력하세요"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">내용</label>
                <textarea
                    name="reviewContent"
                    value={review.reviewContent}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="내용을 입력하세요"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">이미지 첨부</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                <ToggleButton id="tbg-btn-1" value={'1'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#청결해요</ToggleButton>&nbsp;&nbsp;
                <ToggleButton id="tbg-btn-2" value={'2'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#가성비가 좋아요</ToggleButton>&nbsp;&nbsp;
                <ToggleButton id="tbg-btn-3" value={'3'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#시설이 좋아요</ToggleButton>&nbsp;&nbsp;
                <ToggleButton id="tbg-btn-4" value={'4'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#사진이 잘나와요</ToggleButton>&nbsp;&nbsp;
                <ToggleButton id="tbg-btn-5" value={'5'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#조용해요</ToggleButton>&nbsp;&nbsp;
                <ToggleButton id="tbg-btn-6" value={'6'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#친절해요</ToggleButton>&nbsp;&nbsp;
                <ToggleButton id="tbg-btn-7" value={'7'} variant="outline-success" style={{
                    borderRadius: "50px"
                }}>#풍경이 좋아요</ToggleButton>&nbsp;&nbsp;
            </ToggleButtonGroup>

            <div className="text-right space-x-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    등록
                </button>
            </div>
        </form>
    );
};

export default ReviewAddComponent;