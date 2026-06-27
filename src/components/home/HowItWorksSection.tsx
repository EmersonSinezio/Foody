import { motion } from "framer-motion";
import { HandPlatter, ShoppingBag, Bike } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: "01",
    icon: HandPlatter,
    title: "Escolha",
    description:
      "Explore nosso cardápio e escolha seus pratos favoritos entre mais de 20 opções.",
  },
  {
    step: "02",
    icon: ShoppingBag,
    title: "Peça",
    description:
      "Adicione ao carrinho e finalize seu pedido em segundos, de forma simples.",
  },
  {
    step: "03",
    icon: Bike,
    title: "Receba",
    description:
      "Entregamos quentinho na sua porta em até 30 minutos, com todo cuidado.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider">
            Simples e rápido
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            Como Funciona
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            Em apenas 3 passos, sua refeição favorita chega até você.
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha conectora (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 dark:from-yellow-900/40 dark:via-yellow-600/40 dark:to-yellow-900/40" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {steps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-32 h-32 rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-yellow-400/30 flex items-center justify-center mb-6">
                  <s.icon className="size-12 text-yellow-500" />
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
