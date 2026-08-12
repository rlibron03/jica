"use client";

import { useState } from "react";
import { store, IceType } from "@/lib/store";
import { Save, Image as ImageIcon, Plus, Trash2, MapPin } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

export default function Settings() {
  const [inventory, setInventory] = useState<IceType[]>(store.iceTypes);
  const [locations, setLocations] = useState<string[]>(store.locations);
  const [newLocation, setNewLocation] = useState("");
  
  const [itemToDelete, setItemToDelete] = useState<{ type: 'ice' | 'location', id: any } | null>(null);

  // --- ICE INVENTORY LOGIC ---
  const updatePrice = (id: number, newPrice: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };

  const addIceType = () => {
    const newId = inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
    setInventory([...inventory, { id: newId, name: "New Ice Type", price: 0 }]);
  };

  // --- LOCATION LOGIC ---
  const addLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  // --- DELETE LOGIC ---
  const confirmDelete = (type: 'ice' | 'location', id: any) => {
    setItemToDelete({ type, id });
  };

  const executeDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'ice') {
      setInventory(inventory.filter(i => i.id !== itemToDelete.id));
    } else if (itemToDelete.type === 'location') {
      setLocations(locations.filter(l => l !== itemToDelete.id));
    }
    setItemToDelete(null);
  };

  const saveChanges = () => {
    store.iceTypes = inventory;
    store.locations = locations;
    alert("Settings successfully updated!");
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Action Bar */}
      <div className="flex justify-end sticky top-28 z-20">
        <button 
          onClick={saveChanges}
          className="flex items-center gap-2 px-8 py-3 bg-[#FFD700] text-yellow-950 rounded-xl font-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-wider"
        >
          <Save className="w-5 h-5" />
          Save All Settings
        </button>
      </div>

      {/* --- ICE INVENTORY SECTION --- */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ice Inventory Manager</h2>
            <p className="text-slate-500 text-sm mt-1">Update base prices and product photos.</p>
          </div>
          <button 
            onClick={addIceType}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-[#00875A] dark:text-emerald-400 rounded-lg font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Ice Type
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <div key={item.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col gap-4 bg-slate-50 dark:bg-slate-900 relative group">
              
              <button 
                onClick={() => confirmDelete('ice', item.id)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Ice Type"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer group/photo">
                <ImageIcon className="w-10 h-10 mb-2 group-hover/photo:scale-110 transition-transform" />
                <span className="text-xs font-medium">Upload Photo</span>
              </div>

              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={item.name}
                  onChange={(e) => setInventory(inventory.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))}
                  className="font-bold text-lg text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#00875A] focus:outline-none px-1 py-0.5 transition-colors" 
                />
                
                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Base Price</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-medium">₱</span>
                    <input 
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) => updatePrice(item.id, parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00875A] text-slate-900 dark:text-slate-100 font-medium transition-shadow"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- DELIVERY LOCATIONS SECTION --- */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-200 dark:border-slate-700 pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Delivery Locations</h2>
            <p className="text-slate-500 text-sm mt-1">Manage active delivery zones.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="text" 
              placeholder="e.g. Puerto"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLocation()}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00875A] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full md:w-64"
            />
            <button 
              onClick={addLocation}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00875A] text-white rounded-lg font-bold hover:brightness-110 transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Location
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <div key={loc} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <MapPin className="w-4 h-4 text-[#00875A]" />
                {loc}
              </div>
              <button 
                onClick={() => confirmDelete('location', loc)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <ConfirmModal 
        isOpen={!!itemToDelete}
        onConfirm={executeDelete}
        onCancel={() => setItemToDelete(null)}
        message={`Are you sure you want to delete this ${itemToDelete?.type === 'ice' ? 'ice type' : 'location'}?`}
      />
    </div>
  );
}
