
import { checkTeams } from "@/lib/compute/match";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Updator } from "@/components/Updator";
import { IMatch } from "@/types/match.interface";

export const LiveMatchCard = async () => {
  const match: IMatch | null = (await getLiveMatch())?.data;

  const { home, away } = checkTeams(match as IMatch);

  if (!match) return null;
  return (
    <div className="_page px-4">
      <h1 className="uppercase rounded-full p-2 w-fit bg-primaryGreen px-3 shadow-2xl _title">
        Live Match Update
      </h1>
      <Card>
        <CardHeader className="flex items-center gap-1.5 mb-2 ">
          <span className=" bg-primaryRed my-0.5 ">LIVE</span>
          <span className="_p">Konjieh JHS park</span>
          <span className="text-xl font-thin text-emerald-400">{`56'`}</span>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between gap-5 ">
            <section className="flex flex-col items-center space-y-2">
              <Image
                width={250}
                height={250}
                src={home?.logo as string}
                alt={"home logo"}
                className="w-12 h-12"
              />
              <span className=" _label">{home?.name}</span>
            </section>
            <section className="flex items-center gap-1">
              <h2 className="text-2xl font-bold">{match?.score?.kfc}</h2>
              <LuDot size={24} />
              <h2 className="text-2xl font-bold">{match?.score?.opponent}</h2>
            </section>
            <section className="flex flex-col items-center space-y-2">
              <Image
                width={250}
                height={250}
                src={away?.logo as string}
                alt={"away logo"}
                className="w-12 h-12"
              />
              <span className="_label">{away?.name}</span>
            </section>
          </div>
        </CardContent>
        <CardFooter className="h-10">
          <Updator random />
        </CardFooter>
      </Card>
    </div>
  );
};
