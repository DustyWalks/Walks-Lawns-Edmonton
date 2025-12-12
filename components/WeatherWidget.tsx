import React, { useEffect, useState } from 'react';

interface WeatherWidgetProps {
    onClick?: (data: { temp: number, snow: number, code: number }) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onClick }) => {
    const [data, setData] = useState<{temp: number, snow: number, code: number} | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // West Edmonton Coordinates approx
        const fetchWeather = async () => {
            try {
                // Open-Meteo is free and requires no API key for this usage
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.5444&longitude=-113.5444&current=temperature_2m,weather_code&daily=snowfall_sum&timezone=America%2FEdmonton');
                const json = await res.json();
                const fetchedData = {
                    temp: Math.round(json.current.temperature_2m),
                    code: json.current.weather_code,
                    snow: json.daily.snowfall_sum && json.daily.snowfall_sum[0] ? json.daily.snowfall_sum[0] : 0
                };
                setData(fetchedData);
            } catch (e) {
                // Fallback silently to a "Winter Mode" default if API fails
                setData({ temp: -8, code: 71, snow: 2 });
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    const handleClick = () => {
        if (data && onClick) {
            onClick(data);
        }
    };

    if (loading || !data) {
        return (
            <div className="h-14 w-48 bg-white/5 animate-pulse rounded-2xl backdrop-blur-md border border-white/10"></div>
        );
    }

    // WMO Weather Codes for Snow: 71, 73, 75, 77, 85, 86
    const isSnowing = [71, 73, 75, 77, 85, 86].includes(data.code) || data.snow > 0;

    return (
        <div 
            onClick={handleClick}
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 pr-5 shadow-2xl shadow-brand-900/20 transition-all hover:bg-white/15 hover:scale-[1.02] hover:shadow-glow group cursor-pointer select-none"
            role="button"
            aria-label="View local weather tips"
        >
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${isSnowing ? 'bg-gradient-to-br from-brand-400 to-brand-600' : 'bg-slate-700/50'} text-2xl shadow-inner border border-white/10`}>
                <span className="drop-shadow-md">{isSnowing ? '❄️' : '🌥️'}</span>
                {isSnowing && <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>}
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-white font-display font-bold text-xl tracking-tight">{data.temp}°C</span>
                    {isSnowing && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-white bg-brand-500/80 px-2 py-0.5 rounded-full shadow-sm animate-pulse-slow">
                            Snow Active
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-brand-100/90 group-hover:text-white transition-colors">
                        {data.snow > 0 ? `${data.snow}cm accumulation` : 'West Edmonton Status'}
                    </span>
                    <svg className="w-3 h-3 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;