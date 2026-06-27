import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/format";

interface ProductCardProps {
  product: Product;
  /** Se true, card não é clicável como link (útil em listas relacionadas) */
  disableLink?: boolean;
  /** Classe extra */
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  disableLink = false,
  className = "",
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const content = (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full relative overflow-hidden group ${className}`}
    >
      {/* Badge de Avaliação */}
      <span className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
        <Star className="size-3.5 fill-current" />
        {product.rating}
      </span>

      <div className="h-48 flex items-center justify-center mb-6 overflow-hidden">
        <img
          src={product.imgSrc}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent && !parent.querySelector(".emoji-fallback")) {
              const emoji = document.createElement("div");
              emoji.className = "emoji-fallback text-7xl";
              emoji.textContent = product.emoji;
              parent.appendChild(emoji);
            }
          }}
        />
      </div>

      <div className="flex-grow flex flex-col">
        <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-gray-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-gray-900 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white p-3 rounded-full transition-colors duration-300 shadow-md"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart className="size-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );

  if (disableLink) {
    return content;
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 rounded-2xl"
    >
      {content}
    </Link>
  );
};

export default ProductCard;
