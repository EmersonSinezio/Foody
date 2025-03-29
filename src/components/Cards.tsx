import React from "react";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";

interface CardsProps {
  products: Product[];
}

const Cards: React.FC<CardsProps> = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="w-full h-full dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-[80%] mx-auto  h-[100%] pb-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-[90%]  mt-4 mx-2"
          >
            <div className="group relative block overflow-hidden w-96 h-[28rem]  rounded-md border border-gray-100">
              <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                <span className="sr-only">Wishlist</span>
                {/* Ícone de wishlist */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <img
                src={product.imgSrc}
                alt={product.name}
                className="h-[15rem] object-cover m-auto transition duration-500 group-hover:scale-105 py-8 xs:py-16"
              />

              <div className="relative  bg-white p-6 border-t border-t-gray-100">
                <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium ">
                  New
                </span>

                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">{product.price}</p>

                <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                  <button
                    type="button"
                    className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
