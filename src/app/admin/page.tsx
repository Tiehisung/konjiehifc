import React from "react";
import AdminDashboard from "./Dashboard";
import { apiConfig } from "@/lib/configs";

export const getPlayersStats = async (playerId?: string) => {
  try {
    const route = playerId ? `/${playerId}` : "";
    const response = await fetch(`${apiConfig.base}/stats/players${route}`, {
      cache: "no-cache",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};

export const getMatchesStats = async () => {
  try {
    const response = await fetch(`${apiConfig.base}/stats/matches`, {
      cache: "no-cache",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};

const AdminDashboardPage = async () => {
  const matchesStats = await getMatchesStats();
  const playersStats = await getPlayersStats();

  console.log({ matchesStats, playersStats });
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
