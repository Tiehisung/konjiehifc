import { IQueryResponse } from "@/types";
import React from "react";
import { IPlayer } from "../players/page";
import { getPlayers } from "./players/page";
import AdminDashboard from "./Stats";
import NewSquad from "./squad/NewSquad";

const AdminDashboardPage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  return (
    <div>
      <AdminDashboard />
      <NewSquad players={players?.data} />
    </div>
  );
};

export default AdminDashboardPage;
