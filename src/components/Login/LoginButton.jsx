'use client';
import React,{useState} from 'react'
import CreateWind from './CreateWind';
import LoginWind from './LoginWind';
import JwtLogin from './JwtLogin';

export default function LoginButton() {
// LoginPopup
    const [LoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [welcomMessage, setWelcomMessage] = useState('');
    const LoginData = (account) => {
        setLoginPopupOpen(!LoginPopupOpen);
        if (account && account === 'CreateAccount') {
            // 如果 account 是 'CreateAccount'，触发 CreatePopup()
            CreatePopup();
        } else if (account) {
            setWelcomMessage(`Welcome ${account}`);
        } else {
            setWelcomMessage(''); // 如果没有帐號資訊，清空歡迎訊息
        }
    };
    const LogOut = () => {  // 簡易 Logout 須改 
        setWelcomMessage('');
    }
// CreatePopup
    const [CreatePopupOpen, setCreatePopupOpen] = useState(false);
    const CreatePopup = () => {
        setCreatePopupOpen(!CreatePopupOpen);
    };

    return (
        <div className='flex justify-between space-x-10 items-center'>
            <div>
                {LoginPopupOpen && <JwtLogin togglePopup={LoginData} />}
                {welcomMessage
                    ? <button onClick={() => LogOut()}>{welcomMessage}</button>  // 登入後顯示
                    : <button onClick={() => LoginData()}>Login Account</button> // 登入前顯示
                }
            </div>
            <div>
                {CreatePopupOpen && <CreateWind togglePopup={CreatePopup} />}
                {!welcomMessage && <button onClick={() => CreatePopup()}>Create Account</button>}
            </div>
        </div>
    )
}
