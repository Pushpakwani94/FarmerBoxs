import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md' | 'lg';
  showDeleteOnOne?: boolean;
}

export const CustomerQuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
  showDeleteOnOne = false
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div
      className={`inline-flex items-center justify-between bg-[#15803d] text-white rounded-xl shadow-xs overflow-hidden ${
        isSm ? 'h-7 px-1 text-xs gap-1.5' : isLg ? 'h-11 px-3 text-sm gap-4' : 'h-8 px-2 text-xs gap-2.5'
      }`}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onDecrement}
        className="hover:bg-emerald-800/80 active:scale-90 p-1 rounded-lg transition-transform cursor-pointer flex items-center justify-center"
        title="Decrease"
      >
        {quantity === 1 && showDeleteOnOne ? (
          <Trash2 className={isSm ? 'w-3 h-3' : isLg ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        ) : (
          <Minus className={isSm ? 'w-3 h-3' : isLg ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        )}
      </button>

      <span className="font-black text-white px-1 select-none">{quantity}</span>

      <button
        onClick={onIncrement}
        className="hover:bg-emerald-800/80 active:scale-90 p-1 rounded-lg transition-transform cursor-pointer flex items-center justify-center"
        title="Increase"
      >
        <Plus className={isSm ? 'w-3 h-3' : isLg ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      </button>
    </div>
  );
};
