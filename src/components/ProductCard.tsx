import React from "react";
import Cards from "./Cards";
const ProductCard: React.FC = () => {
  return (
    <div className="h-[100vh] mt-[20vh]">
      {/* Barra de pesquisa */}
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-700 rounded-lg bg-transparent"
            placeholder="Pesquisar sua comida favorita"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 duration-300 transition-all ease-in-out"
          >
            Buscar
          </button>
        </div>
      </form>
      {/* Produtos */}
      <div>
        <h1 className="text-2xl font-bold mt-5 mx-2">Principais produtos</h1>
        <Cards />
        <h1 className="text-2xl font-bold mt-5 mx-2">Mais vendidos</h1>
        <Cards />
      </div>
    </div>
  );
};

export default ProductCard;
