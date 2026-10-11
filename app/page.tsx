"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MetadataHeader from "@/components/LoadSlip/MetadataHeader";
import OrderTable from "@/components/LoadSlip/OrderTable";
import Settings from "@/components/Settings";
import Invoices from "@/components/Invoices";
import EmployeeManagement from "@/components/EmployeeManagement";
import LiveFleetTracking from "@/components/LiveFleetTracking";
import { Sun, Moon } from "lucide-react";

export default function DispatchDashboard() {
  const [activeTab, setActiveTab] = useState("Load Slip");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Load Slip":
        return (
          <>
            <MetadataHeader />
            <OrderTable />
          </>
        );
      case "Live Fleet Tracking":
        return <LiveFleetTracking />;
      case "Settings":
        return <Settings />;
      case "Invoices":
        return <Invoices />;
      case "Employee Management":
        return <EmployeeManagement />;
      default:
        return (
          <>
            <MetadataHeader />
            <OrderTable />
          </>
        );
    }
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex h-screen w-full bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300`}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-transparent overflow-y-auto relative">
        <header className="p-8 pb-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeTab === "Load Slip" ? "Digital Load Slip" : activeTab}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {activeTab === "Load Slip"
                ? "Create and manage delivery records"
                : `Manage ${activeTab.toLowerCase()} for your business.`}
            </p>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <div className="p-8 flex-1 max-w-[1400px] w-full mx-auto space-y-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
