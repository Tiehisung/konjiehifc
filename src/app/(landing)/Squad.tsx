import React from "react";
import Image from "next/image";
import { IQueryResponse } from "@/types";
import { ResponsiveSwiper } from "@/components/carousel/ResponsiveSwiper";
import { getSquads, ISquad } from "../admin/squad/page";
import { staticImages } from "@/assets/images";
import { randomColor } from "@/styles";

const LandingSquad = async () => {
  const squads: IQueryResponse<ISquad[]> | null = await getSquads();

  const squad = squads?.data ? squads.data[0] : null;

  return (
    <div className="py-12 space-y-8 _page">
      <h1
        className="_title rounded-full p-2 w-fit bg-primaryGreen px-3 shadow-2xl "
        style={{ background: randomColor }}
      >
        SQUAD | {squad?.title}{" "}
      </h1>
      <ResponsiveSwiper
        noSpacing
        slides={
          squad?.players?.map((p) => {
           
            return (
              <div
                key={p._id}
                className="w-full overflow-hidden bg-card hover:shadow-lg transition-shadow"
              >
                <Image
                  src={p?.avatar ?? staticImages.avatar}
                  alt={p?.name}
                  className="w-full h-48 md:h-56 lg:h-64 object-cover"
                  width={500}
                  height={500}
                />
                <div
                  className={`p-4 bg-red-400`}
                  style={{ background: randomColor }}
                >
                  <h3 className="font-bold text-lg text-foreground uppercase">
                    {p?.name}
                  </h3>

                  <p className="text-sm text-muted mt-2 uppercase">
                    {p?.position}
                  </p>
                </div>
              </div>
            );
          }) ?? []
        }
      />
    </div>
  );
};

export default LandingSquad;
