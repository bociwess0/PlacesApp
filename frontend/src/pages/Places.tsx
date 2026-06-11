import { useEffect, useState } from "react";
import PlacesList from "../places/all-places/PlacesList";
import type { Place } from "../types";
import { getPlacesById } from "../auth/api/services/places";

export default function Places() {

  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    async function getPlacesByUserId(uid:string) {
      const fetchedPlaces = await getPlacesById(uid);
      setPlaces(fetchedPlaces);
      console.log(places)
    }

    getPlacesByUserId("6a271a7c829ccf2ee761c81d");

  }, [])

  return (
    <div>
      <h1 className="text-5xl font-bold text-white">Places</h1>
      {places && places.length > 0 && <PlacesList places={places}/>}
    </div>
  );
}
