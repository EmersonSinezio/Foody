import { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import products from "../../data/products";
import ProductCard from "../ProductCard";

const BestSellersSection = () => {
  const topProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4),
    []
  );

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider inline-flex items-center gap-2">
              <Trophy className="size-4" />
              Favoritos do público
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Mais Vendidos
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl">
              Os pratos que conquistaram o paladar dos nossos clientes e viraram
              referência da casa.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {topProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellersSection;
