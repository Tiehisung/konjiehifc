import React from "react";
import Image from "next/image";
import { ICaptainProps } from "../admin/players/captaincy/Captaincy";
import _players from "@/data/players";
import { IManager } from "../admin/managers/page";
import Loader from "@/components/Loader";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { SubTitle, Title } from "@/components/Elements";

export const TechnicalManagement = async ({
  managers,
}: {
  managers: IManager[];
}) => {
  if (!managers) return <Loader message="Loading managers..." />;
  return (
    <div
      id="technical-management"
      className="md:max-w-xl max-w-full overflow-hidden"
    >
      <Title>Technical Management</Title>
      <SimpleCarousel wrapperStyles="w-fit " scrollButtonStyles="top-1/3">
        {managers?.map((manager: IManager, index: React.Key) => (
          <div
            key={index}
            className="flex flex-col w-fit justify-center items-center gap-2 mb-6 "
          >
            <Image
              src={manager?.avatar?.secure_url}
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
      </SimpleCarousel>
    </div>
  );
};

export const CaptaincySlides = async ({
  captains,
}: {
  captains: ICaptainProps[];
}) => {
  if (!captains) return <Loader message="Loading captains..." />;
  return (
    <div id="captaincy">
      <Title>Captaincy</Title>

      <SimpleCarousel
        wrapperStyles="grow w-fit _hideScrollbar"
        scrollButtonStyles="top-1/3"
      >
        {captains?.map((captain, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2 mb-6"
          >
            <Image
              src={
                (captain?.player?.avatar?.secure_url as string) ??
                _players[0].avatar?.secure_url
              }
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
