"use client";

import { FileText, CreditCard, Settings, Users, Map } from "lucide-react";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
        active
          ? "bg-yellow-400 text-emerald-950 font-bold shadow-sm hover:brightness-105"
          : "text-emerald-50 hover:bg-white/10"
      }`}
    >
      <span className={active ? "opacity-100" : "opacity-70"}>
        {icon}
      </span>
      {label}
    </button>
  );
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-72 bg-[#00875A] dark:bg-emerald-950 text-white flex flex-col shadow-xl z-10 shrink-0 h-full overflow-y-auto">
      <div className="p-6 flex flex-col items-center justify-center border-b border-white/10 gap-4">
        <img 
          src="/jica-logo.png" 
          alt="JICA Ice Logistics Logo" 
          className="w-32 h-auto object-contain"
        />
        <h2 className="text-xl font-black tracking-wider text-yellow-400 text-center uppercase drop-shadow-md">
          J.I.C.A ICE LOGISTICS
        </h2>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2">
        <NavItem 
          icon={<FileText className="w-5 h-5" />} 
          label="Load Slip" 
          active={activeTab === "Load Slip"} 
          onClick={() => setActiveTab("Load Slip")} 
        />
        <NavItem 
          icon={<Map className="w-5 h-5" />} 
          label="Live Fleet Tracking" 
          active={activeTab === "Live Fleet Tracking"} 
          onClick={() => setActiveTab("Live Fleet Tracking")} 
        />
        <NavItem 
          icon={<Users className="w-5 h-5" />} 
          label="Employee Management" 
          active={activeTab === "Employee Management"} 
          onClick={() => setActiveTab("Employee Management")} 
        />
        <NavItem 
          icon={<CreditCard className="w-5 h-5" />} 
          label="Invoices" 
          active={activeTab === "Invoices"} 
          onClick={() => setActiveTab("Invoices")} 
        />
        <div className="pt-8 pb-4">
          <p className="text-xs font-bold text-emerald-200 uppercase tracking-wider px-4">System</p>
        </div>
        <NavItem 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
          active={activeTab === "Settings"} 
          onClick={() => setActiveTab("Settings")} 
        />
      </nav>
    </aside>
  );
}
