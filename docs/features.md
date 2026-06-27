# Features (Épicos E1-E7)

O Foody Premium é organizado em **7 épicos de produto**, cada um com um conjunto de funcionalidades e micro-interações. Este documento descreve cada épico do ponto de vista do usuário e do comportamento da aplicação.

Para detalhes de implementação, consulte a [spec técnica](../specs/SPEC-foody-premium.md).

---

## E1 — Hero Cinematográfica

> Local: `src/components/home/HeroSection.tsx` — usado em `Home.tsx`

A primeira dobra da home é construída para causar impacto em 5 segundos:

- **Carrossel automático** de 3 pratos (burger → sushi → pizza) com crossfade a cada 4s.
- **Pausa no hover** — o intervalo é limpo ao passar o mouse e reiniciado ao sair.
- **Título palavra-por-palavra**: `"Escolha a sua comida favorita"` aparece com stagger de 150ms por palavra.
- **Tilt 3D no mouse** (somente desktop `≥768px`): a imagem do prato reage ao cursor com rotação sutil.
- **Mesh gradient animado**: 3 blobs coloridos (`yellow`, `orange`, `amber`) flutuam no fundo com `blur-3xl`.
- **Mobile stacking**: em `<md` a imagem aparece ACIMA do texto (ordem visual invertida).
- **Indicadores (dots)**: 3 pontos clicáveis abaixo da imagem, dot ativo em `bg-yellow-500`.

---

## E2 — Dark Mode

> Local: `src/contexts/ThemeContext.tsx` + toggle em `Navigation.tsx`

- **Toggle sol/lua** na navbar com animação de rotação 90° ao alternar.
- **Persistência** em `localStorage` com chave `@RestaurantApp:theme`.
- **Detecção de sistema** na primeira visita via `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Reatividade ao SO**: se o usuário mudar o tema do sistema operacional, o app acompanha (desde que não tenha preferência salva explícita).
- **Anti-flash**: script inline em `index.html` aplica `class="dark"` antes do hydration.
- **Transição suave**: `transition-colors` no `<body>` evita cortes bruscos.

### Hook de consumo

```tsx
import { useTheme } from "../contexts/ThemeContext";

const { theme, toggleTheme, setTheme } = useTheme();
```

---

## E3 — CartDrawer (Drawer lateral)

> Local: `src/components/CartDrawer.tsx` + estado em `src/contexts/CartContext.tsx`

Drawer lateral que desliza da direita ao adicionar um produto:

- **Auto-open**: ao chamar `addToCart(product)`, o drawer abre automaticamente.
- **Silent mode**: `addToCart(product, { silent: true })` não abre o drawer — usado dentro da página `/cart`.
- **Fechamento** por:
  - Botão `X` no header
  - Clique no backdrop
  - Tecla `ESC`
- **Scroll lock**: `document.body.style.overflow = "hidden"` enquanto aberto.
- **createPortal**: renderizado no `<body>` para evitar problemas de z-index.
- **Acessibilidade**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- **Responsivo**: `w-full` em mobile, `max-w-md` (448px) em `≥sm`.

### Conteúdo interno

- **Header**: "Seu Carrinho (N)" + botão fechar
- **Lista**: miniatura 64x64, nome, preço unitário, controles `- / qty / +`, botão trash
- **Footer fixo**: subtotal + botão "Ver Carrinho Completo" → `/cart`
- **Estado vazio**: ilustração + CTA "Explorar Cardápio"

---

## E4 — Página de Detalhes do Produto

> Local: `src/pages/ProductDetails.tsx` — rota `/product/:id`

Cada produto tem uma página dedicada acessível por clique no card:

- **Breadcrumb**: `Home > Cardápio > [Nome do produto]`
- **Layout 2 colunas** em `≥lg` (imagem esquerda + info direita), empilhado em mobile.
- **Zoom on hover** na imagem principal.
- **Ingredientes** listados com bullets customizados (ícone `Leaf`).
- **Seletor de quantidade** com botões `+/-` (mínimo 1).
- **"Adicionar ao Carrinho"** respeita a quantidade selecionada.
- **"Você também pode gostar"**: até 4 produtos da mesma categoria.
- **Estado 404**: se o ID não existir, exibe tela "Produto não encontrado" com botão de voltar ao cardápio (sem redirect automático, melhor para SEO).

---

## E5 — Landing Page Narrativa (Seções da Home)

> Local: `src/components/home/*` + `src/components/layout/Footer.tsx`

A Home é composta por 5 seções sequenciais, cada uma animando ao entrar no viewport (`whileInView`, `viewport={{ once: true }}`):

| Seção | Componente | Conteúdo |
|-------|------------|----------|
| **FeaturesSection** | `FeaturesSection.tsx` | 4 diferenciais: Forno a Lenha, Ingredientes Frescos, Entrega 30min, Chef Premiado |
| **HowItWorksSection** | `HowItWorksSection.tsx` | 3 passos: Escolha → Peça → Receba, com linha conectora em desktop |
| **BestSellersSection** | `BestSellersSection.tsx` | Top 4 produtos por `rating` (desc) |
| **CtaBanner** | `CtaBanner.tsx` | Gradiente amarelo→laranja→vermelho + botão "Peça agora" |
| **Footer** | `Footer.tsx` | 4 colunas: Brand, Sobre, Links Rápidos, Redes Sociais + copyright dinâmico |

### Animação padrão

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6 }}
>
```

---

## E6 — Catálogo Expandido

> Local: `src/data/products.ts` + `src/pages/Products.tsx`

- **21 produtos** distribuídos em **6 categorias**: `Oriental` (4), `Lanches` (4), `Pizzas` (4), `Saladas` (3), `Sobremesas` (3), `Bebidas` (3).
- **Imagens Unsplash únicas** por produto, com parâmetros de otimização: `?w=600&q=80&auto=format&fit=crop`.
- **Fallback de emoji**: se a imagem falhar, um emoji grande (`🍣`, `🍔`, `🍕`, `🥗`, `🍰`, `🥤`) é renderizado no lugar.
- **Campo `ingredients: string[]`**: 3 a 6 ingredientes por produto, exibidos em `/product/:id`.
- **Filtros por categoria** na página `/products`, incluindo a nova "Saladas".
- **Loading lazy**: todas as imagens (exceto a primeira da hero) usam `loading="lazy"`.

---

## E7 — Micro-interações Globais

Distribuídas por toda a aplicação:

### Barra de progresso de scroll
- **Local**: `src/hooks/useScrollProgress.ts` + `Navigation.tsx`
- Barra fixa no topo (`z-[60]`) com gradiente `from-yellow-400 via-orange-500 to-red-500`, `scaleX` de 0 a 1 conforme o scroll da página.

### AnimatedCounter
- **Local**: `src/components/ui/AnimatedCounter.tsx`
- Usado nas estatísticas da Hero (`10+`, `4.8`, `30min`).
- Animação `easeOutQuart` disparada uma única vez ao entrar no viewport.

```tsx
<AnimatedCounter to={10} suffix="+" duration={1.5} />
<AnimatedCounter to={4.8} suffix="" decimals={1} />
<AnimatedCounter to={30} suffix="min" />
```

### Badge bounce do carrinho
- **Local**: `Navigation.tsx`
- Badge vermelho com `scale: [0, 1.3, 1]` ao mudar `cartItemsCount` (graças ao `key={cartItemsCount}`).

---

## Resumo visual

```
┌────────────────────────────────────────────────────────────┐
│                    Barra de progresso                      │  ← E7
├────────────────────────────────────────────────────────────┤
│   [Logo]   Home  Cardápio  Reservas  ...   [☀] [🛒 (3)]   │  ← E2, E3, E7
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    Hero Cinematográfica                    │  ← E1
│   Carrossel + Título palavra-por-palavra + Tilt 3D         │
│   Mesh gradient + AnimatedCounters                         │  ← E7
│                                                            │
├────────────────────────────────────────────────────────────┤
│                  FeaturesSection (4 cards)                 │  ← E5
├────────────────────────────────────────────────────────────┤
│                HowItWorksSection (3 passos)                │  ← E5
├────────────────────────────────────────────────────────────┤
│               BestSellersSection (top 4)                   │  ← E5 + E6
├────────────────────────────────────────────────────────────┤
│                      CtaBanner                             │  ← E5
├────────────────────────────────────────────────────────────┤
│                       Footer                               │  ← E5
└────────────────────────────────────────────────────────────┘
```
