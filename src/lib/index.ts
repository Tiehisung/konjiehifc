
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

export function getFileName(url: string) {
  try {
    return url.split("/").pop()?.split("?")[0] ?? "file";
  } catch {
    return "file";
  }
}

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

export const checkTeams = (match?: IMatchProps) => {

  if (match?.isHome) {
    return { home: teamKFC, away: match?.opponent }
  }
  return {
    home: match?.opponent,
    away: teamKFC,
  }
};

export const checkGoals = (match?: IMatchProps) => {
  return {
    home:
      match?.opponent?.alias == "KFC"
        ? match?.goals?.length
        : match?.opponentGoals,
    away:
      match?.opponent?.alias == "KFC"
        ? match?.goals?.length
        : match?.opponentGoals,
  }
};

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



export const generateNumbers = (from: number, to: number) => {
  const acc = [];
  for (let i = from; i <= to; i++) {
    acc.push(i);
  }
  return acc;
};

export const bytesToMB = (bytes: number): number => {
  return Number((bytes / (1024 * 1024)).toFixed(2));
};

export function buildQueryStringServer(
  searchParams: Record<string, string | string[] |boolean | undefined>
) {
  if (!searchParams) return "";

  const query = new URLSearchParams(
    Object.entries(searchParams).filter(([_, v]) => v !== undefined) as [
      string,
      string
    ][]
  ).toString();

  return query ? `?${query}` : "";
}

export function isObjectId(value?: string): boolean {
  return (
    typeof value === "string" &&
    /^[a-fA-F0-9]{24}$/.test(value)
  );
}
export const getUrlToShare = () => window.location.href;

export function slugify(text: string): string {
  // Create slug
  const base = text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")       // replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, "");          // trim leading/trailing dashes

  // Timestamp: YYYY-MM-DD-HHMMSS
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `${yyyy}-${mm}-${dd}-${hh}${min}${ss}`;

  return `${base.substring(0,200)}-${timestamp}`;
}
