import React, { useState, useEffect } from "react";

const Reserves: React.FC = () => {
  // Estado para armazenar o número de pessoas por mesa
  const [mesaPessoas, setMesaPessoas] = useState<number[]>([]);

  // Gerar o número de pessoas aleatório entre 2, 4 e 6 para cada mesa
  useEffect(() => {
    const generatePessoas = () => {
      return Array.from(
        { length: 9 },
        () => [2, 4, 6][Math.floor(Math.random() * 3)]
      );
    };
    setMesaPessoas(generatePessoas());
  }, []);

  function activate(parentDiv: HTMLElement, button: HTMLElement) {
    // Modificar o botão
    button.className = "hidden";

    // Modificar a div pai
    parentDiv.className =
      "w-56 h-40 border-2 bg-yellow-400 rounded-lg flex items-center justify-center flex-col ease-in duration-300 transform scale-105";

    // Modificar o span
    const span = parentDiv.querySelector("span");
    if (span) {
      span.textContent = "Indisponível"; // Atualiza o texto
      span.className =
        "text-bold my-4 bg-yellow-800 text-sm px-3 py-0.5 rounded-full mx-2"; // Atualiza o estilo
    }
  }

  return (
    <div className="w-2/3 h-[80%] flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-56 h-40 border-2 border-gray-400 rounded-lg flex items-center justify-center flex-col"
          >
            <h1 className="text-2xl my-4 dark:text-white">
              Mesa - <span className="text-yellow-600">{i + 1}</span>
            </h1>
            <span className="text-bold text-sm  dark:text-white">
              Mesa para {mesaPessoas[i]} pessoas
            </span>
            <button
              className="text-sm px-4 py-1 my-4 rounded-lg bg-yellow-300 hover:bg-yellow-200 ease-in duration-300"
              onClick={(e) => {
                activate(e.currentTarget.parentElement!, e.currentTarget);
              }}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserves;
