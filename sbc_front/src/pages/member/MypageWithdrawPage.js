import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {withdraw} from "../../api/mypageApi";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slice/loginSlice";

const MypageWithdrawPage = () => {

    const loginState = useSelector((state) => state.loginSlice)

    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const memberState = {
        memberId : loginState.member.memberId,
        memberPw : '',
    }
    const [member, setMember] = useState(memberState);
    const [pwd, setPwd] = useState("");
    const [isPwdValid, setIsPwdValid] = useState(true);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isConfirmed = confirm('정말 탈퇴하시겠습니까?');
        if (isConfirmed) {
            try {
                const action = await withdraw(member)
                if(action.data.msg === 'success'){
                    alert('회원탈퇴 처리되었습니다.')
                    navigate('/')
                    dispatch(logout())
                } if(action.data.msg === 'fail'){
                    alert('완료되지 않은 예약정보가 있거나 비밀번호가 일치하지 않습니다.')
                }
            }catch (error) {
                console.log('서버오류 ' , error)
                alert('잠시 후 다시 시도해주세요')
            }
        }
    }


    return (
        <>
            <div>
                <h3>회원탈퇴</h3>
            </div>
            <div>
                <div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                이메일
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext
                                              readOnly
                                              Value={loginState.member.memberEmail}
                                              style={{paddingLeft:'8px'}}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={2}>
                                비밀번호
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="password"
                                              name="memberPw"
                                              placeholder="영문소문자, 숫자, 특수문자 포함 10-15자"
                                              required
                                              minLength={10}
                                              maxLength={15}
                                              pattern={"^(?=.*[a-z])((?=.*\\d)|(?=.*\\W)).{10,15}$"}
                                              onChange={handleChangePw}
                                              isInvalid={!isPwdValid}
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 확인해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <div className="mb-3">현재 예약정보가 있을 경우 탈퇴할 수 없습니다.</div>
                        <Button type="submit" variant="success">회원 탈퇴</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default MypageWithdrawPage