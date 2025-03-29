import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Testimonials from "./pages/Testimonials";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import { CartProvider } from "./contexts/CartContext";

/*
TODO:
  Mudanças para fazer na aplicação
  1) Criar um contexto para o tema dark
  2) Ajustar Responsividade para telas menores
*/

const App: React.FC = () => {
  return (
    <CartProvider>
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
    </CartProvider>
  );
};

export default App;
