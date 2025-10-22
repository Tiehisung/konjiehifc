import { IQueryResponse } from "@/types";
import React from "react";
import { IPlayer } from "../players/page";
import { getPlayers } from "./players/page";
import AdminDashboard from "./Stats";

const AdminDashboardPage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
