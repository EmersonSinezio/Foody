import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100vw",
        height: "calc(100vh - 64px)",
      }}
    >
      <div className="w-1/2 h-full flex items-center justify-center flex-col">
        <h1 className="text-5xl w-2/3 text-justify">
          Escolha a sua <br />
          comida <span className="text-yellow-600">favorita</span>
        </h1>
        <p className="w-2/3 my-6 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla alias
          sunt aliquid minima ea quia repellat voluptates, laborum earum
          explicabo?
        </p>
        <div className="w-1/2 flex justify-around align-middle">
          <Link
            className="group relative inline-block text-sm font-medium text-yellow-600 focus:outline-none focus:ring active:text-yellow-500"
            to="/contato"
          >
            <span className="absolute inset-0 border border-current"></span>
            <span className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              Contato
            </span>
          </Link>
          <Link
            className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring mx-2"
            to="/products"
          >
            <span className="absolute inset-0 border border-yellow-600 group-active:border-yellow-500"></span>
            <span className="block border border-yellow-600 bg-yellow-600 px-12 py-3 transition-transform active:border-yellow-500 active:bg-yellow-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
              Ver cardapio
            </span>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* Fundo da img */}
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "70%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "400px",
              backgroundColor: "#ffcc00",
              borderRadius: "1rem 8rem 1rem 8rem",
              zIndex: 0,
            }}
          ></div>

          {/* Imagem */}
          <img
            src="./assets/burger.png"
            alt="burger.png"
            style={{
              transform: "rotate(-14deg)",
              position: "relative", // Mantém a imagem acima do fundo
              zIndex: 1,
            }}
            className="drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
