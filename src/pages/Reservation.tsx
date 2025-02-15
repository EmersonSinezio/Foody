import React from "react";
import Reserves from "../components/Reserves";

const Reservation: React.FC = () => {
  return (
    <div className="w-[100%] h-[90vh] m-0 p-0 flex items-center justify-center flex-col dark:bg-gray-900 ">
      <h1 className="text-3xl font-bold dark:text-white">Mesas disponíveis</h1>
      <Reserves />
    </div>
  );
};

export default Reservation;
