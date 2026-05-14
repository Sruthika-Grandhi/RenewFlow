"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Tv, Calendar as CalendarIcon, Clock, LogOut } from "lucide-react";
import Link from "next/link";
import axios from "axios";

// Mock data for UI demonstration until API is connected
const MOCK_SUBS = [
  { id: "1", provider: "Tata Play", planName: "Binge Plus", expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), cost: 350 },
  { id: "2", provider: "Netflix", planName: "Premium", expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), cost: 649 },
  { id: "3", provider: "Airtel Xstream", planName: "Fiber", expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), cost: 999 },
];

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState(MOCK_SUBS);

  useEffect(() => {
    // In a real app, fetch from backend here:
    // axios.get('http://localhost:5000/api/subscriptions').then(res => setSubscriptions(res.data))
  }, []);

  const getDaysRemaining = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Tv size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">RenewFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/add" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2">
              <Plus size={16} /> Add New
            </Link>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Subscriptions</h1>
            <p className="text-gray-400">Manage all your active plans in one place.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub, idx) => {
            const days = getDaysRemaining(sub.expiryDate);
            const isExpired = days < 0;
            const isExpiringSoon = days >= 0 && days <= 3;

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl glass-card relative overflow-hidden ${
                  isExpired ? 'border-red-500/50' : isExpiringSoon ? 'border-orange-500/50' : 'border-white/5'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{sub.provider}</h3>
                    <p className="text-sm text-gray-400">{sub.planName}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isExpired ? 'bg-red-500/20 text-red-400' : isExpiringSoon ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-gray-400"><CalendarIcon size={16} /> Expiry</span>
                    <span className="font-medium">{sub.expiryDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-gray-400"><Clock size={16} /> Remaining</span>
                    <span className={`font-bold ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-orange-400' : 'text-emerald-400'}`}>
                      {isExpired ? '0 days' : `${days} days`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                    <span className="text-gray-400">Cost</span>
                    <span className="font-bold">₹{sub.cost}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
