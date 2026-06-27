import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/format";

const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isDrawerOpen,
    closeDrawer,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    cartItemsCount,
  } = useCart();

  // Fecha com ESC
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDrawerOpen, closeDrawer]);

  // Bloqueia scroll do body
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <h2
                id="cart-drawer-title"
                className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <ShoppingBag className="size-5 text-yellow-500" />
                Seu Carrinho
                {cartItemsCount > 0 && (
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    ({cartItemsCount})
                  </span>
                )}
              </h2>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="size-12 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Explore nosso cardápio e descubra delícias incríveis.
                  </p>
                  <Link
                    to="/products"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
                  >
                    <ShoppingBag className="size-4" />
                    Explorar Cardápio
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-4 flex items-center gap-4"
                      >
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={item.product.imgSrc}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement;
                              t.style.display = "none";
                              const p = t.parentElement;
                              if (p && !p.querySelector(".ef")) {
                                const em = document.createElement("div");
                                em.className = "ef text-3xl";
                                em.textContent = item.product.emoji;
                                p.appendChild(em);
                              }
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mt-0.5">
                            {formatCurrency(item.product.price)}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                              <button
                                onClick={() =>
                                  decreaseQuantity(item.product.id)
                                }
                                className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Diminuir"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="px-2 py-1 text-xs font-bold text-gray-900 dark:text-white min-w-[1.5rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  increaseQuantity(item.product.id)
                                }
                                className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Aumentar"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label={`Remover ${item.product.name}`}
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        <span className="text-sm font-bold text-gray-900 dark:text-white min-w-[4rem] text-right">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-5 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md"
                >
                  Ver Carrinho Completo
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartDrawer;
