interface TableType {
  id: number;
  number: number;
  seats: number;
  isOccupied: boolean;
}

const Reservation = () => {
  // Mesas
  const tables = [
    { id: 1, number: 1, seats: 4, isOccupied: false },
    { id: 2, number: 2, seats: 4, isOccupied: true },
    { id: 3, number: 3, seats: 4, isOccupied: false },
    { id: 4, number: 4, seats: 4, isOccupied: false },
  ];

  // Posição das cadeiras
  const getChairPosition = (index: number) => {
    const positions = [
      {
        className:
          "top-[-3.5rem] left-1/2 -translate-x-1/2 w-24 h-12 rounded-t-3xl",
      },
      {
        className:
          "bottom-[-3.5rem] left-1/2 -translate-x-1/2 w-24 h-12 rounded-b-3xl",
      },
      {
        className:
          "left-[-3.5rem] top-1/2 -translate-y-1/2 w-12 h-24 rounded-l-3xl",
      },
      {
        className:
          "right-[-3.5rem] top-1/2 -translate-y-1/2 w-12 h-24 rounded-r-3xl",
      },
    ];
    return positions[index % 4];
  };
  // Mesas
  const Table = ({ table }: { table: TableType }) => (
    <div className="relative mx-16 my-20 inline-block group">
      {/* Cadeiras */}
      {[...Array(table.seats)].map((_, i) => (
        <div
          key={i}
          className={`absolute border-2 border-gray-300 transition-all duration-300 ${
            getChairPosition(i).className
          }
            shadow-md hover:shadow-lg hover:brightness-110`}
        />
      ))}

      {/* Mesa principal */}
      <div
        className={`
        w-48 h-48 
        ${table.isOccupied ? "bg-red-500" : "bg-green-500"} 
        rounded-xl flex items-center justify-center 
        text-white font-bold text-xl 
        transition-all duration-300 
        cursor-pointer shadow-lg
        hover:scale-105 hover:shadow-2xl
        relative z-10
      `}
      >
        <span className="drop-shadow-md">Mesa {table.number}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-6">
          🍴 Mapa do Restaurante
        </h1>

        <div className="inline-flex gap-6 p-4 bg-white rounded-xl shadow-md ">
          <div className="flex items-center gap-2 ">
            <div className="w-5 h-5 bg-green-500 rounded-lg" />
            <span className="text-sm font-medium text-gray-700">
              Disponível
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-lg" />
            <span className="text-sm font-medium text-gray-700">Ocupada</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-y-28 ">
          {tables.map((table) => (
            <div
              key={table.id}
              className="md:w-1/2 w-full flex justify-center "
            >
              <Table table={table} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reservation;
