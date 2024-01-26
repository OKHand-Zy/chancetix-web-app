"use client";
import React,{useState} from 'react'
import Popup from './PopWindow';

export default function LoginWindow() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    
    return (
        <div>
            <button onClick={togglePopup}>Login Account</button>
            {isPopupOpen && <Popup togglePopup={togglePopup} />}
        </div>
    )
}
