import { useEffect, useState } from "react";
import PlacesList from "../places/all-places/PlacesList";
import type { Place } from "../types";
import { getPlacesById } from "../auth/api/services/places";

export default function Places() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function getPlacesByUserId(uid: string) {
      const fetchedPlaces = await getPlacesById(uid);
      setPlaces(fetchedPlaces);
      console.log(places);
    }

    const user: {
      userId: string;
      token: string;
    } | null = JSON.parse(localStorage.getItem("userData") ?? "null");

    if (user) {
      getPlacesByUserId(user.userId);
    }
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-white">Places</h1>
      {places && places.length > 0 && <PlacesList places={places} />}
    </div>
  );
}
