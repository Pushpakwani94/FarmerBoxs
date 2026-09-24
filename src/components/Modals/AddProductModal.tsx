import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Tag,
  IndianRupee,
  Layers,
  CheckCircle2,
  Upload,
  Loader2,
  Image as ImageIcon,
  Check,
  Trash2,
  Sparkles,
  Building2,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { uploadImageToStorage } from '../../firebase/services/storageService';
import type { Product, CatalogType } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCatalogType?: CatalogType;
  defaultCategory?: string;
}

const CATEGORIES = [
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
  'Dal & Pulses',
  'Dairy & Supplies'
];

import { IMPORT_COUNTRIES, getCountryFlag } from '../../data/countriesData';
import { PRESET_PRODUCT_IMAGES, resolveProductImage, getProductImageFallback } from '../../utils/productImages';

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, defaultCatalogType = 'B2C', defaultCategory = 'Vegetables' }) => {
  const { addProduct } = useApp();

  const [name, setName] = useState('');
  const [catalogType, setCatalogType] = useState<CatalogType>(defaultCatalogType);
  const [category, setCategory] = useState(defaultCategory);
  const [unit, setUnit] = useState(defaultCatalogType === 'B2B' ? 'Crate (20 KG)' : '1 KG');
  const [purchasePrice, setPurchasePrice] = useState('25');
  const [salePrice, setSalePrice] = useState('40');
  const [b2bPrice, setB2bPrice] = useState('35');
  const [b2cPrice, setB2cPrice] = useState('40');
  const [minOrderQty, setMinOrderQty] = useState(defaultCatalogType === 'B2B' ? '5' : '1');
  const [stock, setStock] = useState('200');
  const [minimumStock, setMinimumStock] = useState('30');

  useEffect(() => {
    if (isOpen) {
      setCatalogType(defaultCatalogType);
      setCategory(defaultCategory);
      setUnit(defaultCatalogType === 'B2B' ? 'Crate (20 KG)' : '1 KG');
      setMinOrderQty(defaultCatalogType === 'B2B' ? '5' : '1');
    }
  }, [isOpen, defaultCatalogType, defaultCategory]);

  const [status, setStatus] = useState<'Active' | 'Low Stock' | 'Out of Stock'>('Active');
  const [isImported, setIsImported] = useState(false);
  const [originCountry, setOriginCountry] = useState('New Zealand');
  const [imageUrl, setImageUrl] = useState('/products/onion.jpg');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSource, setUploadSource] = useState<'storage' | 'url' | 'preset'>('preset');

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImageToStorage(file, 'products');
      setImageUrl(url);
      setUploadSource('storage');
    } catch (err) {
      console.error('Failed to upload image to storage:', err);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalImage = imageUrl.trim() || '/products/onion.jpg';
    const isFruit = category === 'Fruits';
    const flag = isFruit && isImported ? getCountryFlag(originCountry) : '🇮🇳';

    const pCost = Number(purchasePrice) || 0;
    const pSale = Number(salePrice) || 0;
    const pB2B = Number(b2bPrice) || pSale;
    const pB2C = Number(b2cPrice) || pSale;

    addProduct({
      name: name.trim(),
      catalogType,
      targetCatalog: catalogType,
      category,
      unit,
      purchasePrice: pCost,
      salePrice: pSale,
      b2bPrice: pB2B,
      b2cPrice: pB2C,
      minOrderQty: Number(minOrderQty) || 1,
      stock: Number(stock) || 0,
      minimumStock: Number(minimumStock) || 0,
      status,
      isImported: isFruit ? isImported : false,
      originCountry: isFruit && isImported ? originCountry : 'India',
      countryFlag: flag,
      image: finalImage,
      description: description.trim() || `Fresh quality ${name} (${catalogType === 'B2B' ? 'Wholesale Commercial Pack' : catalogType === 'B2C' ? 'Retail Consumer Pack' : 'Dual Channel'}) sourced directly from farms.`,
      images: [finalImage]
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Add New Product</h3>
              <p className="text-xs text-slate-500">Create product for B2B or B2C catalog</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
            <p className="mt-3 font-bold text-slate-800 text-sm">Product Added to Catalog & Inventory!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            
            {/* Catalog Channel Selector */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <label className="block font-bold text-slate-800">
                Target Catalog Channel *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCatalogType('B2B');
                    if (unit === 'KG') setUnit('Crate (20 KG)');
                  }}
                  className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                    catalogType === 'B2B'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/50'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>B2B Wholesale</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCatalogType('B2C');
                    if (unit.includes('Crate') || unit.includes('Bag')) setUnit('1 KG');
                  }}
                  className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                    catalogType === 'B2C'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50/50'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>B2C Retail</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCatalogType('Both')}
                  className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                    catalogType === 'Both'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Both (Dual)</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-500">
                {catalogType === 'B2B' && 'Visible to Hotels, Caterers, and Bulk Institutional Buyers.'}
                {catalogType === 'B2C' && 'Visible to Direct Consumers, Households, and Retail Buyers.'}
                {catalogType === 'Both' && 'Available across both Wholesale Hotel & Retail Consumer catalogs.'}
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Fresh Red Apple / Alphonso Mango / Banana"
                value={name}
                onChange={e => {
                  const val = e.target.value;
                  setName(val);
                  if (uploadSource === 'preset') {
                    setImageUrl(resolveProductImage(val, category));
                  }
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={e => {
                    const cat = e.target.value;
                    setCategory(cat);
                    if (uploadSource === 'preset') {
                      setImageUrl(resolveProductImage(name, cat));
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Unit of Measurement *</label>
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <option value="KG">KG (Kilogram)</option>
                  <option value="1 KG">1 KG Pack</option>
                  <option value="500g Pack">500g Pack / Tray</option>
                  <option value="Crate (20 KG)">Crate (20 KG Wholesale)</option>
                  <option value="Bag (50 KG)">Bag (50 KG Wholesale)</option>
                  <option value="Sack (25 KG)">Sack (25 KG Bulk)</option>
                  <option value="Bundle">Bundle (Judi / Bunch)</option>
                  <option value="Pcs">Pcs (Pieces)</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Box">Box (Crate)</option>
                </select>
              </div>
            </div>

            {/* Conditional Fruit Origin: Domestic vs Imported */}
            {category === 'Fruits' && (
              <div className="p-3.5 bg-gradient-to-br from-amber-50/90 to-orange-50/70 border border-amber-200/90 rounded-xl space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                    🍎 Fruit Origin & Import Details
                  </span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {isImported ? '✈️ Imported Fruit' : '🇮🇳 Domestic Fruit'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsImported(false)}
                    className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                      !isImported
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>🇮🇳</span> Domestic (India)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsImported(true)}
                    className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                      isImported
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>✈️</span> Imported
                  </button>
                </div>

                {isImported && (
                  <div className="pt-1 space-y-1.5">
                    <label className="block font-semibold text-slate-700 text-xs">
                      Country of Origin *
                    </label>
                    <div className="relative">
                      <select
                        value={originCountry}
                        onChange={e => setOriginCountry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-slate-800 font-bold text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {IMPORT_COUNTRIES.map(country => (
                          <option key={country.name} value={country.name}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                      <span>Preview:</span>
                      <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-amber-200 font-bold text-slate-800">
                        <span>{getCountryFlag(originCountry)}</span>
                        <span>{originCountry}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Purchase Cost (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={purchasePrice}
                  onChange={e => setPurchasePrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Sale Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={salePrice}
                  onChange={e => {
                    setSalePrice(e.target.value);
                    if (!b2bPrice) setB2bPrice(e.target.value);
                    if (!b2cPrice) setB2cPrice(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Dual Channel Price Breakdown */}
            <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block font-bold text-blue-800 text-[11px] mb-0.5">B2B Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={b2bPrice}
                  onChange={e => setB2bPrice(e.target.value)}
                  placeholder="Wholesale"
                  className="w-full px-2.5 py-1.5 bg-white border border-blue-200 rounded-lg text-slate-800 font-bold text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-emerald-800 text-[11px] mb-0.5">B2C Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={b2cPrice}
                  onChange={e => setB2cPrice(e.target.value)}
                  placeholder="Retail"
                  className="w-full px-2.5 py-1.5 bg-white border border-emerald-200 rounded-lg text-slate-800 font-bold text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-[11px] mb-0.5">Min Order (MOQ)</label>
                <input
                  type="number"
                  min="1"
                  value={minOrderQty}
                  onChange={e => setMinOrderQty(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Stock ({unit}) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Minimum Stock ({unit}) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={minimumStock}
                  onChange={e => setMinimumStock(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image Source / URL</label>
                <input
                  type="text"
                  placeholder="Image URL or preset path"
                  value={imageUrl}
                  onChange={e => {
                    setImageUrl(e.target.value);
                    setUploadSource('url');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Rich Product Image Storage & Upload Zone */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  Product Image (Firebase Storage / Device Upload)
                </span>
                {imageUrl && (
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center shrink-0 overflow-hidden relative group">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getProductImageFallback(name, category);
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold rounded-lg text-xs cursor-pointer shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isUploading ? 'Uploading to Storage...' : 'Upload Image from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Supports JPG, PNG, WEBP up to 5MB. Automatically compressed & stored in Firebase Storage.
                  </p>
                </div>
              </div>

              {/* One-Tap Fresh Produce Presets */}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-[10px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Or pick a standard catalog image:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_PRODUCT_IMAGES.map(item => (
                    <button
                      key={item.url}
                      type="button"
                      onClick={() => {
                        setImageUrl(item.url);
                        setUploadSource('preset');
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                        imageUrl === item.url
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {imageUrl === item.url && <Check className="w-2.5 h-2.5 text-white" />}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Product origin, grading and freshness details..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
              >
                Add Product
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
