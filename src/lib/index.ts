
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { teamKFC } from "@/data/teams";

export function getErrorMessage(
  error: unknown,
  customMessage?: string
): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }

  return customMessage ?? "Error occurred!";
}
export const createFileUrl = (file: File) => URL.createObjectURL(file);

export const getFilePath = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export const deleteEmptyKeys = (obj: AnyObject): AnyObject => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "undefined" || obj[key] === null || obj[key] === "")
      delete obj[key];
  });
  return obj;
};

//
export type AnyObject = { [key: string]: unknown };
export function removeEmptyKeys(obj: AnyObject): AnyObject {
  return Object.keys(obj).reduce((acc: AnyObject, key: string) => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export const checkTeams = (match: IMatchProps) => ({
  home: match?.isHome ? teamKFC : match?.opponent,
  away: match?.isHome ? match?.opponent : teamKFC,
});
 
export function roundToNearest(num: number, nearest?: 10 | 100 | 1000) {
  if (nearest == 10) return Math.round(num / 10) * 10;
  if (nearest == 100) return Math.round(num / 100) * 100;
  if (nearest == 1000) return Math.round(num / 1000) * 1000;
  return Math.round(num / 10) * 10;
}

export const shortText = (text: string, maxLength = 30) =>
  text?.length >= maxLength ? `${text.substring(0, maxLength)}...` : text;

export const getInitials = (text: string | string[], length = 2) => {
  const list = typeof text == "string" ? text.trim().split(" ") : text;
  const initials = list.map((l) => l.trim()[0]);
  if (!text) return "";
  return initials.join("").substring(0, length);
};

export const getAge = (dob: string | Date) => {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const getRandomIndex = (length: number) =>
  Math.ceil(Math.random() * length - 1);

