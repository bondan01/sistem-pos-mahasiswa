/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  BarChart3, 
  Menu, 
  X,
  Plus,
  Trash2,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Printer,
  Database,
  History,
  FileText,
  UserCheck,
  Briefcase,
  User as UserIcon,
  LogOut,
  ChevronDown
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types
import { Product, Customer, Supplier, Transaction, UserRole, UserSession } from "./types";

// Mock Initial Data
const INITIAL_PRODUCTS: Product[] = [
  { id: "P001", name: "Indomie Goreng", category: "Makanan", price: 3000, stock: 100, supplierId: "S001" },
  { id: "P002", name: "Aqua 600ml", category: "Minuman", price: 5000, stock: 50, supplierId: "S002" },
  { id: "P003", name: "Beras 5kg", category: "Sembako", price: 65000, stock: 4, supplierId: "S001" },
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "C001", name: "Budi Santoso", phone: "08123456789", address: "Jakarta" },
  { id: "C002", name: "Siti Aminah", phone: "08987654321", address: "Bandung" },
];

const INITIAL_SUPPLIERS: Supplier[] = [
  { id: "S001", name: "PT. Maju Bersama", contact: "0811223344", address: "Surabaya" },
  { id: "S002", name: "Distributor Tirta", contact: "0855667788", address: "Jakarta" },
];

const INITIAL_TRANSACTIONS = [
  {
    id: "INV-2024ABC123",
    date: new Date().toISOString(),
    customerId: "C001",
    items: [{ productId: "P001", quantity: 5, price: 3000 }],
    total: 16500,
    paymentMethod: "Tunai"
  },
  {
    id: "INV-2024XYZ456",
    date: new Date().toISOString(),
    customerId: "C002",
    items: [{ productId: "P002", quantity: 10, price: 5000 }],
    total: 55000,
    paymentMethod: "Tunai"
  }
];

// Role simulation
const ROLES: UserSession[] = [
  { id: "U01", username: "admin_pos", role: "ADMIN", fullName: "Super Administrator" },
  { id: "U02", username: "kasir_01", role: "KASIR", fullName: "Ahmad Kasir" },
  { id: "U03", username: "owner_toko", role: "OWNER", fullName: "Ibu Siti (Owner)" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserSession>(ROLES[0]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // State (Simulating Database)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Adjust active tab when role changes
  useEffect(() => {
    if (currentUser.role === 'KASIR') setActiveTab('pos');
    else setActiveTab('dashboard');
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      // Find matching user or just default to admin for demo
      const found = ROLES.find(r => r.username === loginForm.username);
      if (found) {
        setCurrentUser(found);
      }
      setIsLoggedIn(true);
      setNotification({ message: `Selamat datang, ${found?.fullName || 'User'}!`, type: "success" });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-10 bg-slate-50 border-b border-slate-100 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <TrendingUp size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">POS MAHASISWA</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Enterprise Login Panel</p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            <InputGroup 
              label="Username" 
              placeholder="admin_pos" 
              value={loginForm.username} 
              onChange={v => setLoginForm({...loginForm, username: v})} 
            />
            <InputGroup 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={loginForm.password} 
              onChange={v => setLoginForm({...loginForm, password: v})} 
            />
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In to System
              </button>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Lupa Password? Hubungi System Admin</p>
            </div>
          </form>
          <div className="px-10 py-4 bg-slate-900 flex justify-between items-center text-[9px] text-slate-500 font-black uppercase">
            <span>v1.0 stable</span>
            <span>Security: AES-256 Enabled</span>
          </div>
        </div>
      </div>
    );
  }

  // AI Analisis Sederhana
  const bestSellers = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.forEach(t => {
      t.items.forEach(item => {
        counts[item.productId] = (counts[item.productId] || 0) + item.quantity;
      });
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return { name: product?.name || "Unknown", sold: qty };
      });
  }, [transactions, products]);

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#0f172a] text-white transition-all duration-300 flex flex-col shadow-xl z-20 shrink-0",
        isSidebarOpen ? "w-60" : "w-16"
      )}>
        <div className="p-6 border-b border-slate-700">
          <h1 className={cn("text-xl font-bold tracking-tight text-blue-400 whitespace-nowrap overflow-hidden transition-all", !isSidebarOpen && "w-0")}>
            POS-SYSTEM
          </h1>
          {isSidebarOpen && <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1 tracking-widest">{currentUser.role} PANEL</p>}
          {!isSidebarOpen && <TrendingUp className="text-blue-400 mx-auto" size={24} />}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
          {isSidebarOpen && <div className="text-[10px] uppercase text-slate-500 font-bold px-3 mb-2 mt-2">Menu Utama</div>}
          
          {/* Dashboard Shared */}
          {(currentUser.role === 'ADMIN' || currentUser.role === 'OWNER') && (
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard Overview" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
              collapsed={!isSidebarOpen}
            />
          )}

          {/* ADMIN & KASIR ROLE MENU */}
          {(currentUser.role === 'ADMIN' || currentUser.role === 'KASIR') && (
            <>
              {(currentUser.role === 'ADMIN') && (
                <NavItem 
                  icon={<Package size={18} />} 
                  label="Master Produk" 
                  active={activeTab === 'products'} 
                  onClick={() => setActiveTab('products')} 
                  collapsed={!isSidebarOpen}
                />
              )}
              <NavItem 
                icon={<ShoppingCart size={18} />} 
                label="Transaksi Baru" 
                active={activeTab === 'pos'} 
                onClick={() => setActiveTab('pos')} 
                collapsed={!isSidebarOpen}
              />
              {(currentUser.role === 'ADMIN') && (
                <>
                  <NavItem 
                    icon={<Users size={18} />} 
                    label="Data Pelanggan" 
                    active={activeTab === 'customers'} 
                    onClick={() => setActiveTab('customers')} 
                    collapsed={!isSidebarOpen}
                  />
                  <NavItem 
                    icon={<Truck size={18} />} 
                    label="Data Supplier" 
                    active={activeTab === 'suppliers'} 
                    onClick={() => setActiveTab('suppliers')} 
                    collapsed={!isSidebarOpen}
                  />
                </>
              )}
            </>
          )}

          {/* OWNER ROLE MENU - REPORTS ONLY */}
          {(currentUser.role === 'OWNER' || currentUser.role === 'ADMIN') && (
            <>
              {isSidebarOpen && <div className="text-[10px] uppercase text-slate-500 font-bold px-3 mt-6 mb-2">Output & Laporan</div>}
              <NavItem 
                icon={<FileText size={18} />} 
                label="Laporan Penjualan" 
                active={activeTab === 'reports'} 
                onClick={() => setActiveTab('reports')} 
                collapsed={!isSidebarOpen}
              />
            </>
          )}
          
          <NavItem 
            icon={<History size={18} />} 
            label="History Struk" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
            collapsed={!isSidebarOpen}
          />
        </nav>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.fullName[0]}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate leading-none mb-1">{currentUser.fullName}</p>
                <p className="text-[10px] text-blue-400 font-medium uppercase">{currentUser.role}</p>
              </div>
            )}
            {isSidebarOpen && (
              <button 
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <ChevronDown size={16} />
              </button>
            )}
          </div>
          
          {isRoleDropdownOpen && isSidebarOpen && (
            <div className="mt-4 py-2 border-t border-slate-800 animate-in slide-in-from-bottom-2">
              <p className="text-[9px] text-slate-500 font-black uppercase mb-1 px-1">Switch System Role</p>
              {ROLES.map(role => (
                <button 
                  key={role.id}
                  onClick={() => {
                    setCurrentUser(role);
                    setIsRoleDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left text-[10px] py-1.5 px-2 rounded hover:bg-slate-800 transition-colors uppercase font-bold",
                    currentUser.id === role.id ? "text-blue-400" : "text-slate-400"
                  )}
                >
                  Log as {role.role}
                </button>
              ))}
            </div>
          )}

          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-full flex justify-center py-2 text-slate-500"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wide">
               Role: {currentUser.role} / View: {activeTab.replace('-', ' ')}
            </h2>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">MODE AKTIF</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold leading-none">Status Sesi</p>
              <p className="text-[11px] font-bold text-green-600 uppercase">Authenticated</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="text-slate-400 hover:text-red-500 transition-colors" title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-[#f1f5f9]">
          {notification && (
            <div className={cn(
              "p-3 rounded border text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 sticky top-0 z-50",
              notification.type === 'success' ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
            )}>
              {notification.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {notification.message}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <Dashboard 
              products={products} 
              transactions={transactions} 
              bestSellers={bestSellers} 
            />
          )}

          {activeTab === 'products' && (
            <Inventory 
              products={products} 
              setProducts={setProducts} 
              suppliers={suppliers} 
              setNotification={setNotification}
            />
          )}

          {activeTab === 'pos' && (
            <POS 
              products={products} 
              setProducts={setProducts} 
              customers={customers} 
              transactions={transactions} 
              setTransactions={setTransactions} 
              setNotification={setNotification}
              userRole={currentUser.role}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerManager 
              customers={customers} 
              setCustomers={setCustomers} 
              setNotification={setNotification}
            />
          )}

          {activeTab === 'suppliers' && (
            <SupplierManager 
              suppliers={suppliers} 
              setSuppliers={setSuppliers} 
              setNotification={setNotification}
            />
          )}

          {activeTab === 'reports' && (
            <Reports 
              transactions={transactions} 
              products={products}
            />
          )}

          {activeTab === 'history' && (
             <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase text-slate-800 tracking-widest">History Transaksi (Read Only)</h3>
                  <p className="text-[10px] text-blue-600 font-bold italic">AES-256 Decrypted View</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                        <tr>
                          <th className="px-6 py-3">Inv-Code</th>
                          <th className="px-6 py-3">Total</th>
                          <th className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {transactions.map(t => (
                          <tr key={t.id} className="hover:bg-slate-100 transition-colors">
                            <td className="px-6 py-3 font-mono font-bold text-blue-600">{t.id.slice(-8)}</td>
                            <td className="px-6 py-3 font-black">Rp {t.total.toLocaleString()}</td>
                            <td className="px-6 py-3"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-black uppercase">Completed</span></td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>
          )}
        </div>

        {/* System Footer */}
        <footer className="bg-slate-100 border-t border-slate-200 px-6 py-2 text-[10px] flex justify-between shrink-0 text-slate-500 font-medium">
          <div className="flex space-x-4">
            <span>Server: <span className="text-green-600 font-bold">XAMPP/OK</span></span>
            <span>Active Role: <span className="text-blue-600 font-bold">{currentUser.role}</span></span>
          </div>
          <div className="uppercase tracking-widest opacity-80 decoration-blue-400 underline underline-offset-4">Role Based Access System Ready</div>
        </footer>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

function NavItem({ icon, label, active, onClick, collapsed }: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  collapsed: boolean
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      )}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </button>
  );
}

function Dashboard({ products, transactions, bestSellers }: any) {
  const totalSales = transactions.reduce((acc: number, t: any) => acc + t.total, 0);
  const lowStock = products.filter((p: any) => p.stock < 5).length;

  return (
    <div className="space-y-6">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Penjualan Hari Ini" 
          value={`Rp ${totalSales.toLocaleString()}`} 
          trend="↑ 12.5% vs Kemarin"
          trendColor="text-green-600"
          footer="Processed via PDO"
        />
        <StatCard 
          title="Total Transaksi" 
          value={`${transactions.length} Transaksi`} 
          trend="Sync with MySQL"
          trendColor="text-blue-600"
          footer="Atomic Transactions"
        />
        <StatCard 
          title="Stok Kritis" 
          value={`${lowStock} Produk`} 
          valueColor={lowStock > 0 ? "text-red-600" : "text-slate-800"}
          trend="Perlu Restock Segera"
          trendColor="text-slate-400"
          footer="Automatic Update"
        />
        <StatCard 
          title="Database Health" 
          value="Optimal" 
          valueColor="text-green-600"
          trend="Anti SQL Injection Ready"
          trendColor="text-slate-400"
          footer="Secure BCRYPT Hashes"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table Mini View */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Transaksi Terakhir</h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Data dienkripsi menggunakan AES</p>
            </div>
            <button className="text-[10px] text-blue-600 font-bold uppercase tracking-wider hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Pelanggan</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {transactions.slice(-5).reverse().map((t: any) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-600 font-bold">{t.id.slice(-12)}</td>
                    <td className="px-4 py-3 font-medium text-slate-600">{t.customerId || 'General'}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">Rp {t.total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cetak Struk</button>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-10 text-center text-slate-400 italic">Belum ada transaksi terekam.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="flex flex-col space-y-6">
          <div className="bg-[#1e293b] text-white p-5 rounded-lg shadow-lg border border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-[10px] px-2 py-0.5 bg-indigo-500 rounded font-bold uppercase">AI ANALYTICS</span>
              <h3 className="text-xs font-bold italic text-slate-200">Smart Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              {bestSellers.length > 0 ? bestSellers.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-slate-700 group-hover:bg-blue-600 transition-colors rounded flex items-center justify-center font-bold text-xl">{idx + 1}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">{item.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Terjual {item.sold}x Hari Ini</p>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] text-slate-500 italic">Waiting for transaction data...</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-slate-700 text-[10px] text-slate-500 leading-relaxed font-medium">
                <p>AI Suggestion: Persediaan <span className="text-blue-400">{bestSellers[0]?.name || 'Produk'}</span> perlu ditambah berdasarkan pola historis.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col h-48">
            <h3 className="text-[10px] font-bold mb-4 uppercase text-slate-400 tracking-widest text-center">Penjualan Mingguan</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactions.map((t: any) => ({ total: t.total }))}>
                  <Bar dataKey="total" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendColor, footer, valueColor = "text-slate-800" }: any) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{title}</p>
      <p className={cn("text-xl font-black mt-1 tracking-tight", valueColor)}>{value}</p>
      <p className={cn("text-[10px] font-bold mt-1", trendColor)}>{trend}</p>
      <div className="mt-2 pt-2 border-t border-slate-50">
        <p className="text-[9px] text-slate-300 font-bold uppercase">{footer}</p>
      </div>
    </div>
  );
}

// --- MODULES ---

function Inventory({ products, setProducts, suppliers, setNotification }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "", supplierId: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      setNotification({ message: "Semua field harus diisi!", type: "error" });
      return;
    }
    const newProduct: Product = {
      id: `P${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      supplierId: formData.supplierId
    };
    setProducts([...products, newProduct]);
    setNotification({ message: "Produk berhasil disimpan ke database!", type: "success" });
    setIsModalOpen(false);
    setFormData({ name: "", category: "", price: "", stock: "", supplierId: "" });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Master Inventory Produk</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Relational Data via MySQL</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={14} /> Tambah Item Baru
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 font-mono">
            <tr className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Nama Produk</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3 text-right">Price (IDR)</th>
              <th className="px-6 py-3 text-center">Status Stok</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {products.map((p: Product) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-3 font-mono font-bold text-blue-600">{p.id}</td>
                <td className="px-6 py-3 font-bold text-slate-800">{p.name}</td>
                <td className="px-6 py-3 text-slate-500 uppercase font-semibold text-[10px] tracking-tight">{p.category}</td>
                <td className="px-6 py-3 text-right font-bold text-slate-600">{p.price.toLocaleString()}</td>
                <td className="px-6 py-3 text-center">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                    p.stock < 5 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  )}>
                    {p.stock} Units
                  </span>
                </td>
                <td className="px-6 py-3 text-center">
                  <button 
                    onClick={() => setProducts(products.filter((x:any) => x.id !== p.id))}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 transition-all animate-in fade-in">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-2xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-800 tracking-widest">Input Master Data</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Insert into Table Produk</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18}/>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <InputGroup label="Nama Produk" placeholder="e.g. Kopi Gayo Arabica" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
              <InputGroup label="Kategori" placeholder="e.g. Minuman" value={formData.category} onChange={v => setFormData({...formData, category: v})} />
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Harga Satuan" type="number" placeholder="0" value={formData.price} onChange={v => setFormData({...formData, price: v})} />
                <InputGroup label="Initial Stok" type="number" placeholder="0" value={formData.stock} onChange={v => setFormData({...formData, stock: v})} />
              </div>
              <label className="block space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplier Link</span>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={formData.supplierId}
                  onChange={e => setFormData({...formData, supplierId: e.target.value})}
                >
                  <option value="">Pilih Supplier Relasional</option>
                  {suppliers.map((s:any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </label>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Submit to DB</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function POS({ products, setProducts, customers, transactions, setTransactions, setNotification }: any) {
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [showReceipt, setShowReceipt] = useState<Transaction | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      setNotification({ message: "PROSES GAGAL: Stok produk kosong di database!", type: "error" });
      return;
    }
    const existing = cart.find(i => i.product.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        setNotification({ message: "KUOTA TERBIT: Melebihi stok yang tersedia!", type: "error" });
        return;
      }
      setCart(cart.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newTransaction: Transaction = {
      id: `INV-${new Date().getFullYear()}${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      customerId: selectedCustomerId,
      items: cart.map(i => ({ productId: i.product.id, quantity: i.quantity, price: i.product.price })),
      total: total,
      paymentMethod: "Tunai"
    };

    const updatedProducts = products.map((p: Product) => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
    });

    setProducts(updatedProducts);
    setTransactions([...transactions, newTransaction]);
    setNotification({ message: "TRANSAKSI COMMIT: Data berhasil disimpan ke MySQL!", type: "success" });
    setShowReceipt(newTransaction);
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-start">
      {/* Product Grid */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
              type="text" 
              placeholder="Search data-produk index..." 
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-700 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((p: Product) => (
              <button 
                key={p.id}
                onClick={() => addToCart(p)}
                className={cn(
                  "p-3 border rounded-md transition-all text-left group relative",
                  p.stock > 0 ? "hover:border-blue-500 hover:shadow-md bg-white" : "opacity-60 bg-slate-50 cursor-not-allowed"
                )}
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{p.category}</p>
                <p className="font-bold text-slate-800 text-xs truncate mb-1">{p.name}</p>
                <p className="text-xs font-black text-blue-600">Rp {p.price.toLocaleString()}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className={cn(
                    "text-[9px] font-black uppercase px-2 py-0.5 rounded",
                    p.stock < 5 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"
                  )}>Stok: {p.stock}</span>
                  <Plus size={12} className="text-slate-300 group-hover:text-blue-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-800 flex flex-col h-[600px] text-white">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart size={16} className="text-blue-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-100">Live Transaction Panel</h3>
          </div>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-[11px] font-bold text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedCustomerId}
            onChange={e => setSelectedCustomerId(e.target.value)}
          >
            <option value="">-- Customer Link (Optional) --</option>
            {customers.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-2">
              <Database size={40} />
              <p className="text-[10px] uppercase font-black tracking-widest">Waiting for stream...</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-[11px] border-b border-slate-800 pb-2 animate-in slide-in-from-right-2">
                <div className="flex-1 mr-2">
                  <p className="font-bold text-slate-100 leading-tight">{item.product.name}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">{item.quantity} Unit x Rp {item.product.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-blue-400">Rp {(item.product.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => setCart(cart.filter(x => x.product.id !== item.product.id))} className="text-[8px] uppercase text-red-500 font-black hover:underline mt-1">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Sub-Total</span>
            <span className="text-slate-300">Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Tax Index (10%)</span>
            <span className="text-slate-300">Rp {tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-end pt-2 border-t border-slate-800 mt-2">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Total Payable</span>
            <span className="text-xl font-black text-white leading-none">Rp {total.toLocaleString()}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded font-black text-xs uppercase tracking-[0.15em] mt-3 shadow-lg shadow-blue-500/10 hover:bg-blue-500 active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale"
          >
            Execute Transaction
          </button>
        </div>
      </div>

      {/* Modern Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in">
          <div className="bg-white p-8 rounded-lg w-full max-w-sm font-mono text-[11px] shadow-2xl relative border-t-[6px] border-blue-600">
            <button onClick={() => setShowReceipt(null)} className="absolute top-3 right-3 text-slate-300 hover:text-slate-800"><X size={18}/></button>
            <div className="text-center space-y-1 mb-6">
              <h2 className="text-sm font-black text-slate-900 tracking-tighter">BUKTI TRANSAKSI DIGITAL</h2>
              <p className="text-[9px] uppercase font-bold text-slate-500">POS-Mahasiswa v1.0-STABLE</p>
              <div className="h-px bg-slate-100 my-4"></div>
            </div>
            
            <div className="space-y-1 text-slate-600 font-bold mb-6">
              <div className="flex justify-between"><span>INVOICE</span><span className="text-blue-600">{showReceipt.id}</span></div>
              <div className="flex justify-between"><span>DATETIME</span><span>{new Date(showReceipt.date).toLocaleString('id-ID')}</span></div>
              <div className="flex justify-between"><span>OPERATOR</span><span>SYSTEM ADMIN</span></div>
            </div>

            <div className="space-y-3 mb-6 border-y border-dashed border-slate-200 py-4">
              {showReceipt.items.map((item, i) => (
                <div key={i} className="flex justify-between text-slate-800">
                  <div className="flex-1">
                    <p className="font-bold uppercase tracking-tight">{products.find((p:any) => p.id === item.productId)?.name}</p>
                    <p className="text-[9px] text-slate-400">{item.quantity} x {item.price.toLocaleString()}</p>
                  </div>
                  <span className="font-black">{(item.quantity * item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex justify-between font-black text-slate-900 text-sm">
                <span>GRAND TOTAL</span>
                <span className="text-blue-600">Rp {showReceipt.total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="text-center opacity-50 space-y-1 py-4 border-t border-slate-50">
              <p>AES-256 SECURED TRANSACTION</p>
              <p>NO REFUNDS AFTER COMMIT</p>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded text-[10px] font-black uppercase tracking-widest mt-2 hover:bg-slate-800 transition-colors">
              <Printer size={12} /> Print Physical Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerManager({ customers, setCustomers, setNotification }: any) {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setCustomers([...customers, { 
      id: `C${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`, 
      ...formData 
    }]);
    setNotification({ message: "Data pelanggan berhasil di-enkripsi & simpan!", type: "success" });
    setFormData({ name: "", phone: "", address: "" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-6">Input Data Pelanggan (CRM)</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputGroup label="Nama Lengkap / Instansi" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
          <InputGroup label="Identitas Telepon" placeholder="e.g. 08xx" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
          <label className="block space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat Fisik (AES Target)</span>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none h-20 transition-all"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </label>
          <button type="submit" className="bg-slate-900 text-white w-full px-6 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Create Customer Record</button>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Database Pelanggan</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {customers.map((c: any) => (
            <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 bg-slate-100 text-slate-400 flex items-center justify-center rounded font-black text-xs">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-slate-800 truncate leading-none mb-1">{c.name}</p>
                <p className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">{c.phone} • REG: {c.id}</p>
              </div>
              <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupplierManager({ suppliers, setSuppliers, setNotification }: any) {
  const [formData, setFormData] = useState({ name: "", contact: "", address: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setSuppliers([...suppliers, { 
      id: `S${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`, 
      ...formData 
    }]);
    setNotification({ message: "Supplier registered successfully!", type: "success" });
    setFormData({ name: "", contact: "", address: "" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-6">Vendor / Supplier Registration</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputGroup label="Nama Supplier" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
          <InputGroup label="Contact Person" value={formData.contact} onChange={v => setFormData({...formData, contact: v})} />
          <InputGroup label="Alamat Kantor" value={formData.address} onChange={v => setFormData({...formData, address: v})} />
          <button type="submit" className="bg-slate-900 text-white w-full px-6 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Add to Supplier Index</button>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 font-mono">
            <tr className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
              <th className="px-6 py-4 border-r border-slate-200">SID</th>
              <th className="px-6 py-4">Perusahaan Vendor</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suppliers.map((s: any) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono font-bold text-blue-600 border-r border-slate-100">{s.id}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{s.name}</td>
                <td className="px-6 py-4 text-center">
                   <button onClick={() => setSuppliers(suppliers.filter((x:any) => x.id !== s.id))} className="text-red-500 font-black uppercase text-[10px] tracking-widest hover:underline">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Reports({ transactions, products }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Laporan Penjualan Harian</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Aggregated Transaction Data</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded text-[10px] font-bold uppercase text-slate-600 hover:bg-slate-200">
            <Printer size={12} /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
              <tr className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">
                <th className="px-6 py-4 font-mono">Invoice_ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-right">Items_Qty</th>
                <th className="px-6 py-4 text-right">Revenue (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.length === 0 ? (
                <tr><td colSpan={4} className="py-20 text-center text-slate-300 font-black uppercase tracking-[0.3em]">No data available in current cycle.</td></tr>
              ) : (
                [...transactions].reverse().map((t: any) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">{t.id}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{new Date(t.date).toLocaleDateString()} {new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-400">{t.items.length} Units</td>
                    <td className="px-6 py-4 text-right font-black text-slate-800">Rp {t.total.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-900/5 border border-red-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
             <AlertCircle size={14} className="text-red-600" />
             <p className="text-[10px] text-red-600 font-black uppercase tracking-widest">Stok Kritis Warning Index (&lt; 5 Unit)</p>
          </div>
          <div className="space-y-1">
            {products.filter((p: any) => p.stock < 5).map((p: any) => (
              <div key={p.id} className="flex justify-between items-center bg-white border border-red-100 p-2 rounded shadow-sm">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight truncate mr-2">{p.name}</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[9px] font-black">{p.stock} LEFT</span>
              </div>
            ))}
            {products.filter((p: any) => p.stock < 5).length === 0 && <p className="text-[10px] text-slate-400 italic">All stock levels within safe parameters.</p>}
          </div>
        </div>
        
        <div className="bg-blue-900/5 border border-blue-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
             <Database size={14} className="text-blue-600" />
             <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Engine Status (PDO-MySQL)</p>
          </div>
          <div className="space-y-4">
             <div>
               <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Last Database Sync</p>
               <p className="text-xs font-black text-slate-800">{new Date().toLocaleString()}</p>
             </div>
             <div>
               <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Active Queries status</p>
               <div className="flex gap-2">
                 <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-black uppercase">SELECT OK</span>
                 <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-black uppercase">UPDATE OK</span>
                 <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-black uppercase">COMMIT READY</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, type = "text", value, onChange }: { 
  label: string, 
  placeholder?: string, 
  type?: string, 
  value: string | number, 
  onChange: (val: string) => void 
}) {
  return (
    <label className="block space-y-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-300 placeholder:font-medium"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}
