"use client"; // Ensures this component is treated as a client-side component

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userInputCode, setUserInputCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetPasswordBox, setShowResetPasswordBox] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
        router.push('/dashboard');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'An error occurred during login.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('An unexpected error occurred.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsCodeSent(true);
        setError('');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to send verification code.');
      }
    } catch (err) {
      console.error('Failed to send verification code:', err);
      setError('Failed to send verification code.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: userInputCode }),
      });

      if (res.ok) {
        setShowResetPasswordBox(true);
        setError('');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'The verification code you entered is incorrect.');
      }
    } catch (err) {
      console.error('Failed to verify code:', err);
      setError('Failed to verify code.');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (res.ok) {
        console.log('Password reset successful');
        setIsForgotPassword(false);
        setIsCodeSent(false);
        setShowResetPasswordBox(false);
        setEmail('');
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        router.push('/dashboard'); // Redirect to the dashboard after a successful password reset
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to reset password.');
      }
    } catch (err) {
      console.error('Failed to reset password:', err);
      setError('Failed to reset password.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="card w-full md:w-96 bg-white shadow-xl">
        <figure className="px-10 flex flex-col items-center">
          <div className="aspect-w-1 aspect-h-1">
            <Image src="/pic/logoIMCU.png" alt="logo for image captioning" width={130} height={130} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-teal-700 mt-2">
            {isForgotPassword ? 'Forgot Password' : 'Login'}
          </h1>
        </figure>

        <div className="p-8 mt-0">
          {!isForgotPassword && !isCodeSent && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-col items-center">
                <button className="px-4 py-2 w-80 bg-teal-700 text-white rounded-md">Login</button>
                <button 
                  type="button" 
                  className="text-teal-700 mt-4"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          )}

          {/* Remaining components for forgot password, verification, and reset password */}
          {isForgotPassword && !isCodeSent && (
            <div className="alert-box">
              <h2 className="text-xl font-semibold text-teal-700 mb-4">Forgot Password</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Enter your email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button className="px-4 py-2 w-80 bg-teal-700 text-white rounded-md" onClick={handleForgotPassword}>
                  Send Code
                </button>
              </div>
            </div>
          )}

          {isCodeSent && !showResetPasswordBox && (
            <div className="alert-box">
              <h2 className="text-xl font-semibold text-teal-700 mb-4">Enter Verification Code</h2>
              <div className="mb-4">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-900">Verification Code</label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={userInputCode}
                  onChange={(e) => setUserInputCode(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button className="px-4 py-2 w-80 bg-teal-700 text-white rounded-md" onClick={handleVerifyCode}>
                  Verify Code
                </button>
              </div>
            </div>
          )}

          {showResetPasswordBox && (
            <div className="alert-box">
              <h2 className="text-xl font-semibold text-teal-700 mb-4">Reset Password</h2>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button className="px-4 py-2 w-80 bg-teal-700 text-white rounded-md" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
