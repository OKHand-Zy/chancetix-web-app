'use client';
import React,{useState} from 'react'
import CreateWind from './CreateWind';
import LoginWind from './LoginWind';

export default function LoginButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [welcomMessage, setWelcomMessage] = useState('');

    const togglePopup = (account) => {
        setIsPopupOpen(!isPopupOpen);
        if (account) {
            setWelcomMessage(`Welcome ${account}`);
        } else {
            setWelcomMessage(''); // 如果沒有帳號資訊，清空歡迎訊息
        }
    };
    
    return (
        <div>
            <button onClick={() => togglePopup()}>Login Account</button>
            {isPopupOpen && <LoginWind togglePopup={togglePopup} />}
            <div>{welcomMessage}</div>
        </div>
    )
}
