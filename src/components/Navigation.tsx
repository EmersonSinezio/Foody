import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  ShoppingCart,
  UtensilsCrossed,
  Menu,
  X,
  Home as HomeIcon,
  CalendarDays,
  Phone,
  MessageSquare,
  Utensils,
  Sun,
  Moon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollProgress } from "../hooks/useScrollProgress";

const navLinks = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/products", label: "Cardápio", icon: Utensils, end: false },
  { to: "/reservation", label: "Reservas", icon: CalendarDays, end: false },
  { to: "/testimonials", label: "Depoimentos", icon: MessageSquare, end: false },
  { to: "/contact", label: "Contato", icon: Phone, end: false },
];

const Navigation: React.FC = () => {
  const { cartItemsCount, toggleDrawer } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Barra de progresso de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 origin-left z-[60]"
        style={{ scaleX: scrollProgress }}
      />

      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 w-full z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-900 dark:text-white group"
            >
              <div className="bg-yellow-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <UtensilsCrossed className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Foody<span className="text-yellow-500">.</span>
              </span>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden md:block" aria-label="Global">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                        }`
                      }
                    >
                      <link.icon className="size-4" />
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Toggle de tema */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                aria-label={
                  theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex"
                    >
                      <Sun className="size-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex"
                    >
                      <Moon className="size-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Botão do Carrinho (abre drawer) */}
              <button
                onClick={toggleDrawer}
                className="relative inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-yellow-500 hover:bg-gray-800 dark:hover:bg-yellow-600 text-white px-4 sm:px-5 py-2.5 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Abrir carrinho de compras"
              >
                <ShoppingCart className="size-4" />
                <span className="hidden sm:inline">Carrinho</span>
                <AnimatePresence>
                  {cartItemsCount > 0 && (
                    <motion.span
                      key={cartItemsCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 size-5 text-[10px] font-bold text-white"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Toggle mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Abrir menu"
              >
                {mobileOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>
          </div>

          {/* Menu Mobile */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800"
              >
                <ul className="py-4 space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.end}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`
                        }
                      >
                        <link.icon className="size-5" />
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Navigation;
