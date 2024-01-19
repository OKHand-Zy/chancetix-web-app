import React from 'react'
import ApiContant from '../../components/contant';

export default function ApiPage() {
  return (
    <div>
        <h1> API List</h1>  
        <table className='w-full border-collapse'>
            <tbody>
            <tr>
                <td className='border p-3 text-center'>Method</td> 
                <td className='border p-3 text-center'>URL</td>
                <td className='border p-3 text-center'>Description</td>
            </tr>
                <ApiContant />
            </tbody>
        </table>
    </div>
  );
}
