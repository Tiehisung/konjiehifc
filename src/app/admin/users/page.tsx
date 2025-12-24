import { apiConfig } from "@/lib/configs";
import { Users, Shield, Download } from "lucide-react";
import UserTable from "./UserTable";
import { IQueryResponse } from "@/types";
import { IUser } from "@/types/user";
import HEADER from "@/components/Element";
import { DIALOG } from "@/components/Dialog";
import AddUser from "./NewUserForm";
import { Button } from "@/components/buttons/Button";

export const getUsers = async (queryString?: string) => {
  try {
    const url = `${apiConfig.base}/users${queryString || ""}`;

    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

export default async function UsersPage() {
  const users: IQueryResponse<IUser[]> = await getUsers();

  console.log("UsersPage users:", users);

  return (
    <div className="min-h-screen ">
      <HEADER
        title={
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-primary-600" />
            User Management Dashboard
          </h1>
        }
        subtitle="View and manage users authenticated via Google or Credentials"
        isPage
        className="flex flex-wrap items-center justify-between gap-6 text-Orange"
      >
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Users
        </button>
      </HEADER>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-semibold ">User Overview</h2>
            </div>
            <p className="text-muted-foreground">
              All users who have logged in using Google OAuth or traditional
              credentials
            </p>
          </div>

          <DIALOG
            trigger={<Button primaryText="Add New User" />}
            title="Add New User"
          >
            <AddUser />
          </DIALOG>
        </section>

        <UserTable users={users?.data as IUser[]} />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="text-center text-gray-500 text-sm">
            <p>User Management Dashboard • {new Date().getFullYear()}</p>
            <p className="mt-1">
              Showing users authenticated via Google or Credentials
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
