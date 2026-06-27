export type Category =
  | "Oriental"
  | "Lanches"
  | "Pizzas"
  | "Saladas"
  | "Sobremesas"
  | "Bebidas";

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

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

const products: Product[] = [
  // ===== ORIENTAL (4) =====
  {
    id: "1",
    name: "Sushi Combinado",
    price: 49.9,
    description:
      "Salmão fresco, atum e peixe branco. Acompanha wasabi e shoyu.",
    imgSrc: UNSPLASH("photo-1579871494447-9811cf80d66c"),
    category: "Oriental",
    rating: 4.8,
    ingredients: ["Salmão fresco", "Atum", "Peixe branco", "Arroz japonês", "Alga nori", "Wasabi"],
    emoji: "🍣",
  },
  {
    id: "2",
    name: "Temaki de Salmão",
    price: 28.9,
    description:
      "Cone de alga crocante recheado com arroz, salmão fresco e cream cheese.",
    imgSrc: UNSPLASH("photo-1617196034796-73dfa7b1fd56"),
    category: "Oriental",
    rating: 4.7,
    ingredients: ["Salmão fresco", "Arroz japonês", "Alga nori", "Cream cheese"],
    emoji: "🍣",
  },
  {
    id: "3",
    name: "Yakisoba de Frango",
    price: 38.5,
    description:
      "Macarrão oriental salteado com frango, legumes frescos e molho especial da casa.",
    imgSrc: UNSPLASH("photo-1569718212165-3a8278d5f624"),
    category: "Oriental",
    rating: 4.5,
    ingredients: ["Macarrão oriental", "Frango grelhado", "Acelga", "Cenoura", "Molho shoyu"],
    emoji: "🍜",
  },
  {
    id: "4",
    name: "Ramen Tonkotsu",
    price: 44.9,
    description:
      "Caldo cremoso de porco cozido por 12h, macarrão artesanal, chashu e ovo marinado.",
    imgSrc: UNSPLASH("photo-1579584425555-c3ce17fd4351"),
    category: "Oriental",
    rating: 4.9,
    ingredients: ["Caldo tonkotsu", "Macarrão ramen", "Chashu", "Ovo ajitsuke", "Cebolinha", "Nori"],
    emoji: "🍜",
  },

  // ===== LANCHES (4) =====
  {
    id: "5",
    name: "Hambúrguer Artesanal",
    price: 35.9,
    description:
      "Blend de costela 180g, queijo cheddar, bacon artesanal e molho da casa.",
    imgSrc: UNSPLASH("photo-1568901346375-23c9450c58cd"),
    category: "Lanches",
    rating: 4.9,
    ingredients: ["Blend de costela 180g", "Cheddar", "Bacon artesanal", "Pão brioche", "Molho da casa"],
    emoji: "🍔",
  },
  {
    id: "6",
    name: "X-Bacon Duplo",
    price: 42.0,
    description:
      "Dois smash burgers 90g, bacon crocante, queijo prato derretido e maionese defumada.",
    imgSrc: UNSPLASH("photo-1550547660-d9450f859349"),
    category: "Lanches",
    rating: 4.8,
    ingredients: ["Smash burger 90g (x2)", "Bacon crocante", "Queijo prato", "Pão australiano", "Maionese defumada"],
    emoji: "🍔",
  },
  {
    id: "7",
    name: "Wrap de Frango",
    price: 29.9,
    description:
      "Tortilha integral com frango grelhado, alface, tomate e molho ranch.",
    imgSrc: UNSPLASH("photo-1571091718767-18b5b1457add"),
    category: "Lanches",
    rating: 4.4,
    ingredients: ["Tortilha integral", "Frango grelhado", "Alface americana", "Tomate", "Molho ranch"],
    emoji: "🌯",
  },
  {
    id: "8",
    name: "Club Sandwich",
    price: 32.5,
    description:
      "Pão de forma tostado, peito de peru, queijo, ovo, alface, tomate e maionese.",
    imgSrc: UNSPLASH("photo-1586816001966-79b736744398"),
    category: "Lanches",
    rating: 4.6,
    ingredients: ["Pão de forma", "Peito de peru", "Queijo prato", "Ovo", "Alface", "Tomate"],
    emoji: "🥪",
  },

  // ===== PIZZAS (4) =====
  {
    id: "9",
    name: "Pizza Pepperoni",
    price: 55.5,
    description:
      "Massa de longa fermentação, molho pelati, muçarela e pepperoni premium.",
    imgSrc: UNSPLASH("photo-1565299624946-b28f40a0ae38"),
    category: "Pizzas",
    rating: 4.7,
    ingredients: ["Massa de longa fermentação", "Molho pelati", "Muçarela", "Pepperoni", "Orégano"],
    emoji: "🍕",
  },
  {
    id: "10",
    name: "Pizza Margherita",
    price: 49.9,
    description:
      "Massa fina, molho de tomate San Marzano, muçarela de búfala e manjericão fresco.",
    imgSrc: UNSPLASH("photo-1574071318508-1cdbab80d002"),
    category: "Pizzas",
    rating: 4.6,
    ingredients: ["Massa fina", "Tomate San Marzano", "Muçarela de búfala", "Manjericão fresco", "Azeite extra virgem"],
    emoji: "🍕",
  },
  {
    id: "11",
    name: "Pizza Quatro Queijos",
    price: 58.0,
    description:
      "Muçarela, gorgonzola, parmesão e catupiry sobre massa artesanal crocante.",
    imgSrc: UNSPLASH("photo-1513104890138-7c749659a591"),
    category: "Pizzas",
    rating: 4.8,
    ingredients: ["Muçarela", "Gorgonzola", "Parmesão", "Catupiry", "Massa artesanal"],
    emoji: "🍕",
  },
  {
    id: "12",
    name: "Pizza Calabresa",
    price: 46.9,
    description:
      "Calabresa artesanal fatiada, cebola roxa, azeitonas e orégano fresco.",
    imgSrc: UNSPLASH("photo-1604382354936-07c5d9983bd3"),
    category: "Pizzas",
    rating: 4.5,
    ingredients: ["Calabresa artesanal", "Cebola roxa", "Azeitonas pretas", "Muçarela", "Orégano"],
    emoji: "🍕",
  },

  // ===== SALADAS (3) =====
  {
    id: "13",
    name: "Salada Caesar",
    price: 28.9,
    description:
      "Alface romana, croutons artesanais, parmesão e molho caesar da casa.",
    imgSrc: UNSPLASH("photo-1512621776951-a57141f2eefd"),
    category: "Saladas",
    rating: 4.5,
    ingredients: ["Alface romana", "Croutons", "Parmesão", "Molho caesar", "Anchovas"],
    emoji: "🥗",
  },
  {
    id: "14",
    name: "Salada Tropical",
    price: 26.5,
    description:
      "Mix de folhas, manga, abacate, nozes caramelizadas e vinagrete de maracujá.",
    imgSrc: UNSPLASH("photo-1540420773420-3366772f4999"),
    category: "Saladas",
    rating: 4.7,
    ingredients: ["Mix de folhas", "Manga", "Abacate", "Nozes caramelizadas", "Vinagrete de maracujá"],
    emoji: "🥗",
  },
  {
    id: "15",
    name: "Bowl Proteico",
    price: 34.9,
    description:
      "Quinoa, frango grelhado, grão-de-bico, legumes assados e molho tahine.",
    imgSrc: UNSPLASH("photo-1607532941433-304659e8198a"),
    category: "Saladas",
    rating: 4.8,
    ingredients: ["Quinoa", "Frango grelhado", "Grão-de-bico", "Legumes assados", "Molho tahine"],
    emoji: "🥗",
  },

  // ===== SOBREMESAS (3) =====
  {
    id: "16",
    name: "Petit Gateau",
    price: 24.9,
    description:
      "Bolinho quente de chocolate belga com sorvete de creme e calda de frutas vermelhas.",
    imgSrc: UNSPLASH("photo-1551024601-bec78aea704b"),
    category: "Sobremesas",
    rating: 4.9,
    ingredients: ["Chocolate belga 70%", "Farinha de trigo", "Ovos caipiras", "Sorvete de creme", "Calda de frutas vermelhas"],
    emoji: "🍰",
  },
  {
    id: "17",
    name: "Cheesecake de Frutas Vermelhas",
    price: 22.5,
    description:
      "Base crocante de biscoito, creme de cream cheese e calda artesanal.",
    imgSrc: UNSPLASH("photo-1587314168485-3236d6710814"),
    category: "Sobremesas",
    rating: 4.7,
    ingredients: ["Cream cheese", "Biscoito amanteigado", "Frutas vermelhas", "Açúcar refinado", "Baunilha"],
    emoji: "🍰",
  },
  {
    id: "18",
    name: "Tiramisu Clássico",
    price: 23.9,
    description:
      "Camadas de biscoito champagne, café espresso, creme mascarpone e cacau.",
    imgSrc: UNSPLASH("photo-1563805042-7684c019e1cb"),
    category: "Sobremesas",
    rating: 4.8,
    ingredients: ["Biscoito champagne", "Café espresso", "Mascarpone", "Ovos", "Cacau em pó"],
    emoji: "🍰",
  },

  // ===== BEBIDAS (3) =====
  {
    id: "19",
    name: "Suco Natural",
    price: 12.9,
    description:
      "Suco de fruta da estação, preparado na hora sem adição de açúcar refinado.",
    imgSrc: UNSPLASH("photo-1544145945-f90425340c7e"),
    category: "Bebidas",
    rating: 4.3,
    ingredients: ["Frutas da estação", "Água filtrada", "Gelo"],
    emoji: "🥤",
  },
  {
    id: "20",
    name: "Limonada Suíça",
    price: 14.5,
    description:
      "Limão siciliano batido com leite condensado e hortelã fresca.",
    imgSrc: UNSPLASH("photo-1558642452-9d2a7deb7f62"),
    category: "Bebidas",
    rating: 4.6,
    ingredients: ["Limão siciliano", "Leite condensado", "Hortelã", "Gelo"],
    emoji: "🍋",
  },
  {
    id: "21",
    name: "Milkshake de Ovomaltine",
    price: 18.9,
    description:
      "Sorvete de creme, leite gelado e muito ovomaltine crocante.",
    imgSrc: UNSPLASH("photo-1534353473418-4cfa6c56fd38"),
    category: "Bebidas",
    rating: 4.9,
    ingredients: ["Sorvete de creme", "Leite", "Ovomaltine", "Chantilly", "Calda de chocolate"],
    emoji: "🥤",
  },
];

export default products;
