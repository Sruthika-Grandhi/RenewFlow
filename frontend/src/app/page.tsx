"use client";

import { motion } from "framer-motion";
import { Tv, Bell, Calendar, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <header className="px-6 py-4 border-b border-white/5 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Tv size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">RenewFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
          <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Go to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-blue-500/30 text-blue-400 text-sm font-medium mb-8">
            <Bell size={14} />
            <span>Never miss a recharge again</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Smart Reminders for your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Entertainment
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
            Track your DTH, OTT, and Cable subscriptions in one place. Get automated alerts before your plan expires across email, SMS, and WhatsApp.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all text-lg group">
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#demo" className="flex items-center justify-center px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all text-lg border border-white/10">
              View Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="glass-card p-8 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Scheduling</h3>
            <p className="text-gray-400 leading-relaxed">
              Automated reminders 7, 3, and 1 day before your recharge expiry to ensure uninterrupted service.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Channel Alerts</h3>
            <p className="text-gray-400 leading-relaxed">
              Receive notifications where you prefer: Email, SMS, Push, or direct to your WhatsApp.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">All Providers Supported</h3>
            <p className="text-gray-400 leading-relaxed">
              From Tata Play to Netflix, track any subscription type with our flexible dashboard.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
