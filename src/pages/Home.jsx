import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanContext } from '../context/LoanContext';

const Home = () => {
    // 🔥 handleLoanSubmit ko call karenge aur localMsg state se message handle karenge
    const { loading, handleLoanSubmit } = useContext(LoanContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        loanType: 'Personal Loan',
        loanAmount: '',
        monthlyIncome: ''
    });

    // 🌟 Ekdam sateek local message state (text aur type ke sath)
    const [localMsg, setLocalMsg] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Context function ko data aur status callback bheja
        handleLoanSubmit(formData, (isSuccess) => {
            if (isSuccess) {
                // 👍 Success: Form submit ho gaya, sunder sa green message dikhao
                setLocalMsg({
                    text: '🎉 Form Submitted Successfully! Hum jald hi aapse sampark karenge.',
                    type: 'success'
                });

                // Form ke saare dabbe turant khali (reset)
                setFormData({
                    customerName: '',
                    phoneNumber: '',
                    loanType: 'Personal Loan',
                    loanAmount: '',
                    monthlyIncome: ''
                });

                // ⏱️ Theek 4 second baad message ko screen se automatic gayab kar do
                setTimeout(() => {
                    setLocalMsg({ text: '', type: '' });
                }, 4000);

            } else {
                // ❌ Error: Agar backend fassa ya database band mila
                setLocalMsg({
                    text: '🚨 Submission Failed! Kripya check karein aapka Server/Database chal raha hai ya nahi.',
                    type: 'error'
                });

                // Error message ko 5 second me gayab karenge
                setTimeout(() => {
                    setLocalMsg({ text: '', type: '' });
                }, 5000);
            }
        });
    };

    // 🔥 Smooth Scroll functionality to hit the evaluation form directly
    const handleScrollToForm = () => {
        const targetForm = document.getElementById('eligibility-engine-form');
        if (targetForm) {
            targetForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-orange-500 selection:text-white relative">
            
            {/* 🌐 NEW TOP MASTER NAVBAR */}
            <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-zinc-900 px-4 md:px-8 py-3.5 shadow-xl">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
                    
                    {/* Brand Corporate Identity */}
                    <div className="flex items-center space-x-3 cursor-pointer w-full sm:w-auto justify-between sm:justify-start" onClick={() => navigate('/')}>
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md shadow-orange-500/20">
                                MS
                            </div>
                            <div>
                                <span className="text-white font-black tracking-tight text-sm md:text-base block">Ma Shakti</span>
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block -mt-1">Loan Service</span>
                            </div>
                        </div>
                        {/* Compact Mobile Staff Tab */}
                        <button onClick={() => navigate('/admin')} className="sm:hidden text-zinc-500 text-[11px] font-bold bg-zinc-900/50 px-2 py-1 rounded-md border border-zinc-800/40">Staff 💼</button>
                    </div>

                    {/* Integrated Contacts & Actions Suite */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                        
                        {/* Enterprise Email Tag */}
                        <span className="hidden lg:inline-block text-[11px] text-zinc-500 font-medium border-r border-zinc-800 pr-3 h-4 leading-4">
                            ✉️ contact@mashaktiloan.com
                        </span>

                        {/* Interactive Click to Call Gateway */}
                        <a 
                            href="tel:+919876543210" 
                            className="bg-zinc-900 text-orange-400 border border-zinc-800/80 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wide hover:bg-zinc-800 transition duration-200"
                        >
                            📞 Call: +91 98765 43210
                        </a>
                        
                        {/* 🔥 GLOBAL ACTION SUBMIT TRIGGER */}
                        <button 
                            onClick={handleScrollToForm}
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-1.5 rounded-xl text-[11px] font-black tracking-wider uppercase shadow-md shadow-orange-500/10 active:scale-95 transition-all cursor-pointer"
                        >
                            Apply Online 🚀
                        </button>
                        
                        {/* Desktop Portal Entry */}
                        <button 
                            onClick={() => navigate('/admin')} 
                            className="hidden sm:inline-block bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer"
                        >
                            Staff Portal 💼
                        </button>
                    </div>

                </div>
            </nav>

            {/* 🌐 TOP UTILITY BAR */}
            <div className="bg-slate-950 text-slate-400 text-[11px] md:text-xs py-3 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-slate-900">
                <div className="flex items-center space-x-2 text-center sm:text-left">
                    <span className="inline-block animate-pulse text-emerald-500">●</span>
                    <span className="font-medium">Indore's Trusted Financial DSA Network Partner</span>
                </div>
                <div className="flex items-center space-x-4 font-bold">
                    <div className="text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">📞 Helpline: +91 98765 43210</div>
                    
                    <button 
                        onClick={() => navigate('/admin')} 
                        className="text-slate-500 hover:text-slate-300 text-[11px] font-black uppercase tracking-wider transition border-l border-slate-800 pl-4 cursor-pointer"
                    >
                        Staff Entry 💼
                    </button>
                </div>
            </div>

            {/* 🚀 PREMIUM HERO BANNER DESIGN */}
            <header className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black text-white py-20 md:py-28 px-4 md:px-8 shadow-2xl relative overflow-hidden border-b border-zinc-800">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="md:col-span-7 text-center md:text-left space-y-6">
                        <div className="inline-flex items-center bg-zinc-800/80 backdrop-blur-md text-orange-400 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-zinc-700/60 shadow-sm">
                            🛡️ Govt. Registered Financial Consultants
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                            Ma Shakti <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Loan Service</span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-xl font-medium max-w-xl leading-relaxed">
                            Kam se kam documents aur sabse tez approval ka wada. Indore ke sabhi bade sarkari aur private banks ke sath direct tie-up.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-zinc-400 pt-2">
                            <span className="flex items-center gap-1.5 bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800">⚡ Fast Disbursal</span>
                            <span className="flex items-center gap-1.5 bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800">📄 Minimum Paperwork</span>
                            <span className="flex items-center gap-1.5 bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800">📉 Lowest Interest</span>
                        </div>
                    </div>

                    {/* Premium Card Display Asset */}
                    <div className="md:col-span-5 flex justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20 transform scale-95 pointer-events-none animate-pulse"></div>
                        <div className="w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl border border-zinc-700/50 p-6 shadow-2xl flex flex-col justify-between transform hover:rotate-1 hover:scale-[1.02] transition duration-500 group">
                            <div className="flex justify-between items-start">
                                <span className="text-3xl bg-zinc-800 p-3 rounded-2xl border border-zinc-700/60 group-hover:scale-110 transition duration-300">📊</span>
                                <span className="text-[10px] font-black tracking-widest text-zinc-500 bg-zinc-950/60 px-3 py-1 rounded-full border border-zinc-800">DSA NETWORK</span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-wider">Corporate Eligibility Partner</p>
                                <h3 className="text-white text-xl font-black tracking-tight">Instant Credit Evaluation Engine v4.0</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 🏛️ MAIN CORE CONTENT GRID */}
            <main className="max-w-7xl mx-auto py-16 px-4 md:px-8 flex-grow w-full grid lg:grid-cols-12 gap-12 items-start">
                
                {/* LEFT CORE SECTION: SERVICES CATALOGUE */}
                <div className="lg:col-span-7 space-y-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight relative inline-block">
                            Our Specialized Retail Loans
                            <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">Indore me aapke business aur personal sapno ko poora karne ke liye customized financial products.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            { icon: '💼', title: 'Personal Loan', desc: 'Medical urgency, marriage expenses, ya kisi bhi zaroorat ke liye bina collateral ke.' },
                            { icon: '🏠', title: 'Home / Plot Loan', desc: 'Indore me apna sapno ka ghar, naya makaan ya residential plot lene ke liye best scheme.' },
                            { icon: '🚀', title: 'Business Grow Loan', desc: 'Apne running business, dukaan ya startup stock ko badhane ke liye quick business capital.' },
                            { icon: '🚗', title: 'Vehicle Finance', desc: 'Nayi ya used car aur commercial vehicle par sabse sasti EMI rates ka assurance.' }
                        ].map((srv, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                                <span className="text-2xl bg-slate-50 text-slate-700 p-3 rounded-xl inline-block group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">{srv.icon}</span>
                                <h4 className="font-black text-slate-800 text-base mt-4 group-hover:text-orange-600 transition-colors">{srv.title}</h4>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{srv.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* KYC TRUST BANNER */}
                    <div className="bg-gradient-to-r from-slate-900 via-zinc-900 to-slate-950 p-6 rounded-2xl border border-zinc-800 shadow-xl text-white">
                        <h4 className="font-black text-orange-400 text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
                            <span>📄</span> Mandatory KYC Documentation Checklist
                        </h4>
                        <ul className="text-xs text-zinc-400 space-y-2.5 font-medium">
                            <li className="flex items-center gap-2">✔ <span className="text-zinc-300 font-bold">Identity Proof:</span> [Aadhaar Redacted], PAN Card</li>
                            <li className="flex items-center gap-2">✔ <span className="text-zinc-300 font-bold">Income Stream Proof:</span> Pichle 3 Mahine ki Salary Slip ya Business ITR Logs</li>
                            <li className="flex items-center gap-2">✔ <span className="text-zinc-300 font-bold">Financial Standing:</span> Latest 6 Mahine ka updated Bank Statement</li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT CORE SECTION: ELIGIBILITY CALCULATOR FORM */}
                <div id="eligibility-engine-form" className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-200/80 sticky top-28 scroll-mt-28">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Check Your Eligibility</h3>
                        <p className="text-xs text-slate-400 font-medium mt-1">Apni info fill karein, humari sales team aapse coordinate karegi</p>
                    </div>
                    
                    {/* 🔥 LOCAL STATE VALA SUNDER MSG JO FORM KE THEEK UPAR AAYEGA AUR 4s ME GAYAB HO JAYEGA */}
                    {localMsg.text && (
                        <div className={`p-4 rounded-xl mb-4 text-center text-xs font-bold border transition-all duration-300
                            ${localMsg.type === 'success' 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                        >
                            {localMsg.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Full Applicant Name</label>
                            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 text-xs font-bold text-slate-800 transition" placeholder="e.g., Bhavesh Sharma" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Mobile Contact Number</label>
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 text-xs font-bold text-slate-800 transition" placeholder="e.g., 98765XXXXX" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Required Loan Vertical</label>
                            <select name="loanType" value={formData.loanType} onChange={handleChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white text-xs font-black text-slate-700 bg-white cursor-pointer">
                                <option value="Personal Loan">Personal Loan 💼</option>
                                <option value="Home Loan">Home Loan 🏠</option>
                                <option value="Business Loan">Business Loan 🚀</option>
                                <option value="Car Loan">Car Loan 🚗</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Required Capital (₹)</label>
                                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white text-xs font-bold text-slate-800 transition" placeholder="e.g., 500000" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Net Monthly Income (₹)</label>
                                <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white text-xs font-bold text-slate-800 transition" placeholder="e.g., 35000" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 text-xs tracking-wider uppercase mt-2 cursor-pointer">
                            {loading ? 'Processing Assessment Pipeline...' : 'Submit Application 🚀'}
                        </button>
                    </form>
                </div>
            </main>

            {/* 🏢 CORPORATE INFO FOOTER SECTION */}
            <footer className="bg-slate-950 text-slate-400 pt-16 pb-6 px-4 md:px-8 border-t border-slate-900 text-xs">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    <div className="space-y-4">
                        <h4 className="text-white font-black text-sm tracking-wide uppercase">Ma Shakti Loan Service</h4>
                        <p className="leading-relaxed text-slate-500">
                            Indore ke retail aur corporate segment ko sahi aur unbiased financial guidance provide karna hi hamara multi-year vision hai.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-black text-sm tracking-wide uppercase">📍 Corporate Address Hub</h4>
                        <p className="leading-relaxed text-slate-400">
                            102, First Floor, Shanti Nagar Complex,<br />
                            Near Vijay Nagar Square, AB Road,<br />
                            Indore, Madhya Pradesh - 452010
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-white font-black text-sm tracking-wide uppercase">✉️ Enterprise SLA Timing</h4>
                        <p>📧 Email Support: contact@mashaktiloan.com</p>
                        <p>⏰ Desk Hours: 10:00 AM - 7:00 PM (Monday to Saturday)</p>
                    </div>
                </div>
                <div className="text-center pt-6 border-t border-slate-900 text-[11px] text-slate-600 font-medium">
                    © 2026 Ma Shakti Loan Service. All Rights Reserved. Configured via React Router Framework.
                </div>
            </footer>

            {/* Security Gateway 2: Smooth Secret Floating Admin Trigger */}
            <div className="fixed bottom-6 right-6 z-50 group">
                <button 
                    onClick={() => navigate('/admin')} 
                    className="flex items-center justify-center w-12 h-12 bg-slate-950 text-white rounded-full shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:w-36 transition-all duration-300 overflow-hidden border border-slate-800 group-hover:scale-105 cursor-pointer"
                >
                    <span className="text-xl">🔑</span>
                    <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 font-black text-[10px] whitespace-nowrap tracking-wider uppercase">
                        Admin Portal
                    </span>
                </button>
            </div>

        </div>
    );
};

export default Home;