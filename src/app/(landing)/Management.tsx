import React from "react";
import Image from "next/image";
import { ICaptainProps } from "../admin/players/captaincy/Captaincy";
import { getManagers, IManager } from "../admin/managers/page";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { Title } from "@/components/Elements";
import { getCaptains } from "../admin/players/captaincy/page";
import CardCarousel from "@/components/carousel/cards";
import { CgShapeRhombus } from "react-icons/cg";

export const TechnicalManagement = async () => {
  const managers = (await getManagers("?isActive=true"))?.data as IManager[];
  const captains = (await getCaptains("?isActive=true"))
    ?.data as ICaptainProps[];

  return (
    <div id="technical-management" className="max-w-full overflow-hidden">
      <Title>Technical Management</Title>

      <div className="flex flex-wrap items-center justify-center gap-8">
        <CardCarousel
          cards={
            captains?.map((captain, index: number) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-2 pb-6"
              >
                <Image
                  src={captain?.player?.avatar as string}
                  width={300}
                  height={300}
                  alt="desc image"
                  className="h-60 w-full object-cover rounded-xl shadow-md"
                />
                <p className=" capitalize">{captain?.role}</p>
                <p className="uppercase">
                  {captain?.player?.firstName} {captain?.player?.lastName}
                </p>
              </div>
            )) ?? []
          }
        />
        <CgShapeRhombus size={100} className='animate-pulse' />
        <CardCarousel
          effect="flip"
          cards={
            managers?.map((manager: IManager, index: React.Key) => (
              <div
                key={index}
                className="flex flex-col w-fit justify-center items-center gap-2 pb-6 "
              >
                <Image
                  src={manager?.avatar}
                  width={300}
                  height={300}
                  alt="desc image"
                  className="h-52 w-52 rounded-full object-cover"
                />
                <p className="font-bold text-lg capitalize">{manager?.role}</p>
                <h2 className="uppercase">{manager?.fullname}</h2>
              </div>
            )) ?? []
          }
          autoplay
        />
      </div>
    </div>
  );
};

export const CaptaincySlides = async () => {
  const captains = (await getCaptains())?.data as ICaptainProps[];

  return (
    <div id="captaincy" className="_page">
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
              src={captain?.player?.avatar as string}
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
