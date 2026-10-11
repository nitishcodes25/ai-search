import { TRACKING_PARAMS } from "../utils/constants.js";

export const normalizeUrl = (url: string): string => {
  const parsedURL = new URL(url.trim());

  // Fragment does not identify a different server resource
  parsedURL.hash = "";

  // Remove known tracking parameters
  for (const param of TRACKING_PARAMS) {
    parsedURL.searchParams.delete(param);
  }

  // Remove trailing slash
  if (parsedURL.pathname !== "/") {
    parsedURL.pathname = parsedURL.pathname.replace(/\/$/, "");
  }

  return parsedURL.toString();
};