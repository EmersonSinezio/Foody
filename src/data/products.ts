// src/data/products.ts
export interface Product {
  name: string;
  price: string;
  description: string;
  imgSrc: string;
  category: string;
}

const products: Product[] = [
  {
    name: "Suchi",
    price: "$14.99",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quos.",
    imgSrc:
      "https://static.vecteezy.com/system/resources/thumbnails/025/067/612/small/sushi-with-ai-generated-free-png.png",
    category: "./assets/star.png",
  },
  {
    name: "Hamburguer",
    price: "$29.90",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quos.",
    imgSrc:
      "https://png.pngtree.com/png-clipart/20231017/original/pngtree-burger-food-png-free-download-png-image_13329455.png",
    category: "⭐⭐⭐⭐",
  },
  {
    name: "Pizza",
    price: "$27.50",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quos.",
    imgSrc:
      "https://static.vecteezy.com/system/resources/thumbnails/045/383/391/small/a-cheesy-delicious-pizza-with-tasty-pepperoni-on-a-transparent-background-png.png",
    category: "⭐⭐⭐⭐",
  },
];

export default products;
