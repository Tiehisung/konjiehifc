"use client";

import Image from "next/image";
import React from "react";
import { getAvailableManagerialRoles, IManager } from "./page";
import ManagerActionsPopper from "./Actions";
import { useRouter } from "next/navigation";
import { setSearchParams } from "@/lib/searchParams";
import useGetParam from "@/components/Param";
import { MdOutlineGridView } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { staticImages } from "@/assets/images";
import { DisplayType } from "@/components/DisplayStyle";
import { getFormattedDate, getTimeLeftOrAgo } from "@/lib/timeAndDate";

const AdminManagers = ({ managers }: { managers?: IManager[] }) => {
  const viewStyle = useGetParam("display");
  const router = useRouter();

  const availableRoles = getAvailableManagerialRoles(managers);
  return (
    <div className="px-[2vw] relative ">
      <section className="  rounded-3xl p-4 pb-36 ">
        <DisplayType defaultDisplay={"grid"} />
        <hr className="my-4" />
        {viewStyle == "list" ? (
          <div className="max-full overflow-x-auto mx-auto">
            <table className="table w-full border border-primary/60">
              <tbody>
                <tr className="_label text-nowrap text-left bg-muted text-muted-foreground h-12 uppercase ">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Date signed</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2"></th>
                </tr>
                {managers?.map((manager, index) => (
                  <tr key={index} className="border-primary/60 border-b ">
                    <td className="px-4 py-2">
                      <Image
                        src={manager?.avatar ?? staticImages.avatar}
                        width={300}
                        height={300}
                        alt="desc image"
                        className="h-20 w-auto aspect-square min-w-20 object-cover rounded-md bg-accent "
                      />
                    </td>
                    <td className="px-4 py-2">{manager?.fullname}</td>
                    <td className="px-4 py-2">{manager?.role}</td>
                    <td className="px-4 py-2">{manager?.dateSigned}</td>
                    <td className="px-4 py-2">{manager?.phone}</td>
                    <td className="px-4 py-2">
                      <ManagerActionsPopper
                        manager={manager}
                        availableRoles={availableRoles}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="flex flex-wrap items-start justify-start gap-10 mx-auto w-full ">
            {managers?.map((manager, index: number) => (
              <li
                key={index}
                onClick={() =>
                  router.replace(`/admin/managers/${manager?._id}`)
                }
                className="relative flex flex-col justify-center items-center gap-2 h-96 max-w-sm rounded-md shadow border _borderColor bg-secondary"
              >
                <Image
                  src={manager?.avatar ?? staticImages.avatar}
                  width={300}
                  height={300}
                  alt="desc image"
                  className="h-56 w-60 grow object-cover rounded-md"
                />
                <div className=" p-5 space-y-2">
                  <p className="_label text-[grayText] first-letter:uppercase">
                    {manager?.role}
                  </p>
                  <p>{manager?.fullname}</p>
                  <p>
                    <small className="italic">Since</small>{" "}
                    <span>
                      {getFormattedDate(manager?.dateSigned, "March 2, 2025")}(
                      {getTimeLeftOrAgo(manager?.dateSigned).formatted})
                    </span>
                  </p>
                  <p className="text-teal-400">{manager?.phone}</p>
                </div>
                <div
                  className="absolute top-2 right-2 w-fit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ManagerActionsPopper
                    manager={manager}
                    availableRoles={availableRoles}
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
