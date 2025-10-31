import React from "react";
import Image from "next/image";
import { ICaptainProps } from "../admin/players/captaincy/Captaincy";
import _players from "@/data/players";
import { getManagers, IManager } from "../admin/managers/page";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { SubTitle, Title } from "@/components/Elements";
import { getCaptains } from "../admin/players/captaincy/page";
import { IQueryResponse } from "@/types";

export const TechnicalManagement = async () => {
  const managers: IQueryResponse<IManager[]> = await getManagers();
  return (
    <div
      id="technical-management"
      className="md:max-w-xl max-w-full overflow-hidden"
    >
      <Title>Technical Management</Title>

      <div className="flex flex-wrap items-center justify-center gap-8">
        {managers?.data?.map((manager: IManager, index: React.Key) => (
          <div
            key={index}
            className="flex flex-col w-fit justify-center items-center gap-2 mb-6 "
          >
            <Image
              src={manager?.avatar}
              width={300}
              height={300}
              alt="desc image"
              className="h-40 w-40 max-w-40 rounded-full shadow"
            />
            <p className="font-bold text-lg text-[grayText] first-letter:uppercase">
              {manager?.role}
            </p>
            <SubTitle>{manager?.fullname}</SubTitle>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CaptaincySlides = async () => {
  const captains = (await getCaptains())?.data as ICaptainProps[];
  console.log({ captains });
  return (
    <div id="captaincy">
      <Title>Captaincy</Title>

      <SimpleCarousel
        wrapperStyles="grow w-fit "
        scrollButtonStyles="top-1/3"
        className="_hideScrollbar"
      >
        {captains?.map((captain, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2 mb-6"
          >
            <Image
              src={(captain?.player?.avatar as string) ?? _players[0].avatar}
              width={300}
              height={300}
              alt="desc image"
              className="h-72 w-auto max-w-max rounded-xl shadow-md"
            />
            <p className=" text-[grayText] first-letter:uppercase">
              {captain?.role}
            </p>
            <p>
              {captain?.player?.firstName ?? "Firstname"}{" "}
              {captain?.player?.lastName ?? "Lastname"}
            </p>
          </div>
        ))}
      </SimpleCarousel>
    </div>
  );
};
