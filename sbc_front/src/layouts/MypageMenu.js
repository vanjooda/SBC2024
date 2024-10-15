import '../css/menu.css';
import { Link } from "react-router-dom"

const MypageMenu = () => {
    return(
        <>
            <div className='imgwrap'>
                <img src="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" id="menuImg" alt="메뉴_캠핑장이미지"></img>
            </div>
            <div id='menubuttonwrap'>

                <Link to={'/mypage/res'} className='menubutton'>나의예약내역</Link>
                <Link to={'/mypage/authpw'} className='menubutton'>회원정보수정</Link>

            </div>
        </>

    );

}

export default MypageMenu;