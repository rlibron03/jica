"use client";

import { AlertTriangle, MapPin, Navigation, Truck, AlertOctagon } from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./LiveFleetMap"), { ssr: false });

export default function LiveFleetTracking() {
  return (
    <div className="flex flex-col gap-6 h-full min-h-[800px]">
      
      {/* Emergency Alert Center */}
      <section className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <AlertOctagon className="w-48 h-48" />
        </div>
        <div className="flex items-start md:items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-bold text-red-800 dark:text-red-400">Emergency Alert Center</h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">1 Active</span>
            </div>
            <p className="text-red-700/80 dark:text-red-300/80 text-sm font-medium">
              <strong className="text-red-900 dark:text-red-200">TRK-01:</strong> Reported Flat Tire near Lapasan Highway. 
            </p>
          </div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all shrink-0">
          Dispatch Rescue
        </button>
      </section>

      {/* Main Tracking Area */}
      <section className="flex flex-col xl:flex-row gap-6 flex-1 h-auto xl:h-[600px]">
        
        {/* Map Container */}
        <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden relative h-[500px] xl:h-full w-full">
          {/* Map Overlay Controls */}
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 z-[1000]">
            <h3 className="font-bold text-slate-800 dark:text-white">CDO Delivery Corridor</h3>
            <p className="text-xs text-slate-500">Live GPS tracking active</p>
          </div>

          <MapComponent />
        </div>

        {/* Truck Status Roster Side Panel */}
        <div className="w-full xl:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Fleet Status</h2>
            <p className="text-slate-500 text-sm mt-1">Real-time truck deployment</p>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-900/20">
            
            {/* Truck 2 */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">TRK-02</h3>
                    <span className="text-xs text-slate-500 font-medium">Pedro Penduko</span>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                  Delivering
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                <p>Unloading at <strong>Ayala Centrio</strong>. Expected complete in 5 mins.</p>
              </div>
            </div>

            {/* Truck 3 */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">TRK-03</h3>
                    <span className="text-xs text-slate-500 font-medium">Juan Dela Cruz</span>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                  In Transit
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Navigation className="w-4 h-4 shrink-0 mt-0.5 text-yellow-500" />
                <p>Bound for <strong>SM Uptown</strong>. ETA 12 mins.</p>
              </div>
            </div>

            {/* Truck 1 (Idle/Alert) */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">TRK-01</h3>
                    <span className="text-xs text-red-500 font-medium">Cardo Dalisay</span>
                  </div>
                </div>
                <span className="bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                  Idle / Alert
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <p>Flat Tire near <strong>Lapasan</strong>. Rescue dispatched.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
