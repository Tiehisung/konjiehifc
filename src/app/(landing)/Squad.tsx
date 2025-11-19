import React from "react";
import { IQueryResponse } from "@/types";
import { ResponsiveSwiper } from "@/components/carousel/ResponsiveSwiper";
import { getSquads, ISquad } from "../admin/squad/page";
import { SlideImage } from "@/components/Image";
import { TITLE } from "@/components/Element";
import { GiDarkSquad } from "react-icons/gi";
import { Badge } from "@/components/ui/badge";

const LandingSquad = async () => {
  const squads: IQueryResponse<ISquad[]> | null = await getSquads();

  const squad = squads?.data ? squads.data[0] : null;

  return (
    <div className="py-12 px-4 space-y-8 _page ">
      <TITLE text={`SQUAD | ${squad?.title}`} icon={<GiDarkSquad />} />

      <ResponsiveSwiper
        swiperStyles={{ width: "100%" }}
        countPerView={{ sm: 2, md: 3, lg: 4, xl: 6 }}
        // noSpacing
        slides={
          squad?.players?.map((p) => {
            return (
              <div key={p?.name} className="relative">
                <SlideImage
                  file={{ secure_url: p?.avatar, name: p?.name }}
                  caption={p?.name}
                  className="rounded-2xl h-48 w-48 object-cover "
                />
                <Badge className="absolute top-3 right-3">{p?.position}</Badge>
              </div>
            );
          }) ?? []
        }
      />
    </div>
  );
};

export default LandingSquad;
