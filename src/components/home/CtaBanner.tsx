import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed } from "lucide-react";

const CtaBanner = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-10 md:p-16 text-center shadow-2xl"
        >
          {/* Decorações */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-6"
            >
              <UtensilsCrossed className="size-8 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Pronto para experimentar?
            </h2>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Peça agora e descubra por que somos a escolha favorita da cidade.
              Entrega rápida, sabor inigualável.
            </p>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explorar Cardápio
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
