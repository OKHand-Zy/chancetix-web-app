import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const JwtLogin = ({ togglePopup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false, // 手動處理重定向
            });
            if (result?.error) {
                console.error('登錄失敗：', result.error);
                setErrorMessage(result.error);
                } else if (result?.ok) {
                    // 如果登入成功，處理用戶資訊
                    console.log('登錄成功！');
                    console.log(result);
        
                    const user = result?.ok; // 此處根據 Next.js Auth 的結構進行修改
        
                    setUsername('');
                    setPassword('');
                    setErrorMessage('');
                    togglePopup(user.name); // 這裡使用用戶的名稱
        
                    // 手動重定向
                    const redirectUrl = result?.url || '/'; // 使用返回的重定向 URL 或者默認為 '/'
                    window.location.href = redirectUrl; // 使用 window.location.href 進行手動重定向
                }
            } catch (error) {
                console.error('登錄期間出錯', error);
                setErrorMessage('內部服務器錯誤');
            }
    };

    const handleOpenCreateWind = () => {
    // 在這裡處理開啟 CreateWind 的相應邏輯，例如傳遞數據或其他操作
    togglePopup('CreateAccount');
    };

    const handleClose = () => {
        togglePopup(); // 关闭弹窗
        setErrorMessage(''); // 清除错误消息
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center">
        <div className="w-300 bg-white p-40 rounded-8">
            <div className="text-black p-2 cursor-pointer w-90 text-center">
            <p>Login.</p>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                <label htmlFor="username" className="mr-2">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div className="flex items-center">
                <label htmlFor="password" className="mr-2">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-black p-2 cursor-pointer w-48 text-center"
                onClick={handleLogin}
                >Login</button>
                <button
                className="bg-blue-500 text-black p-2 cursor-pointer w-48 text-center"
                onClick={handleClose}
                >Close</button>
            </div>
            <div>
            <button onClick={handleOpenCreateWind}>Open CreateWind</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default JwtLogin;