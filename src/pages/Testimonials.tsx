import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  title: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Clara",
    role: "Cliente desde 2023",
    title: "Comida maravilhosa!",
    content:
      "Experiência incrível! Os pratos estavam deliciosos e a apresentação foi impecável. O atendimento foi atencioso e certamente voltarei em breve!",
    rating: 5,
    avatar: "AC",
  },
  {
    id: 2,
    name: "Lucas Mendes",
    role: "Food Blogger",
    title: "Melhor restaurante da região!",
    content:
      "A variedade no cardápio é incrível e cada prato tem um sabor único. Ótima experiência gastronômica, recomendo a todos que buscam qualidade!",
    rating: 5,
    avatar: "LM",
  },
  {
    id: 3,
    name: "Camila Oliveira",
    role: "Cliente frequente",
    title: "Ambiente acolhedor!",
    content:
      "O ambiente é super aconchegante e os pratos são incríveis. Fiquei impressionada com a qualidade e o sabor. Um lugar para retornar muitas vezes!",
    rating: 5,
    avatar: "CO",
  },
];

const avatarColors = [
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-500",
];

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index: number;
}> = ({ testimonial, index }) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
    >
      {/* Ícone de aspas decorativo */}
      <Quote className="absolute top-6 right-6 size-10 text-yellow-100 dark:text-yellow-900/30" />

      {/* Rating */}
      <div className="flex gap-1 text-yellow-500 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>

      {/* Título */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">
        {testimonial.title}
      </h3>

      {/* Conteúdo */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow relative z-10">
        "{testimonial.content}"
      </p>

      {/* Autor */}
      <footer className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div
          className={`w-11 h-11 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            {testimonial.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {testimonial.role}
          </div>
        </div>
      </footer>
    </motion.blockquote>
  );
};

const Testimonials: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              O que nossos clientes dizem
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg">
              Descubra as experiências de quem já provou nossas delícias e
              entenda por que somos referência em sabor.
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-white font-medium transition-all duration-300 w-fit"
          >
            Ver todas as avaliações
            <ArrowRight className="size-4" />
          </motion.a>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 md:p-12 text-white shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">+500</div>
              <div className="text-sm md:text-base text-yellow-100">
                Clientes satisfeitos
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-sm md:text-base text-yellow-100">
                Nota média no Google
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-sm md:text-base text-yellow-100">
                Recomendariam a amigos
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
