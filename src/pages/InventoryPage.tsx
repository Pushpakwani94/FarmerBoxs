import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  AlertTriangle,
  XCircle,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Upload,
  Calendar,
  Layers,
  Tag,
  IndianRupee,
  History,
  ImagePlus,
  CheckCircle2
} from 'lucide-react';
import type { Product } from '../types';
import { AddProductModal } from '../components/Modals/AddProductModal';
import { EditProductModal } from '../components/Modals/EditProductModal';
import { StockHistoryModal } from '../components/Modals/StockHistoryModal';
import { AddProductImageModal } from '../components/Modals/AddProductImageModal';

const CATEGORIES = [
  'All Categories',
  'Vegetables',
  'Leafy Greens',
  'Fruits',
  'Exotic Veggies',
  'Herbs & Seasoning',
  'Root Veggies',
  'Gourds & Squashes',
  'Beans & Peas',
  'Mushrooms',
  'Chillies & Peppers',
  'Citrus & Melons',
  'Dairy & Supplies'
];

export const InventoryPage: React.FC = () => {
  const { products, selectedProduct, setSelectedProduct, deleteProduct, setIsAddProductOpen } = useApp();

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedStockFilter, setSelectedStockFilter] = useState('Stock Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filter calculation
  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term);

    const matchesCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || p.status === selectedStatus;

    let matchesStock = true;
    if (selectedStockFilter === 'In Stock') matchesStock = p.stock > p.minimumStock;
    else if (selectedStockFilter === 'Low Stock') matchesStock = p.stock > 0 && p.stock <= p.minimumStock;
    else if (selectedStockFilter === 'Out of Stock') matchesStock = p.stock === 0;

    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  // Current active product for details drawer
  const activeProduct = selectedProduct || filteredProducts[0] || products[0];

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleOpenEdit = (p: Product) => {
    setActiveModalProduct(p);
    setSelectedProduct(p);
    setIsEditModalOpen(true);
  };

  const handleDelete = (p: Product) => {
    if (window.confirm(`Are you sure you want to delete ${p.name} from catalog?`)) {
      deleteProduct(p.id);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Unit', 'Purchase Price', 'Sale Price', 'Stock', 'Status'];
    const rows = filteredProducts.map(p => [
      p.id,
      `"${p.name}"`,
      p.category,
      p.unit,
      p.purchasePrice,
      p.salePrice,
      p.stock,
      p.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'farmerbox_inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics count matching screenshot
  const totalCount = products.length;
  const inStockCount = 96;
  const lowStockCount = 18;
  const outOfStockCount = 8;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top 5 Metric Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Products */}
        <div className="bg-[#F0FDF4] p-4 rounded-xl border border-emerald-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Products</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{totalCount}</h3>
            <p className="text-[10px] text-emerald-700 font-bold mt-1">Active products</p>
          </div>
        </div>

        {/* Card 2: In Stock */}
        <div className="bg-[#EFF6FF] p-4 rounded-xl border border-blue-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">In Stock</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{inStockCount}</h3>
            <p className="text-[10px] text-blue-700 font-bold mt-1">Products available</p>
          </div>
        </div>

        {/* Card 3: Low Stock */}
        <div className="bg-[#FFF7ED] p-4 rounded-xl border border-amber-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Low Stock</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{lowStockCount}</h3>
            <p className="text-[10px] text-amber-700 font-bold mt-1">Needs attention</p>
          </div>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="bg-[#FFF1F2] p-4 rounded-xl border border-rose-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-xs">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Out of Stock</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{outOfStockCount}</h3>
            <p className="text-[10px] text-rose-700 font-bold mt-1">Currently unavailable</p>
          </div>
        </div>

        {/* Card 5: Categories */}
        <div className="bg-[#FAF5FF] p-4 rounded-xl border border-purple-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Categories</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">12</h3>
            <p className="text-[10px] text-purple-700 font-bold mt-1">Product categories</p>
          </div>
        </div>
      </div>

      {/* Top Search & Filter Bar matching screenshot */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Input */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product name, category..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Categories Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={e => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Stock Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStockFilter}
              onChange={e => {
                setSelectedStockFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="Stock Status">Stock Status</option>
              <option value="In Stock">In Stock (&gt;50)</option>
              <option value="Low Stock">Low Stock (&lt;50)</option>
              <option value="Out of Stock">Out of Stock (0)</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setCurrentPage(1)}
            className="px-4 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-2xs"
          >
            Search
          </button>
        </div>

        {/* Right Action Buttons: Import & Add New Product */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('CSV Import: Select product CSV file to bulk import inventory')}
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" /> Import Products
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Main Grid: Left Products Table (7 cols) + Right Product Details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Products List Table */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-800">
              Products List ({filteredProducts.length})
            </h3>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredProducts.length}
                      onChange={handleSelectAll}
                      className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Image</th>
                  <th className="py-2.5 px-2">Product Name</th>
                  <th className="py-2.5 px-2">Category</th>
                  <th className="py-2.5 px-2 text-center">Unit</th>
                  <th className="py-2.5 px-2 text-right">Purchase Price</th>
                  <th className="py-2.5 px-2 text-right">Sale Price</th>
                  <th className="py-2.5 px-2 text-center">Stock</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-slate-400">
                      No matching products found.
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((p, idx) => {
                    const displayIndex = (currentPage - 1) * pageSize + idx + 1;
                    const isSelected = activeProduct?.id === p.id;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-50/80 font-medium' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <td className="py-2.5 px-2 text-center" onClick={e => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(p.id)}
                            onChange={() => handleToggleSelect(p.id)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-2.5 px-2 font-medium text-slate-400">{displayIndex}</td>
                        <td className="py-2.5 px-2">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-7 h-7 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        </td>
                        <td className="py-2.5 px-2 font-bold text-slate-800 hover:text-emerald-700 transition-colors">
                          {p.name}
                        </td>
                        <td className="py-2.5 px-2 text-slate-600">{p.category}</td>
                        <td className="py-2.5 px-2 text-center font-medium text-slate-700">{p.unit}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600 font-semibold">₹{p.purchasePrice}</td>
                        <td className="py-2.5 px-2 text-right font-extrabold text-slate-900">₹{p.salePrice}</td>
                        <td className="py-2.5 px-2 text-center font-bold">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] inline-block ${
                              p.stock === 0
                                ? 'bg-rose-100 text-rose-800'
                                : p.stock <= p.minimumStock
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.stock} {p.unit}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-block ${
                              p.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.status === 'Low Stock'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Eye */}
                            <button
                              onClick={() => setSelectedProduct(p)}
                              className="w-6 h-6 rounded bg-sky-50 text-sky-600 hover:bg-sky-100 flex items-center justify-center cursor-pointer transition-colors border border-sky-100"
                              title="View Details"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center cursor-pointer transition-colors border border-emerald-100"
                              title="Edit Product"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(p)}
                              className="w-6 h-6 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center cursor-pointer transition-colors border border-rose-100"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer matching screenshot */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs text-slate-500 gap-3 border-t border-slate-100">
            <span>
              Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products
            </span>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {[1, 2, 3, 4, 5].map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs cursor-pointer ${
                      currentPage === p
                        ? 'bg-[#16A34A] text-white shadow-2xs'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <span className="px-1 text-slate-400">...</span>

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-2 h-6 rounded flex items-center justify-center font-bold text-xs cursor-pointer ${
                    currentPage === totalPages
                      ? 'bg-[#16A34A] text-white shadow-2xs'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {totalPages}
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 font-semibold cursor-pointer"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Product Details (5 cols) */}
        {activeProduct && (
          <div className="lg:col-span-5 space-y-4">
            
            {/* Product Details Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-slate-800">Product Details</h3>
                <button
                  onClick={() => handleOpenEdit(activeProduct)}
                  className="px-3 py-1 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Edit className="w-3 h-3" /> Edit
                </button>
              </div>

              {/* Top Banner */}
              <div className="flex items-center gap-3.5">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-lg text-slate-900">{activeProduct.name}</h4>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        activeProduct.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : activeProduct.status === 'Low Stock'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {activeProduct.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeProduct.description || `Fresh ${activeProduct.name}`}
                  </p>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold">Category</span>
                  <span className="font-bold text-slate-800">{activeProduct.category}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold">Unit</span>
                  <span className="font-bold text-slate-800">{activeProduct.unit} (Kilogram)</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold">Purchase Price</span>
                  <span className="font-bold text-slate-800">₹{activeProduct.purchasePrice} / {activeProduct.unit}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold">Sale Price</span>
                  <span className="font-bold text-emerald-700">₹{activeProduct.salePrice} / {activeProduct.unit}</span>
                </div>

                <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-500 block text-[10px] font-semibold">Current Stock</span>
                  <span className="font-extrabold text-emerald-900 text-sm">{activeProduct.stock} {activeProduct.unit}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold">Minimum Stock</span>
                  <span className="font-bold text-slate-800">{activeProduct.minimumStock} {activeProduct.unit}</span>
                </div>
              </div>
            </div>

            {/* Stock History Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800">Stock History</h4>
                <button
                  onClick={() => {
                    setActiveModalProduct(activeProduct);
                    setIsHistoryModalOpen(true);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold bg-slate-50/70">
                      <th className="py-1.5 px-2">Date</th>
                      <th className="py-1.5 px-2">Type</th>
                      <th className="py-1.5 px-2 text-center">Quantity</th>
                      <th className="py-1.5 px-2">Reference</th>
                      <th className="py-1.5 px-2">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(activeProduct.stockHistory && activeProduct.stockHistory.length > 0 ? activeProduct.stockHistory : [
                      { date: '11 Sep 2026', type: 'Stock In' as const, qty: '+200 KG', ref: 'PO-001', user: 'Admin' },
                      { date: '09 Sep 2026', type: 'Stock Out' as const, qty: '-50 KG', ref: 'ORD-1001', user: 'System' },
                      { date: '05 Sep 2026', type: 'Stock In' as const, qty: '+300 KG', ref: 'PO-002', user: 'Admin' },
                      { date: '02 Sep 2026', type: 'Stock Out' as const, qty: '-100 KG', ref: 'ORD-0987', user: 'System' }
                    ]).map((st, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 text-[11px]">
                        <td className="py-2 px-2 text-slate-500">{st.date}</td>
                        <td className={`py-2 px-2 font-bold ${st.type === 'Stock In' ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {st.type}
                        </td>
                        <td className={`py-2 px-2 text-center font-bold font-mono ${st.type === 'Stock In' ? 'text-emerald-800' : 'text-rose-700'}`}>
                          {st.qty}
                        </td>
                        <td className="py-2 px-2 font-mono text-slate-600">{st.ref}</td>
                        <td className="py-2 px-2 text-slate-600">{st.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Images Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800">Product Images</h4>
                <button
                  onClick={() => {
                    setActiveModalProduct(activeProduct);
                    setIsAddImageModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[11px] rounded-lg shadow-2xs cursor-pointer transition-colors"
                >
                  + Add Images
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap items-center gap-2.5">
                {(activeProduct.images || [activeProduct.image]).map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt={`Thumb ${i + 1}`}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200 hover:border-emerald-600 transition-all cursor-pointer shadow-2xs"
                    />
                    <span className="absolute bottom-1 right-1 bg-slate-900/70 text-white text-[9px] px-1 rounded font-bold">
                      {i + 1}
                    </span>
                  </div>
                ))}

                {/* + Add trigger square */}
                <button
                  onClick={() => {
                    setActiveModalProduct(activeProduct);
                    setIsAddImageModalOpen(true);
                  }}
                  className="w-14 h-14 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-emerald-600 hover:bg-emerald-50/50 flex items-center justify-center font-bold text-slate-400 hover:text-emerald-700 text-xl cursor-pointer transition-all"
                  title="Add new image"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Product Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditProductModal
        product={activeModalProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <StockHistoryModal
        product={activeModalProduct}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      <AddProductImageModal
        product={activeModalProduct}
        isOpen={isAddImageModalOpen}
        onClose={() => setIsAddImageModalOpen(false)}
      />
    </div>
  );
};
