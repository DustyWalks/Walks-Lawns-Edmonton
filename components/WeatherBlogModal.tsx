import React, { useEffect, useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { SNOW_BG_IMAGE } from '../constants';

interface WeatherBlogModalProps {
    onClose: () => void;
    weatherData: { temp: number; code: number; snow: number } | null;
}

interface BlogContent {
    mainFeature: {
        tag: string;
        title: string;
        content: string;
        emoji: string;
    };
    diyTip: {
        title: string;
        content: string;
        difficulty: string;
    };
    localIntel: string[];
}

const WeatherBlogModal: React.FC<WeatherBlogModalProps> = ({ onClose, weatherData }) => {
    const [content, setContent] = useState<BlogContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateAdvice = async () => {
            if (!weatherData) return;

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const prompt = `
                    Current West Edmonton Weather:
                    Temperature: ${weatherData.temp}°C
                    Snow Accumulation Forecast: ${weatherData.snow}cm
                    Weather Code: ${weatherData.code}

                    Task:
                    Generate a fun, high-value "Weather Watch" daily update for independent seniors living in West Edmonton.
                    The content MUST be specific to the current weather above.
                    
                    Tone:
                    Empowering, "Work Smarter Not Harder", Local Expert, Energetic. NOT "old" or "condescending". Use terms like "Pro Strategy" or "Home Intel".

                    Requirements:
                    1. Main Feature: A specific home maintenance or safety tip based on today's weather (e.g., ice melt usage if snowing, furnace filters if cold, humidity if dry).
                    2. DIY Tip: A quick, easy home win.
                    3. Local Intel: 2 short bullet points specific to West Edmonton (e.g., WEM walking, traffic on the Anthony Henday, local hardware store stock, community league news).
                `;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                mainFeature: {
                                    type: Type.OBJECT,
                                    properties: {
                                        tag: { type: Type.STRING, description: "Short punchy tag like 'Pro Strategy' or 'Ice Alert'" },
                                        title: { type: Type.STRING, description: "Catchy headline" },
                                        content: { type: Type.STRING, description: "2-3 sentences of valuable advice" },
                                        emoji: { type: Type.STRING, description: "Single emoji matching the topic" },
                                    }
                                },
                                diyTip: {
                                    type: Type.OBJECT,
                                    properties: {
                                        title: { type: Type.STRING },
                                        content: { type: Type.STRING },
                                        difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" }
                                    }
                                },
                                localIntel: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "Two short local West Edmonton specific tips or news items"
                                }
                            }
                        }
                    }
                });

                if (response.text) {
                    setContent(JSON.parse(response.text));
                }
            } catch (error) {
                console.error("Failed to generate content", error);
                // Fallback content in case of API failure
                setContent({
                    mainFeature: {
                        tag: "System Update",
                        title: "Weather Data Syncing...",
                        content: "We're having trouble pulling the latest AI intel, but the snow crews are still on high alert. Stay warm out there!",
                        emoji: "🤖"
                    },
                    diyTip: {
                        title: "Check Your Seals",
                        content: "Good time to check your door sweeps for drafts.",
                        difficulty: "Easy"
                    },
                    localIntel: ["West Edmonton Mall open for walking 7AM", "Drive safe on the Henday"]
                });
            } finally {
                setLoading(false);
            }
        };

        generateAdvice();
    }, [weatherData]);

    const isSnowing = weatherData ? [71, 73, 75, 77, 85, 86].includes(weatherData.code) || weatherData.snow > 0 : false;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md transition-opacity"></div>

            {/* Modal Content */}
            <div 
                className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up" 
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all border border-white/10 group"
                >
                    <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Header Section */}
                <div className="relative h-48 sm:h-64 flex-shrink-0 bg-brand-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
                     {/* Snow Pattern */}
                    <div 
                        className="absolute inset-0 opacity-30 pointer-events-none animate-snow-parallax"
                        style={{ backgroundImage: `url('${SNOW_BG_IMAGE}')` }}
                    ></div>
                    
                    <div className="absolute bottom-6 left-6 z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">West End Weather Watch</span>
                            <span className="text-brand-200 text-xs font-medium">Live from YEG</span>
                        </div>
                        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
                            {isSnowing ? "Snow Day Intel ❄️" : "West Edmonton Living"}
                        </h2>
                    </div>
                    
                    {/* Live Weather Badge */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 pr-4 rounded-xl">
                        <div className="text-2xl">{isSnowing ? '🌨️' : '🌥️'}</div>
                        <div>
                            <div className="text-white font-bold text-lg leading-none">{weatherData?.temp ?? '--'}°C</div>
                            <div className="text-[10px] text-brand-100 uppercase tracking-wider">Current</div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-900 text-slate-300 custom-scrollbar">
                    
                    {loading ? (
                        // Skeleton Loading State
                        <div className="animate-pulse space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    <div className="h-4 w-24 bg-slate-800 rounded"></div>
                                    <div className="h-8 w-3/4 bg-slate-800 rounded"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-800 rounded"></div>
                                        <div className="h-4 bg-slate-800 rounded"></div>
                                        <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-48 bg-slate-800 rounded-2xl"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="h-32 bg-slate-800 rounded-2xl"></div>
                                <div className="h-32 bg-slate-800 rounded-2xl"></div>
                            </div>
                        </div>
                    ) : content ? (
                        <>
                            {/* Main Feature */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center gap-2 text-brand-400 font-bold text-xs uppercase tracking-widest">
                                        <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                                        {content.mainFeature.tag}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{content.mainFeature.title}</h3>
                                    <p className="text-lg leading-relaxed text-slate-300 border-l-4 border-brand-500/30 pl-4">
                                        {content.mainFeature.content}
                                    </p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <button className="text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                                            Read Full Guide
                                        </button>
                                        <span className="text-xs text-slate-500">Generated for you just now</span>
                                    </div>
                                </div>
                                
                                {/* Service Plug (Subtle) */}
                                <div className="bg-brand-900/30 border border-brand-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors"></div>
                                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">{content.mainFeature.emoji}</div>
                                    <h4 className="font-bold text-white mb-2">Rather stay inside?</h4>
                                    <p className="text-xs text-brand-200 mb-4">We handle the cold so you don't have to. Unlimited clearing plans available.</p>
                                    <button onClick={onClose} className="text-xs font-bold bg-brand-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brand-500 transition-all">
                                        Check Availability
                                    </button>
                                </div>
                            </div>

                            <div className="h-px bg-white/10 w-full"></div>

                            {/* Secondary Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* DIY Tip */}
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            Quick DIY Win
                                        </h4>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-slate-900 ${content.diyTip.difficulty === 'Easy' ? 'bg-emerald-400' : 'bg-accent-400'}`}>{content.diyTip.difficulty}</span>
                                    </div>
                                    <h5 className="font-bold text-brand-100 mb-2">{content.diyTip.title}</h5>
                                    <p className="text-sm text-slate-400 leading-relaxed">{content.diyTip.content}</p>
                                </div>

                                {/* Local Intel */}
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                        West End Intel
                                    </h4>
                                    <ul className="space-y-3">
                                        {content.localIntel.map((item, index) => (
                                            <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                                                <span className="text-brand-500 font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : null}

                </div>
            </div>
        </div>
    );
};

export default WeatherBlogModal;