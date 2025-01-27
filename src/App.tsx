import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Testimonials from "./pages/Testimonials";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
/* Futura atualização
 TODO: 
  1. Criar um componente para o footer
  2. Criar no Header um botão para modo dark
  3. Arrumar a responsividade para mobiles
  4. Arrumar funcionalidades para carrinho
 */
const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
