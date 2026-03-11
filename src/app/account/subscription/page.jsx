"use client";
import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import { fetchSubscription, upgradeSubscription } from '@/lib/api';

export default function SubscriptionPage() {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscription()
            .then((data) => setSubscription(data.subscription))
            .catch(() => setSubscription(null))
            .finally(() => setLoading(false));
    }, []);

    const handleUpgrade = async (plan) => {
        try {
            await upgradeSubscription(plan);
            const data = await fetchSubscription();
            setSubscription(data.subscription);
        } catch (error) {
            console.error('Upgrade failed:', error);
        }
    };

    return (
        <section className="bg-white h-full w-full">
            <Container>
                {/* Main Settings Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 w-full max-w-[900px] shadow-sm">
                    <h1 className="text-[28px] font-bold text-black mb-8">Subscription</h1>
                    
                    {loading ? (
                        <div className="py-8">
                            <p className="text-gray-500 text-[15px]">Loading subscription details...</p>
                        </div>
                    ) : (
                        <>
                            {/* Current Plan Box */}
                            <div className="border border-gray-200 rounded-xl p-6 mb-6">
                                <h2 className="text-[17px] font-bold text-gray-900 mb-1">Current Plan</h2>
                                <p className="text-[15px] text-gray-500 capitalize">
                                    {subscription?.plan || 'Free'}
                                </p>
                                {subscription?.expiresAt && (
                                    <p className="text-[13px] text-gray-400 mt-2">
                                        Expires: {new Date(subscription.expiresAt).toLocaleDateString()}
                                    </p>
                                )}
                            </div>

                            {/* Upgrade Plans Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                
                                {/* Free Plan */}
                                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-start">
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-1">Free Plan</h3>
                                    <p className="text-[14px] text-gray-500 mb-6">Basic features</p>
                                    
                                    <button
                                        onClick={() => handleUpgrade('free')}
                                        className="mt-auto bg-[#E5E7EB] text-gray-800 text-[14px] font-medium px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Select Free
                                    </button>
                                </div>

                                {/* Premium Plan */}
                                <div className="border border-gray-200 rounded-xl p-6 bg-[#F4F7FF] flex flex-col items-start">
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-1">Premium Plan</h3>
                                    <p className="text-[14px] text-gray-500 mb-6">All features unlocked</p>
                                    
                                    <button
                                        onClick={() => handleUpgrade('premium')}
                                        className="mt-auto bg-[#2563EB] text-white text-[14px] font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Upgrade to Premium
                                    </button>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}