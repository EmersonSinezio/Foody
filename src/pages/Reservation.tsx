import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Check, X, Calendar, Clock, Info } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

interface Table {
  id: number;
  number: number;
  seats: number;
  isOccupied: boolean;
}

const initialTables: Table[] = [
  { id: 1, number: 1, seats: 2, isOccupied: false },
  { id: 2, number: 2, seats: 4, isOccupied: true },
  { id: 3, number: 3, seats: 4, isOccupied: false },
  { id: 4, number: 4, seats: 6, isOccupied: true },
  { id: 5, number: 5, seats: 2, isOccupied: false },
  { id: 6, number: 6, seats: 8, isOccupied: false },
];

const Reservation: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const handleTableClick = (table: Table) => {
    if (table.isOccupied) {
      toast.info(`A mesa ${table.number} já está ocupada.`, {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }
    setSelectedTable(table);
  };

  const handleReserve = () => {
    if (!selectedTable) return;
    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTable.id ? { ...t, isOccupied: true } : t
      )
    );
    toast.success(`Mesa ${selectedTable.number} reservada com sucesso!`, {
      position: "bottom-right",
      theme: "colored",
    });
    setSelectedTable(null);
  };

  const availableCount = tables.filter((t) => !t.isOccupied).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <ToastContainer autoClose={3000} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">
            <Calendar className="inline size-4 mr-1" />
            Reservas
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Mapa do Restaurante
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Selecione uma mesa disponível para fazer sua reserva. Mesas em verde
            estão livres, em vermelho já estão ocupadas.
          </p>
        </motion.div>

        {/* Legenda e stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-lg" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Disponível ({availableCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-lg" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Ocupada ({tables.length - availableCount})
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Info className="size-4" />
            <span className="text-sm">Clique em uma mesa livre para reservar</span>
          </div>
        </motion.div>

        {/* Grid de mesas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tables.map((table, index) => (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={
                  !table.isOccupied
                    ? { scale: 1.05, y: -4 }
                    : { scale: 1 }
                }
                whileTap={!table.isOccupied ? { scale: 0.98 } : {}}
                onClick={() => handleTableClick(table)}
                disabled={table.isOccupied}
                className={`relative w-full max-w-xs aspect-square rounded-2xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
                  table.isOccupied
                    ? "bg-gradient-to-br from-red-500 to-red-600 cursor-not-allowed opacity-80"
                    : selectedTable?.id === table.id
                    ? "bg-gradient-to-br from-yellow-500 to-orange-500 ring-4 ring-yellow-300 dark:ring-yellow-700"
                    : "bg-gradient-to-br from-green-500 to-emerald-600 cursor-pointer hover:shadow-2xl"
                }`}
              >
                <div className="text-white text-5xl font-black mb-2 drop-shadow-md">
                  {table.number}
                </div>
                <div className="text-white/90 text-sm font-medium mb-3">
                  Mesa
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  <Users className="size-3.5" />
                  {table.seats} {table.seats === 1 ? "lugar" : "lugares"}
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  {table.isOccupied ? (
                    <X className="size-4 text-white" />
                  ) : (
                    <Check className="size-4 text-white" />
                  )}
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Painel de reserva */}
        <AnimatePresence>
          {selectedTable && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-black text-yellow-600 dark:text-yellow-400">
                    {selectedTable.number}
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Mesa {selectedTable.number}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-4" />
                      {selectedTable.seats} lugares
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-4" />
                      Reserva por 2 horas
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReserve}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-colors shadow-md shadow-yellow-500/30"
                  >
                    <Check className="size-4" />
                    Confirmar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Reservation;
