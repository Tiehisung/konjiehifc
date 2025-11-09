import { IMatchProps } from "./(fixturesAndResults)";
import { checkGoals, checkTeams } from "@/lib";
import { AVATAR } from "@/components/ui/avatar";
import { formatDate, formatTimeToAmPm, getTimeAgo } from "@/lib/timeAndDate";

export const SecondaryFixtureCard = ({
  fixture,
  className,
}: {
  fixture: IMatchProps;
  className?: string;
}) => {
  const { home, away } = checkTeams(fixture);
  const goals = checkGoals(fixture);
  if (fixture?.status == "COMPLETED")
    return (
      <main
        className={`flex items-center justify-between gap-2 p-2 _hover rounded-md w-fit grow group _hoverBefore relative _after ${className}`}
      >
        <section className="space-y-2 grow ">
          <div className="flex items-center gap-2.5 ">
            <AVATAR
              src={home?.logo as string}
              alt={home?.name as string}
              fallbackText={home?.name as string}
              className="h-8 w-8 aspect-square "
            />
            <span className="w-36 line-clamp-1 _label">{home?.name}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <AVATAR
              src={away?.logo as string}
              fallbackText={home?.name as string}
              alt={away?.name as string}
              className="h-8 w-8 aspect-square "
            />
            <span className="w-36 line-clamp-1 _label">{away?.name}</span>
          </div>
        </section>

        <section className="flex items-center gap-4">
          <span>FT</span>
          <div className="space-y-1">
            <div className="w-7 h-7 border border-border p-0.5 flex items-center justify-center ">
              {goals.home}
            </div>
            <div className="w-7 h-7 border border-border p-0.5 flex items-center justify-center ">
              {goals.away}
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center text-xs font-thin">
          <span>{formatDate(fixture.date, "March 2, 2025")}</span>
          <span>({getTimeAgo(fixture.date)})</span>
        </section>
      </main>
    );

  if (fixture?.status == "UPCOMING")
    return (
      <main
        className={`flex items-center justify-between gap-2 p-2 _hover rounded-md w-fit grow group _hoverBefore relative _after ${className}`}
      >
        <section className="space-y-2 grow ">
          <div className="flex items-center gap-2.5 ">
            <AVATAR
              src={home?.logo as string}
              alt={home?.name as string}
              fallbackText={home?.name as string}
              className="h-8 w-8 aspect-square "
            />
            <span className="w-36 line-clamp-1 _label">{home?.name}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <AVATAR
              src={away?.logo as string}
              fallbackText={home?.name as string}
              alt={away?.name as string}
              className="h-8 w-8 aspect-square "
            />
            <span className="w-36 line-clamp-1 _label">{away?.name}</span>
          </div>
        </section>

        <section className="flex items-center">
          <div className="grid gap-2 w-24 ">
            <span>{formatTimeToAmPm(fixture.time)}</span>
            <span>{formatDate(fixture.date, "March 2, 2025")}</span>
          </div>
        </section>
      </main>
    );

  return (
    <main
      className={`flex items-center justify-between gap-2 p-2 _hover rounded-md w-fit grow group _hoverBefore relative _after ${className}`}
    >
      <section className="space-y-2 grow ">
        <div className="flex items-center gap-2.5 ">
          <AVATAR
            src={home?.logo as string}
            alt={home?.name as string}
            fallbackText={home?.name as string}
            className="h-8 w-8 aspect-square "
          />
          <span className="w-36 line-clamp-1 _label">{home?.name}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <AVATAR
            src={away?.logo as string}
            fallbackText={home?.name as string}
            alt={away?.name as string}
            className="h-8 w-8 aspect-square "
          />
          <span className="w-36 line-clamp-1 _label">{away?.name}</span>
        </div>
      </section>

      <section className="space-y-1 text-primaryRed">
        <div className="w-7 h-7 border border-border p-0.5 flex items-center justify-center ">
          3
        </div>
        <div className="w-7 h-7 border border-border p-0.5 flex items-center justify-center ">
          z
        </div>
      </section>
    </main>
  );
};
