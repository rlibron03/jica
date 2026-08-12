"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { store } from "@/lib/store";
import ConfirmModal from "../ConfirmModal";

type LoadSlipRow = {
  id: string;
  storeName: string;
  location: string;
  iceType: string;
  sackSize: string;
  qty: number | "";
  negotiatedPrice: number | "";
  paymentType: string;
};

export default function OrderTable() {
  const [rows, setRows] = useState<LoadSlipRow[]>([
    {
      id: "row-1",
      storeName: "",
      location: "",
      iceType: "",
      sackSize: "",
      qty: "",
      negotiatedPrice: "",
      paymentType: store.paymentTypes[0] || "Cash"
    }
  ]);
  const [nextId, setNextId] = useState(2);

  // Modal State
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: `row-${nextId}`,
        storeName: "",
        location: "",
        iceType: "",
        sackSize: "",
        qty: "",
        negotiatedPrice: "",
        paymentType: store.paymentTypes[0] || "Cash"
      }
    ]);
    setNextId(nextId + 1);
  };

  const confirmDelete = (id: string) => {
    setRowToDelete(id);
  };

  const executeDelete = () => {
    if (rowToDelete) {
      setRows(rows.filter((r) => r.id !== rowToDelete));
      setRowToDelete(null);
    }
  };

  const cancelDelete = () => {
    setRowToDelete(null);
  };

  const updateRow = (id: string, field: keyof LoadSlipRow, value: any) => {
    setRows(
      rows.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: value };
        }
        return r;
      })
    );
  };

  // Compute Grand Total
  const grandTotal = rows.reduce((acc, row) => acc + (Number(row.negotiatedPrice) || 0), 0);

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-12 text-center">#</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Store Name</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-40">Location</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-36">Ice Type</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Sack Size</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">Qty</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32 bg-slate-100 dark:bg-slate-800">Std. Total</th>
                <th className="py-3 px-4 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider w-36 bg-emerald-50 dark:bg-emerald-900/20">Negotiated Price</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-36">Payment</th>
                <th className="py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {rows.map((row, index) => {
                const selectedIce = store.iceTypes.find((t) => t.name === row.iceType);
                const basePrice = selectedIce ? selectedIce.price : 0;
                const stdTotal = (Number(row.qty) || 0) * basePrice;

                return (
                  <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="py-2 px-4 text-sm font-medium text-slate-400 text-center">{index + 1}</td>
                    <td className="py-2 px-2">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00875A] transition-all text-slate-900 dark:text-slate-100" 
                        placeholder="Store Name"
                        value={row.storeName}
                        onChange={(e) => updateRow(row.id, "storeName", e.target.value)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <select 
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00875A] transition-all appearance-none cursor-pointer text-sm text-slate-900 dark:text-slate-100"
                        value={row.location}
                        onChange={(e) => updateRow(row.id, "location", e.target.value)}
                      >
                        <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Select Location</option>
                        {store.locations.map(loc => (
                          <option key={loc} value={loc} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{loc}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <select 
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00875A] transition-all appearance-none cursor-pointer text-sm text-slate-900 dark:text-slate-100"
                        value={row.iceType}
                        onChange={(e) => updateRow(row.id, "iceType", e.target.value)}
                      >
                        <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Select Type</option>
                        {store.iceTypes.map(type => (
                          <option key={type.id} value={type.name} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{type.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <select 
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00875A] transition-all appearance-none cursor-pointer text-sm text-slate-900 dark:text-slate-100"
                        value={row.sackSize}
                        onChange={(e) => updateRow(row.id, "sackSize", e.target.value)}
                      >
                        <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Select Size</option>
                        {store.sackSizes.map(size => (
                          <option key={size} value={size} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{size}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <input 
                        type="number" 
                        min="0"
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00875A] transition-all text-slate-900 dark:text-slate-100" 
                        placeholder="0"
                        value={row.qty === "" ? "" : row.qty}
                        onChange={(e) => updateRow(row.id, "qty", e.target.value === "" ? "" : parseFloat(e.target.value))}
                      />
                    </td>
                    <td className="py-2 px-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      ₱ {stdTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-2 bg-emerald-50/50 dark:bg-emerald-900/10">
                       <div className="relative flex items-center">
                        <span className="absolute left-2 text-emerald-600 dark:text-emerald-400 font-medium z-10">₱</span>
                        <input 
                          type="number" 
                          min="0"
                          className="w-full pl-6 pr-2 py-1.5 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 rounded font-bold text-emerald-700 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all shadow-sm relative z-0" 
                          placeholder="0.00"
                          value={row.negotiatedPrice === "" ? "" : row.negotiatedPrice}
                          onChange={(e) => updateRow(row.id, "negotiatedPrice", e.target.value === "" ? "" : parseFloat(e.target.value))}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <select 
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 focus:border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00875A] transition-all appearance-none cursor-pointer text-sm font-medium text-slate-900 dark:text-slate-100"
                        value={row.paymentType}
                        onChange={(e) => updateRow(row.id, "paymentType", e.target.value)}
                      >
                        {store.paymentTypes.map(pt => (
                           <option key={pt} value={pt} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{pt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <button 
                        onClick={() => confirmDelete(row.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        disabled={rows.length === 1}
                        title="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-center">
          <button 
            onClick={addRow}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#00875A] dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Delivery
          </button>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12">
        <button className="flex items-center gap-2 px-8 py-4 bg-[#00875A] text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-900/20 hover:-translate-y-0.5 hover:shadow-emerald-900/30 transition-all active:translate-y-0">
          <Save className="w-5 h-5" />
          Save Load Slip
        </button>
        
        <div className="bg-[#FFD700] rounded-2xl p-6 shadow-xl flex flex-col items-end min-w-[300px]">
          <span className="text-yellow-900 font-bold text-sm uppercase tracking-wider mb-1 opacity-80">Grand Total</span>
          <span className="text-4xl font-extrabold text-yellow-950 tracking-tight">
            ₱ {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={!!rowToDelete}
        onConfirm={executeDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to remove this delivery record?"
      />
    </div>
  );
}
