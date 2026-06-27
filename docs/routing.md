# Rotas e Navegação

O Foody usa **react-router-dom 7** com `<BrowserRouter>`. Todas as rotas são públicas e client-side.

## Configuração

**Arquivo**: `src/App.tsx`

```tsx
<Router>
  <Navigation />
  <CartDrawer />
  <main className="flex-grow">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </main>
  <Footer />
</Router>
```

## Mapa de rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Home` | Página inicial com hero cinematográfica e seções narrativas |
| `/products` | `Products` | Catálogo completo com filtros por categoria |
| `/product/:id` | `ProductDetails` | Página de detalhes de um produto |
| `/cart` | `Cart` | Página completa do carrinho / checkout |
| `/testimonials` | `Testimonials` | Depoimentos de clientes |
| `/reservation` | `Reservation` | Sistema de reservas |
| `/contact` | `Contact` | Página de contato |

## Navegação principal

Definida em `src/components/Navigation.tsx`:

| Link | Rota | Ícone |
|------|------|-------|
| Home | `/` | `HomeIcon` |
| Cardápio | `/products` | `Utensils` |
| Reservas | `/reservation` | `CalendarDays` |
| Depoimentos | `/testimonials` | `MessageSquare` |
| Contato | `/contact` | `Phone` |

### NavLink ativo

O `NavLink` com `className` callback aplica estilos diferentes quando a rota está ativa:

```tsx
className={({ isActive }) =>
  isActive
    ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600"
    : "text-gray-600 hover:text-gray-900"
}
```

## Parâmetros de rota

### `/product/:id`

A página `ProductDetails` extrai o ID com `useParams`:

```tsx
import { useParams } from "react-router-dom";

const { id } = useParams<{ id: string }>();
const product = products.find((p) => p.id === id);
```

Se o produto não existir, renderiza uma tela de estado vazio (sem redirect automático — melhor para SEO).

## Fluxos de navegação

### Adicionar ao carrinho → ver carrinho

```
[ProductCard]  →  addToCart()  →  Drawer abre
      "Ver Carrinho Completo"  →  navega para /cart + fecha drawer
```

### Breadcrumb (ProductDetails)

```
Home (/)  >  Cardápio (/products)  >  [Nome do produto]
```

Implementado com `<Link>` para os dois primeiros itens e texto simples para o atual.

### Fallback / 404

Atualmente não há uma rota `*` explícita — URLs desconhecidas não renderizam conteúdo. Considere adicionar um `<Route path="*" element={<NotFound />} />` no futuro.

## Scroll behavior

- `html { scroll-behavior: smooth }` está em `src/styles/index.css`.
- O hook `useScrollProgress` monitora `scrollYProgress` (0 a 1) para a barra de progresso no topo.

## Considerações de deploy

Como o app usa `BrowserRouter` (HTML5 History API), o servidor precisa retornar `index.html` para qualquer rota. A Vercel faz isso automaticamente. Para outros hosts:

- **Netlify**: crie um `public/_redirects` com `/* /index.html 200`
- **GitHub Pages**: use `HashRouter` ao invés de `BrowserRouter`, ou configure um `404.html` que redireciona

## Adicionando uma nova rota

1. Crie o arquivo em `src/pages/MinhaPagina.tsx`
2. Importe e adicione em `src/App.tsx`:

```tsx
import MinhaPagina from "./pages/MinhaPagina";

// dentro de <Routes>
<Route path="/minha-rota" element={<MinhaPagina />} />
```

3. (Opcional) Adicione o link em `navLinks` no `Navigation.tsx`.
