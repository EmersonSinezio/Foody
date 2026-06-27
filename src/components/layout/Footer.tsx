import { Link } from "react-router-dom";
import { UtensilsCrossed, Camera, Heart, Send } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Cardápio" },
  { to: "/reservation", label: "Reservas" },
  { to: "/testimonials", label: "Depoimentos" },
  { to: "/contact", label: "Contato" },
];

const aboutLinks = [
  { to: "#", label: "Nossa História" },
  { to: "#", label: "Chef" },
  { to: "#", label: "Ingredientes" },
  { to: "#", label: "Sustentabilidade" },
];

const socialLinks = [
  { href: "#", icon: Camera, label: "Instagram" },
  { href: "#", icon: Heart, label: "Facebook" },
  { href: "#", icon: Send, label: "Twitter" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-white group mb-4"
            >
              <div className="bg-yellow-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <UtensilsCrossed className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Foody<span className="text-yellow-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Sabor que conquista desde 2020. Pratos artesanais preparados com
              ingredientes frescos e muito carinho.
            </p>
          </div>

          {/* Sobre */}
          <div>
            <h4 className="text-white font-bold mb-4">Sobre</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
            <p className="text-sm text-gray-400 mb-4">
              Siga-nos e fique por dentro das novidades e promoções.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-yellow-500 flex items-center justify-center transition-colors duration-300"
                >
                  <s.icon className="size-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {year} Foody. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Feito com <span className="text-yellow-500">♥</span> para amantes
            de boa comida
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
