'use client';
import React, { useEffect, useState } from 'react';

const ApiContant = ({ data }) => {
  // 將原本的 Idex 改為 index，並將初始值設為 0
  const [index, setIndex] = useState([]);
  useEffect(() => {
    // 在 useEffect 內執行異步函數
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getAllapi');
        const responseData = await response.json();
        // 這裡可能需要根據實際的 API 回傳結構來取得想要的數據，下面是一個示例：
        const newData = responseData.data;
        console.log(newData);
        // 假設 newData 是一個陣列，這裡設定新的 index
        setIndex(newData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    // 呼叫 fetchData 函數
    fetchData();
  }, []); // 加入空的依賴項目，確保 useEffect 只執行一次，不會被任何東西觸發

  return (
    <>
        {index.map(item => (
        <tr key={item.id}>
          <td className='border p-3 text-center'>{item.method}</td>
          <td className='border p-3 text-center'>{item.url}</td>
          <td className='border p-3 text-center'>{item.description}</td>
        </tr>
        ))}
    </>
  );
};

export default ApiContant;