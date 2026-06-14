import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanContext } from '../context/LoanContext';
import axios from 'axios';

const AdminDashboard = () => {
    const { 
        loans, 
        loading, 
        fetchLoans, 
        changeLoanStatus, 
        deleteLoanApplication, 
        setAuthCredentials, 
        logoutAdmin, 
        isLoggedIn 
    } = useContext(LoanContext);
    
    // Component Form States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    // 🔥 PROFESSIONAL MODAL STATES
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    // REAL-TIME DATABASE AUTHENTICATION HANDLER
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        try {
            const response = await axios.post('https://mashaktiloanservice-backend.onrender.com/api/auth/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const tempCreds = { username, password };
                setAuthCredentials(tempCreds);
                await fetchLoans(tempCreds);
            }
        } catch (error) {
            console.error("Authentication Failure:", error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('❌ Invalid Admin Credentials! Access Denied.');
            } else {
                setErrorMessage('❌ Backend Architecture is Unreachable!');
            }
            setPassword('');
        }
    };

    const handleSystemLogout = () => {
        logoutAdmin();
        navigate('/');
    };

    // 🔥 MODAL ACTIONS CONTROL
    const triggerDeleteModal = (id) => {
        setSelectedLoanId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedLoanId) return;
        setIsDeleting(true);
        try {
            // Direct context ke method ko call bina browser confirm ke
            await deleteLoanApplication(selectedLoanId); 
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
            setSelectedLoanId(null);
        }
    };

    // Business Logic Calculations
    const totalLoans = loans.length;
    const pendingLoans = loans.filter(l => (l.applicationStatus ? l.applicationStatus.toUpperCase() : 'PENDING') === 'PENDING').length;
    const approvedLoans = loans.filter(l => (l.applicationStatus ? l.applicationStatus.toUpperCase() : '') === 'APPROVED').length;
    const totalCapital = loans.reduce((acc, curr) => acc + (Number(curr.loanAmount) || 0), 0);

    // 🔒 SECURED LOCK SCREEN
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black flex items-center justify-center font-sans px-4 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-zinc-800 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-red-500 text-white rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg shadow-orange-500/20">🛡️</div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Ma Shakti Admin</h2>
                        <p className="text-xs text-zinc-500 font-medium mt-1 uppercase tracking-widest">Enterprise Database Access Gateway</p>
                    </div>

                    {errorMessage && (
                        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold">{errorMessage}</div>
                    )}

                    <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                        <div>
                            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider ml-1">Database Admin Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="w-full mt-1 p-3.5 bg-black/40 border border-zinc-800 rounded-xl focus:outline-none focus:border-orange-500 text-white text-sm font-semibold" />
                        </div>
                        <div>
                            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider ml-1">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full mt-1 p-3.5 bg-black/40 border border-zinc-800 rounded-xl focus:outline-none focus:border-orange-500 text-white text-sm font-semibold tracking-widest" />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => navigate('/')} className="w-1/3 py-3.5 bg-zinc-800 text-zinc-300 font-bold rounded-2xl text-xs cursor-pointer">Exit</button>
                            <button type="submit" className="w-2/3 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black rounded-2xl text-xs shadow-lg cursor-pointer tracking-wider">SECURE SYNC 🚀</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-orange-500 selection:text-white relative">
            
            {/* 🔥 PREMIUM BACKDROP BLUR MODAL FOR DELETE CONFIRMATION */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Dark Backdrop overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
                    
                    {/* Modal Box */}
                    <div className="relative transform overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 p-6 text-center shadow-2xl transition-all max-w-sm w-full space-y-5 animate-[fadeIn_0.2s_ease-out]">
                        <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center text-2xl mx-auto animate-bounce">⚠️</div>
                        <div>
                            <h4 className="text-lg font-black text-white">Confirm Delete Request</h4>
                            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                                Kya aap sach me application <span className="text-red-400 font-bold">#{selectedLoanId}</span> ko database se permanent hatana chahte hain? Yeh action rollback nahi hoga.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                disabled={isDeleting}
                                className="w-1/2 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl border border-zinc-800 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="w-1/2 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white text-xs font-black rounded-xl shadow-lg shadow-red-600/20 hover:brightness-110 transition cursor-pointer"
                            >
                                {isDeleting ? 'Deleting...' : 'Haa, Delete Karo'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🌐 NAV BAR */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md font-black">M</div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">Ma Shakti Dashboard</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Secure Channel Active • {time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button onClick={() => fetchLoans()} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer">🔄 Refresh Data Stream</button>
                        <button onClick={handleSystemLogout} className="bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer">🚪 System Logout</button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                {/* 📊 METRICS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { title: 'Total Inflow Leads', val: totalLoans, icon: '📋', color: 'border-blue-500', bg: 'text-blue-600 bg-blue-50' },
                        { title: 'Pending Reviewal', val: pendingLoans, icon: '⏳', color: 'border-amber-500', bg: 'text-amber-600 bg-amber-50' },
                        { title: 'Sanctioned & Disbursed', val: approvedLoans, icon: '✅', color: 'border-emerald-500', bg: 'text-emerald-600 bg-emerald-50' },
                        { title: 'Total Capital Request', val: `₹${totalCapital.toLocaleString('en-IN')}`, icon: '💰', color: 'border-indigo-500', bg: 'text-indigo-600 bg-indigo-50' }
                    ].map((card, i) => (
                        <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 ${card.color}`}>
                            <div className="flex justify-between items-start">
                                <p className="text-slate-400 uppercase text-[10px] font-black tracking-wider">{card.title}</p>
                                <span className={`text-lg p-2 rounded-xl ${card.bg}`}>{card.icon}</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mt-2 tracking-tight">{card.val}</h2>
                        </div>
                    ))}
                </div>

                {/* 🗂️ DATA TABLE */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <div>
                            <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Leads Pipe Framework</h3>
                        </div>
                        <span className="text-xs font-black text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl">{loans.length} Records Active</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                                    <th className="p-4 pl-6">Index</th>
                                    <th className="p-4">Applicant</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Segment</th>
                                    <th className="p-4">Requested Capital</th>
                                    <th className="p-4">Status Matrix</th>
                                    <th className="p-4 pr-6 text-center">Action Framework</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-10 text-center text-slate-400 font-bold animate-pulse">🔄 Fetching Live Data Layer From Enterprise Database...</td>
                                    </tr>
                                ) : loans.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-10 text-center text-slate-400 font-bold">📭 Pipe Database Empty!</td>
                                    </tr>
                                ) : (
                                    loans.map((loan) => {
                                        const currentStatus = loan.applicationStatus ? loan.applicationStatus.toUpperCase() : 'PENDING';
                                        return (
                                            <tr key={loan.id} className="hover:bg-slate-50/80 transition duration-200">
                                                <td className="p-4 pl-6 font-bold text-slate-400">#{loan.id}</td>
                                                <td className="p-4 font-extrabold text-slate-800">{loan.customerName}</td>
                                                <td className="p-4 font-bold text-slate-600">📞 {loan.phoneNumber}</td>
                                                <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase border border-slate-200">{loan.loanType}</span></td>
                                                <td className="p-4 font-black text-slate-900">₹{Number(loan.loanAmount).toLocaleString('en-IN')}</td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider inline-flex items-center gap-1 uppercase border
                                                        ${currentStatus === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                        ${currentStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                        ${currentStatus === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                                    `}>
                                                        {currentStatus}
                                                    </span>
                                                </td>
                                                <td className="p-4 pr-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {currentStatus === 'PENDING' ? (
                                                            <>
                                                                <button onClick={() => changeLoanStatus(loan.id, 'APPROVED')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-sm transition active:scale-95 cursor-pointer">Accept</button>
                                                                <button onClick={() => changeLoanStatus(loan.id, 'REJECTED')} className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-sm transition active:scale-95 cursor-pointer">Decline</button>
                                                            </>
                                                        ) : (
                                                            <div className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 border px-2 py-1 rounded-lg tracking-wider">Archived</div>
                                                        )}
                                                        
                                                        {/* 🔥 NEW TRIGGER MODAL DELETE BUTTON */}
                                                        <button 
                                                            onClick={() => triggerDeleteModal(loan.id)} 
                                                            className="bg-rose-100 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 p-1.5 rounded-xl text-xs transition-all duration-200 active:scale-95 cursor-pointer"
                                                            title="Database se hatayein"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;