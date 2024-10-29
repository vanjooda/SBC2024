import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import '../../css/login.css'
import {findpwMember, modifyPw} from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

{/* 이름, 이메일 입력 컴포넌트*/}
const AuthNameAndEmail = ({onSuccess}) => {
    const [member, setMembers] = useState({memberName : '', memberEmail : '', memberID : '',})
    const navigate = useNavigate();

    const handleChange = (e) => {
        setMembers({ ...member, [e.target.name]: e.target.value });
    }

    // '비밀번호 변경' 버튼 동작
    const handleSubmit = (e) => {
        if(!member.memberName){
            alert('이름을 입력해주세요')
            e.preventDefault()
            return
        } else if(member.memberName)
            if(!member.memberEmail){
                alert('이메일을 입력해주세요')
                e.preventDefault()
            } else{
                handleFindMemberByNameAndEmail(member)
            }
    }

    // 회원 조회 API 요청하기
    const handleFindMemberByNameAndEmail = async (member) => {
        try {
            const action = await findpwMember(member)
            //console.log('findpwMember 완료 :', action);
            if(!action){
                alert('회원을 찾을 수 없습니다. 이름 또는 이메일을 다시 확인해주세요.')
            } else if(action){
                const member = action.memberID;
                onSuccess(member);
            }
        }catch (err){
            console.log('요청 오류')
            alert('회원을 찾을 수 없습니다. 이름 또는 이메일을 다시 확인해주세요.')
        }

    }

    return(
        <BasicLayout>
            <LoginMenu/>
            <div style={{marginTop: '20px'}}>
                <h3>비밀번호 찾기</h3>
                <hr></hr>
            </div>
            <div id="loginwrap">
                <div id="loginbox">
                    <input type="text"
                           name="memberName"
                           value={member.memberName}
                           maxLength={'10'}
                           onChange={handleChange}
                           placeholder={" 이름을 입력해주세요"}></input><br></br>
                    <input type="email"
                           name="memberEmail"
                           value={member.memberEmail}
                           maxLength={'50'}
                           required
                           style={{fontSize: "16px"}}
                           onChange={handleChange}
                           placeholder={" 이메일을 입력해주세요."}></input>
                    <div>
                        <input type="submit" onClick={handleSubmit} className={"loginbutton_default"}
                               value={"비밀번호 변경"}></input>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}


{/* 비밀번호 변경 컴포넌트 */
}
const PwModifyPage = ({memberData}) => {
    const [validated, setValidated] = useState(false);
    // 비밀번호 검사용 변수
    const [pwd, setPwd] = useState("");
    const [isPwdValid, setIsPwdValid] = useState(true);
    const [isPwdMatch, setIsPwdMatch] = useState(true);

    const {moveToPath} = useCustomLogin()

    // 파라미터 가져오기 (memberId)
    const memberId = JSON.parse(memberData);
    console.log('memberId:', memberId);

    const [members, setMembers] = useState(
        {
            memberID : memberId,
            memberPw : '',
        })

    const handleChange = (event) => {
        // members 업데이트
        const {name, value} = event.target;
        setMembers((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));

        // 비밀번호 유효성 검사
        if (name === 'memberPw') {
            const pw = event.target.value;
            const regExp = /^(?=.*[a-z])((?=.*\d)|(?=.*\W)).{10,15}$/;
            if (regExp.test(pw)) {
                setPwd(pw)
                setIsPwdValid(true);
            } else {
                setIsPwdValid(false);
            }
        }
    }

    /* 비밀번호 재확인 */
    const handleConfirmPwd = (event) => {
        const confirmPwd = event.target.value;
        if(pwd !== confirmPwd){
            setIsPwdMatch(false);
        } else {
            setIsPwdMatch(true);
        }
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true)

        let valid = true; // 유효성 검사 결과를 추적할 변수

        if(!isPwdValid || !isPwdMatch){
            valid = false;
            event.preventDefault();
        }

        // 부트스트랩 동작
        if (form.checkValidity() === false || !valid) {
            event.stopPropagation();
        } else{
            // 유효성 검사를 통과했으면 API 요청
            members.memberPw = pwd
            handleModPw(members)
        }
        setValidated(true);

    };

    // 유효성 검사를 모두 통과하면 동작
    const handleModPw = async (member) => {
        try {
            const action = await modifyPw(member)
            //console.log('비밀번호 변경 동작', action)
            if(action.error) {
                //console.log('비밀번호 변경 실패')
                alert('비밀번호 변경 실패')
            } else if(action.msg === 'success') {
                // 성공하면 가입 완료 페이지로 이동
                alert('비밀번호가 변경되었습니다')
                moveToPath('/login')
            } else if (action.msg === 'fail'){
                alert('탈퇴한 회원이거나 오류로 인해 비밀번호 변경에 실패하였습니다.')
                console.log(isPwdValid, isPwdMatch)
            }
        } catch (error){
            console.log('서버 요청 실패 : ', error);
        }
    }

    return(
        <BasicLayout>
            <LoginMenu/>
            <div id="loginwrap">
                <div>
                    <h3>비밀번호 변경</h3>
                </div>
                <div className="modPwWrap">
                    {/* 비밀번호 */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit} id="loginbox">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} style={{marginRight:'-10px'}}>
                                비밀번호
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password"
                                              name="memberPw"
                                              placeholder="영문소문자,숫자,특수문자 포함 10-15자"
                                              style={{fontSize:'13px', padding:'10px',border:'1px solid grey'}}
                                              required
                                              id={"password"}
                                              minLength={10}
                                              onChange={handleChange}
                                              isInvalid={!isPwdValid}
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 확인해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* 비밀번호 재확인 */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} style={{marginRight:'-10px'}}>
                                비밀번호 확인
                            </Form.Label>
                            <Col sm={9} id={"pwrebox"}>
                                <Form.Control type="password"
                                              placeholder="영문소문자,숫자,특수문자 포함 10-15자"
                                              style={{fontSize:'13px', padding:'10px', border:'1px solid grey'}}
                                              required
                                              id={"password_re"}
                                              minLength={10}
                                              onChange={handleConfirmPwd}
                                              isInvalid={!isPwdMatch}
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호가 일치하지 않습니다.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Button className="loginbutton_default" type="submit"
                                onClick={handleSubmit}>비밀번호 변경</Button>
                    </Form>
                </div>
            </div>
        </BasicLayout>
    )
}







const FindPwPage = () => {
    const [showPwModify, setShowPwModify] = useState(false);
    const [memberData, setMemberData] = useState(null);

    const handleAuthSuccess = (data) => {
        setMemberData(data);
        setShowPwModify(true); // 비밀번호 인증 성공 시 회원정보 컴포넌트 표시
    };

    return (
        <div>
            {!showPwModify ? (
                <AuthNameAndEmail onSuccess={handleAuthSuccess} />
            ) : (
                <PwModifyPage memberData={memberData} />
            )}
        </div>
    );
}

export default FindPwPage;