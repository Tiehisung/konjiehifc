import AdminDashboard from "./Dashboard";
import { apiConfig } from "@/lib/configs";
import { auth } from "@/auth";

export async function getSessionUser() {
  const session = await auth(); // works in server context
  if (!session?.user) return null;

  return session.user; // contains id, name, email, image, etc.
}

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


export const getMetrics = async () => {
  try {
    const response = await fetch(`${apiConfig.base}/metrics`, {
      cache: "no-cache",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};
const AdminDashboardPage = async () => {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
