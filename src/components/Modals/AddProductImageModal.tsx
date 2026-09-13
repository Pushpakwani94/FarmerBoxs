import React, { useState } from 'react';
import { X, ImagePlus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Product } from '../../types';

interface AddProductImageModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductImageModal: React.FC<AddProductImageModalProps> = ({ product, isOpen, onClose }) => {
  const { updateProduct } = useApp();
  const [newUrl, setNewUrl] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const currentImages = product.images || [product.image];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const updatedImages = [...currentImages, newUrl.trim()];
    updateProduct(product.id, { images: updatedImages });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setNewUrl('');
      onClose();
    }, 600);
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400',
    'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400'
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ImagePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Add Product Image</h3>
              <p className="text-xs text-slate-500">Attach photo to {product.name} gallery</p>
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
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
            <p className="mt-2 font-bold text-slate-800 text-sm">Image Added to Gallery!</p>
          </div>
        ) : (
          <form onSubmit={handleAdd} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <span className="text-slate-500 font-semibold block mb-1.5">Or choose a sample produce photo:</span>
              <div className="flex items-center gap-2">
                {sampleImages.map((s, i) => (
                  <img
                    key={i}
                    src={s}
                    alt={`Sample ${i}`}
                    onClick={() => setNewUrl(s)}
                    className="w-14 h-14 rounded-lg object-cover border-2 hover:border-emerald-600 cursor-pointer transition-all"
                  />
                ))}
              </div>
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
                Add Image
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
