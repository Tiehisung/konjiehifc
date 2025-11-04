import { IQueryResponse } from "@/types";
import { IMatchProps } from "./(fixturesAndResults)";
import { checkTeams } from "@/lib";
import { AVATAR } from "@/components/ui/avatar";

export function MobileFixtureCard({
  fixtures,
}: {
  fixtures: IQueryResponse<IMatchProps[]>;
}) {
  return (
    <ul>
      {fixtures?.data?.map((fix) => {
        const { home, away } = checkTeams(fix);
        return (
          <li>
            <div className="flex items-center ">
              <AVATAR
                src={home?.logo as string}
                alt={home?.name as string}
                fallbackText={home?.name as string}
                className="h-8 w-8 aspect-square "
              />
              <strong className="w-36 line-clamp-1">{home?.name}</strong>
            </div>

            <div className="flex items-center ">
              <AVATAR
                src={away?.logo as string}
                fallbackText={home?.name as string}
                alt={away?.name as string}
                className="h-8 w-8 aspect-square "
              />
              <strong className="w-36 line-clamp-1">{away?.name}</strong>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
