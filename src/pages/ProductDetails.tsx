import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Home as HomeIcon,
  Utensils,
  Minus,
  Plus,
  ShoppingBag,
  Leaf,
  Star,
  PackageX,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import products from "../data/products";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/format";
import ProductCard from "../components/ProductCard";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = useMemo(
    () => products.find((p) => p.id === id),
    [id]
  );

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100 dark:border-gray-700"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageX className="size-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Produto não encontrado
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            O produto que você procura não existe ou foi removido do cardápio.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 w-full justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            <Utensils className="size-5" />
            Voltar ao Cardápio
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success(`${qty}x ${product.name} adicionado!`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4"
    >
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8"
        >
          <Link
            to="/"
            className="hover:text-yellow-500 transition-colors flex items-center gap-1"
          >
            <HomeIcon className="size-4" />
            Home
          </Link>
          <ChevronRight className="size-4" />
          <Link
            to="/products"
            className="hover:text-yellow-500 transition-colors"
          >
            Cardápio
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Imagem com zoom */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[400px] overflow-hidden"
          >
            <motion.img
              src={product.imgSrc}
              alt={product.name}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "tween", duration: 0.4 }}
              className="max-h-[400px] w-auto object-contain drop-shadow-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".emoji-fallback")) {
                  const emoji = document.createElement("div");
                  emoji.className = "emoji-fallback text-9xl";
                  emoji.textContent = product.emoji;
                  parent.appendChild(emoji);
                }
              }}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-sm text-yellow-500 font-semibold uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                <Star className="size-4 fill-current" />
                {product.rating}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({Math.floor(product.rating * 50)} avaliações)
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Ingredientes */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Leaf className="size-4 text-green-500" />
                Ingredientes
              </h3>
              <ul className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preço */}
            <div className="mb-8">
              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
                Preço
              </span>
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Seletor de qty + Add */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto">
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-full overflow-hidden bg-white dark:bg-gray-800">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty === 1}
                  className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="size-4" />
                </button>
                <span className="px-6 py-3 font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl"
              >
                <ShoppingBag className="size-5" />
                Adicionar ao Carrinho
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
