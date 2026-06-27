# Data Model

O Foody não tem backend — todos os dados vivem em arquivos TypeScript tipados em `src/data/`. Este documento descreve o schema oficial.

## Product

**Arquivo**: `src/data/products.ts`

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imgSrc: string;
  category: Category;
  rating: number;
  ingredients: string[];
  emoji: string;
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | `string` | Identificador único. Atualmente numérico como string (`"1"`, `"2"`, ...). |
| `name` | `string` | Nome do prato. |
| `price` | `number` | Preço em reais (BRL). Formatado via `formatCurrency`. |
| `description` | `string` | Descrição curta (1-2 frases). |
| `imgSrc` | `string` | URL absoluta da imagem (Unsplash). |
| `category` | `Category` | Categoria do produto (enum de strings). |
| `rating` | `number` | Avaliação de 0 a 5. Usado para ordenar "Mais Vendidos". |
| `ingredients` | `string[]` | Lista de ingredientes. Exibido em `/product/:id`. |
| `emoji` | `string` | Emoji de fallback caso a imagem falhe (`🍣`, `🍔`, etc.). |

## Category

```ts
export type Category =
  | "Oriental"
  | "Lanches"
  | "Pizzas"
  | "Saladas"
  | "Sobremesas"
  | "Bebidas";
```

### Distribuição (~21 produtos)

| Categoria | Quantidade | Emoji |
|-----------|------------|-------|
| Oriental | 4 | 🍣 / 🍜 |
| Lanches | 4 | 🍔 / 🌯 / 🥪 |
| Pizzas | 4 | 🍕 |
| Saladas | 3 | 🥗 |
| Sobremesas | 3 | 🍰 |
| Bebidas | 3 | 🥤 / 🍋 |

## CartItem

**Arquivo**: `src/contexts/CartContext.tsx`

```ts
interface CartItem {
  product: Product;
  quantity: number;
}
```

Não é exportado — é um tipo interno do contexto. Para tipar código externo, use `ReturnType<typeof useCart>["cartItems"][number]`.

## Imagens

### Padrão Unsplash

```ts
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;
```

- `w=600`: limita largura para performance
- `q=80`: qualidade 80% (bom equilíbrio tamanho/qualidade)
- `auto=format`: Unsplash escolhe WebP/AVIF se suportado
- `fit=crop`: mantém proporção

### Imagens locais (hero)

A hero usa PNGs locais em `/public/assets/`:

- `/assets/burger.png`
- `/assets/sushi.png`
- `/assets/pizza.png`

Essas imagens têm fundo transparente e são otimizadas para a seção hero.

### Fallback de imagem

No componente de imagem, o `onError` substitui a imagem por um div com o emoji do produto:

```tsx
<img
  src={product.imgSrc}
  alt={product.name}
  onError={(e) => {
    const t = e.target as HTMLImageElement;
    t.style.display = "none";
    // insere div com emoji do produto
  }}
/>
```

## Utilitários

### `formatCurrency`

**Arquivo**: `src/utils/format.ts`

```ts
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
```

Exemplo: `formatCurrency(49.9)` → `"R$ 49,90"`

## Adicionando um novo produto

1. Abra `src/data/products.ts`
2. Adicione um novo objeto no array `products`:

```ts
{
  id: "22",
  name: "Nome do Prato",
  price: 39.9,
  description: "Descrição curta e apetitosa.",
  imgSrc: UNSPLASH("photo-XXXXXXXXXX-XXXX"),
  category: "Lanches",
  rating: 4.6,
  ingredients: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"],
  emoji: "🍔",
}
```

3. Valide a URL da imagem abrindo-a no navegador.
4. O produto aparecerá automaticamente em `/products`, filtros de categoria e (se tiver rating alto) em `BestSellersSection`.

## Validações

Não há validação em runtime — confia-se que os dados em `products.ts` estão corretos. Recomenda-se:

- IDs únicos (strings)
- `rating` entre 0 e 5
- `price` > 0
- `ingredients` com pelo menos 1 item
- URL Unsplash válida (testar manualmente)
