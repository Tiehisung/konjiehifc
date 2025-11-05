"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnyObject, removeEmptyKeys } from ".";
import { useSearchParams } from "next/navigation";

/**
 * Adds a searchparams and returns new pathname containing the searchParams with it's value
 * Use router to replace the new pathname
 * @param {*} key SearchParam to add
 * @param {*} value SearchParam value
 * @returns new pathname
 */
export const getNewPathname = (key: string, value: string) => {
  if (typeof window != "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    return newPathname;
  }
};

/**
 * Deletes a searchparams and returns new pathname without the searchParams.
 * Use router to replace the new pathname
 * @param {*} key SearchParam to delete
 * @returns new pathname
 */

export const deleteSearchParams = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

/**
 * Function to set/update query params.
 * @param key The query key
 * @param value Query value
 * @param router Hook router.
 */
export const setSearchParams = (
  key: string,
  value: string,
  router: AppRouterInstance
) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (value) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  router.replace(newPathname);
};

export const setMultiSearchParams = (
  object: AnyObject,
  router: AppRouterInstance,
  replace = true
) => {
  const cleanedObj = removeEmptyKeys(object);
  const searchParams = new URLSearchParams(window.location.search);
  for (const key of Object.keys(cleanedObj)) {
    searchParams.set(key, cleanedObj[key] as string);
  }
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  if (replace) router.replace(newPathname);
  else router.push(newPathname);
};



/**
 * Builds a query string using the current URL search params by default.
 * Optionally, you can pass overrides or additional query params.
 *
 * @param searchParams Optional overrides or additional parameters
 * @returns string - formatted query string like `?key=value&foo=bar`
 */
export function buildQueryString(
  searchParams?: Record<string, string | string[] | undefined>
) {
  const sp = useSearchParams();

  // Convert current URL params into a mutable object
  const currentParams: Record<string, string | string[]> = {};
  sp.forEach((value, key) => {
    currentParams[key] = value;
  });

  // Merge defaults with passed-in overrides
  const mergedParams = {
    ...currentParams,
    ...searchParams,
  };

  // Filter out undefined or empty values
  const query = new URLSearchParams(
    Object.entries(mergedParams).filter(([_, v]) => v !== undefined) as [
      string,
      string
    ][]
  ).toString();

  return query ? `?${query}` : "";
}

 
