import React from "react";
import Image from "next/image";
import { IQueryResponse } from "@/types";
import { ResponsiveSwiper } from "@/components/carousel/ResponsiveSwiper";
import { getSquads, ISquad } from "../admin/squad/page";

const LandingSquad = async () => {
  const squads: IQueryResponse<ISquad[]> | null = await getSquads();

  const squad = squads?.data ? squads.data[0] : null;

  return (
    <div className="py-12 px-6 space-y-8">
      <h1 className="_title">SQUAD VRS {squad?.opponent?.name} </h1>
      <ResponsiveSwiper
        slides={
          squad?.players?.map((p) => (
            <div
              key={p._id}
              className="w-full rounded-lg overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={p?.avatar as string}
                alt={p?.name}
                className="w-full h-48 md:h-56 lg:h-64 object-cover"
                width={500}
                height={500}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-foreground">
                  {p?.name}
                </h3>

                <p className="text-sm text-muted-foreground mt-2">
                  {p?.position}
                </p>
              </div>
            </div>
          )) ?? []
        }
      />

   
    </div>
  );
};

export default LandingSquad;
