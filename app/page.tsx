'use client';
import { useEffect, useState } from 'react';

type StatusData = {
  last_update: string;
  status: string;
  last_log: string;
};

export default function Dashboard() {
  const [data, setData] = useState<StatusData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/trading_status.json');
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch status:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🚀 Citadel <span className="text-emerald-400">Terminal</span>
        </h1>
      </header>

      <div className="grid gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-sm text-gray-400 uppercase font-semibold mb-2">System Status</h2>
          <div className="flex items-center gap-3">
             <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-2xl font-mono">{data?.status || 'Loading...'}</span>
          </div>
        </div>

        <div className="bg-black p-6 rounded-xl border border-gray-700 font-mono text-sm overflow-hidden text-emerald-300">
          <h2 className="text-gray-500 mb-4 border-b border-gray-800 pb-2">LAST LOG ACTIVITY</h2>
          <p className="break-all">{data?.last_log || 'Waiting for system data...'}</p>
          <p className="text-xs text-gray-600 mt-4">Last update: {data?.last_update}</p>
        </div>
      </div>
    </div>
  );
}
