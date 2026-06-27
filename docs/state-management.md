# State Management

O Foody usa a **Context API** nativa do React para gerenciar estado global. Não há Redux, Zustand ou bibliotecas externas — o estado é dividido em dois domínios independentes, cada um com seu próprio provider.

## Visão geral

```
App.tsx
└── <ThemeProvider>          ← estado: tema (light/dark)
    └── <CartProvider>       ← estado: carrinho + drawer
        └── <Router>
            └── <Routes />
```

| Contexto | Arquivo | Hook | Persistência | Chave localStorage |
|----------|---------|------|--------------|--------------------|
| Tema | `src/contexts/ThemeContext.tsx` | `useTheme()` | Sim | `@RestaurantApp:theme` |
| Carrinho | `src/contexts/CartContext.tsx` | `useCart()` | Sim (itens) / Não (drawer) | `@RestaurantApp:cart` |

### Por que Context API?

- Estado pequeno e bem delimitado (dois domínios)
- Sem necessidade de middlewares, actions complexas ou devtools avançados
- Zero dependências extras no bundle
- Simples de testar e manter

---

## ThemeContext

**Arquivo**: `src/contexts/ThemeContext.tsx`

### Contrato

```ts
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}
```

### Comportamento

1. **Inicialização** (`getInitialTheme`):
   - Prioridade: `localStorage` → `prefers-color-scheme` (SO) → `"light"`
   - Executado **uma única vez** na primeira renderização

2. **Aplicação ao DOM** (`useEffect` observando `theme`):
   - `theme === "dark"` → `document.documentElement.classList.add("dark")`
   - `theme === "light"` → `document.documentElement.classList.remove("dark")`
   - Salva `theme` em `localStorage`

3. **Reatividade ao SO** (segundo `useEffect`):
   - Escuta `matchMedia('(prefers-color-scheme: dark)')`
   - Só aplica mudança automática se **não houver** preferência salva explicitamente em `localStorage`

### Anti-flash (FOUC)

Para evitar um flash de tema incorreto antes do React hidratar, `index.html` contém um **script inline síncrono**:

```html
<script>
  (function () {
    try {
      const saved = localStorage.getItem("@RestaurantApp:theme");
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved || (prefers ? "dark" : "light");
      if (theme === "dark") document.documentElement.classList.add("dark");
    } catch (e) {}
  })();
</script>
```

### Consumo

```tsx
import { useTheme } from "../contexts/ThemeContext";

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "☀ Claro" : "🌙 Escuro"}
    </button>
  );
};
```

### Uso no Foody

O toggle está em `Navigation.tsx` com ícones `Sun`/`Moon` do lucide-react e animação `AnimatePresence` (rotação 90° na troca).

---

## CartContext

**Arquivo**: `src/contexts/CartContext.tsx`

### Contrato

```ts
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  // Itens
  cartItems: CartItem[];
  addToCart: (product: Product, options?: { silent?: boolean }) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;

  // Derivados (memoizados)
  cartTotal: number;
  cartItemsCount: number;

  // Drawer
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}
```

### Comportamento

#### Persistência do carrinho

- `loadCartFromStorage()` é usado como initializer do `useState` (lê `localStorage` apenas uma vez).
- Um `useEffect` observa `cartItems` e sincroniza com `localStorage` a cada mudança.
- Se o JSON estiver corrompido, remove a chave e retorna `[]`.

#### Derivados memoizados

```ts
const cartTotal = useMemo(
  () => cartItems.reduce((t, i) => t + i.product.price * i.quantity, 0),
  [cartItems]
);

const cartItemsCount = useMemo(
  () => cartItems.reduce((t, i) => t + i.quantity, 0),
  [cartItems]
);
```

Evita recálculos em re-renders que não afetem `cartItems`.

#### `addToCart` com `silent` mode

```ts
const addToCart = (product: Product, options?: { silent?: boolean }) => {
  setCartItems((prev) => {
    const existing = prev.find((i) => i.product.id === product.id);
    if (existing) {
      return prev.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }
    return [...prev, { product, quantity: 1 }];
  });
  if (!options?.silent) openDrawer();
};
```

**Quando usar `silent: true`**: ao chamar `addToCart` dentro da página `/cart` (checkout), para evitar que o drawer abra sobre a página atual.

**Quando usar padrão (drawer abre)**: ao clicar em "Adicionar" em `/products`, `BestSellersSection` ou `ProductDetails`.

#### `decreaseQuantity`

Reduz a quantidade em 1 e **remove automaticamente** o item quando chega a 0 (via `.filter(i => i.quantity > 0)`).

### Consumo

```tsx
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Adicionar
    </button>
  );
};
```

### Estado do drawer

- **Não persistido** — sempre inicia fechado após reload.
- Controlado por `isDrawerOpen` (booleano).
- Usado em `CartDrawer.tsx` para renderização condicional.
- Integrado com o botão da navbar (`toggleDrawer`) e auto-abertura via `addToCart`.

---

## localStorage — Namespace

Todas as chaves usam o prefixo `@RestaurantApp:`:

| Chave | Conteúdo | Tamanho típico |
|-------|----------|----------------|
| `@RestaurantApp:cart` | JSON de `CartItem[]` | ~1-10 KB |
| `@RestaurantApp:theme` | `"light"` ou `"dark"` | ~6 bytes |

O namespace permite coexistência com outras aplicações no mesmo domínio e facilita limpeza durante desenvolvimento.

### Reset manual (dev)

```js
// No console do browser
localStorage.clear();
location.reload();
```

---

## Fluxos comuns

### 1. Usuário adiciona produto ao carrinho

```
[ProductCard] onClick
      │
      ▼
  addToCart(product)              ← CartContext
      │
      ├── setCartItems(...)       → atualiza estado
      ├── localStorage.setItem    → persiste (via useEffect)
      └── openDrawer()            → isDrawerOpen = true
                                          │
                                          ▼
                                  [CartDrawer] renderiza
                                          │
                                          ▼
                                  Usuário vê item adicionado
```

### 2. Usuário alterna tema

```
[Navigation] toggleTheme click
      │
      ▼
  toggleTheme()                   ← ThemeContext
      │
      ▼
  setThemeState(prev => ...)      → "light" ↔ "dark"
      │
      ▼
  useEffect dispara:
      ├── document.documentElement.classList.{add,remove}("dark")
      └── localStorage.setItem("@RestaurantApp:theme", theme)
      │
      ▼
  Tailwind reage (via `dark:` variants)
```

### 3. Primeira visita

```
index.html (script inline)
      │
      ├── matchMedia prefere dark?  → class="dark" no <html>
      │
      ▼
main.tsx hidrata App
      │
      ▼
ThemeContext inicializa:
      ├── localStorage vazio
      ├── matchMedia detecta SO
      └── setThemeState("dark" | "light")
      │
      ▼
Sem flash (FOUC evitado pelo script inline)
```

---

## Boas práticas

1. **Consumir via hook**: sempre `useCart()` / `useTheme()`, nunca importar o `Context` diretamente.
2. **Não chamar fora do provider**: os hooks lançam erro se usados sem o provider correspondente acima na árvore.
3. **Usar `silent: true`** em chamadas dentro da página `/cart`.
4. **Não manipular `localStorage` diretamente** — deixe os contexts cuidarem disso.
5. **Derivados memoizados**: prefira `cartTotal` e `cartItemsCount` ao invés de recalcular manualmente.
6. **Handlers estáveis**: os métodos (`addToCart`, `toggleTheme`, etc.) são estáveis entre renders (ou usam `useCallback`) e podem ser usados em `useEffect` sem causar re-runs infinitos.

---

## Extendendo o estado

### Adicionar novo campo (ex.: cupom de desconto)

1. Atualize `CartContextType` com o novo campo/método.
2. Adicione estado em `CartProvider`.
3. Exponha via `value` do `<CartContext.Provider>`.
4. Consuma com `useCart()`.

```ts
// Exemplo hipotético
const [coupon, setCoupon] = useState<string | null>(null);

const applyCoupon = (code: string) => { /* ... */ };

// Adicionar ao value:
// coupon, applyCoupon
```

### Migrar para Zustand/Redux (se necessário)

Se o estado crescer significativamente (ex.: >5 domínios, side effects complexos), considere migrar para Zustand:

- Interface parecida (hook `useStore()`)
- Bundle reduzido (~1 KB)
- Devtools opcionais
- Migração incremental (pode coexistir com Context API)

Por enquanto, Context API é suficiente para o escopo do projeto.
