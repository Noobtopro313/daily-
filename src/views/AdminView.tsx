import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  LogOut, 
  Check, 
  AlertCircle,
  Eye,
  Settings as SettingsIcon,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Save,
  Target
} from 'lucide-react';
import { Product, StoreSettings } from '../types';

interface AdminViewProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onNavigateHome: () => void;
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  onNavigateHome,
  settings,
  onUpdateSettings,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nexora_admin_auth') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');

  // Store Settings Form State
  const [storeForm, setStoreForm] = useState<StoreSettings>(settings);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  // New Product Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [createProdError, setCreateProdError] = useState('');
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Audio');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  const triggerDoneMsg = (msg: string) => {
    setActionDoneMsg(msg);
    setTimeout(() => setActionDoneMsg(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('nexora_admin_auth', 'true');
      setErrorMsg('');
      triggerDoneMsg('Logged into Admin Dashboard successfully!');
    } else {
      setErrorMsg('Invalid credentials. Default: admin / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nexora_admin_auth');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdImage) {
      setCreateProdError('Please provide Product Title, Price, and Image URL.');
      return;
    }

    setCreateProdError('');
    const price = parseFloat(newProdPrice);
    const originalPrice = newProdOriginalPrice ? parseFloat(newProdOriginalPrice) : undefined;

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newProdName,
      tagline: newProdTagline || 'High-performance engineered tech',
      category: newProdCategory,
      price: price,
      originalPrice: originalPrice,
      rating: 5.0,
      reviewCount: 1,
      image: newProdImage,
      gallery: [newProdImage],
      inStock: true,
      stockCount: 25,
      shortDescription: newProdDesc || 'Brand new release in the Nexora premium collection.',
      fullDescription: newProdDesc || 'Engineered with premium acoustic precision and ergonomic industrial design.',
      features: ['1-Year Manufacturer Warranty', 'Fast Type-C Charging', 'Smart Sync'],
      specs: [
        { name: 'Condition', value: 'Brand New In Box' },
        { name: 'Warranty', value: '12 Months' }
      ],
      colors: [{ name: 'Default', hex: '#111111' }]
    };

    onAddProduct(newProduct);
    setIsAddingProduct(false);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdOriginalPrice('');
    setNewProdImage('');
    setNewProdTagline('');
    setNewProdDesc('');
    triggerDoneMsg(`Done! "${newProduct.name}" added to catalog.`);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#121518] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#32B83F]/20 border border-[#32B83F]/40 rounded-2xl flex items-center justify-center text-[#32B83F] mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white font-heading tracking-tight">Admin Portal</h1>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to manage store inventory, orders, and products
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#32B83F] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#32B83F] transition-colors"
                required
              />
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-gray-400">
              <span className="font-semibold text-gray-300">Demo Login Details:</span><br />
              Username: <code className="text-[#32B83F]">admin</code><br />
              Password: <code className="text-[#32B83F]">admin123</code>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#32B83F] hover:bg-[#27A936] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#32B83F]/20 text-sm flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              &larr; Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#32B83F]/20 border border-[#32B83F]/30 text-[#32B83F] text-xs font-bold uppercase tracking-wider">
              Staff Portal
            </span>
            <span className="text-xs text-gray-400">Authorized: Super Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight mt-1">
            Nexora Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            View Storefront
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="bg-[#121518] border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Total Catalog Products</span>
            <Package className="w-4 h-4 text-[#32B83F]" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-heading">{products.length}</div>
          <div className="text-[11px] text-gray-400 mt-1">Active items live in store</div>
        </div>

        <div className="bg-[#121518] border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Estimated Revenue</span>
            <DollarSign className="w-4 h-4 text-[#32B83F]" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-heading">$28,490.00</div>
          <div className="text-[11px] text-[#32B83F] mt-1">+18.4% this month</div>
        </div>

        <div className="bg-[#121518] border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Completed Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#32B83F]" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-heading">184</div>
          <div className="text-[11px] text-gray-400 mt-1">4 pending delivery</div>
        </div>

        <div className="bg-[#121518] border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Customer Accounts</span>
            <Users className="w-4 h-4 text-[#32B83F]" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-heading">1,240</div>
          <div className="text-[11px] text-[#32B83F] mt-1">99.8% satisfaction score</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-[#32B83F] text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          Manage Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-[#32B83F] text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Recent Orders
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-[#32B83F] text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          Store Settings &amp; WhatsApp
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Store Inventory</h2>
            <button
              onClick={() => setIsAddingProduct(!isAddingProduct)}
              className="px-4 py-2 bg-[#32B83F] hover:bg-[#27A936] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              {isAddingProduct ? 'Cancel' : 'Add New Product'}
            </button>
          </div>

          {/* Add Product Form */}
          {isAddingProduct && (
            <div className="bg-[#121518] border border-[#32B83F]/30 p-6 rounded-2xl shadow-xl animate-in fade-in">
              <h3 className="text-base font-bold text-white mb-4">Create New Product</h3>
              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Product Title *</label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Apex Ultra Headphones"
                    className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#32B83F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#32B83F]"
                  >
                    <option value="Audio">Audio</option>
                    <option value="Smart Wearables">Smart Wearables</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Mobile Accessories">Mobile Accessories</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Work & Productivity">Work & Productivity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="129.99"
                    className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#32B83F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Original Price ($) (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                    placeholder="179.99"
                    className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#32B83F]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Product Image URL *</label>
                  <input
                    type="url"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#32B83F]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Tagline / Short description</label>
                  <input
                    type="text"
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    placeholder="Studio quality sound with noise cancellation"
                    className="w-full bg-[#1A1F26] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#32B83F]"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 bg-white/5 text-gray-300 rounded-xl text-xs font-bold hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#32B83F] hover:bg-[#27A936] text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Publish Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product List Table */}
          <div className="bg-[#121518] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#171B20] text-gray-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[11px] text-gray-400 truncate max-w-xs">{p.tagline}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-white font-mono">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#32B83F]">
                          <Check className="w-3 h-3" /> In Stock
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-[#121518] border border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-4">Latest Store Orders</h2>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#ORD-94812 — Alex Thorne</div>
                <div className="text-gray-400 mt-0.5">Wireless Earbuds Pro (Matte Obsidian)</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-bold">Shipped</span>
                <div className="font-bold text-white font-mono mt-1">$149.99</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#ORD-94811 — Sara Williams</div>
                <div className="text-gray-400 mt-0.5">Fast Charging Hub 140W GaN III</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-bold">Processing</span>
                <div className="font-bold text-white font-mono mt-1">$69.99</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">#ORD-94810 — David Chen</div>
                <div className="text-gray-400 mt-0.5">Apex Ultra Mechanical Keyboard</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">Delivered</span>
                <div className="font-bold text-white font-mono mt-1">$189.99</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Store Settings & WhatsApp */}
      {activeTab === 'settings' && (
        <div className="bg-[#121518] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Store Profile &amp; Contact Settings</h2>
              <p className="text-xs text-gray-400 mt-1">
                Configure your WhatsApp number, support email, store address, and customer announcement.
              </p>
            </div>
            {savedSettingsSuccess && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#32B83F]/20 text-[#32B83F] text-xs font-bold animate-fade-in">
                <Check className="w-4 h-4" />
                Settings Saved Successfully!
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdateSettings(storeForm);
              setSavedSettingsSuccess(true);
              setTimeout(() => setSavedSettingsSuccess(false), 3500);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* WhatsApp Number */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  WhatsApp Number (With Country Code)
                </label>
                <input
                  type="text"
                  placeholder="e.g. +923001234567 or +14155552671"
                  value={storeForm.whatsappNumber}
                  onChange={(e) => setStoreForm({ ...storeForm, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#25D366]"
                />
                <p className="text-[11px] text-gray-400">
                  Customers can tap the floating WhatsApp button to chat with you directly.
                </p>
              </div>

              {/* Support Email */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#32B83F]" />
                  Official Support Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. support@yourdomain.com"
                  value={storeForm.supportEmail}
                  onChange={(e) => setStoreForm({ ...storeForm, supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F]"
                />
                <p className="text-[11px] text-gray-400">
                  Displayed in the Contact Us page, footer concierge, and receipts.
                </p>
              </div>

              {/* Store Name */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#32B83F]" />
                  Store / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. NEXORA TECH"
                  value={storeForm.storeName}
                  onChange={(e) => setStoreForm({ ...storeForm, storeName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F]"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#32B83F]" />
                  Phone Line / Hotline
                </label>
                <input
                  type="text"
                  placeholder="e.g. +1 (800) 555-0199"
                  value={storeForm.phoneNumber}
                  onChange={(e) => setStoreForm({ ...storeForm, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F]"
                />
              </div>

              {/* Store Physical Address */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-white/5 md:col-span-2">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#32B83F]" />
                  Store Location / Warehouse Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Street, City, Country"
                  value={storeForm.address}
                  onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F]"
                />
              </div>

              {/* Announcement Bar */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-white/5 md:col-span-2">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#32B83F]" />
                  Header Announcement Banner Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Free Express Shipping worldwide on orders over $50 | 30-Day Money Back Guarantee"
                  value={storeForm.announcementText}
                  onChange={(e) => setStoreForm({ ...storeForm, announcementText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F]"
                />
              </div>

              {/* Facebook Pixel ID */}
              <div className="space-y-2 bg-[#171B20] p-4 rounded-xl border border-blue-500/20 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    Facebook / Meta Pixel ID (For Meta & Instagram Ads)
                  </label>
                  <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                    E-Commerce Tracking
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 182930492819283 (Numeric Pixel ID from Meta Events Manager)"
                  value={storeForm.facebookPixelId || ''}
                  onChange={(e) => setStoreForm({ ...storeForm, facebookPixelId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-blue-400 font-mono"
                />
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                  Meta Events Manager se apna 15-16 digit Pixel ID yahan paste karein. Website automatically <strong>PageView</strong>, <strong>ViewContent</strong>, <strong>AddToCart</strong> aur <strong>Purchase</strong> events fire karegi.
                </p>
              </div>

              {/* Toggle WhatsApp Floating Button */}
              <div className="bg-[#171B20] p-4 rounded-xl border border-white/5 md:col-span-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    Enable Floating WhatsApp Chat Button
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    When enabled, a green WhatsApp button appears at the bottom-right corner of the whole site.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storeForm.enableWhatsappChat}
                    onChange={(e) => setStoreForm({ ...storeForm, enableWhatsappChat: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
                </label>
              </div>

            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                className="px-6 py-3 bg-[#32B83F] hover:bg-[#27A936] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#32B83F]/20 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Store Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
