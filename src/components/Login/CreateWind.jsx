import React, { useState } from 'react';

const CreateWind = ({ togglePopup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateUser = async () => {
  try {
      const response = await fetch('/api/v1/createUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('User created successfully:', data.user);
          // 清空輸入欄位
          setUsername('');
          setPassword('');
          setErrorMessage('');
          setShowSuccess(true);
      } else {
          const data = await response.json();
          console.error('Failed to create user:', data.error);
          setErrorMessage(data.error);
      }
  } catch (error) {
      console.error('Error creating user', error);
      setErrorMessage('Internal Server Error');
  }
  };

const handleClose = () => {
  togglePopup(); // 关闭弹窗
  setErrorMessage(''); // 清除错误消息
};
const handleDone = () => {
  togglePopup(); // 關閉彈窗
  setShowSuccess(false); // 重置 showSuccess 狀態
};

return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center">
      <div className="w-300 bg-white p-40 rounded-8">
        <div className="text-black p-2 cursor-pointer w-90 text-center">
          {showSuccess ? (
            <>
              <p>Success</p>
              <button
                className="bg-blue-500 text-black p-2 cursor-pointer w-48 text-center"
                onClick={handleDone}
              > Done </button>
            </>
          ) : (
            <>
              <p>Create Account.</p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <label htmlFor="username" className="mr-2">
                    Username: 
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="password" className="mr-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {errorMessage && (
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-black p-2 cursor-pointer w-48 text-center"
                  onClick={handleCreateUser}
                > Create User </button>
                <button
                  className="bg-blue-500 text-black p-2 cursor-pointer w-48 text-center"
                  onClick={handleClose}
                > Close </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWind;