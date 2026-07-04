import { useState } from "react";
import type { Place } from "../../types";
import { MapPin, Map, Pencil } from "lucide-react";
import PlacesMap from "../places-map/PlacesMap";
import DeletePlaceBtn from "../../auth/ui/DeletePlaceBtn";
import EditPlaceModal from "../../helpers/EditPlaceModal";

interface Props {
  place: Place;
}

export default function PlaceItem({ place }: Props) {
  const [showMap, setShowMap] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div
      className="group flex-1 min-w-80 md:min-w-87.5 max-w-93  overflow-hidden rounded-3xl border border-[#1D3A5F] bg-slate-950/40
                    transition-all duration-300  hover:border-blue-500/50"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={place.image}
          alt={place.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white">{place.title}</h2>

        <div className="mt-3 flex items-start gap-2 text-blue-400">
          <MapPin size={18} />

          <span className="text-sm h-10">
            {place.address}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-slate-400">{place.description}</p>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className=" flex items-center gap-2 rounded-xl  bg-blue-600 p-2 text-sm font-medium text-white transition
              bg-blue-600 cursor-pointer
            "
            onClick={() => setShowMap(true)}
          >
            <Map size={18} />
            Map
          </button>

          <button
          onClick={() => setOpenEditModal(true)}
            className="
              flex items-center gap-2 rounded-xl border border-[#294C73] px-4 py-3 text-sm font-medium text-slate-300
              transition  hover:border-slate-600  hover:text-white  cursor-pointer
            "
          >
            <Pencil size={18} />
            Edit
          </button>

          <DeletePlaceBtn place={place} />
        </div>
      </div>
      {showMap && <PlacesMap place={place} onClose={() => setShowMap(false)} />}
      <EditPlaceModal 
        open = {openEditModal}
        place={place}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
}
