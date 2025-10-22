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
 * @param daysAgo Accepts days in number and last date it falls on in time back
 * @returns Returns a JavaScript Date object, which MongoDB stores as ISODate.
 */

export function getDateFromDaysAgo(daysAgo: number): Date {
  const date = new Date();
  if (!daysAgo || typeof daysAgo !== "number") return date;
  date.setDate(date.getDate() - daysAgo);
  return date;
}
