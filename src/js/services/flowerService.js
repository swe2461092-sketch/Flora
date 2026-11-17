// src/js/services/flowerService.js
import { DATA_MODE, LOCAL_FLOWERS_URL, API_FLOWERS_URL } from "../config.js";

let flowerCache = null;

export async function getFlowers() {
  if (flowerCache) {
    return flowerCache;
  }
  const url = DATA_MODE === "api" ? API_FLOWERS_URL : LOCAL_FLOWERS_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load flowers data");
  }
  const data = await response.json();
  flowerCache = data;
  return data;
}
