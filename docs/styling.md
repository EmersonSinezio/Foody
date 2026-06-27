# Styling

O Foody usa **Tailwind CSS 3.4** como base de estilização, com `darkMode: "class"` para temas, **Framer Motion 12** para animações e algumas customizações em `tailwind.config.js`.

## Tailwind

### Configuração

**Arquivo**: `tailwind.config.js`

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
    screens: {
      xs: { max: "639px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
```

### Animações customizadas

| Classe | Uso |
|--------|-----|
| `animate-blob` | Blobs flutuantes da Hero (mesh gradient) |
| `animate-steam` | Efeito de vapor (futuro/não utilizado) |
| `animate-shine` | Efeito de brilho deslizante (futuro/não utilizado) |

### Breakpoints

| Nome | Largura | Dispositivo típico |
|------|---------|-------------------|
| `xs` | `< 640px` | Mobile pequeno (iPhone SE) |
| `sm` | `≥ 640px` | Mobile grande |
| `md` | `≥ 768px` | Tablet |
| `lg` | `≥ 1024px` | Desktop pequeno |
| `xl` | `≥ 1280px` | Desktop padrão |
| `2xl` | `≥ 1536px` | Desktop grande |

### CSS global

**Arquivo**: `src/styles/index.css`

- `scroll-behavior: smooth` no `<html>`
- Font smoothing (`antialiased`)
- Scrollbar customizada (cinza translúcida)
- Remove spinners de `<input type="number">`

---

## Dark Mode

### Modo de operação

`darkMode: "class"` — o tema é controlado pela classe `dark` em `<html>`, gerenciada pelo `ThemeContext`.

### Uso no código

Qualquer utility pode ter uma variante escura:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  ...
</div>
```

### Paleta principal

| Cor | Claro | Escuro |
|-----|-------|--------|
| Fundo principal | `bg-white` | `dark:bg-gray-900` |
| Fundo secundário | `bg-gray-50` | `dark:bg-gray-800` |
| Texto principal | `text-gray-900` | `dark:text-white` |
| Texto secundário | `text-gray-600` | `dark:text-gray-300` |
| Destaque | `yellow-500` | `yellow-400` / `yellow-500` |
| Bordas | `border-gray-100` | `dark:border-gray-800` |

### Backdrop blur

O header e o drawer usam `backdrop-blur-md` e `backdrop-blur-sm` respectivamente para efeito "vidro fosco".

---

## Framer Motion

### Padrões de uso

#### 1. Transições simples

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

#### 2. Enter/Exit (AnimatePresence)

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

#### 3. WhileInView (scroll-triggered)

```tsx
<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6 }}
>
```

#### 4. Stagger children

```tsx
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.ul>
```

#### 5. Gestos / hover

```tsx
<motion.img whileHover={{ scale: 1.08 }} transition={{ type: "tween" }} />
```

### Tilt 3D (HeroSection)

Usa `useMotionValue` + `useTransform` para mapear posição do mouse a rotação:

```tsx
const mouseX = useMotionValue(0);
const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

<motion.div style={{ rotateY }} />
```

---

## Ícones

**Biblioteca**: `lucide-react`

Importe **individualmente** para permitir tree-shaking:

```tsx
// ✅ Correto
import { ShoppingCart, Menu, X } from "lucide-react";

// ❌ Errado (importa tudo)
import * as Icons from "lucide-react";
```

Tamanho consistente com a classe `size-N` do Tailwind:

```tsx
<ShoppingCart className="size-5" />
```

---

## Convenções

1. **Mobile-first**: comece com classes base e adicione variantes em breakpoints maiores (`md:`, `lg:`).
2. **Evite classes arbitrárias** (`w-[372px]`) quando possível; use tokens do Tailwind.
3. **Transições**: use `transition-colors`, `transition-all` ou `transition-transform` com durações curtas (`duration-200`, `duration-300`).
4. **Dark mode**: sempre forneça uma variante escura para cores de fundo e texto.
5. **Animações de scroll**: prefira `whileInView` + `viewport={{ once: true }}` ao invés de listeners manuais.
6. **Acessibilidade**: garanta contraste 4.5:1 em ambos os temas. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
