# Technical Specification: Foody Premium Edition

**Versão:** 1.0
**Data:** 2026-06-27
**Autor:** SDD Architect
**PRD de referência:** `specs/PRD-foody-premium.md`
**Status:** _Aguardando Aprovação antes da Execução_

---

## 1. Visão Geral da Arquitetura

A iteração **Foody Premium Edition** mantém a arquitetura existente (React 18 + Vite + Tailwind + Framer Motion + React Router) e introduz:

- **2 novos Context Providers** (ThemeContext + extensão do CartContext com estado do drawer)
- **1 nova rota** (`/product/:id`) + 1 redirect protegido
- **~10 novos componentes** modulares em `src/components/home/`, `src/components/layout/`, `src/components/ui/`
- **1 hook customizado** (`useScrollProgress`)
- **Refatoração profunda** de `Home.tsx`, `Navigation.tsx`, `CartContext.tsx`, `products.ts`
- **Expansão do catálogo** de 10 para ~20 produtos com imagens Unsplash únicas

### Stack (inalterada)
- **Runtime:** Vite 5.4 + React 18.3 + TypeScript 5.5
- **Styling:** Tailwind CSS 3.4 (`darkMode: "class"` já configurado)
- **Animações:** Framer Motion 12
- **Ícones:** lucide-react
- **Roteamento:** react-router-dom 7
- **Feedback:** react-toastify 11 (já instalado, não usado — será ativado)

---

## 2. Regras de Negócio por Épico

### 🎬 E1 — Hero Cinematográfica

1. **BR-E1.1 — Carrossel automático:**
   - 3 imagens rotacionam a cada **4000ms** com crossfade (`opacity 0→1` em 600ms).
   - Estado: `const [activeIndex, setActiveIndex] = useState(0)` + `useEffect` com `setInterval`.
   - Pausa ao passar mouse (`onMouseEnter` limpa interval, `onMouseLeave` reinicia).
   - Indicadores: 3 dots abaixo da imagem, dot ativo = `bg-yellow-500`, inativo = `bg-gray-300 dark:bg-gray-600`.

2. **BR-E1.2 — Word-by-word animation:**
   - Frase dividida em array: `"Escolha a sua comida favorita".split(" ")`.
   - Cada palavra é um `<motion.span>` com `initial={{ opacity: 0, y: 10 }}`, `animate={{ opacity: 1, y: 0 }}`, `delay: index * 0.15`.
   - Palavra "favorita" mantém destaque amarelo + underline animada após todas as palavras aparecerem (`delay: 0.15 * 5 + 0.3`).

3. **BR-E1.3 — Tilt 3D no mouse:**
   - `useMotionValue` para `mouseX` e `mouseY` relativos ao centro do container.
   - `useTransform(mouseX, [-200, 200], [-8, 8])` para `rotateY`.
   - `useTransform(mouseY, [-200, 200], [8, -8])` para `rotateX`.
   - Aplicado via `style={{ rotateX, rotateY }}` no `<motion.div>` da imagem.
   - Reset ao sair do container (`onMouseLeave` → `mouseX.set(0)`, `mouseY.set(0)`).
   - **Desabilitado em mobile** (touch não dispara mouse move de forma útil).

4. **BR-E1.4 — Mesh gradient animado:**
   - 3 blobs absolutos com cores `bg-yellow-300/40`, `bg-orange-300/40`, `bg-amber-200/40`.
   - Animação CSS `@keyframes blob` com `translate` + `scale` em 8s infinito.
   - `blur-3xl` aplicado para suavizar.

5. **BR-E1.5 — Mobile stacking:**
   - Grid: `grid-cols-1 md:grid-cols-2`.
   - Mobile: imagem vem **primeiro** visualmente via `order-1` no texto e `order-2` na imagem em `<md`, revertido em `md:order-none`.
   - **Correção:** Na verdade, mobile-first desejado é **imagem ACIMA do texto** → imagem com `order-first md:order-last`.
   - Altura da imagem: `h-[300px] md:h-[500px]` (flexível, não fixo).
   - **Remover** `overflow-hidden` do container pai que corta os blobs.
   - **Path da imagem:** trocar `./assets/burger.png` → `/assets/burger.png`.

### 🌓 E2 — Dark Mode

1. **BR-E2.1 — ThemeContext:**
   - Tipo: `type Theme = "light" | "dark"`.
   - Estado inicial: prioridade → localStorage > matchMedia > `"light"`.
   - Detecção de sistema: `window.matchMedia('(prefers-color-scheme: dark)').matches`.
   - Chave localStorage: `@RestaurantApp:theme` (mesmo namespace do carrinho).

2. **BR-E2.2 — Aplicação ao DOM:**
   - `useEffect` observa `theme` e manipula `document.documentElement.classList`:
     - `theme === "dark"` → `classList.add("dark")`
     - `theme === "light"` → `classList.remove("dark")`
   - `useEffect` com listener de `matchMedia` para reagir a mudanças do SO (opcional, nice-to-have).

3. **BR-E2.3 — Toggle button:**
   - Ícones: `Sun` (tema claro → clicar vai para dark) / `Moon` (tema dark → clicar vai para light).
   - Animação: `AnimatePresence` com `initial={{ rotate: -90, opacity: 0 }}`, `animate={{ rotate: 0, opacity: 1 }}`, `exit={{ rotate: 90, opacity: 0 }}`, duração 300ms.
   - `aria-label` dinâmico: `"Ativar modo escuro"` / `"Ativar modo claro"`.

4. **BR-E2.4 — Posição na navbar:**
   - Botão entre os nav links e o botão de carrinho.
   - Estilo: `p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700`.

### 🛒 E3 — CartDrawer

1. **BR-E3.1 — Estado do drawer:**
   - Adicionar ao `CartContext`:
     ```ts
     isDrawerOpen: boolean;
     openDrawer: () => void;
     closeDrawer: () => void;
     toggleDrawer: () => void;
     ```
   - Estado persistido? **Não** (drawer sempre inicia fechado em reload).

2. **BR-E3.2 — Auto-open em `addToCart`:**
   - Modificar `addToCart` para chamar `openDrawer()` após adicionar item.
   - **Exceção:** se estiver na rota `/cart`, não abrir drawer (usuário já está no checkout).
   - Detecção: hook `useLocation()` não é viável dentro do Context → passar flag opcional `addToCart(product, { silent: true })` para uso na página `/cart`.

3. **BR-E3.3 — Renderização:**
   - Componente `<CartDrawer />` renderizado **uma única vez** em `App.tsx`, fora das rotas.
   - Usa `createPortal` para renderizar no `<body>` e evitar z-index conflicts.
   - Estrutura: `<aside role="dialog" aria-modal="true" aria-label="Carrinho de compras">`.

4. **BR-E3.4 — Animação:**
   - Backdrop: `motion.div` com `opacity 0→0.5` em 300ms, `onClick={closeDrawer}`.
   - Drawer: `motion.aside` com `x: "100%" → x: 0`, `transition={{ type: "tween", duration: 0.35 }}`.
   - Itens internos: `staggerChildren: 0.05`.

5. **BR-E3.5 — Fechamento:**
   - `useEffect` com `keydown` listener: `if (e.key === "Escape") closeDrawer()`.
   - `useEffect` com cleanup (`removeEventListener`).
   - Botão X no topo.
   - Clicar no backdrop.
   - Bloqueio de scroll do body quando aberto: `document.body.style.overflow = "hidden"`.

6. **BR-E3.6 — Responsividade:**
   - `<sm`: `w-full`.
   - `≥sm`: `max-w-md` (448px).

7. **BR-E3.7 — Conteúdo interno:**
   - Header: "Seu Carrinho ({count})" + botão fechar.
   - Lista: cada item com miniatura 64x64, nome, preço unitário, controles `- / qty / +`, botão trash.
   - Footer fixo: subtotal, botão "Ver Carrinho Completo" (link para `/cart` + `closeDrawer`), botão "Finalizar" (toast "Em breve!").
   - Estado vazio: ilustração + "Seu carrinho está vazio" + CTA para `/products`.

### 📄 E4 — Página de Detalhes do Produto

1. **BR-E4.1 — Rota e parâmetro:**
   - Adicionar `<Route path="/product/:id" element={<ProductDetails />} />` em `App.tsx`.
   - `const { id } = useParams()` + `products.find(p => p.id === id)`.

2. **BR-E4.2 — 404 de produto:**
   - Se `product === undefined`, renderizar componente de estado vazio:
     - Ícone `PackageX`, título "Produto não encontrado", subtítulo, botão "Voltar ao Cardápio" → `/products`.
   - **Sem** `<Navigate>` automático (melhor UX + SEO).

3. **BR-E4.3 — Layout:**
   - Grid 2 colunas em `≥lg`: imagem (esquerda) + info (direita).
   - Mobile: empilhado (imagem em cima, info embaixo).
   - Container: `max-w-6xl mx-auto px-4 py-10`.

4. **BR-E4.4 — Imagem com zoom:**
   - `motion.img` com `whileHover={{ scale: 1.08 }}`, `transition={{ type: "tween" }}`.
   - Container com `overflow-hidden rounded-2xl`.

5. **BR-E4.5 — Breadcrumb:**
   - `[Home, Cardápio, <nome do produto>]`.
   - Home → `/`, Cardápio → `/products`, produto = texto (não clicável).
   - Separador: `<ChevronRight className="size-4" />`.

6. **BR-E4.6 — Seletor de quantidade:**
   - Estado local: `const [qty, setQty] = useState(1)`.
   - Botões `-` (desabilitado em qty=1) e `+`.
   - Display central do número.

7. **BR-E4.7 — Ingredientes:**
   - Lista `<ul>` com bullets customizados (`<Leaf className="size-4 text-green-500" />`).
   - Campo `ingredients: string[]` vem do `products.ts` (ver E6).

8. **BR-E4.8 — Relacionados:**
   - Título: "Você também pode gostar".
   - Filtrar: `products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)`.
   - Grid 2→4 colunas responsivo.
   - Mesmo card visual de `Products.tsx` (extrair para `<ProductCard />` reutilizável).

### 🏠 E5 — Seções Extras da Home

1. **BR-E5.1 — FeaturesSection:**
   - 4 cards em grid responsivo (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
   - Dados (array local no componente):
     ```ts
     [
       { icon: Flame,     title: "Forno a Lenha",      desc: "Sabor defumado autêntico em cada prato." },
       { icon: Leaf,      title: "Ingredientes Frescos", desc: "Selecionados diariamente de produtores locais." },
       { icon: Truck,     title: "Entrega em 30min",   desc: "Rápido, seguro e na temperatura ideal." },
       { icon: Award,     title: "Chef Premiado",      desc: "Receitas autorais de chef reconhecido." },
     ]
     ```
   - Animação: `motion.div` com `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `staggerChildren: 0.1`.

2. **BR-E5.2 — HowItWorksSection:**
   - 3 passos em grid horizontal (mobile: vertical).
   - Dados:
     ```ts
     [
       { step: "01", icon: HandPlatter, title: "Escolha", desc: "Explore nosso cardápio e escolha seus pratos favoritos." },
       { step: "02", icon: ShoppingBag, title: "Peça",    desc: "Adicione ao carrinho e finalize seu pedido em segundos." },
       { step: "03", icon: Bike,        title: "Receba",  desc: "Entregamos quentinho na sua porta em até 30 minutos." },
     ]
     ```
   - Linha conectora: `<div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200" />` atrás dos cards.

3. **BR-E5.3 — BestSellersSection:**
   - Top 4 por `rating` (desc): `products.toSorted((a,b) => b.rating - a.rating).slice(0, 4)`.
   - Grid responsivo (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
   - Cada card: `<Link to="/product/${id}">` + botão "Adicionar" que não navega (usa `e.preventDefault` + `e.stopPropagation` no clique).

4. **BR-E5.4 — CtaBanner:**
   - Gradiente: `bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500`.
   - Título: "Pronto para experimentar?".
   - Subtítulo: "Peça agora e descubra por que somos a escolha favorita da cidade."
   - CTA: `<Link to="/products">` com `bg-white text-yellow-600 hover:bg-gray-100`.

5. **BR-E5.5 — Footer:**
   - Fundo: `bg-gray-900 dark:bg-black text-gray-300`.
   - 4 colunas em desktop, empilhado em mobile:
     - **Brand:** Logo + descrição curta ("Sabor que conquista desde 2020").
     - **Sobre:** "Nossa História", "Chef", "Ingredientes" (links placeholder `#`).
     - **Links Rápidos:** Home, Cardápio, Reservas, Contato.
     - **Redes Sociais:** Instagram, Facebook, Twitter (ícones lucide).
   - Linha divisória + copyright: `© ${new Date().getFullYear()} Foody. Todos os direitos reservados.`
   - Renderizado **fora** do `<Routes>` em `App.tsx`, dentro do `<main>`.

### 📦 E6 — Catálogo Expandido

1. **BR-E6.1 — Schema atualizado:**
   ```ts
   export type Category = "Oriental" | "Lanches" | "Pizzas" | "Saladas" | "Sobremesas" | "Bebidas";
   
   export interface Product {
     id: string;
     name: string;
     price: number;
     description: string;
     imgSrc: string;
     category: Category;
     rating: number;
     ingredients: string[];  // NOVO
   }
   ```

2. **BR-E6.2 — Distribuição (~20 produtos):**
   - Oriental: 4
   - Lanches: 4
   - Pizzas: 4
   - Saladas: 3 (NOVA categoria)
   - Sobremesas: 3
   - Bebidas: 3
   - **Total: 21 produtos**

3. **BR-E6.3 — Imagens Unsplash:**
   - Padrão de URL: `https://images.unsplash.com/photo-{ID}?w=600&q=80&auto=format&fit=crop`
   - Cada produto tem URL única (lista completa no Anexo A).
   - **Fallback onError:** renderizar `<div>` com emoji grande (`🍣`, `🍔`, `🍕`, `🥗`, `🍰`, `🥤`) ao invés de placeholder genérico.

4. **BR-E6.4 — Ingredientes:**
   - 3 a 6 ingredientes por produto.
   - Linguagem natural em PT-BR, ex: `["Salmão fresco", "Arroz japonês", "Alga nori", "Wasabi"]`.

5. **BR-E6.5 — Categories atualizado em `Products.tsx`:**
   - Adicionar "Saladas" no array de filtros.

### ✨ E7 — Micro-interações Globais

1. **BR-E7.1 — Barra de progresso de scroll:**
   - Hook custom: `src/hooks/useScrollProgress.ts` usando `useScroll` + `useMotionValueEvent` do framer-motion.
   - Retornar `scrollYProgress` (0 a 1).
   - Render em `Navigation.tsx`: `<motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 origin-left z-[60]" />`.

2. **BR-E7.2 — AnimatedCounter:**
   - Componente `<AnimatedCounter to={10} suffix="+" duration={1.5} />`.
   - Interna: `useMotionValue(0)` + `useSpring` + `useTransform` para arredondar.
   - `whileInView` dispara a animação uma única vez (`viewport={{ once: true }}`).
   - Substituir stats hardcoded da Home.

3. **BR-E7.3 — Badge bounce:**
   - `key={cartItemsCount}` no `<motion.span>` já dispara re-mount.
   - Adicionar `animate={{ scale: [0, 1.3, 1] }}`, `transition={{ duration: 0.4 }}` para efeito "pop".

---

## 3. Contratos Técnicos

### 3.1 Contrato de Estado — CartContext (estendido)

```ts
interface CartContextType {
  // Existente
  cartItems: CartItem[];
  addToCart: (product: Product, options?: { silent?: boolean }) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  
  // NOVO
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}
```

**localStorage key:** `@RestaurantApp:cart` (mantido, sem alteração).

### 3.2 Contrato de Estado — ThemeContext (novo)

```ts
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}
```

**localStorage key:** `@RestaurantApp:theme`
**Bootstrap (síncrono, antes do React):**
- Adicionar `<script>` inline no `index.html` para aplicar `class="dark"` antes do hydration e evitar flash de tema errado:
  ```html
  <script>
    (function() {
      const saved = localStorage.getItem('@RestaurantApp:theme');
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefers ? 'dark' : 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    })();
  </script>
  ```

### 3.3 Contrato de Rotas — React Router

| Rota | Componente | Acesso |
|------|-----------|--------|
| `/` | `Home` | público |
| `/products` | `Products` | público |
| `/product/:id` | `ProductDetails` (NOVO) | público |
| `/cart` | `Cart` | público |
| `/testimonials` | `Testimonials` | público |
| `/reservation` | `Reservation` | público |
| `/contact` | `Contact` | público |
| `*` | redirect para `/` (fallback) | — |

### 3.4 Contrato de Storage (localStorage)

| Chave | Tipo | Usado por |
|-------|------|-----------|
| `@RestaurantApp:cart` | `CartItem[]` JSON | CartContext |
| `@RestaurantApp:theme` | `"light" \| "dark"` | ThemeContext (NOVO) |

### 3.5 Contrato de Estilo — Tailwind

Adicionar ao `tailwind.config.js`:
```js
theme: {
  extend: {
    animation: {
      blob: "blob 8s infinite",
      steam: "steam 3s ease-in-out infinite",
      shine: "shine 2s linear infinite",
    },
    keyframes: {
      blob: {
        "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
        "33%": { transform: "translate(30px, -50px) scale(1.1)" },
        "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
      },
      steam: {
        "0%": { transform: "translateY(0) scaleX(1)", opacity: 0 },
        "15%": { opacity: 0.6 },
        "50%": { transform: "translateY(-40px) scaleX(1.4)", opacity: 0.3 },
        "100%": { transform: "translateY(-80px) scaleX(1.8)", opacity: 0 },
      },
      shine: {
        "0%": { backgroundPosition: "200% center" },
        "100%": { backgroundPosition: "-200% center" },
      },
    },
  },
},
```

### 3.6 Contrato de Acessibilidade

- Todos os `<button>` sem texto visível devem ter `aria-label`.
- Drawer: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="cart-drawer-title"`.
- Focus trap no drawer (nice-to-have; se complexo, documentar como débito técnico).
- `tabIndex={-1}` no `<aside>` do drawer + `focus()` programático ao abrir.
- `<img>` sempre com `alt` descritivo.

---

## 4. Estrutura de Arquivos

### 4.1 Arquivos NOVOS a criar

```
src/
├── components/
│   ├── CartDrawer.tsx                  # Drawer lateral do carrinho
│   ├── ProductCard.tsx                 # Card reutilizável (usado em Products, BestSellers, Related)
│   ├── home/
│   │   ├── HeroSection.tsx             # Hero cinematográfica (extraída de Home.tsx)
│   │   ├── FeaturesSection.tsx         # 4 diferenciais
│   │   ├── HowItWorksSection.tsx       # 3 passos
│   │   ├── BestSellersSection.tsx      # Top 4 por rating
│   │   └── CtaBanner.tsx               # Banner CTA final
│   ├── layout/
│   │   └── Footer.tsx                  # Footer global
│   └── ui/
│       └── AnimatedCounter.tsx         # Contador animado
├── contexts/
│   └── ThemeContext.tsx                # NOVO - gerencia tema claro/escuro
├── hooks/
│   └── useScrollProgress.ts          # NOVO - retorna 0-1 do scroll Y
└── pages/
    └── ProductDetails.tsx              # NOVO - /product/:id

specs/
└── (este arquivo + PRD)
```

### 4.2 Arquivos a MODIFICAR

| Arquivo | Mudança | Impacto |
|---------|---------|---------|
| `src/App.tsx` | Wrap com `<ThemeProvider>`, adicionar rota `/product/:id`, renderizar `<CartDrawer />` e `<Footer />` | Alto |
| `src/main.tsx` | Sem mudança prevista | — |
| `src/pages/Home.tsx` | Reescrita: importa e renderiza 5 novas seções + hero reestruturada | Alto |
| `src/pages/Products.tsx` | Usa `<ProductCard />` extraído, adiciona "Saladas" nos filtros | Médio |
| `src/pages/Cart.tsx` | Usa `addToCart(product, { silent: true })` para evitar auto-open do drawer ao modificar qty | Baixo |
| `src/components/Navigation.tsx` | Adiciona theme toggle, scroll progress bar, carrinho abre drawer (não link) | Alto |
| `src/contexts/CartContext.tsx` | Adiciona estado e métodos do drawer + flag `silent` em `addToCart` | Alto |
| `src/data/products.ts` | Reescrito com 21 produtos, novo schema (ingredients), URLs Unsplash | Alto |
| `src/styles/index.css` | Adiciona utilities `.animate-blob`, `.animate-steam` se não usar config | Baixo |
| `tailwind.config.js` | Adiciona keyframes/animation customizados (blob, steam, shine) | Baixo |
| `index.html` | `lang="pt-BR"`, meta tags SEO, script inline anti-flash de tema | Médio |

### 4.3 Arquivos a EXCLUIR

Nenhum arquivo existente será excluído nesta iteração.

---

## 5. Critérios de Aceitação (Checklist de Validação)

Como **não há vitest configurado**, a validação será via **checklist manual + build + lint**.

### 5.1 Validação Automatizada

- [ ] `npm run build` → 0 erros TypeScript
- [ ] `npm run lint` → 0 erros (warnings aceitáveis se documentados)
- [ ] `tsc -b` → 0 erros de tipo
- [ ] Bundle gzipped final < 180KB (meta; verificar com `vite build` output)

### 5.2 Validação Manual — E1 Hero

- [ ] Carrossel rotaciona a cada ~4s com crossfade suave
- [ ] Pausa ao hover, retoma ao sair
- [ ] Título aparece palavra por palavra
- [ ] Tilt 3D reage ao mouse em desktop
- [ ] Blobs animados visíveis no fundo
- [ ] Mobile (375px): imagem ACIMA do texto, sem overflow cortado
- [ ] Imagem do burger carrega (path absoluto `/assets/burger.png`)

### 5.3 Validação Manual — E2 Dark Mode

- [ ] Botão sol/lua na navbar alterna tema
- [ ] Preferência persiste em localStorage após F5
- [ ] Primeira visita detecta preferência do SO
- [ ] Transição suave entre temas (transition-colors no body)
- [ ] Sem flash branco ao recarregar em modo dark (script inline)
- [ ] Todas as páginas renderizam corretamente em ambos os temas

### 5.4 Validação Manual — E3 CartDrawer

- [ ] "Adicionar ao carrinho" em `/products` abre drawer automaticamente
- [ ] "Adicionar" em `/cart` NÃO abre drawer (silent mode)
- [ ] Backdrop + X + ESC fecham o drawer
- [ ] `body` não rola quando drawer está aberto
- [ ] Controles de qty (+/-) e trash funcionam
- [ ] "Ver carrinho completo" navega para `/cart` e fecha drawer
- [ ] Mobile: drawer ocupa 100% da largura
- [ ] Animação de entrada/saída suave (~350ms)

### 5.5 Validação Manual — E4 ProductDetails

- [ ] Clique em card de produto navega para `/product/:id`
- [ ] Breadcrumb exibe Home > Cardápio > [Nome]
- [ ] Imagem zoom on hover
- [ ] Ingredientes listados
- [ ] Seletor de qty funciona, "Adicionar" respeita qty escolhida
- [ ] Seção "Relacionados" mostra até 4 produtos da mesma categoria
- [ ] URL inválida `/product/999` exibe estado vazio com link de volta
- [ ] Botão "Adicionar" nos cards relacionados funciona sem navegar

### 5.6 Validação Manual — E5 Home Seções

- [ ] FeaturesSection: 4 cards visíveis com animação stagger ao scroll
- [ ] HowItWorksSection: 3 passos + linha conectora visível em desktop
- [ ] BestSellersSection: top 4 por rating, cards clicáveis
- [ ] CtaBanner: gradiente visível, botão leva para `/products`
- [ ] Footer: 4 colunas em desktop, empilhado em mobile, ano dinâmico
- [ ] Todas as seções disparam animação uma única vez (`once: true`)

### 5.7 Validação Manual — E6 Catálogo

- [ ] 21 produtos renderizados
- [ ] 6 categorias no filtro (incluindo "Saladas")
- [ ] Imagens Unsplash carregam (verificar 2-3 produtos específicos)
- [ ] Fallback com emoji aparece ao forçar erro de imagem
- [ ] Ingredientes aparecem em `/product/:id`
- [ ] Nenhuma imagem repetida entre produtos diferentes

### 5.8 Validação Manual — E7 Micro-interações

- [ ] Barra amarela de progresso no topo cresce conforme scroll
- [ ] Stats da Home (10+, 4.8, 30min) animam contagem ao entrar no viewport
- [ ] Badge do carrinho faz "pop" ao adicionar item
- [ ] Animações não travam nem duplicam (StrictMode em dev ok, prod estável)

### 5.9 Validação Cross-browser (rápida)

- [ ] Chrome (último): tudo ok
- [ ] Firefox (último): tudo ok
- [ ] Safari (último): imagens Unsplash carregam, animações rodam

---

## 6. Ordem de Execução (Build Plan)

Cada fase é **autocontida e commitável**. A ordem minimiza conflitos e permite validações intermediárias.

| Fase | Épico | Descrição | Commits sugeridos |
|------|-------|-----------|-------------------|
| **F1** | E6 | Expandir products.ts (21 produtos + ingredients + Saladas + Unsplash) | `feat(data): expand catalog to 21 products with ingredients` |
| **F2** | E2 | ThemeContext + toggle button + script anti-flash + index.html SEO | `feat(theme): add dark mode toggle with persistence` |
| **F3** | E1 | Hero cinematográfica (carrossel + tilt + mesh + word-by-word) | `feat(home): cinematic hero with carousel and 3D tilt` |
| **F4** | E7 | Micro-interações (scroll progress, AnimatedCounter, badge bounce) | `feat(ux): scroll progress bar and animated counters` |
| **F5** | E3 | CartDrawer (context extension + componente + integração) | `feat(cart): slide-in drawer with auto-open on add` |
| **F6** | E4 | ProductDetails + ProductCard extraído + rota | `feat(product): detail page with related items` |
| **F7** | E5 | 5 seções da Home + Footer + reescrita de Home.tsx | `feat(home): features, how it works, best sellers, CTA, footer` |
| **F8** | — | Validação final (build, lint, checklist manual, ajustes) | `chore: final polish and validation` |

**Tempo estimado total:** ~90 minutos de execução.

---

## 7. Assunções Documentadas

Estas decisões foram tomadas pelo arquiteto e devem ser validadas pelo usuário antes da execução:

1. **Sem vitest:** Validação via checklist manual + build + lint (conforme PRD).
2. **react-toastify:** Será usado para toasts de feedback ("Em breve!" no finalizar pedido). Toast de "adicionado ao carrinho" fica como **débito opcional** — não incluído para não poluir UX com drawer já aberto.
3. **Footer em todas as páginas:** Renderizado fora do `<Routes>`, aparece em todas as rotas.
4. **ProductCard extraído:** Card atual de `Products.tsx` será fatorado em componente reutilizável para evitar duplicação (usado em Products, BestSellers, RelatedProducts).
5. **Silent addToCart:** Flag opcional `silent` para evitar drawer abrindo quando o usuário já está em `/cart`.
6. **Script inline anti-flash:** Adicionado diretamente em `index.html` (não via React) para evitar FOUC (Flash of Unstyled Content) ao carregar tema escuro.
7. **Imagens locais (`/assets/burger.png`):** Mantidas para a hero (não Unsplash), pois são PNGs com transparência já existentes no projeto.
8. **Sem PWA, sem i18n, sem backend:** Fora do escopo conforme PRD.
9. **Páginas `/reservation`, `/testimonials`, `/contact`:** Mantidas sem alteração (apenas herdarão dark mode e footer automaticamente).
10. **Favicon:** Continua `vite.png` genérico (débito documentado).

---

## 8. Riscos e Mitigações

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| URLs Unsplash quebram (rate limit) | Baixa | Médio | Fallback onError com emoji + `loading="lazy"` |
| Bundle excede 180KB gzip | Média | Baixo | Lazy-load de imagens, tree-shaking do lucide (importar ícones individualmente) |
| Framer Motion + StrictMode duplica animações | Alta (dev) | Baixo | Comportamento esperado; em prod é normal |
| Flash branco no dark mode sem script inline | Alta | Médio | Script inline no `index.html` |
| Drawer com scroll trap complexo | Média | Baixo | Implementar `body.overflow = hidden` simples; focus trap como débito técnico |
| Imagem do burger local não existe em `/assets/` | Baixa | Médio | Verificar existência; fallback para Unsplash se necessário |

---

## 9. Débitos Técnicos (fora desta iteração)

- Favicon customizado
- Testes automatizados (vitest + testing-library)
- PWA / Service Worker
- Busca global CMD+K
- Sistema de favoritos/wishlist
- Focus trap completo no drawer
- i18n
- Backend / checkout real

---

## 10. Aprovação

**Esta Technical Spec está submetida para aprovação antes do início da execução de código.**

- [ ] **Aprovada** — Executar todas as 8 fases em sequência
- [ ] **Aprovada com ajustes** — Listar alterações abaixo
- [ ] **Rejeitada** — Reescrever com novo escopo

**Opções de execução (escolher uma):**

- **(A)** Executar todas as 8 fases de uma vez, reportando ao final
- **(B)** Executar em blocos com checkpoints: F1-F3 → validar → F4-F6 → validar → F7-F8
- **(C)** Executar fase por fase, pedindo aprovação entre cada uma

**Feedback / Ajustes solicitados:**

> _(preencher se houver)_

---

## Anexo A — URLs Unsplash por Produto

> URLs seguem o padrão `https://images.unsplash.com/photo-{ID}?w=600&q=80&auto=format&fit=crop`
> 
> A lista completa de IDs será preenchida durante a execução da Fase 1, usando fotos verificadas do Unsplash. Cada produto terá URL única, nunca repetida.

| Categoria | Emoji fallback | IDs Unsplash (reservados) |
|-----------|----------------|---------------------------|
| Oriental | 🍣 | `photo-1579871494447-9811cf80d66c`, `photo-1617196034796-73dfa7b1fd56`, `photo-1611171711791-b34b41b4ea34`, `photo-1569718212165-3a8278d5f624` |
| Lanches | 🍔 | `photo-1568901346375-23c9450c58cd`, `photo-1550547660-d9450f859349`, `photo-1606755962773-d725e8a4c3fe`, `photo-1612392062798-2b9de6f9cda6` |
| Pizzas | 🍕 | `photo-1565299624946-b28f40a0ae38`, `photo-1574071318508-1cdbab80d002`, `photo-1513104890138-7c749659a591`, `photo-1604382354936-07c5d9983bd3` |
| Saladas | 🥗 | `photo-1512621776951-a57141f2eefd`, `photo-1540420773420-3366772f4999`, `photo-1607532941433-304659e8198a` |
| Sobremesas | 🍰 | `photo-1551024601-bec78aea704b`, `photo-1587314168485-3236d6710814`, `photo-1563805042-7684c019e1cb` |
| Bebidas | 🥤 | `photo-1544145945-f90425340c7e`, `photo-1558642452-9d2a7deb7f62`, `photo-1534353473418-4cfa6c56fd38` |

> **Nota:** Estes IDs são placeholders de referência. Durante a implementação, cada ID será validado individualmente via fetch para garantir disponibilidade. Em caso de URL quebrada, usar fallback de emoji.
