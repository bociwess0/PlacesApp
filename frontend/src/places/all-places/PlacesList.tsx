import type { Place } from "../../types";
import PlaceItem from "./PlaceItem";

interface Props {
  places: Place[]
}

export default function PlacesList({places}: Props) {
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