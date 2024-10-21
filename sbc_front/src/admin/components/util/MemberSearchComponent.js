import {useState} from "react";
import { Button } from 'react-bootstrap';

function MemberSearchComponent({onSearch}) {
    const [type, setType] = useState('name');
    const [keyword, setKeyword] = useState('');
    const [placeholder, setPlaceholder] = useState('회원명을 입력하세요');

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;

        setType(selectedType);

        switch (selectedType) {
            case 'name':
                setPlaceholder('회원명을 입력하세요');
                break;
            case 'phone':
                setPlaceholder('핸드폰 번호의 뒤 4자리를 입력하세요');
                break;
            case 'email':
                setPlaceholder('이메일을 입력하세요');
                break;
            default:
                setPlaceholder('');
        }
    };

    const handleSearch = () => {
        onSearch(type, keyword); // 검색 함수 호출
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // 엔터 키 눌렀을 때 검색 실행
        }
    };

    return (
        <>
            <div className="d-flex align-items-center">
                <select id="type" name="type" value={type} onChange={handleTypeChange} className="me-2">
                    <option value="name">회원명</option>
                    <option value="phone">핸드폰</option>
                    <option value="email">이메일</option>
                </select>
                <input
                    id="keyword"
                    name="keyword"
                    type="text"
                    placeholder={placeholder}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="form-control me-2 w-50" // Bootstrap의 form-control 클래스 추가
                />
                <Button onClick={handleSearch}>조회</Button>
            </div>
        </>
    );
}

export default MemberSearchComponent;



