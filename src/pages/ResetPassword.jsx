import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // URL se automatic token utha lega
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🔐 Security Check: Pehle hi check kar lo dono password match ho rahe hain ya nahi
        if (newPassword !== confirmPassword) {
            setError("Dono password match nahi ho rahe hain bhai!");
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            // 🎯 Tumhara second backend endpoint params ke saath
            const response = await axios.post('https://mashaktiloanservice-backend.onrender.com/api/auth/public/reset-password', null, {
                params: {
                    token: token,
                    newPassword: newPassword
                }
            });
            
            setMessage("Password has been reset successfully! 🎉");
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            // Safe Error handling agar backend se object aaye toh
            if (err.response?.data && typeof err.response.data === 'object') {
                setError(err.response.data.message || "Token is invalid or has expired.");
            } else {
                setError(err.response?.data || "Something went wrong. Please request a new link.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-black/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl space-y-8 backdrop-blur-xl">
                
                {/* Title */}
                <div className="text-center">
                    <h2 className="text-3xl font-black text-white tracking-tighter">
                        Create New Password
                    </h2>
                    <p className="mt-3 text-sm text-zinc-400 font-semibold max-w-xs mx-auto">
                        Enter your new secure password below to update your account.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    
                    {/* New Password Input */}
                    <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider ml-1">
                            New Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                            className="w-full mt-1 p-3.5 bg-black/40 border border-zinc-800 rounded-xl focus:outline-none focus:border-orange-500 text-white text-sm font-semibold tracking-widest transition"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider ml-1">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                            className="w-full mt-1 p-3.5 bg-black/40 border border-zinc-800 rounded-xl focus:outline-none focus:border-orange-500 text-white text-sm font-semibold tracking-widest transition"
                        />
                    </div>

                    {/* Messages Panel */}
                    <div className="min-h-[20px] text-center px-1">
                        {message && (
                            <div className="space-y-2">
                                <p className="text-sm text-emerald-400 font-semibold">{message}</p>
                                <Link to="/" className="inline-block text-xs text-orange-500 hover:underline font-bold mt-1">
                                    Click here to Login 🚀
                                </Link>
                            </div>
                        )}
                        {error && <p className="text-sm text-red-400 font-semibold">{error}</p>}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading || !token} 
                            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black rounded-2xl text-xs shadow-lg cursor-pointer tracking-wider disabled:opacity-50 transition"
                        >
                            {loading ? 'UPDATING PASSWORD... 📡' : 'RESET PASSWORD'}
                        </button>
                    </div>
                </form>

                {/* Secure warning if token is missing */}
                {!token && (
                    <p className="text-xs text-center text-red-500 font-semibold">
                        ❌ Security Alert: No reset token found in URL. Please use the link sent to your email.
                    </p>
                )}

            </div>
        </div>
    );
};

export default ResetPassword;