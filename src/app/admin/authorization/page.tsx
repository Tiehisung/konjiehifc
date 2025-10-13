import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { apiConfig } from "@/lib/configs";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import AdminsActionsPopper, { IAdminSession } from "./Actions";
import { ResponsiveModal } from "@/components/modals/Responsive";
import CreateAdmin from "./CreateAdmin";
import { getFormattedDate } from "@/lib/timeAndDate";
import BackBtn from "@/components/buttons/BackBtn";

export const getAdmins = async (id?: string) => {
  if (id) {
    const resp = await fetch(apiConfig.admins + "/" + id, {
      cache: "no-cache",
    });
    const admin = await resp.json();
    return admin;
  }
  const resp = await fetch(apiConfig.admins, {
    cache: "no-cache",
  });
  const admins = await resp.json();
  return admins;
};

const AuthorizationPage = async () => {
  const session: IAdminSession | null = await getServerSession(authOptions);

  const admins: IAdminProps[] = await getAdmins();

  if (session?.user?.role !== "super_admin")
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You do not have the necessary permissions to access this page.
          </p>

          <BackBtn label="Return" />
        </div>
      </div>
    );
  return (
    <div>
      <header className="flex px-5 pt-4">
        <ResponsiveModal
          modalId="create-admin"
          trigger="Create admin"
          triggerStyles="primary__btn p-2 text-sm ml-auto "
        >
          <CreateAdmin />
        </ResponsiveModal>
      </header>
      <div className="max-full overflow-x-auto pb-40 px-[4%]">
        <table className="table">
          <caption>Authorized system administrators</caption>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Details</th>
              <th></th>

              <th></th>
            </tr>
            {admins?.map((admin, index) => (
              <tr
                key={index}
                className={`border-gray-300 ${
                  !admin.isActive ? "line-through opacity-75" : ""
                }`}
              >
                <td>
                  <Image
                    src={admin.image}
                    width={300}
                    height={300}
                    alt="desc image"
                    className="h-16 w-16 min-w-16 rounded-full bg-slate-50"
                  />
                </td>
                <td>
                  <p className="_label"> {admin.name}</p>
                  <p
                    className={`badge capitalize font-light ${
                      admin.role == "super_admin"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {admin.role.replace("_", " ")}
                  </p>
                  <time className="border-l px-2 ml-2 italic">
                    {getFormattedDate(admin.dateEngaged ?? admin.createdAt)}
                  </time>
                </td>
                <td className="font-light">{admin.email}</td>
                <td>
                  <AdminsActionsPopper admin={admin} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorizationPage;

export interface IAdminProps {
  isActive: boolean;
  _id: string;
  role: "admin" | "super_admin";
  dateEngaged: string;
  name: string;
  email: string;
  password?: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}
