// components/PricingCard.tsx
import React from 'react';

interface PricingCardProps {
  title: string;
  cost: string;
  sharing: string;
  idealFor: string;
  features: string[];
  onChoosePlan: (plan: string, cost: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, cost, sharing, idealFor, features, onChoosePlan }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-teal-700 mt-2 text-2xl font-semibold">${cost} / month</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <ul className="text-gray-700 text-sm">
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-teal-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a7 7 0 100 14 7 7 0 000-14zm1 10a2 2 0 11-4 0 2 2 0 014 0zM9 7a1 1 0 112 0 1 1 0 01-2 0z"
                clipRule="evenodd"
              />
            </svg>
            {sharing}
          </li>
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-teal-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H4z"
                clipRule="evenodd"
              />
            </svg>
            {idealFor}
          </li>
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2">
        <h3 className="font-bold text-gray-800 mb-2">Features:</h3>
        <ul className="text-gray-700 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-teal-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a7 7 0 100 14 7 7 0 000-14zm1 10a2 2 0 11-4 0 2 2 0 014 0zM9 7a1 1 0 112 0 1 1 0 01-2 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button onClick={() => onChoosePlan(title, cost)} className="bg-teal-700 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 w-full">
          Choose Plan
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
