import moment from "moment";

/**
 *
 * @param birthdate Date arg as string
 * @returns Years as number
 */
export const getAgeFromDOB = (birthdate: string): number => {
  // Parse the birthdate string into a Date object
  const birthdateObj = new Date(birthdate);

  const currentDate = new Date();

  const ageInMillis = Number(currentDate) - Number(birthdateObj);

  const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365));

  return ageInYears;
};

/**
 *
 * @param dateString Date string to be converted
 * @returns Date in 'DD/MM/YYYY' format
 */
export const getFormattedDate = (
  dateString?: string,
  format?: "dd/mm/yyyy" | "March 2, 2025" | "Sunday, March 2, 2025"
) => {
  if (!dateString) return "N/A";

  const createdAt = new Date(dateString);

  switch (format) {
    case "March 2, 2025":
      return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        createdAt
      );

    case "Sunday, March 2, 2025":
      return createdAt.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    default:
      return moment(dateString).format("DD/MM/YYYY");
  }
};

export const getTimeAgo = (dateString: string) => moment(dateString).fromNow();
/**
 * Checks whether the given date (MongoDB date, ISO string, or JS Date)
 * represents "today" (local timezone).
 */
export function isToday(date: Date | string | number | null | undefined): boolean {
  if (!date) return false;

  // Convert MongoDB ISO string, timestamp, or Date to Date object
  const d = new Date(date);

  if (isNaN(d.getTime())) return false; // invalid date

  const now = new Date();

  // Compare year, month, and day only
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}


/**
 * @param daysAgo Accepts days in number and last date it falls on in time back
 * @returns Returns a JavaScript Date object, which MongoDB stores as ISODate.
 */

export function getDateFromDaysAgo(daysAgo: number): Date {
  const date = new Date();
  if (!daysAgo || typeof daysAgo !== "number") return date;
  date.setDate(date.getDate() - daysAgo);
  return date;
}

export type TimeUnit = "month" | "week" | "day" | "hour" | "minute";

export interface TimeLeftResult {
  value: number;
  unit: TimeUnit;
  expired: boolean;
  formatted: string;
}

/**
 * Returns time difference between now and a given date in the most relevant unit.
 * Handles both future ("X days left") and past ("X days ago") scenarios.
 */
export function getTimeLeftOrAgo(date?: string | number | Date): TimeLeftResult {
  const now = new Date();
  const target = new Date(date ?? Date.now());

  if (isNaN(target.getTime())) {
    throw new Error("Invalid date provided to getTimeLeftUntil()");
  }

  const diffMs = target.getTime() - now.getTime();
  const absDiffMs = Math.abs(diffMs);

  const minutes = Math.floor(absDiffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  let value: number;
  let unit: TimeUnit;

  if (months >= 1) {
    value = months;
    unit = "month";
  } else if (weeks >= 1) {
    value = weeks;
    unit = "week";
  } else if (days >= 1) {
    value = days;
    unit = "day";
  } else if (hours >= 1) {
    value = hours;
    unit = "hour";
  } else {
    value = Math.max(1, minutes); // at least 1 minute
    unit = "minute";
  }

  const expired = diffMs < 0;
  const formatted = expired
    ? `${value} ${unit}${value !== 1 ? "s" : ""} ago`
    : `${value} ${unit}${value !== 1 ? "s" : ""} left`;

  return { value, unit, expired, formatted };
}
