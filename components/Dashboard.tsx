import React, { useState } from 'react';

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    // Dynamic Date Calculation
    const today = new Date();
    const nextPayoutDate = new Date(today);
    nextPayoutDate.setDate(today.getDate() + (5 - today.getDay() + 7) % 7); // Next Friday
    const payoutString = nextPayoutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Mock Data simulating "Real Live" Stripe Data
    const liveStats = {
        mrr: "12,450",
        mrrLabel: "Monthly Auto-Deposit",
        netVolume: "11,820",
        netVolumeLabel: "Take Home (Net)",
        activeSubs: 84,
        churn: 1, // 1 cancellation
        nextPayout: payoutString,
        payoutAmount: "3,200"
    };

    const clients = [
        { id: 1, address: "8742 156 St NW", name: "Mrs. Higgins", plan: "Core + Ice Melt", status: "Pending" },
        { id: 2, address: "9210 149 St NW", name: "John Doe", plan: "Core", status: "Done" },
        { id: 3, address: "14205 96 Ave NW", name: "The Petersons", plan: "Full Estate", status: "Done" },
        { id: 4, address: "10203 104 Ave NW", name: "Mike Ross", plan: "Core", status: "Pending" },
    ];

    const [isOptimizing, setIsOptimizing] = useState(false);
    const [invoiceSending, setInvoiceSending] = useState(false);
    const [invoiceSent, setInvoiceSent] = useState(false);
    
    // Invoice State
    const [invEmail, setInvEmail] = useState('');
    const [invAmount, setInvAmount] = useState('');
    const [invDesc, setInvDesc] = useState('Extra Salting - Front Walk');

    const handleOptimize = () => {
        setIsOptimizing(true);
        setTimeout(() => setIsOptimizing(false), 2000);
    };

    const handleSendInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        setInvoiceSending(true);
        // Simulate Stripe API call to create invoice
        setTimeout(() => {
            setInvoiceSending(false);
            setInvoiceSent(true);
            // Reset after 3 seconds
            setTimeout(() => {
                setInvoiceSent(false);
                setInvEmail('');
                setInvAmount('');
            }, 3000);
        }, 1500);
    };

    const handleMsgCrew = () => {
        // Opens native SMS app
        window.location.href = "sms:&body=Heads up team, snow protocol active. Check your routes.";
    };

    const handleExportCSV = () => {
        // Generates a real CSV file download
        const headers = ["ID", "Name", "Address", "Plan", "Status"];
        const rows = clients.map(c => [c.id, c.name, c.address, c.plan, c.status]);
        const csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `walks_lawns_clients_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 pb-20 animate-fade-in-up">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                        Yo Boss. 👋
                    </h1>
                    <p className="text-brand-200 text-sm font-medium mt-1">Live feed from Stripe & HQ.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onLogout}
                        className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                    >
                        Sign Out
                    </button>
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg animate-pulse-slow">
                        <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Systems Live</span>
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* 1. WEATHER STATUS */}
                <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sky Watch</h2>
                        <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-bold">WINTER MODE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">🌨️</div>
                        <div>
                            <p className="text-xl font-bold text-white">Snowing?</p>
                            <p className="text-xs text-slate-300 mt-1">
                                Yep. <span className="text-white font-bold">Crew is rolling.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. THE BAG (STRIPE DATA) */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.33 0 2.26-.87 2.26-2.02 0-1.52-1.37-2.06-3.54-2.63-2.52-.65-4.26-1.85-4.26-4.21 0-1.87 1.33-3.26 3.32-3.64V2h2.67v1.9c1.7.35 2.93 1.45 3.07 3.32h-2.02c-.14-1.01-1-1.78-2.31-1.78-1.24 0-2.04.83-2.04 1.84 0 1.35 1.25 1.91 3.55 2.5 2.59.67 4.25 1.96 4.25 4.31 0 1.97-1.4 3.42-3.48 3.73z"/></svg>
                    </div>
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">{liveStats.mrrLabel}</h2>
                    <p className="text-4xl font-display font-extrabold text-white tracking-tight">${liveStats.mrr}</p>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-slate-400">Next Payout:</span>
                        <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">{liveStats.nextPayout} (${liveStats.payoutAmount})</span>
                    </div>
                </div>

                {/* 3. OPTIMIZER */}
                <button 
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className="bg-brand-600 hover:bg-brand-500 active:scale-[0.98] transition-all duration-200 rounded-2xl p-6 text-left relative overflow-hidden border border-brand-400/20 shadow-lg shadow-brand-500/20 group"
                >
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-brand-200">Route Logic</h2>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {isOptimizing ? 'Thinking...' : 'Fix My Route 🚀'}
                            </h3>
                            <p className="text-brand-100 text-xs font-medium opacity-80">
                                {isOptimizing ? 'Calculating efficiency...' : 'Optimize list for speed.'}
                            </p>
                        </div>
                    </div>
                    {/* Spinner BG */}
                    {isOptimizing && (
                         <div className="absolute -right-4 -bottom-4 animate-spin text-white opacity-20">
                            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                         </div>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Tools */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* QUICK BILL TOOL */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="bg-slate-900/50 p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Quick Bill (One-Off)
                            </h3>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Stripe Direct</span>
                        </div>
                        <div className="p-6">
                            {invoiceSent ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in-up">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h4 className="text-white font-bold text-lg">Bag Secured.</h4>
                                    <p className="text-slate-400 text-sm">Invoice sent to client. Funds inbound.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSendInvoice} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-slate-400 font-bold uppercase mb-1">Who owes us?</label>
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="client@email.com" 
                                                value={invEmail}
                                                onChange={e => setInvEmail(e.target.value)}
                                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-400 font-bold uppercase mb-1">How much?</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2 text-slate-500 text-sm">$</span>
                                                <input 
                                                    required
                                                    type="number" 
                                                    placeholder="0.00" 
                                                    value={invAmount}
                                                    onChange={e => setInvAmount(e.target.value)}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg pl-6 pr-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400 font-bold uppercase mb-1">For what?</label>
                                        <input 
                                            type="text" 
                                            value={invDesc}
                                            onChange={e => setInvDesc(e.target.value)}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={invoiceSending}
                                        className="w-full bg-slate-700 hover:bg-brand-600 text-white font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                                    >
                                        {invoiceSending ? 'Processing...' : 'Send the Bill 💸'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* THE GRIND (Route List) */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white">The Daily Grind</h2>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleMsgCrew}
                                    className="text-xs bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full font-bold hover:bg-brand-500/30 transition flex items-center gap-1"
                                >
                                    <span>Msg Crew</span>
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                </button>
                                <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">Sorted by Speed</span>
                            </div>
                        </div>
                        
                        <div className="divide-y divide-white/5">
                            {clients.map((client, index) => (
                                <div 
                                    key={client.id}
                                    className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group"
                                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(client.address)}`, '_blank')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-colors ${client.status === 'Done' ? 'bg-emerald-500' : 'bg-slate-700 group-hover:bg-brand-500'}`}>
                                            {client.status === 'Done' ? '✓' : index + 1}
                                        </div>
                                        <div>
                                            <p className={`font-bold text-sm ${client.status === 'Done' ? 'text-slate-500 line-through' : 'text-white'}`}>{client.address}</p>
                                            <p className="text-xs text-slate-400">{client.name} • <span className="text-brand-400">{client.plan}</span></p>
                                        </div>
                                    </div>
                                    <div className="text-slate-600 group-hover:text-brand-400 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Stats & Value Adds */}
                <div className="space-y-6">
                    
                    {/* STATS LIST */}
                    <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-5 space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">At a Glance</h3>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-300">Total Clients</span>
                            <span className="text-white font-bold">{liveStats.activeSubs}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-300">Ghosts (Churn)</span>
                            <span className="text-red-400 font-bold">{liveStats.churn}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                            <span className="text-sm text-slate-300">Take Home (Net)</span>
                            <span className="text-emerald-400 font-bold font-display">${liveStats.netVolume}</span>
                        </div>
                    </div>

                    {/* VALUE ADDS */}
                    <div className="bg-gradient-to-br from-brand-900/40 to-slate-900 border border-brand-500/20 rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                             ⚡ Owner Value Adds
                        </h3>
                        <div className="space-y-3">
                            <button 
                                onClick={handleExportCSV}
                                className="w-full text-left bg-black/20 hover:bg-black/40 p-3 rounded-xl border border-white/5 transition-all group active:scale-[0.98]"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="block text-xs font-bold text-brand-200 group-hover:text-white">Customer Export (CSV)</span>
                                    <svg className="w-3 h-3 text-slate-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </div>
                                <span className="text-[10px] text-slate-400">Download email list for marketing.</span>
                            </button>
                            <button className="w-full text-left bg-black/20 hover:bg-black/40 p-3 rounded-xl border border-white/5 transition-all group cursor-not-allowed opacity-50">
                                <span className="block text-xs font-bold text-brand-200 group-hover:text-white">Expense Tracker</span>
                                <span className="text-[10px] text-slate-400">Coming Soon. Log salt & fuel.</span>
                            </button>
                             <button className="w-full text-left bg-black/20 hover:bg-black/40 p-3 rounded-xl border border-white/5 transition-all group">
                                <span className="block text-xs font-bold text-brand-200 group-hover:text-white">Dispute Center</span>
                                <span className="text-[10px] text-slate-400">0 open chargebacks. (Nice).</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;