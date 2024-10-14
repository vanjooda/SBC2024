import {useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {authPw} from "../../api/mypageApi";
import {useNavigate} from "react-router-dom";

const MypageAuthPwPage = () => {

    const [validated, setValidated] = useState(false);

    const loginState = useSelector((state) => state.loginSlice)
    const memberState = {
        memberId : loginState.member.memberId,
        memberPw : '',
    }
    const [member, setMember] = useState(memberState);
    const [pwd, setPwd] = useState("");
    const [isPwdValid, setIsPwdValid] = useState(true);
    const navigate = useNavigate();

    const handleChangePw = (event) => {
        // members 업데이트
        const {name, value} = event.target;
        setMember((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));

        // 비밀번호 유효성 검사
        if (name === 'memberPw') {
            setPwd(event.target.value);
            const regExp = /^(?=.*[a-z])((?=.*\d)|(?=.*\W)).{10,15}$/;
            if (regExp.test(event.target.value)) {
                setIsPwdValid(true);
            } else {
                setIsPwdValid(false);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(member);
        try {
            authPw(member).then((data) => {
                console.log(data);
                if(data.msg === 'success'){
                    navigate('/mypage/info')
                } else if(data.msg === 'fail'){
                    alert('비밀번호가 일치하지 않습니다.')
                }
            })
        } catch (error) {
            console.log(error)
            console.log('서버오류')
        }
    }

    return(
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={2}>
                        비밀번호
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password"
                                      name="memberPw"
                                      placeholder="영문소문자, 숫자, 특수문자 포함 10-15자"
                                      required
                                      id={"password"}
                                      minLength={10}
                                      pattern={"^(?=.*[a-z])((?=.*\\d)|(?=.*\\W)).{10,15}$"}
                                      onChange={handleChangePw}
                                      isInvalid={!isPwdValid}
                        />
                        <Form.Control.Feedback type="invalid">
                            비밀번호를 확인해주세요.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{span: 10, offset: 2}} className={"joinbuttonwrap"}>
                        <Button variant="success" className={"joinButton"} type="submit" onClick={handleSubmit}>회원정보 수정</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default MypageAuthPwPage;