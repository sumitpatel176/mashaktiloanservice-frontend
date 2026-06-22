import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            // 🎯 ALERT: Agar backend me @RequestParam ka naam 'userName' hai toh 'userName' hi rehne dena.
            // Agar tumne use badal kar 'email' kar diya tha, toh yahan 'userName: email' ki jagah 'email: email' kar dena.
            const response = await axios.post('https://mashaktiloanservice-backend.onrender.com/api/auth/public/forgot-password', null, {
                params: { username: email } 
            });
            
            setEmail('');
            setMessage("A reset link has been sent to your registered email address.");
        } catch (err) {
            // 🔥 FIX: Agar Spring Boot pura Object ({status, message, path}) bhejega, toh app crash nahi hoga
            if (err.response?.data && typeof err.response.data === 'object') {
                setError(err.response.data.message || "Invalid request. Please check your email.");
            } else {
                setError(err.response?.data || "Could not find an account with that email.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // 1. Full-screen background and flex box to center the form
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            
            {/* 2. Premium Dark Card (Login card se match karta hua) */}
            <div className="w-full max-w-md bg-black/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl space-y-8 backdrop-blur-xl">
                
                {/* 3. Title Section (Centered) */}
                <div className="text-center">
                    <h2 className="text-3xl font-black text-white tracking-tighter">
                        Request a Reset
                    </h2>
                    <p className="mt-3 text-sm text-zinc-400 font-semibold max-w-xs mx-auto">
                        We'll send a password reset link to your registered email address.
                    </p>
                </div>

                {/* 4. Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    
                    {/* Input Field Section */}
                    <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider ml-1">
                            Registered Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full mt-1 p-3.5 bg-black/40 border border-zinc-800 rounded-xl focus:outline-none focus:border-orange-500 text-white text-sm font-semibold transition"
                        />
                    </div>

                    {/* 5. Feedback Messages (Dynamic & Safe) */}
                    <div className="min-h-[20px] text-center px-1">
                        {message && <p className="text-sm text-emerald-400 font-semibold">{message}</p>}
                        {error && <p className="text-sm text-red-400 font-semibold">{error}</p>}
                    </div>

                    {/* 6. Action Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black rounded-2xl text-xs shadow-lg cursor-pointer tracking-wider disabled:opacity-50 transition"
                        >
                            {loading ? 'SENDING REQUEST... 📡' : 'SEND RESET LINK'}
                        </button>
                    </div>
                </form>

                {/* 7. Back to Login Link */}
                <div className="pt-2 text-center">
                    <Link to="/" className="text-[11px] text-zinc-400 hover:text-orange-500 transition-colors font-semibold">
                        Back to login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;