import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";

const HERO_IMAGES = [
  {
    src: "/assets/burger.png",
    alt: "Hambúrguer artesanal com ingredientes frescos",
    emoji: "🍔",
  },
  {
    src: "/assets/sushi.png",
    alt: "Sushi combinado com salmão fresco",
    emoji: "🍣",
  },
  {
    src: "/assets/pizza.png",
    alt: "Pizza artesanal com ingredientes premium",
    emoji: "🍕",
  },
];

const TITLE_WORDS = ["Escolha", "a", "sua", "comida", "favorita"];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detecta desktop para habilitar tilt 3D
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Carrossel automático
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

  // Tilt 3D (só desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  return (
    <section className="relative w-full min-h-[89vh] bg-slate-50 dark:bg-gray-900 overflow-visible">
      {/* Mesh gradient blobs animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-300/30 dark:bg-yellow-500/10 rounded-full blur-3xl animate-blob" />
        <div
          className="absolute top-1/3 -right-24 w-96 h-96 bg-orange-300/30 dark:bg-orange-500/10 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-96 h-96 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 items-center">
        {/* Imagem (ordem: primeiro em mobile, último em desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          className="relative flex items-center justify-center h-[300px] md:h-[500px] order-first md:order-last"
        >
          {/* Fundo decorativo amarelo */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400/80 dark:bg-yellow-500/40 rounded-[2rem_8rem_2rem_8rem] w-[260px] h-[260px] md:w-[380px] md:h-[380px]"
          />

          {/* Carrossel de imagens com tilt 3D */}
          <motion.div
            style={isDesktop ? { rotateX, rotateY } : undefined}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={HERO_IMAGES[activeIndex].src}
                alt={HERO_IMAGES[activeIndex].alt}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl"
                style={{ top: '45%', left: '30%' }}
                loading={activeIndex === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </AnimatePresence>

            {/* Emoji fallback gigante (aparece se todas as imagens falharem) */}
            <span
              className="absolute inset-0 flex items-center justify-center text-[180px] md:text-[220px] pointer-events-none select-none opacity-0"
              aria-hidden="true"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {HERO_IMAGES[activeIndex].emoji}
            </span>
          </motion.div>

          {/* Partículas flutuantes */}
          {/* Partículas flutuantes (Ajustadas) */}
          {/* Bolinha Amarela (Topo Direita) */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] lg:right-[15%] w-4 h-4 bg-yellow-400/70 rounded-full hidden md:block"
          />

          {/* Bolinha Laranja (Baixo Esquerda) */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[25%] left-[5%] lg:left-[10%] w-3 h-3 bg-orange-400/80 rounded-full hidden md:block"
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center order-last md:order-first"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-sm font-medium w-fit mb-6"
          >
            <UtensilsCrossed className="size-4" />
            Sabor que conquista
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className={
                  word === "favorita"
                    ? "text-yellow-500 relative inline-block mr-3"
                    : "inline-block mr-3"
                }
              >
                {word}
                {word === "favorita" && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.3 + TITLE_WORDS.length * 0.15 + 0.3,
                      duration: 0.6,
                    }}
                    className="absolute bottom-1 left-0 w-full h-1 bg-yellow-500/30 origin-left rounded-full"
                  />
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
          >
            Descubra uma experiência gastronômica única com pratos preparados com
            ingredientes frescos e muito sabor. Aqui, você encontra opções que
            agradam a todos os paladares, do tradicional ao inovador.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40"
            >
              Ver Cardápio
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 px-8 py-3.5 rounded-full font-medium transition-all duration-300"
            >
              Contato
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats com AnimatedCounter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter to={21} suffix="+" duration={1.5} />
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Pratos no cardápio
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter to={4.8} decimals={1} duration={1.5} />
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Avaliação média
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter to={30} suffix="min" duration={1.5} />
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Entrega rápida
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
