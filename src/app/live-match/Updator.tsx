'use client'

import DiveUpwards from "@/components/Animate";
import { useState, useEffect } from "react";

const updates = [
  "Goal by KFC",
  "Yellow card to Opponent",
  "Red card to KFC",
  "Substitution KFC",
];

interface ILiveUpdates {
  data?: string[];
  random?: boolean;
  every?: number;
}
export const MatchUpdator = ({ data=updates, random, every = 5000 }: ILiveUpdates) => {
  const [update, setUpdate] = useState(updates[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const valueIndex = random ? Math.floor(Math.random() * data.length) : 0;
      setUpdate(updates[valueIndex]);
    }, every);
    return () => clearInterval(interval);
  }, [data]);
  return (
    <div>
      <DiveUpwards layoutId={update}dependency={update} y={5}>
        <p className="_p text-blueBlack dark:text-white line-clamp-1 max-w-40">
          {update}
        </p>
      </DiveUpwards>
    </div>
  );
};