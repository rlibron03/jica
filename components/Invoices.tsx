"use client";

import { useState } from "react";
import { FileText, Receipt } from "lucide-react";

export default function Invoices() {
  const [activeTab, setActiveTab] = useState<"sales" | "charge">("sales");

  return (
    <div className="flex flex-col gap-8">
      {/* Tab Navigation */}
      <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl w-fit shadow-inner">
        <button
          onClick={() => setActiveTab("sales")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === "sales" 
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Receipt className="w-4 h-4" />
          Sales Invoices (Cash)
        </button>
        <button
          onClick={() => setActiveTab("charge")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === "charge" 
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <FileText className="w-4 h-4" />
          Charge Invoices (Credit)
        </button>
      </div>

      {/* Invoice Containers */}
      <div className="flex justify-center">
        {activeTab === "sales" ? (
          
          /* Sales Invoice (Cash Receipt Style) */
          <div className="w-full max-w-2xl bg-[#FEF08A] text-yellow-950 p-10 rounded-sm shadow-md font-mono relative overflow-hidden border-t-8 border-yellow-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Receipt className="w-48 h-48" />
            </div>
            
            <div className="text-center mb-8 border-b-2 border-yellow-600/20 pb-6">
              <h2 className="text-2xl font-black tracking-widest uppercase mb-1">J.I.C.A Ice Logistics</h2>
              <p className="text-sm opacity-80 uppercase tracking-widest">Official Sales Receipt</p>
            </div>

            <div className="flex justify-between mb-8 text-sm">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="font-bold w-20">Customer:</span>
                  <span className="border-b border-yellow-700/30 px-2 w-48">Walk-in</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-20">Date:</span>
                  <span className="border-b border-yellow-700/30 px-2 w-48">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs uppercase font-bold opacity-60 tracking-wider">Invoice No.</span>
                <span className="text-2xl font-bold text-red-600">#SI-00429</span>
              </div>
            </div>

            <table className="w-full text-left mb-8 border-collapse">
              <thead>
                <tr className="border-b-2 border-yellow-700/40">
                  <th className="py-2">Qty</th>
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="border-b-2 border-yellow-700/40 divide-y divide-yellow-700/10">
                <tr>
                  <td className="py-3">50</td>
                  <td className="py-3">Block Ice (Small)</td>
                  <td className="py-3 text-right">₱ 50.00</td>
                  <td className="py-3 text-right font-bold">₱ 2,500.00</td>
                </tr>
                <tr>
                  <td className="py-3">10</td>
                  <td className="py-3">Tube Ice (Big)</td>
                  <td className="py-3 text-right">₱ 150.00</td>
                  <td className="py-3 text-right font-bold">₱ 1,500.00</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₱ 4,000.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (12%)</span>
                  <span>₱ 480.00</span>
                </div>
                <div className="flex justify-between text-lg font-black pt-2 border-t-2 border-yellow-700/40 mt-2">
                  <span>TOTAL</span>
                  <span>₱ 4,480.00</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center text-xs opacity-60 italic">
              Thank you for your business!
            </div>
          </div>

        ) : (

          /* Charge Invoice (Formal Credit Style) */
          <div className="w-full max-w-3xl bg-white dark:bg-slate-100 text-slate-900 p-12 rounded-sm shadow-xl font-sans border border-slate-200">
            <div className="flex justify-between items-start mb-12 border-b-2 border-slate-900 pb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase mb-2">Charge Invoice</h2>
                <h3 className="font-bold text-slate-600">J.I.C.A Ice Logistics</h3>
                <p className="text-sm text-slate-500 mt-1">Gusa, Cagayan de Oro City</p>
              </div>
              <div className="text-right flex flex-col gap-2">
                <div className="flex justify-end items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Invoice No:</span>
                  <span className="text-2xl font-bold text-red-600">CI-88192</span>
                </div>
                <div className="flex justify-end items-center gap-3 mt-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Date:</span>
                  <span className="text-lg font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mb-10 bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Billed To</h4>
              <div className="text-lg font-bold">SM Supermalls CDO</div>
              <div className="text-slate-600">SM Downtown Premier, CM Recto Ave.</div>
            </div>

            <table className="w-full text-left mb-12">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 font-bold text-sm uppercase tracking-wider rounded-tl-lg">Qty</th>
                  <th className="py-3 px-4 font-bold text-sm uppercase tracking-wider">Item Description</th>
                  <th className="py-3 px-4 font-bold text-sm uppercase tracking-wider text-right">Unit Price</th>
                  <th className="py-3 px-4 font-bold text-sm uppercase tracking-wider text-right rounded-tr-lg">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 border-b-2 border-slate-900">
                <tr>
                  <td className="py-4 px-4 font-medium">100</td>
                  <td className="py-4 px-4">Crushed Ice (Big Sack)</td>
                  <td className="py-4 px-4 text-right">₱ 80.00</td>
                  <td className="py-4 px-4 text-right font-bold">₱ 8,000.00</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">20</td>
                  <td className="py-4 px-4">Block Ice (Big Sack)</td>
                  <td className="py-4 px-4 text-right">₱ 120.00</td>
                  <td className="py-4 px-4 text-right font-bold">₱ 2,400.00</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mb-16">
              <div className="w-72 bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between text-xl font-black">
                  <span>TOTAL DUE</span>
                  <span className="text-[#00875A]">₱ 10,400.00</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-200 text-sm">
              <div className="max-w-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700 block mb-1">Terms & Conditions:</strong>
                Accounts not paid within 15 days are subject to a 25% per annum interest charge.
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-48 border-b border-slate-900 mb-2"></div>
                <span className="font-bold text-slate-600 uppercase tracking-widest text-xs">Authorized Signature</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
