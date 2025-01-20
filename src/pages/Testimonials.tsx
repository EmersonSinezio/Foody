import React, { useState, useEffect } from "react";
type SvgIconProps = {
  className?: string;
  isActive?: boolean; // Para aplicar a classe da estrela ativa
};

const SvgIcon: React.FC<SvgIconProps> = ({
  className = "size-5",
  isActive,
}) => (
  <svg
    className={`${className} ${isActive ? "animate-star" : ""}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Testimonials: React.FC = () => {
  const [activeStar, setActiveStar] = useState(0); // Controle da estrela ativa
  const stars = [0, 1, 2, 3, 4]; // Índices das estrelas

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStar((prev) => (prev + 1) % stars.length);
    }, 500); // Troca a cada 500ms
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [stars.length]);
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto sm:px-6 lg:px-8 lg:py-8">
          <div className="md:flex md:items-end md:justify-between">
            <div className="max-w-full ml-8">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Read trusted reviews from our customers
              </h2>

              <p className="mt-6 max-w-lg leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur praesentium natus sapiente commodi. Aliquid sunt
                tempore iste repellendus explicabo dignissimos placeat, autem
                harum dolore reprehenderit quis! Quo totam dignissimos earum.
              </p>
            </div>

            <a
              href="#"
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-yellow-600 px-5 py-3 text-yellow-600 transition hover:bg-yellow-600 hover:text-white md:mt-0"
            >
              <span className="font-medium"> Read all reviews </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-lg sm:p-8">
              {/* TODO: ARRUMAR OS ICONES DE STAR E CRIAR UMA ANIMAÇÃO PARA ELAS */}
              <div>
                {/* Icones de estrelas */}
                <div className="flex gap-0.5 text-green-500" id="rating">
                  {stars.map((star, index) => (
                    <SvgIcon key={index} isActive={index === activeStar} />
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-yellow-600 sm:text-3xl">
                    Stayin' Alive
                  </p>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    No, Rose, they are not breathing. And they have no arms or
                    legs … Where are they? You know what? If we come across
                    somebody with no arms or legs, do we bother resuscitating
                    them? I mean, what quality of life do we have there?
                  </p>
                </div>
              </div>

              <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                &mdash; Michael Scott
              </footer>
            </blockquote>

            <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-lg sm:p-8">
              <div>
                <div className="flex gap-0.5 text-green-500" id="rating">
                  {stars.map((star, index) => (
                    <SvgIcon key={index} isActive={index === activeStar} />
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-yellow-600 sm:text-3xl">
                    Stayin' Alive
                  </p>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    No, Rose, they are not breathing. And they have no arms or
                    legs … Where are they? You know what? If we come across
                    somebody with no arms or legs, do we bother resuscitating
                    them? I mean, what quality of life do we have there?
                  </p>
                </div>
              </div>

              <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                &mdash; Michael Scott
              </footer>
            </blockquote>

            <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-lg sm:p-8">
              <div>
                <div className="flex gap-0.5 text-green-500" id="rating">
                  {stars.map((star, index) => (
                    <SvgIcon key={index} isActive={index === activeStar} />
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-yellow-600 sm:text-3xl">
                    Stayin' Alive
                  </p>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    No, Rose, they are not breathing. And they have no arms or
                    legs … Where are they? You know what? If we come across
                    somebody with no arms or legs, do we bother resuscitating
                    them? I mean, what quality of life do we have there?
                  </p>
                </div>
              </div>

              <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                &mdash; Michael Scott
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
