import React from "react";
import products from "../data/products.ts";

const Cards: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-[100% ]">
        <div className="flex items-center justify-center w-[90%] rounded-md mt-4 mx-2 ">
          <a
            href="#"
            className="group relative block overflow-hidden w-96 bg-gray-100"
          >
            <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span className="sr-only">Wishlist</span>

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
              src={products[0].imgSrc}
              alt=""
              className="h-56 object-cover transition duration-500 group-hover:scale-105 sm:h-56"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                New
              </span>

              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {products[0].name}
              </h3>

              <p className="mt-1.5 text-sm text-gray-700">
                {products[0].price}
              </p>

              <form className="mt-4">
                <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                  Add to Cart
                </button>
              </form>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-center w-[90%] rounded-md mt-4 mx-2">
          <a
            href="#"
            className="group relative block overflow-hidden w-96 bg-gray-100"
          >
            <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span className="sr-only">Wishlist</span>

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
              src={products[1].imgSrc}
              alt=""
              className="h-56 mx-auto object-cover transition duration-500 group-hover:scale-105 sm:h-56 "
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                {" "}
                New{" "}
              </span>

              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {products[1].name}
              </h3>

              <p className="mt-1.5 text-sm text-gray-700">
                {products[1].price}
              </p>

              <form className="mt-4">
                <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                  Add to Cart
                </button>
              </form>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-center w-[90%] rounded-md mt-4">
          <a
            href="#"
            className="group relative block overflow-hidden w-96 bg-gray-100"
          >
            <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span className="sr-only">Wishlist</span>

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
              src={products[2].imgSrc}
              alt=""
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                {" "}
                New{" "}
              </span>

              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {products[2].name}
              </h3>

              <p className="mt-1.5 text-sm text-gray-700">
                {products[2].price}
              </p>

              <form className="mt-4">
                <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                  Add to Cart
                </button>
              </form>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cards;
