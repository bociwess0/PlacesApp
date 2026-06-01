import { places } from "../../data/all-data";
import type { Place } from "../../types";
import PlaceItem from "./PlaceItem";

export default function PlacesList() {
  return (
    <div className="flex flex-wrap gap-8 mt-8">
      {places.map((place: Place) => (
        <PlaceItem
          key={place.id}
          place={place}
        />
      ))}
    </div>
  );
}