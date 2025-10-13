"use client";

import { ResponsiveModal } from "@/components/modals/Responsive";
import Image from "next/image";
import React from "react";
import TechnicalManagerForm from "./ManagerForm";
import { IManager } from "../page";
import ManagerActionsPopper from "./Actions";
import { useRouter } from "next/navigation";
import { setSearchParams } from "@/lib/searchParams";
import useGetParam from "@/components/Param";
import { MdOutlineGridView } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

export enum ManagerRole {
  TechnicalManager = "Technical manager",
  Coach = "Coach",
  AssistantCoach = "Assistant coach",
  GoalkeeperCoach = "Goalkeeper coach",
  FitnessCoach = "Fitness coach",
  Analyst = "Analyst",
}

const AdminManagers = ({ managers }: { managers: IManager[] }) => {
  const viewStyle = useGetParam("view");
  const router = useRouter();

  // Available portfolios
  const availablePortfolios = Object.values(ManagerRole).filter(
    (port) => !managers.map((mp) => mp.role).includes(port)
  );
  return (
    <div className="px-[2vw] relative">
      <header className="flex items-center p-4 mb-6 h-fit ">
        <ManagersViewSwitch />
        <ResponsiveModal
          modalId="create-manager"
          trigger={"Create manager"}
          triggerStyles="primary__btn px-3 py-1 ml-auto "
        >
          <TechnicalManagerForm availablePortfolios={availablePortfolios} />
        </ResponsiveModal>
      </header>

      <section className="  rounded-3xl p-4 pb-36 ">
        {viewStyle == "list" ? (
          <div className="max-full overflow-x-auto">
            <table className="table">
              <tbody>
                <tr className="_label">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Date signed</th>
                  <th>Contact</th>
                  <th></th>
                </tr>
                {managers?.map((manager, index) => (
                  <tr key={index} className="_borderColor">
                    <td>
                      <Image
                        src={manager?.avatar?.secure_url}
                        width={300}
                        height={300}
                        alt="desc image"
                        className="h-20 w-auto min-w-20 object-cover rounded-md "
                      />
                    </td>
                    <td>{manager.fullname}</td>
                    <td>{manager.role}</td>
                    <td>{manager.dateSigned}</td>
                    <td>{manager.phone}</td>
                    <td>
                      <ManagerActionsPopper
                        manager={manager}
                        availablePortfolios={availablePortfolios}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="flex flex-wrap items-start justify-start gap-10">
            {managers?.map((manager, index: number) => (
              <li
                key={index}
                onClick={() => router.replace("/admin/managers/" + manager._id)}
                className="relative flex flex-col justify-center items-center gap-2 h-96 max-w-sm rounded-md shadow border _borderColor"
              >
                <Image
                  src={manager?.avatar?.secure_url}
                  width={300}
                  height={300}
                  alt="desc image"
                  className="h-56 w-60 grow bg-base-100 object-cover rounded-md"
                />
                <div className=" p-5 space-y-2">
                  <p className="_label text-[grayText] first-letter:uppercase">
                    {manager?.role}
                  </p>
                  <p>{manager?.fullname}</p>
                  <p>
                    <small className="italic">Since</small>{" "}
                    <span>{manager?.dateSigned}</span>
                  </p>
                  <p className="text-teal-400">{manager?.phone}</p>
                </div>
                <div
                  className="absolute top-2 right-2 w-fit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ManagerActionsPopper
                    manager={manager}
                    availablePortfolios={availablePortfolios}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminManagers;

export const ManagersViewSwitch = () => {
  const router = useRouter();
  const handleSwitch = (param: string) => {
    setSearchParams("view", param, router);
  };
  const viewStyle = useGetParam("view");
  return (
    <div className="flex items-center gap-1 p-1 z-10">
      <button
        onClick={() => handleSwitch("list")}
        className={`hover:ring text-xs ${
          viewStyle == "list" ? "ring-2 bg-base-100 rounded p-2" : ""
        }`}
      >
        <CiBoxList />
      </button>
      <button
        onClick={() => handleSwitch("grid")}
        className={`"hover:ring text-xs ${
          viewStyle !== "list" ? "ring-2 bg-base-100 rounded p-2" : ""
        }`}
      >
        <MdOutlineGridView />
      </button>
    </div>
  );
};
