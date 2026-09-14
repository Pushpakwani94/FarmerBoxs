import React, { useState, useEffect } from 'react';
import { X, Package, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { uploadImageToStorage } from '../../firebase/services/storageService';
import type { Product } from '../../types';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
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
  'Dairy & Supplies'
];

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, isOpen, onClose }) => {
  const { updateProduct } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [unit, setUnit] = useState('KG');
  const [purchasePrice, setPurchasePrice] = useState('25');
  const [salePrice, setSalePrice] = useState('40');
  const [stock, setStock] = useState('200');
  const [minimumStock, setMinimumStock] = useState('30');
  const [status, setStatus] = useState<'Active' | 'Low Stock' | 'Out of Stock'>('Active');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImageToStorage(file, 'products');
      setImageUrl(url);
    } catch (err) {
      console.error('Failed to upload image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setUnit(product.unit);
      setPurchasePrice(product.purchasePrice.toString());
      setSalePrice(product.salePrice.toString());
      setStock(product.stock.toString());
      setMinimumStock(product.minimumStock.toString());
      setStatus(product.status);
      setImageUrl(product.image);
      setDescription(product.description || '');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProduct(product.id, {
      name: name.trim(),
      category,
      unit,
      purchasePrice: Number(purchasePrice) || 0,
      salePrice: Number(salePrice) || 0,
      stock: Number(stock) || 0,
      minimumStock: Number(minimumStock) || 0,
      status,
      image: imageUrl.trim() || product.image,
      description: description.trim() || product.description
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Edit Product</h3>
              <p className="text-xs text-slate-500">Update {product.name} pricing and inventory</p>
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
            <p className="mt-3 font-bold text-slate-800 text-sm">Product Updated Successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
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
                  <option value="Pcs">Pcs (Pieces)</option>
                  <option value="Bundle">Bundle</option>
                  <option value="Pkt">Pkt (Packet)</option>
                  <option value="Box">Box (Crate)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Purchase Price (₹) *</label>
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
                <label className="block font-semibold text-slate-700 mb-1">Sale Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={salePrice}
                  onChange={e => setSalePrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Stock ({unit}) *</label>
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
                <label className="block font-semibold text-slate-700 mb-1">Product Image</label>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-[11px]"
                    />
                    {imageUrl && (
                      <img src={imageUrl} alt="Preview" className="w-8 h-8 rounded-md object-cover border border-slate-200" />
                    )}
                  </div>
                  <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-600 text-[11px] font-medium transition-colors">
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                        <span>Uploading to Firebase Storage...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-slate-500" />
                        <span>Upload from device (Storage)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
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
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
