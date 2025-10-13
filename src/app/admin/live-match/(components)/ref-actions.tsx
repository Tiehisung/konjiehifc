"use server";

import { revalidatePath } from "next/cache";

// Simulating a database
let matchData = {
  homeTeam: "Home Team",
  awayTeam: "Away Team",
  homeScore: 0,
  awayScore: 0,
  events: [] as string[],
};

export async function updateMatch(formData: FormData) {
  const homeTeam = formData.get("homeTeam") as string;
  const awayTeam = formData.get("awayTeam") as string;
  const homeScore = parseInt(formData.get("homeScore") as string);
  const awayScore = parseInt(formData.get("awayScore") as string);

  matchData = {
    ...matchData,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
  };

  revalidatePath("/");
  return { success: true };
}

export async function addEvent(formData: FormData) {
  const event = formData.get("event") as string;
  matchData.events.push(event);
  revalidatePath("/");
  return { success: true };
}

export async function getMatchData() {
  return matchData;
}
