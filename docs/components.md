# Componentes

Guia dos componentes reutilizáveis do Foody, organizados por categoria.

## Estrutura

```
src/components/
├── home/                    # Seções da página inicial
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── BestSellersSection.tsx
│   └── CtaBanner.tsx
├── layout/
│   └── Footer.tsx
├── ui/
│   └── AnimatedCounter.tsx
├── CartDrawer.tsx
├── Navigation.tsx
└── ProductCard.tsx
```

---

## Layout

### `Navigation`

Header fixo no topo com blur (`backdrop-blur-md`). Contém:

- **Logo** clicável → `/`
- **Links de navegação** (desktop e mobile)
- **Toggle de tema** (sol/lua) com animação
- **Botão do carrinho** que abre o `CartDrawer` + badge animado
- **Menu mobile** com `AnimatePresence` (hambúrguer)
- **Barra de progresso** fixa acima (E7)

**Hook usado**: `useScrollProgress` para a barra, `useCart` para o badge, `useTheme` para o toggle.

**Arquivo**: `src/components/Navigation.tsx`

### `Footer`

Renderizado em `App.tsx` **fora** das rotas — aparece em todas as páginas. 4 colunas em desktop, empilhado em mobile:

- Brand (logo + descrição)
- Sobre (links placeholder)
- Links Rápidos (rotas principais)
- Redes Sociais (ícones lucide)
- Copyright dinâmico: `© ${new Date().getFullYear()} Foody`

**Arquivo**: `src/components/layout/Footer.tsx`

---

## Home Sections

Todas as seções abaixo usam `whileInView` com `viewport={{ once: true }}` para animar uma única vez ao entrar no viewport.

### `HeroSection`

Seção principal da home. Veja detalhes em [Features → E1](./features.md#e1--hero-cinematográfica).

**Arquivo**: `src/components/home/HeroSection.tsx`

### `FeaturesSection`

4 cards em grid responsivo (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`):

| Ícone | Título |
|-------|--------|
| `Flame` | Forno a Lenha |
| `Leaf` | Ingredientes Frescos |
| `Truck` | Entrega em 30min |
| `Award` | Chef Premiado |

### `HowItWorksSection`

3 passos horizontais em desktop (vertical em mobile), com linha conectora de gradiente atrás:

1. **Escolha** (ícone `HandPlatter`)
2. **Peça** (ícone `ShoppingBag`)
3. **Receba** (ícone `Bike`)

### `BestSellersSection`

Top 4 produtos por `rating`, renderizados com `<ProductCard />` reutilizável. Ao clicar no botão "Adicionar", previne navegação (`e.preventDefault` + `e.stopPropagation`) e chama `addToCart`.

### `CtaBanner`

Banner com gradiente `from-yellow-500 via-orange-500 to-red-500`. Título "Pronto para experimentar?" + botão que leva a `/products`.

---

## UI (Primitivos)

### `AnimatedCounter`

Contador animado com easing `easeOutQuart`, disparado uma única vez via `useInView`.

```tsx
interface AnimatedCounterProps {
  to: number;
  suffix?: string;     // ex.: "+", "min"
  duration?: number;   // em segundos, default 1.5
  decimals?: number;   // casas decimais, default 0
  className?: string;
}
```

**Exemplo**:
```tsx
<AnimatedCounter to={4.8} decimals={1} suffix="★" />
```

**Arquivo**: `src/components/ui/AnimatedCounter.tsx`

---

## Feature Components

### `ProductCard`

Card reutilizável de produto, usado em:

- `Products.tsx` (listagem)
- `BestSellersSection` (top 4)
- `ProductDetails` (relacionados)

Recebe um `Product` e renderiza imagem, nome, preço, rating e botão "Adicionar". O clique no card leva a `/product/:id` (exceto no botão de adicionar, que apenas chama `addToCart`).

### `CartDrawer`

Drawer lateral do carrinho. Detalhes em [Features → E3](./features.md#e3--cartdrawer-drawer-lateral).

**Arquivo**: `src/components/CartDrawer.tsx`

---

## Convenções

1. **Nome de arquivo**: PascalCase para componentes (`ProductCard.tsx`).
2. **Export**: `export default` para páginas e componentes principais; `export const` para hooks e contextos.
3. **Tipagem**: sempre `React.FC<Props>` com interface explícita.
4. **Ícones**: sempre importados individualmente do `lucide-react` (tree-shaking).
5. **Animações**: usar Framer Motion ao invés de CSS transitions para enter/exit.
6. **Acessibilidade**: botões sem texto visível devem ter `aria-label`.

## Exemplo: criando um novo componente de seção

```tsx
// src/components/home/MyNewSection.tsx
import { motion } from "framer-motion";

const MyNewSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-screen-xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Título da Seção
        </h2>
        {/* ... */}
      </motion.div>
    </section>
  );
};

export default MyNewSection;
```

Depois importe em `Home.tsx`:

```tsx
import MyNewSection from "../components/home/MyNewSection";

const Home = () => (
  <div>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <BestSellersSection />
    <MyNewSection />   {/* ← nova seção */}
    <CtaBanner />
  </div>
);
```
