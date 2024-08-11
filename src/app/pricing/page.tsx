// pages/pricing.tsx
"use client"
import React, { useState } from 'react';
import PricingCard from '@/Components/PricingCard';
import Sidebar from '@/Components/Sidebar';

const Pricing: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ plan: string; cost: string }>({ plan: '', cost: '' });

  const handleChoosePlan = (plan: string, cost: string) => {
    setSelectedPlan({ plan, cost });
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pricing</h1>
        <div className="flex mt-2 justify-center">
          <div className="w-[80px] h-1 rounded-full bg-teal-600 inline-flex" />
        </div>
        <p className="text-gray-700 mt-2">Unlock the full potential of our image captioning services with flexible pricing plans designed to meet your needs.</p>
      </div>
      <div className="grid grid-cols-1 mt-20 mb-20 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <PricingCard
          title="Free"
          cost="0"
          sharing="Instagram"
          idealFor="Personal use"
          features={['Basic image captioning', '30 images per month']}
          onChoosePlan={handleChoosePlan}
        />
        <PricingCard
          title="Premium"
          cost="19.99"
          sharing="Instagram, Facebook, Twitter"
          idealFor="PNG with high quality captioning"
          features={['100 images per month', 'Access to advanced settings']}
          onChoosePlan={handleChoosePlan}
        />
        <PricingCard
          title="Enterprise"
          cost="99.99"
          sharing="Instagram, Facebook, Twitter"
          idealFor="Large organizations"
          features={['Unlimited image captioning', 'Access to advanced settings']}
          onChoosePlan={handleChoosePlan}
        />
      </div>
      <Sidebar show={showSidebar} plan={selectedPlan.plan} cost={selectedPlan.cost} onClose={closeSidebar} />
    </div>
  );
};

export default Pricing;
