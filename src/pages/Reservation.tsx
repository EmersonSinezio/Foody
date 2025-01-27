import React from "react";
import Reserves from "../components/Reserves";

const Reservation: React.FC = () => {
  return (
    <div className="w-[100vw] h-[90vh] flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Mesas disponíveis</h1>
      <Reserves />
    </div>
  );
};

export default Reservation;
