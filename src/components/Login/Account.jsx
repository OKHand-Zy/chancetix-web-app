import { useState } from 'react';

const UserAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleCreateUser = async () => {
    try {
      // 先檢查帳號密碼是否存在
        const checkResponse = await fetch('http://localhost:3000/api/v1/api/checkUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const checkData = await checkResponse.json();

    if (checkData.exists) {
        console.error('User already exists');
        return;
    }

      // 如果不存在，再創建新使用者
    const createResponse = await fetch('http://localhost:3000/api/v1/api/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (createResponse.ok) {
        console.log('User created successfully!');
    } else {
        console.error('Failed to create user');
    }
    } catch (error) {
        console.error('Error creating user', error);
    }
};

    return (
    <div>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleCreateUser}>Create User</button>
    </div>
    );
};

export default UserAccount;
