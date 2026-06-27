# Arquitetura

Este documento descreve a estrutura do código, as decisões arquiteturais e os padrões utilizados no Foody.

## Visão geral

O Foody é uma **Single Page Application (SPA)** 100% client-side, construída com:

- **React 18** + **TypeScript 5.5** como núcleo
- **Vite 5.4** para bundling e dev server
- **Tailwind CSS 3.4** com `darkMode: "class"` para estilização
- **Framer Motion 12** para animações declarativas
- **react-router-dom 7** para roteamento client-side
- **Context API** para gerenciamento de estado global

Não há backend, banco de dados, autenticação ou chamadas de API externas (exceto imagens hospedadas no Unsplash).

## Diagrama de alto nível

```
┌────────────────────────────────────────────────────────────┐
│                       App.tsx                              │
│  <ThemeProvider> → <CartProvider> → <Router> → <Routes>    │
└────────────────────────────────────────────────────────────┘
            │                  │                │
            ▼                  ▼                ▼
   ┌────────────────┐  ┌───────────────┐  ┌────────────┐
   │ ThemeContext   │  │  CartContext  │  │   Router   │
   │ (tema + LS)    │  │  (carrinho    │  │  7 rotas   │
   └────────────────┘  │   + drawer    │  └────────────┘
                       │   + LS)       │
                       └───────────────┘
                              │
                              ▼
                     ┌────────────────┐
                     │   Products     │
                     │  (data estática│
                     │   21 itens)    │
                     └────────────────┘
```

## Estrutura de pastas

```
src/
├── components/              # Componentes reutilizáveis
│   ├── home/                # Seções da página inicial
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── BestSellersSection.tsx
│   │   └── CtaBanner.tsx
│   ├── layout/
│   │   └── Footer.tsx       # Footer global
│   ├── ui/
│   │   └── AnimatedCounter.tsx
│   ├── CartDrawer.tsx       # Drawer lateral do carrinho
│   ├── Navigation.tsx       # Header + menu mobile + progress bar
│   └── ProductCard.tsx      # Card reutilizável de produto
│
├── contexts/                # Context API providers
│   ├── CartContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/                   # Custom hooks
│   └── useScrollProgress.ts
│
├── data/                    # Dados estáticos
│   └── products.ts          # Catálogo de 21 produtos
│
├── pages/                   # Páginas/route-level components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Testimonials.tsx
│   ├── Reservation.tsx
│   └── Contact.tsx
│
├── styles/                  # CSS/SCSS globais
│   ├── index.css            # Imports do Tailwind + resets
│   └── index.scss
│
├── utils/                   # Helpers
│   └── format.ts            # formatCurrency (BRL)
│
├── App.tsx                  # Root component
├── main.tsx                 # Entry point React
└── vite-env.d.ts            # Tipos do Vite
```

Arquivos de suporte na raiz:

```
Foody/
├── public/           # Assets estáticos servidos em /
├── specs/            # PRD e spec técnica
├── index.html        # HTML shell com script anti-flash
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json     # References para app e node
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── postcss.config.js
```

## Fluxo de inicialização

1. `index.html` carrega primeiro e executa um **script inline** que aplica `class="dark"` ao `<html>` antes do React renderizar, evitando flash de tema incorreto (FOUC).
2. `main.tsx` monta `<App />` dentro de `<StrictMode>` no elemento `#root`.
3. `App.tsx` compõe os providers em ordem: `ThemeProvider` → `CartProvider` → `Router`.
4. O `Router` renderiza `Navigation`, `CartDrawer`, `<Routes>` e `Footer`.

```tsx
// src/App.tsx (trecho)
<ThemeProvider>
  <CartProvider>
    <Router>
      <Navigation />
      <CartDrawer />
      <main><Routes>...</Routes></main>
      <Footer />
    </Router>
  </CartProvider>
</ThemeProvider>
```

## Padrões adotados

### 1. Componentes funcionais com TypeScript

Todos os componentes são FCs com props tipadas. Preferência por desestruturação:

```tsx
const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => { ... }
```

### 2. Estado global via Context API

Dois providers independentes:

- **`ThemeContext`**: tema claro/escuro, persistência em `@RestaurantApp:theme`
- **`CartContext`**: itens do carrinho + drawer, persistência em `@RestaurantApp:cart`

### 3. Dados estáticos tipados

O catálogo vive em `src/data/products.ts` com tipos exportados (`Product`, `Category`). Não há chamadas de rede para listar produtos.

### 4. Animações declarativas

Framer Motion é usado em três cenários:

- **`motion.*`**: transições simples (fade, slide, scale)
- **`AnimatePresence`**: enter/exit animations
- **`whileInView`**: animações disparadas ao entrar no viewport

### 5. Roteamento por nome

Cada rota tem seu próprio componente em `src/pages/`. O roteador é `<BrowserRouter>` — não há server-side rendering.

### 6. Utilidades puras

Helpers em `src/utils/` são funções puras sem efeitos colaterais (ex.: `formatCurrency`).

## Decisões arquiteturais

| Decisão | Motivo |
|---------|--------|
| Context API ao invés de Redux/Zustand | Estado simples, dois domínios pequenos. Overkill usar libs externas. |
| Dados em arquivo `.ts` estático | Projeto de portfólio sem backend. Simples, tipado, versionável. |
| Tailwind com `darkMode: "class"` | Permite toggle manual do tema, respeitando preferência do usuário. |
| Framer Motion ao invés de CSS puro | Maior expressividade, suporte a `whileInView`, `AnimatePresence` e gestos. |
| `createPortal` para o CartDrawer | Evita problemas de z-index e overflow em containers pais. |
| Script inline anti-flash | Previne FOUC de tema antes do React hidratar. |
| `localStorage` com namespace `@RestaurantApp:` | Permite coexistência com outras apps no mesmo domínio. |

## Limitações conhecidas

- Sem testes automatizados (vitest não configurado)
- Sem SSR/SSG (client-side only)
- Sem PWA/offline
- Sem i18n
- Sem backend — carrinho é apenas uma simulação

Esses pontos estão documentados no [Roadmap](./roadmap.md).
