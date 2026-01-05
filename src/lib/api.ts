import { isObjectId, isValidEmail } from "./validate"

/**
 * 
 * @param value any of id, slug or email
 * @returns object of the matching field
 */
export const slugIdFilters = (value: string) => isValidEmail(value) ? { email: value } : isObjectId(value) ? { _id: value } : { slug: value }



// build today filter
const today = new Date();
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

export const todayFilter = {
    $gte: startOfToday, $lt: endOfToday
}