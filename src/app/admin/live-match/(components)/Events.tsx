"use client";

import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import DiveUpwards from "@/components/Animate/DiveUp";

export function MatchEvents({
  match,
  className,
}: {
  match: IMatchProps;
  className?: string;
}) {
  if (!match?.events) return null;
  return (
    <div className=" grow w-full card border _borderColor overflow-hidden">
      <h2 className="text-xl font-semibold card-title text-center pl-3">
        Match Events
      </h2>

      {match?.events?.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <ul
          className={`space-y-2 max-h-[60vh] overflow-y-auto card-body rounded _secondaryBg ${className}`}
        >
          {match?.events?.map((event, index) => (
            <li key={index} className="_borderColor border-b pb-2 max-w-full">
              {index == 0 ? (
                <DiveUpwards yLimit={10} dependency={match.events.length}>
                  <span className="font-semibold ">{event.time}</span>
                  <span className="ml-2 _p">{event.description}</span>
                </DiveUpwards>
              ) : (
                <>
                  <span className="font-semibold">{event.time}</span>
                  <span className="ml-2 _p">{event.description}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
