import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Minus, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/format";

const Cart: React.FC = () => {
  const {
    cartItems,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    addToCart,
  } = useCart();

  const handleCheckout = () => {
    clearCart();
    toast.success("🎉 Compra realizada com sucesso!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  // Wrapper silent para evitar auto-open do drawer a partir da página /cart
  const silentIncrease = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    if (item) addToCart(item.product, { silent: true });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100 dark:border-gray-700"
        >
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="size-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Parece que você ainda não adicionou nenhuma delícia ao seu pedido.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 w-full justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            <ShoppingBag className="size-5" />
            Explorar Cardápio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500 transition-colors mb-2"
            >
              <ArrowLeft className="size-4" />
              Continuar comprando
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Carrinho de Compras
            </h1>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
            {cartItems.length} {cartItems.length === 1 ? "item" : "itens"}
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Lista de itens */}
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.li
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  <img
                    src={item.product.imgSrc}
                    alt={item.product.name}
                    className="size-24 rounded-lg object-contain bg-gray-50 dark:bg-gray-700 p-2 flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".ef")) {
                        const emoji = document.createElement("div");
                        emoji.className = "ef text-4xl";
                        emoji.textContent = item.product.emoji;
                        parent.appendChild(emoji);
                      }
                    }}
                  />

                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold mt-1">
                      {formatCurrency(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="px-3 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-red-900/20 transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center bg-gray-50 dark:bg-gray-700/50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => silentIncrease(item.product.id)}
                        className="px-3 py-2 text-gray-600 hover:text-green-500 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900/20 transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[5rem] text-right">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remover item"
                      aria-label={`Remover ${item.product.name}`}
                    >
                      <Trash2 className="size-5" />
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {/* Resumo */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8 border-t border-gray-100 dark:border-gray-700">
            <div className="max-w-sm ml-auto space-y-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Taxa de Entrega</span>
                <span className="text-green-500 font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full mt-6 bg-gray-900 dark:bg-yellow-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 dark:hover:bg-yellow-600 transition-colors shadow-lg"
              >
                Finalizar Pedido
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
