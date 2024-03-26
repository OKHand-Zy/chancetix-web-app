import LoginButton from '@/components/auth/login-button';
import React from 'react';

type Props = {};

function loginhomepage({}: Props) {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐 Auth
        </h1>
        <p className="text-white text-lg">simple auth service</p>
        <div>
          <LoginButton>
            <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Sign in
            </button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

export default loginhomepage;
