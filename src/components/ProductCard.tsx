import { Product } from '@/data/products';
import { Flame, Zap, TrendingUp, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onApply: (product: Product) => void;
}

export default function ProductCard({ product, onApply }: ProductCardProps) {
  const availabilityConfig = {
    high: {
      bg: 'bg-gradient-to-r from-emerald-500 to-green-400',
      text: 'HOT',
      icon: Flame,
      glow: 'shadow-emerald-500/50'
    },
    medium: {
      bg: 'bg-gradient-to-r from-flame-glow to-flame-hot',
      text: 'ACTIVE',
      icon: TrendingUp,
      glow: 'shadow-flame-glow/50'
    },
    low: {
      bg: 'bg-gradient-to-r from-flame-core to-red-500',
      text: 'LIMITED',
      icon: Zap,
      glow: 'shadow-flame-core/50'
    }
  };

  const availability = availabilityConfig[product.availability];
  const AvailIcon = availability.icon;

  return (
    <div className="ember-card rounded-2xl overflow-hidden hover:shadow-flame-lg transition-all duration-300 transform hover:scale-[1.02] touch-manipulation group">
      {/* Image Section */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Flame overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-flame-dark via-flame-dark/50 to-transparent"></div>

        {/* Heat wave effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-flame-core/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`${availability.bg} ${availability.glow} shadow-lg text-white text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm flex items-center gap-1.5`}>
            <AvailIcon className="h-3 w-3" />
            {availability.text}
          </span>
        </div>

        {/* Product type indicator */}
        <div className="absolute bottom-3 left-3">
          <div className="w-8 h-8 rounded-lg glass-flame flex items-center justify-center">
            <Package className="h-4 w-4 text-flame-hot" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 bg-gradient-to-b from-flame-smoke/50 to-flame-dark">
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-flame font-bold text-flame-light mb-1 truncate group-hover:text-flame-hot transition-colors">
              {product.name}
            </h3>
            <p className="text-flame-hot/70 text-xs md:text-sm font-mono">{product.code}</p>
          </div>
          <div className="text-right ml-2 flex-shrink-0">
            <div className="text-xl md:text-2xl font-bold text-flame-glow">${product.price}</div>
            <div className="text-xs text-flame-light/50">per {product.unit}</div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
          {product.specifications.slice(0, 3).map((spec, idx) => (
            <div key={idx} className="text-xs text-flame-light/70 flex items-center">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-flame-core to-flame-hot rounded-full mr-2 flex-shrink-0 animate-pulse"></span>
              <span className="truncate">{spec}</span>
            </div>
          ))}
        </div>

        {/* Min Order */}
        <div className="text-xs text-flame-light/50 mb-4 md:mb-6 flex items-center gap-1">
          <Flame className="h-3 w-3 text-flame-core" />
          Min. Order: {product.minOrder.toLocaleString()} {product.unit}s
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onApply(product)}
          className="w-full bg-gradient-to-r from-flame-core to-flame-hot text-flame-dark font-bold py-3 md:py-3.5 rounded-xl hover:shadow-flame-lg transition-all duration-300 transform hover:scale-[1.02] touch-manipulation min-h-[48px] text-sm md:text-base flex items-center justify-center gap-2 group/btn"
        >
          <Zap className="h-4 w-4 group-hover/btn:animate-pulse" />
          Apply for Allocation
        </button>
      </div>
    </div>
  );
}
