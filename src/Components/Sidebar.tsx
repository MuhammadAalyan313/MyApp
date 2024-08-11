// components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  show: boolean;
  plan: string;
  cost: string;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, plan, cost, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transition-transform transform ${show ? 'translate-x-0' : 'translate-x-full'} bg-gray-800 bg-opacity-50`}>
      <div className="absolute right-0 w-80 h-full bg-white shadow-lg p-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
        <p className="text-gray-800 font-semibold mb-2">Plan: {plan}</p>
        <p className="text-gray-800 font-semibold mb-4">Cost: ${cost} / month</p>
        <div className="mt-4">
        <label className="block text-gray-800 font-medium">Email</label>
        <input type="email" id="email" name="email" className="mt-1 p-2 block w-full rounded-xl bg-white  border-teal-700 border-2  text-black  " />
        <label className="block text-gray-800 font-medium">Password</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 block w-full rounded-xl bg-white  border-teal-700 border-2 text-black " />
          <label className="block text-gray-800 font-medium">Card Number</label>
          <input type="text" className="mt-1 p-2 block w-full rounded-xl bg-white  border-teal-700 border-2 text-black " />
          <label className="block text-gray-800 font-medium">Expiration Date</label>
          <input type="text" className="mt-1 p-2 block w-full rounded-xl bg-white  border-teal-700 border-2 text-black" />
          <label className="block text-gray-800 font-medium">CVV</label>
          <input type="text" className="mt-1 p-2 block w-full rounded-xl bg-white  border-teal-700 border-2 text-black mb-6" />
          <button className="bg-teal-700 text-white py-2 px-4 rounded-full w-full">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
