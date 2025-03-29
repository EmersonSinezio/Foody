import { Link } from "react-router-dom";
const Home = () => {
  return (
    // div container
    <div className="flex items-center justify-center w-full h-[89vh] bg-slate-50 dark:bg-gray-900">
      <div className="w-1/2 h-full flex items-center justify-center flex-col">
        {/* div do texto */}
        <h1 className="text-3xl w-screen px-16 md:px-0 md:text-4xl md:w-2/3 md:text-justify dark:text-white">
          Escolha a sua <br />
          comida <span className="text-yellow-600">favorita</span>
        </h1>
        <p className="w-screen px-16 md:px-0 md:w-2/3 my-6 text-sm md:text-base md:text-justify dark:text-white ">
          Descubra uma experiência gastronômica única com pratos preparados com
          ingredientes frescos e muito sabor. Aqui, você encontra opções que
          agradam a todos os paladares, do tradicional ao inovador.
        </p>

        {/* div dos botoes */}
        <div className="w-screen justify-center md:w-2/3 flex align-middle gap-2">
          <Link
            to={"/contact"}
            className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-3 text-yellow-600 focus:ring-3 focus:outline-hidden border-[#FF6E4A]"
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="size-5 shadow-sm rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:me-4">
              {" "}
              Contato{" "}
            </span>
          </Link>
          <Link
            className="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#FF6E4A] px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            to={"/products"}
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="size-5 shadow-sm rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:me-4">
              {" "}
              Cardapio{" "}
            </span>
          </Link>
        </div>
      </div>

      {/* div da imagem */}
      <div className="w-1/2 h-full hidden md:flex items-center justify-center md:w-2/3 md:h-2/3 ">
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* Fundo da img */}
          <div className="absolute top-[35%] left-[70%] -translate-x-1/2 -translate-y-1/2 bg-[#ffcc00] rounded-[1rem_8rem_1rem_8rem] z-0 w-[15rem] h-[15rem] md:h-[20rem] md:w-[20rem] md:left-[60%]"></div>

          {/* Imagem */}
          <img
            src="./assets/burger.png"
            alt="burger.png"
            style={{
              transform: "rotate(-14deg)",
              position: "relative", // Mantém a imagem acima do fundo
              zIndex: 1,
            }}
            className="drop-shadow-2xl md:w-2/3 md:h-2/3"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
