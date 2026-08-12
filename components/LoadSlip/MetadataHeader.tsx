"use client";

import { useEffect, useState } from "react";

export default function MetadataHeader() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    // Format YYYY-MM-DD
    setCurrentDate(now.toISOString().split("T")[0]);
    
    // Format HH:MM (24-hour)
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Truck No.</label>
        <input 
          type="text" 
          className="px-3 py-2 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00875A] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-shadow" 
          placeholder="e.g. TRK-01" 
        />
      </div>
      <div className="flex flex-col gap-1.5 opacity-80 cursor-not-allowed">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date</label>
        <input 
          type="date" 
          className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-not-allowed" 
          value={currentDate}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1.5 opacity-80 cursor-not-allowed">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Time</label>
        <input 
          type="time" 
          className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-not-allowed" 
          value={currentTime}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">In-Charge</label>
        <input 
          type="text" 
          className="px-3 py-2 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00875A] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-shadow" 
          placeholder="Manager Name" 
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Driver</label>
        <input 
          type="text" 
          className="px-3 py-2 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00875A] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-shadow" 
          placeholder="Driver Name" 
        />
      </div>
    </section>
  );
}
