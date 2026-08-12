"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, UserCircle } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

type Employee = {
  id: string;
  name: string;
  role: "Owner" | "Driver" | "Staff" | "Security";
  photoUrl?: string;
};

const MOCK_EMPLOYEES: Employee[] = [
  { id: "1", name: "Ellyza", role: "Owner" },
  { id: "2", name: "Jethro Bon Dena", role: "Driver" },
  { id: "3", name: "Rochill Libron", role: "Staff" },
  { id: "4", name: "Theo Christopher Vasquez", role: "Security" },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  const roleColors = {
    Owner: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    Driver: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Staff: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    Security: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  };

  const confirmDelete = (id: string) => {
    setEmployeeToDelete(id);
  };

  const executeDelete = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter(e => e.id !== employeeToDelete));
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Employee Roster</h2>
          <p className="text-slate-500 text-sm mt-1">Manage staff accounts and roles.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#00875A] text-white rounded-lg font-bold shadow-md hover:-translate-y-0.5 transition-all">
          <Plus className="w-4 h-4" />
          Add New Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <div key={employee.id} className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">

            {/* Profile Picture Area */}
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
              {employee.photoUrl ? (
                <img src={employee.photoUrl} alt={employee.name} className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-24 h-24 text-slate-300 dark:text-slate-700" />
              )}

              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-md hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => confirmDelete(employee.id)}
                  className="p-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-md hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details Area */}
            <div className="p-5 flex flex-col items-center gap-3">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white text-center">{employee.name}</h3>
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${roleColors[employee.role]}`}>
                {employee.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!employeeToDelete}
        onConfirm={executeDelete}
        onCancel={() => setEmployeeToDelete(null)}
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </div>
  );
}
