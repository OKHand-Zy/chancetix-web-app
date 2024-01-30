import React, { useState } from 'react';

const LoginWind = ({ togglePopup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // 登入成功的處理邏輯，例如導向其他頁面
        console.log('Login successful!');
        // 清空輸入欄位
        setUsername('');
        setPassword('');
        setErrorMessage('');
        togglePopup(data.user.account);
      } else {
        const data = await response.json();
        console.error('Login failed:', data.error);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Internal Server Error');
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

export default LoginWind;