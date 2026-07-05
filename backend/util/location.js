const HttpError = require("../models/http-error");

const searchAddress = async (address) => {
  const url = new URL("https://nominatim.openstreetmap.org/search");

  url.searchParams.set("q", address);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "YourPlaces/1.0",
      "Accept-Language": "en",
    },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
};

const getCoordsForAddress = async (address) => {
  const addressParts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const queries = [
    address,
    addressParts.slice(1).join(", "),
    addressParts.slice(-2).join(", "),
  ].filter(Boolean);

  for (const query of queries) {
    const data = await searchAddress(query);

    if (data.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }
  }

  throw new HttpError(
    "Could not find coordinates for the entered address.",
    422,
  );
};

module.exports = getCoordsForAddress;