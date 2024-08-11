"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('text-gray-600');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageColor('text-red-500');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Signup successful');
        setMessageColor('text-green-500');
        router.push('/generatecaption');
      } else {
        setMessage(`Error: ${data.message}`);
        setMessageColor('text-red-500');
      }
    } catch (error) {
      setMessage('Error signing up');
      setMessageColor('text-red-500');
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="card w-full md:w-96 bg-white shadow-xl">
        <figure className="px-10 flex flex-col items-center">
          <div className="aspect-w-1 aspect-h-1">
            <Image src="/pic/logoIMCU.png" alt="logo for image captioning" width={130} height={130} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-teal-700 mt-2 mb-3" >SignUp</h1>
        </figure>
        <form onSubmit={handleSubmit}>
          <div className=" ml-4 mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black"
              required
            />
          </div>
          <div className=" ml-4 mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 bg-white block w-full rounded-md border border-gray-300 text-black"
              required
            />
          </div>
          <div className=" ml-4 mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 bg-white block w-full rounded-md border border-gray-300 text-black"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-teal-700 text-white rounded-md hover:bg-teal-800"
            >
              Sign Up
            </button>
          </div>
          {message && (
            <p className={`mt-4 text-sm text-center ${messageColor}`}>
              {message}
            </p>
          )}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <Link href="/login" className="text-teal-700 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
